var express = require('express');
var router = express.Router();

var mysql = require('mysql');

let mysql_setting = {
  host : 'localhost',
  user : 'idolapi',
  password : '12345678',
  database : 'idolsearch'
}

router.get('/', function(req, res, next) {
  let idol1req = req.query.idol1;
  let idol2req = req.query.idol2;
  let idol1id = "";

  /** idol1のID調査 */
  let con = mysql.createConnection(mysql_setting);
  con.connect();
  con.query('SELECT idol_id FROM idol',
    function(error, result, fields){
      if(error == null){
        res.render('result', { idol1 : result[0].idol_id+idol1req, idol2 : idol2req });
      }
    }
  );
  con.end();
});
/*
async function existCheck(idol1name,idol2name){
  let id1 = await askIdolId(idol1name);
  let id2 = await askIdolId(idol2name);
  return id1+","+id2;
}
async function askIdolId(idolname){
  let idn = "aaa";
  let con = mysql.createConnection(mysql_setting);
  con.connect();
  con.query('SELECT idol_id FROM idol',
    (error, result, fields)=>{
      if(error == null){
        idn = result[0].idol_id;
        idn = result[0].length;
      }else{
        return "aiu";
      }
    }
  );
  con.end();
  while(idn==""){}
  return idn;
}
*/

module.exports = router;
