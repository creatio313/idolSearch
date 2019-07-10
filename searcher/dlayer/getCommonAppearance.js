module.exports = function getCommonAppearance(con, idol1ID, idol2ID){
  return new Promise((resolve, reject) => {
    con.query('SELECT event.name FROM appearance JOIN event ON appearance.event_id = event.event_id WHERE appearance.idol_id = ? OR appearance.idol_id = ? GROUP BY event.name HAVING COUNT(event.name)>1',
    [idol1ID, idol2ID],
    (err, result, fields) => {
      if(err){
        reject(err);
      } else {
        resolve(result, fields);
      }
    })
  })
}
