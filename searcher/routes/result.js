/** D層からアイドルのID取得メソッドをインポートする */
const getID = require('../dlayer/getIdolID');
/** D層から共通イベント取得メソッドをインポートする */
const getAppearance = require('../dlayer/getCommonAppearance');

//デフォルトインポート
var express = require('express');
var router = express.Router();

/** MySQLのオブジェクト */
var mysql = require('mysql');

/**
 * MySQLの設定。必要に応じて変更する。
 * @type {Object}
 */
const MYSQL_SETTING = {
  connectionLimit : 2,
  host : 'localhost',
  user : 'idolapi',
  password : '12345678',
  database : 'idolsearch'
};

/** デフォルト取得 */
router.get('/', function(req, res, next) {
  /** 入力されたアイドル名を取得する */
  let idol1Name = req.query.idol1;
  let idol2Name = req.query.idol2;

  /**
   * MySQL接続プール
   * @type {Object}
   */
  let con = mysql.createPool(MYSQL_SETTING);

  /** アイドルのIDを取得する */
  Promise.all([
    getID(con, [idol1Name]),
    getID(con, [idol2Name])
  ]).then(
    /**
     * ----------------------------------------------
     * データベース問い合わせ成功時の処理
     * @param  {Object} response データベースからの応答
     * ----------------------------------------------
     */
    response => {
      /**
       * アイドルIDが見つからなかった場合、再度検索画面を表示する
       * @param  {Object} response データベースからの応答
       */
      if(response[0].length == 0 || response[1].length == 0){
        /**
         * IDが見つからなかったアイドル名
         * @type {Array}
         */
        let noFoundName = [];
        if(response[0].length == 0)noFoundName.push(idol1Name); //アイドル1が見つからなかった場合、その名前を追加する
        if(response[1].length == 0)noFoundName.push(idol2Name); //アイドル2が見つからなかった場合、その名前を追加する

        /** 再建策画面をロードし、接続を終了する */
        res.render('index', {title: 'アイドル共演探索システム|再検索',noFoundName : noFoundName});
        con.end();
      } else {
        /** 取得したアイドルIDを変数に格納する */
        let idol1ID = response[0][0].idol_id;
        let idol2ID = response[1][0].idol_id;
        /** 共演イベントを問い合わせる */
        getAppearance(con, idol1ID, idol2ID).then(
          /**
           * データベース問い合わせ成功時の処理
           * @param  {Object} response データベースからの応答
           */
          response => {
            /** 検索結果を応答し、接続を終了する */
            res.render('result', {title: 'アイドル共演探索システム|検索結果',togcount : response.length, eventlist : response});
            con.end();
          },
          /**
           * データベース問い合わせ失敗時の処理
           * @param  {Object} error エラー内容
           */
          error => {
            /** 接続を終了し、エラーをスローする */
            con.end();
            throw err;
          }
        );
      }
    },
    /**
     * ----------------------------------------------
     * データベース問い合わせ失敗時の処理
     * @param  {Object} err エラー内容
     * ----------------------------------------------
     */
    err => {
      /** エラーページに遷移し、エラー内容を表示する */
      res.locals.message = err.message;
      res.locals.error = err;
      res.status(err.status || 500);
      res.render('error');
    }
  );
});

module.exports = router;
