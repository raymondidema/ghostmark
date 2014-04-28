<?php
// In PHP versions earlier than 4.1.0, $HTTP_POST_FILES should be used instead
// of $_FILES.

function niceFileName($file)
{
    return basename(strtolower(str_replace(' ', '-', $file)));
}

$uploaddir = 'uploads/';
$uploadfile = $uploaddir . niceFileName($_FILES['file']['name']);

// echo '<pre>';
if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
    echo $uploadfile;
} else {
    print "<pre>";
    echo "Possible file upload attack!\n";
    echo 'Here is some more debugging info:';
    print_r($_FILES);

    print "</pre>";
}