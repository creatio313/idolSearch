var mysql = require('mysql');

let mysql_setting = {
  connectionLimit :2,
  host : 'localhost',
  user : 'idolapi',
  password : '12345678',
  database : 'idolsearch'
}
let con = mysql.createPool(mysql_setting);


  Promise.all([
    getID(["AKB48"]),
    getID(["SKE48"])
  ]).then( (value)=>{
    console.log(value[0][0].idol_id);
    console.log(value[1][0].idol_id);
    //値がなかった場合、長さ0の配列になる。
  }).catch ((err)=>{
    console.log("しっぱい！");
  }).finally(()=>{
    con.end();
  });

function getID(placeholder){
  return new Promise((resolve, reject)=>{
    con.query('SELECT idol_id FROM idol WHERE name=?',[placeholder],(err,result,fields)=>{
      if(err){
        reject(err);
      } else {
        resolve(result,fields);
      }
    })
  })
}
