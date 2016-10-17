<?php

	require_once '../toolbox/file_lib.php';

	$fileData = json_decode(file_get_contents('php://input'));
	$fileName = $fileData->fileName;
	$fileContent = $fileData->fileContent;

	$result = write_file("tmp/".$fileName, $fileContent);
	
	if(!$result){
		echo "{\"result\" : \"KO\", \"message\" : \"Error writing file\"}";
	}else{
		echo "{\"result\" : \"OK\", \"message\" : \"".$fileName."\"}";
	}

?>