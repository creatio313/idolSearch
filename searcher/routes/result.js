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
        res.render('index', {noFoundName : noFoundName});
        con.end();
      }else{
        let idol1ID = response[0][0].idol_id;
        let idol2ID = response[1][0].idol_id;
        con.query(
          'SELECT event.name FROM appearance JOIN event ON appearance.event_id = event.event_id WHERE appearance.idol_id = ? OR appearance.idol_id = ? GROUP BY event.name HAVING COUNT(event.name)>1',
          [idol1ID, idol2ID],
          (err, result, fields) => {
            if(err){
              throw err;
            } else {
              res.render('result', {
                togcount:result.length,
                eventlist:result
              });
            }
            con.end();
        });
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

function getID(con, placeholder){
  return new Promise((resolve, reject)=>{
    con.query('SELECT idol_id FROM idol WHERE name=?',
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

module.exports = router;
