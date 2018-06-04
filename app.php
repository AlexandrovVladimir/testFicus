<?php
    $name = $_POST['name'];
    $message = trim($_POST['message']);

    if ($name === '' && $message === '') {
        echo 'Заполните поля';
    } elseif ($name === '') {
        echo 'Заполните имя';
    } elseif (!preg_match("/^[a-zA-Z ]*$/", $name)) {
        echo 'Введите корректное имя';
    } else {
        mail("dev.alexandrov@gmail.com", "Письмо с сайта", $message);
        echo "1";
    }
?>