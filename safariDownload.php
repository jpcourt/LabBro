<?php
    require_once '../toolbox/file_lib.php';
    if (isset($_GET['fileName'])) {
        $fileName = $_GET['fileName'];
        if($fileName) {
            header("Content-Disposition: attachment; filename=\"".$fileName."\""); // use 'attachment' to force a download
            header("Content-type: application/x-please-download"); 
            $fsize = filesize($fullPath);
            if($fsize) {//checking if file size exist
                header("Content-length: $fsize");
            }
            readfile("tmp/".$fileName);
            delete_file("tmp/".$fileName);
            exit;
        }
    }
?>