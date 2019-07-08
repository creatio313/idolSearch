var express = require('express');
var router = express.Router();

var mysql = require('mysql');

let mysql_setting = {
  connectionLimit : 2,
  host : 'localhost',
  user : 'idolapi',
  password : '12345678',
  database : 'idolsearch'
}
let con = mysql.createPool(mysql_setting);

router.get('/', function(req, res, next) {
  let idol1req = req.query.idol1;
  let idol2req = req.query.idol2;

  Promise.all([
    getID([idol1req]),
    getID([idol2req])
  ]).then( (value)=>{
    if(value[0].length==0 || value[1].length==0){
      let nofound="";
      if(value[0].length==0)nofound=idol1req;
      if(value[1].length==0)nofound=idol2req;
      res.render('result', {errmsg: "指定されたアイドル「"+nofound+"」が見つかりませんでした。"});
    }else{
      let idol1ID = value[0][0].idol_id;
      let idol2ID = value[1][0].idol_id;
      con.query(
        'SELECT event.name FROM appearance JOIN event ON appearance.event_id = event.event_id WHERE appearance.idol_id = ? OR appearance.idol_id = ? GROUP BY event.name HAVING COUNT(event.name)>1',
        [idol1ID,idol2ID],
        (err,result,fields)=>{
          if(err){
            throw err;
          } else {
            res.render('result',{togcount:result.length});
          }
      });
    }
  }).catch ((err)=>{
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(err.status || 500);
    res.render('error');
  }).finally(()=>{
    //con.end();
  });
});
function getID(placeholder){
  return new Promise((resolve, reject)=>{
    con.query('SELECT idol_id FROM idol WHERE name=?',
    [placeholder],
    (err,result,fields)=>{
      if(err){
        reject(err);
      } else {
        resolve(result,fields);
      }
    })
  })
}

module.exports = router;
