/**
 * 引数に渡されたアイドルの名前からアイドルIDを取得する
 * @param  {Object} con         データベース接続プール
 * @param  {String} placeholder アイドルの名前
 * @return {Promise}        接続のPromiseオブジェクト
 */
module.exports = function getIdolID(con, placeholder){
  return new Promise((resolve, reject) => {
    /** データベースに問い合わせるSQL */
    con.query('SELECT idol_id FROM idol WHERE name=?',
    /** プレースホルダ */
    [placeholder],
    (err, result, fields) => {
      if(err){
        reject(err);
      } else {
        resolve(result, fields);
      }
    })
  })
}
