const getID = require('../dlayer/getIdolID');
const getAppearance = require('../dlayer/getCommonAppearance');

var express = require('express');
var router = express.Router();

var mysql = require('mysql');

const MYSQL_SETTING = {
  connectionLimit : 2,
  host : 'localhost',
  user : 'idolapi',
  password : '12345678',
  database : 'idolsearch'
};

router.get('/', function(req, res, next) {
  let idol1Name = req.query.idol1;
  let idol2Name = req.query.idol2;

  let con = mysql.createPool(MYSQL_SETTING);

  Promise.all([
    getID(con, [idol1Name]),
    getID(con, [idol2Name])
  ]).then(
    response => {
      if(response[0].length == 0 || response[1].length == 0){
        let noFoundName = [];
        if(response[0].length == 0)noFoundName.push(idol1Name);
        if(response[1].length == 0)noFoundName.push(idol2Name);
        res.render('index', {title: 'アイドル共演探索システム|再検索',noFoundName : noFoundName});
        con.end();
      }else{

        let idol1ID = response[0][0].idol_id;
        let idol2ID = response[1][0].idol_id;
        getAppearance(con, idol1ID, idol2ID).then(
          response => {
            res.render('result', {title: 'アイドル共演探索システム|検索結果',togcount : response.length, eventlist : response});
            con.end();
          },
          error => {
            con.end();
            throw err;
          }
        );
      }
    },
    err => {
      res.locals.message = err.message;
      res.locals.error = err;
      res.status(err.status || 500);
      res.render('error');
    }
  );
});

module.exports = router;
