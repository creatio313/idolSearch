$(function(){
  /** フォームの送信をトリガーに、全角英数を半角に変換する。 */
  $("#mainform").submit(function(){
    $("#idol1").val(changeToHankaku($("#idol1").val()));  //アイドル1の名前を半角化
    $("#idol2").val(changeToHankaku($("#idol2").val()));  //アイドル2の名前を半角化

    /** 文字を半角にして返却する関数 */
    function changeToHankaku(str){
      str = str.replace( /[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g,
        function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 65248);
      });
      return str;
    }
  })
})
