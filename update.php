<?php 
    $jsonString = file_get_contents('./read.json'); 
    $data = json_decode($jsonString, true);
    $factor = $_POST['type'];
    $time = $_POST['time'];
    $type = explode("-", $factor);
    $data[$type[0]][$type[1]] = $time;
    
   // $data['fajr']['azan'] = "04:00";
    $newJsonString = json_encode($data);
    file_put_contents('./read.json', $newJsonString);
?>