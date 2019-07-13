/**
 * クライアントサイドでの実行プログラム
 * Ver.1.0
 */

 /**
  * ブラウザがIEである場合、Chromeのダウンロードサイトにリダイレクトさせる
  */
document.addEventListener('DOMContentLoaded', function(){
  /**
   * クライアントのブラウザを取得する
   * @type {String}
   */
  var userAgent = window.navigator.userAgent.toLowerCase();
  /**
   * ブラウザがIEである場合
   * @param  {String} userAgent 使用されているブラウザの文字列
   */
  if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
    //自ページを非表示にする
    document.body.style.display = 'none';
    //Chromeのダウンロードサイトにリダイレクトさせる
    location.href = 'https://www.google.co.jp/chrome/';
  }
}, false);

$(function(){
  /** フォームの送信をトリガーに、全角英数を半角に変換する。 */
  $("#mainform").submit(function(){
    $("#idol1").val(changeToHankaku($("#idol1").val()));  //アイドル1の名前を半角化
    $("#idol2").val(changeToHankaku($("#idol2").val()));  //アイドル2の名前を半角化

    /**
     * 文字を半角にして返却する関数
     * @param  {String} str 変換前文字列
     * @return {String}     変換後文字列
     */
    function changeToHankaku(str){
      str = str.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g,
        function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 65248);
      });
      return str;
    }
  })
})
