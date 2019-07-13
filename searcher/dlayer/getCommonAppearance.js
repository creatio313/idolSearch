/**
 * 引数に渡されたアイドルの共演イベントを取得する
 * @param  {Object} con     データベース接続プール
 * @param  {String} idol1ID アイドル1のID
 * @param  {String} idol2ID アイドル2のID
 * @return {Promise}        接続のPromiseオブジェクト
 */
module.exports = function getCommonAppearance(con, idol1ID, idol2ID){
  return new Promise((resolve, reject) => {
    /** データベースに問い合わせるSQL */
    con.query('SELECT event.name FROM appearance JOIN event ON appearance.event_id = event.event_id WHERE appearance.idol_id = ? OR appearance.idol_id = ? GROUP BY event.name HAVING COUNT(event.name)>1',
    /** プレースホルダ */
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
