module.exports = function getIdolID(con, placeholder){
  return new Promise((resolve, reject) => {
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
