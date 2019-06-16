<?php

  $idolName = $_GET["idol"];
  $idleId;
  $host     = 'localhost'; // データベースのホスト名又はIPアドレス ※CodeCampでは「localhost」で接続できます
  $username = 'user';  // MySQLのユーザ名
  $passwd   = 'password';    // MySQLのパスワード
  $dbname   = 'mydb';    // データベース名
  $link = mysqli_connect($host, $username, $passwd, $dbname);

  $idleId=getIdolid($idolName); //アイドルのIDを取得
  $eventId=getEventId($idleId); //アイドルの出演したイベントIDを取得
  $idol=getKyoen($eventId,$idleId); //アイドルと共演したアイドルのIDを取得
  echo getKyoenName($idol);  //共演したアイドルの名前を取得


  function getIdolid($idolName){
    $host     = 'localhost'; // データベースのホスト名又はIPアドレス ※CodeCampでは「localhost」で接続できます
    $username = 'user';  // MySQLのユーザ名
    $passwd   = 'password';    // MySQLのパスワード
    $dbname   = 'mydb';    // データベース名
      $link = mysqli_connect($host, $username, $passwd, $dbname);
      if($link){
        echo 'OK<br>';

        mysqli_set_charset($link, 'utf8');

        $query = 'SELECT id FROM aidle WHERE name='."'".$idolName."';";

        // クエリを実行します
        $result = mysqli_query($link, $query);
        $idleId=mysqli_fetch_array($result)['id'];

        echo "アイドルのIDは".$idleId."です。";
        // 結果セットを開放します
        mysqli_free_result($result);
        mysqli_close($link);
        return $idleId;
      }
  }
  function getEventId($idleId){
    $host     = 'localhost'; // データベースのホスト名又はIPアドレス ※CodeCampでは「localhost」で接続できます
    $username = 'user';  // MySQLのユーザ名
    $passwd   = 'password';    // MySQLのパスワード
    $dbname   = 'mydb';    // データベース名
    $link = mysqli_connect($host, $username, $passwd, $dbname);

    $eventId=[];
    if($link){
      echo 'OK<br>';

      mysqli_set_charset($link, 'utf8');

      $query = 'SELECT id,events_id FROM appearance WHERE aidle_id='.$idleId.";";

      // クエリを実行します
      $result = mysqli_query($link, $query);
    while ($row = mysqli_fetch_array($result)) {
      $eventId[]=$row['events_id'];
    }
    echo "参加したイベントIDは".$eventId[0]."です。";
    // 結果セットを開放します
    mysqli_free_result($result);
    mysqli_close($link);
    return $eventId[0];
    }
  }
  function getKyoen($eventId,$moto){
    $host     = 'localhost'; // データベースのホスト名又はIPアドレス ※CodeCampでは「localhost」で接続できます
    $username = 'user';  // MySQLのユーザ名
    $passwd   = 'password';    // MySQLのパスワード
    $dbname   = 'mydb';    // データベース名
    $link = mysqli_connect($host, $username, $passwd, $dbname);
    if($link){
      echo 'OK<br>';

      mysqli_set_charset($link, 'utf8');

      $query = 'SELECT id,aidle_id FROM appearance WHERE events_id='.$eventId.";";

      // クエリを実行します
      $result = mysqli_query($link, $query);
      while ($row = mysqli_fetch_array($result)) {
        if($row['aidle_id']==$moto)continue;

        $aidle_id[]=$row['aidle_id'];
      }
      echo "共演したアイドルIDは".$aidle_id[0]."です。";
      // 結果セットを開放します
      mysqli_free_result($result);
      mysqli_close($link);
      return $aidle_id[0];
    }
  }
  function getKyoenName($id){
    $host     = 'localhost'; // データベースのホスト名又はIPアドレス ※CodeCampでは「localhost」で接続できます
    $username = 'user';  // MySQLのユーザ名
    $passwd   = 'password';    // MySQLのパスワード
    $dbname   = 'mydb';    // データベース名
      $link = mysqli_connect($host, $username, $passwd, $dbname);
      if($link){
        echo 'OK<br>';

        mysqli_set_charset($link, 'utf8');

        $query = 'SELECT name FROM aidle WHERE id='.$id.";";

        // クエリを実行します
        $result = mysqli_query($link, $query);
        $Name=mysqli_fetch_array($result)['name'];

        echo "アイドルは".$Name."です。";
        // 結果セットを開放します
        mysqli_free_result($result);
        mysqli_close($link);
        return $Name;
      }
  }
 ?>
