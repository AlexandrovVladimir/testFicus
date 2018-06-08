(function(){
    // send form
    const sendBtn = document.querySelector('.form__link');
    const nameText = document.querySelector('.form__input'); //input[name=name]
    const messageText = document.querySelector('.form__textarea');
    let result = document.querySelector('.form__result');

    sendBtn.addEventListener('click', (e) => {
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
                        // result.innerHTML = 'Ваше сообщение отправлено! Спасибо!';
                        $('#modal').modal('show');
                        nameText.value = '';
                        messageText.value = '';
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
    // send form

    //anchor top
    const footerLink = document.querySelector('.footer__link');

    footerLink.addEventListener('click', () => {
        $('body, html').animate({scrollTop: 0}, 1000);
    });
    //anchor top

    // grid-gallery items
    let galleryItems = document.querySelectorAll('.grid-gallery__item');
    let galleryItem;
    let galleryItemCount = 0;
    for (let i = 0; i < galleryItems.length; i++) {
        galleryItem = galleryItems[i];
        galleryItemCount++;
        if (galleryItemCount > 1) {
            galleryItem.parentNode.style.justifyContent = 'space-between';
        }
    }
    // grid-gallery items

    //countdown
    $('.countdown').ClassyCountdown({
        end: $.now() + 500000,
        // whether to display the days/hours/minutes/seconds labels.
        labels: true,

        // object that specifies different language phrases for says/hours/minutes/seconds as well as specific CSS styles.
        labelsOptions: {
            lang: {
                days: 'Дней',
                hours: 'Часов',
                minutes: 'Минут',
                seconds: ''
            },
            style: 'font-size: 14px; text-transform: lowercase;'
        },
        style: {
            element: "",
            textResponsive: .5,
            seconds: {
                gauge: {
                    thickness: .01,
                    bgColor: "rgba(255,255,255,0.05)",
                    fgColor: "#fff"
                },
            },
            transition: ''
        },
    });
    //countdown

    // audio video
    const playStream = document.querySelector('.header .iconfont');
    const streamGif = document.querySelector('.gif__images');
    const audioItems = document.querySelectorAll('.grid-audio__item');
    const videoItems = document.querySelectorAll('.grid-video__item');
    const allVideo = document.querySelectorAll('.video-static');
    const allAudioContent = document.querySelectorAll('.content audio');
    const stream = document.querySelector('.header .stream');
    const podcasts = document.querySelectorAll('.content .audio');

    let originalSourceUrl = stream.getAttribute('src');

    playStream.addEventListener('click', () => {
        if (stream.src) {
            if (stream.paused || stream.ended) {
                //pause all video
                allVideo.forEach(function(item) {
                    item.pause();
                    if (item.currentTime) item.currentTime = 0;
                    item.previousElementSibling.classList.remove('pause-video__link');
                    item.previousElementSibling.style.display = 'block';
                });
                //pause all video

                //pause all audioContent
                allAudioContent.forEach(function (item) {
                    item.pause();
                    if (item.currentTime) item.currentTime = 0;
                    item.previousElementSibling.querySelector('.iconfont').classList.remove('icon-stop');
                });
                //pause all audioContent

                // Change the button to a pause button
                //пересоздаем стрим
                if (!stream.getAttribute('src')) {
                    stream.setAttribute('src', originalSourceUrl);
                    stream.load();
                }
                stream.play();

                streamGif.setAttribute('src', 'assets/images/11.gif');
                document.querySelector('.header .play-pause').classList.remove('icon-play');
                document.querySelector('.header .play-pause').classList.add('icon-stop');
            }
            else {
                // Change the button to a play button
                stream.setAttribute('src', '');
                stream.pause();
                setTimeout(function () {
                    stream.load();
                });
                streamGif.setAttribute('src', 'assets/images/gif-static.png');
                document.querySelector('.header .play-pause').classList.remove('icon-stop');
                document.querySelector('.header .play-pause').classList.add('icon-play');
            }
        }
    });

    for (let i = 0; i < audioItems.length; i++) {
        let audioItem = audioItems[i];
        let btnPlay = audioItem.querySelector('.content .iconfont');

        btnPlay.addEventListener('click', function (e) {
            e.preventDefault();

            let podcastOne = this.parentElement.parentElement.nextElementSibling;

            if (podcastOne.paused || podcastOne.ended) {
                // Change the button to a pause button
                allAudioContent.forEach(function (item) {
                    item.pause();
                    item.previousElementSibling.querySelector('.iconfont').classList.remove('icon-stop');
                });

                //pause audio stream
                stream.pause();
                streamGif.setAttribute('src', 'assets/images/gif-static.png');
                document.querySelector('.header .play-pause').classList.remove('icon-stop');
                document.querySelector('.header .play-pause').classList.add('icon-play');
                //pause audio stream

                //pause all video
                allVideo.forEach(function(item) {
                    item.pause();
                    if (item.currentTime) item.currentTime = 0;
                    item.previousElementSibling.classList.remove('pause-video__link');
                    item.previousElementSibling.style.display = 'block';
                });
                //pause all video

                podcastOne.play();
                this.classList.add('icon-stop');
            }
            else {
                podcastOne.pause();
                this.classList.remove('icon-stop');
                this.classList.add('icon-play');
            }

        });
    }

    for (let i = 0; i < videoItems.length; i++) {
        let videoItem = videoItems[i];
        let btnPlay = videoItem.querySelector('.play-video__link');

        btnPlay.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.nextElementSibling.paused) {

                //pause audio stream
                stream.pause();
                streamGif.setAttribute('src', 'assets/images/gif-static.png');
                document.querySelector('.header .play-pause').classList.remove('icon-stop');
                document.querySelector('.header .play-pause').classList.add('icon-play');
                //pause audio stream

                //pause all video
                allVideo.forEach(function(item) {
                    item.pause();
                    if (item.currentTime) item.currentTime = 0;
                    item.previousElementSibling.classList.remove('pause-video__link');
                    item.previousElementSibling.style.display = 'block';
                });
                //pause all video

                //pause all audioContent
                allAudioContent.forEach(function (item) {
                    item.pause();
                    if (item.currentTime) item.currentTime = 0;
                    item.previousElementSibling.querySelector('.iconfont').classList.remove('icon-stop');
                });
                //pause all audioContent

                this.nextElementSibling.play();
                this.style.display = 'none';
                this.classList.add('pause-video__link');
                //pause all video


            }
            else {
                this.nextElementSibling.pause();
                if (this.nextElementSibling.currentTime) this.nextElementSibling.currentTime = 0;
                this.classList.remove('pause-video__link');
                this.style.display = 'block';
            }
            return false;

        });
    }
    // audio video


})();