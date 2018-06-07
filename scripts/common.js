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

    // audio stream
    $(function(){
        let musicArr = $('.audio');
        let stream = $('audio')[0];
        let podcastAudioLeft = $('audio')[1];
        let podcastAudioRight = $('audio')[2];

        $('.play-pause').on('click', function() {
            if ($(this).parent().parent().attr('class') === $('.player').attr('class')) {
                if (stream.paused) {
                    stream.play();
                    stream.currentTimer = 0;
                    $('.player').next().find('img').attr('src', 'assets/images/11.gif');

                    podcastAudioRight.pause();
                    podcastAudioLeft.pause();
                    $('.play-pause').removeClass('icon-stop');
                    $('.play-pause').addClass('icon-play');

                    $(this).removeClass('icon-play');
                    $(this).addClass('icon-stop');
                }
                else {
                    stream.pause();
                    $(this).removeClass('icon-stop');
                    $(this).addClass('icon-play');
                    $('.player').next().find('img').attr('src', 'assets/images/gif-static.png');
                }
            } else if ($(this).parent().parent().attr('class') === $('.player-one-left').attr('class')) {
                if (podcastAudioLeft.paused) {
                    podcastAudioLeft.play();

                    podcastAudioRight.pause();
                    stream.pause();
                    $('.play-pause').removeClass('icon-stop');
                    $('.play-pause').addClass('icon-play');

                    $(this).removeClass('icon-play');
                    $(this).addClass('icon-stop');
                    $('.player').next().find('img').attr('src', 'assets/images/gif-static.png');
                }
                else {
                    podcastAudioLeft.pause();
                    $(this).removeClass('icon-stop');
                    $(this).addClass('icon-play');
                }
            } else if ($(this).parent().parent().attr('class') === $('.player-one-right').attr('class')) {
                if (podcastAudioRight.paused) {
                    podcastAudioRight.play();

                    podcastAudioLeft.pause();
                    stream.pause();
                    $('.play-pause').removeClass('icon-stop');
                    $('.play-pause').addClass('icon-play');

                    $(this).removeClass('icon-play');
                    $(this).addClass('icon-stop');
                    $('.player').next().find('img').attr('src', 'assets/images/gif-static.png');
                }
                else {
                    podcastAudioRight.pause();
                    $(this).removeClass('icon-stop');
                    $(this).addClass('icon-play');
                }
            }
        });
    });
    // audio stream

    // video stream
    let videoItems = document.querySelectorAll('.grid-video__item');



    for (let i = 0; i < videoItems.length; i++) {
        let videoItem = videoItems[i];
        let btnPlay = videoItem.querySelector('.play-video__link');

        btnPlay.addEventListener('click', function(e) {
            e.preventDefault();

            if(this.nextElementSibling.paused) {
                this.nextElementSibling.play();
                this.nextElementSibling.currentTime = 0;
                this.style.display = 'none';
                this.classList.add('pause-video__link');
            }
            else {
                this.nextElementSibling.pause();
                this.classList.remove('pause-video__link');
                this.style.display = 'block';
            }
            return false;

        });
    }



    // video stream


})();