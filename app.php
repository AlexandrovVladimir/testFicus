<?php
    $name = $_POST['name'];
    $message = trim($_POST['message']);

    echo var_dump($name);

    if ($name == '') {
        echo 'Введите имя';
    } elseif ($message == '') {
        echo 'Введите сообщение';
    } else {
        echo "1";
    }
?>