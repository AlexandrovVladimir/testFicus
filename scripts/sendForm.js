(function(){
    const sendBtn = document.querySelector('.form__link');
    let result = document.querySelector('.form__result');

    sendBtn.addEventListener('click', (e) => {
        const nameText = document.querySelector('.form__input'); //input[name=name]
        const messageText = document.querySelector('.form__textarea');
        e.preventDefault();

        let params = 'name=' + nameText.value + '&' + 'message=' + messageText.value;
        ajaxPost(params);

    });

    function ajaxPost(params) {
        const xhr = new XMLHttpRequest();

        xhr.addEventListener('readystatechange', () => {
            console.log(xhr.readyState);  //2 3 4 с ответом от сервера

            if (xhr.readyState === 4) { // состояние готовности, запрос выполнен, данные пришли
                if (xhr.status === 200) {
                    if (xhr.responseText === '1') {
                        result.innerHTML = 'Ваше сообщение отправлено! Спасибо!';
                    } else {
                        result.innerHTML = xhr.responseText;
                    }
                } else {
                    throw Error (xhr.status + ' ' + xhr.responseText);
                }
            }
        });

        xhr.open('POST', 'app.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
})();