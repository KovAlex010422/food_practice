window.addEventListener('DOMContentLoaded', () => {
    const tabHeaderItems = document.querySelectorAll('.tabheader__item'),
          tabContents = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabContents.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');

        });

        tabHeaderItems.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    }

    function showTabsContent (i = 0) {
        tabContents[i].classList.remove('hide');
        tabContents[i].classList.add('show', 'fade');
        tabHeaderItems[i].classList.add('tabheader__item_active');
    }
     
    hideTabsContent();
    showTabsContent();

    tabParent.addEventListener('click',(e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabHeaderItems.forEach((item, i) => {
                if(target == item) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    // Timer

    const deadline = '2023-01-01';


    function getTimeRemaining (endtime){
        const   differenceTime = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(differenceTime / 1000 / 60 / 60 / 24),
                hours = Math.floor((differenceTime / 1000 / 60 / 60) % 24),
                minutes = Math.floor((differenceTime / 1000 / 60 ) % 60),
                seconds = Math.floor((differenceTime / 1000) % 60);
        return {
            differenceTime,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function setClock(selector, endtime){
        const   timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);
                updateClock();

        function updateClock(){
            const t = getTimeRemaining(endtime);

            days.innerHTML = t.days < 10 ? `0${t.days}` : t.days;;
            hours.innerHTML = t.hours < 10 ? `0${t.hours}` : t.hours;
            minutes.innerHTML = t.minutes < 10 ? `0${t.minutes}` : t.minutes;
            seconds.innerHTML = t.seconds < 10 ? `0${t.seconds}` : t.seconds;
            if(t.differenceTime <= 0) {
                clearInterval(timeInterval);
                document.querySelector(selector).innerHTML = '<h1>Time is over</h1>';
            };

        }
    }
    setClock('.timer', deadline);

    // Modal

    const openModal = document.querySelectorAll('[data-modalOpen]'),
          modalWindow = document.querySelector('.modal')/* ,
          closeModal = document.querySelector('[data-modalClose]') */;

    function modalOpenFunc() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeOut);  
    };

    openModal.forEach(el => el.addEventListener('click', modalOpenFunc));

    function modalCloseFunc(){
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    /* closeModal.addEventListener('click', modalCloseFunc); */

    modalWindow.addEventListener('click', (e)=> {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
            modalCloseFunc();
        }
    });

    document.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape' && modalWindow.classList.contains('show') ){
            modalCloseFunc();
        }
    });

    const modalTimeOut = setTimeout(modalOpenFunc, 11111000);

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpenFunc();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

        // Menu item-----------------------

    class MenuItem {
        constructor(src, alt, subtitle, descript, price, parent){
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descript = descript;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.taransfer = 27;
            this.changeToUah();
        }

        changeToUah(){
            this.price = this.price * this.taransfer;
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                    <div class="menu__item-descr">${this.descript}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    };

    const getMenuItem = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getMenuItem('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    
    // Forms -----------------------------------------------------------

    const   forms = document.querySelectorAll('form'),
            message = {
                'loading': '/img/loading.gif',
                'success': 'Дані відправлено',
                'failure': 'Щось пішло не так'
            };

    forms.forEach(item => {
        bindPostData(item);
    });

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
             return await res.json();
            };        

        function bindPostData(form){
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                    `;

                form.append(statusMessage);
                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));


                postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(()=> {
                    showThanksModal(message.failure);
                    statusMessage.remove();
                }).finally(() => {
                    form.reset();
                });

                
            })
        };

        function showThanksModal(message){
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            modalOpenFunc();

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>x</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

            document.querySelector('.modal').append(thanksModal);

            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                modalCloseFunc();
            }, 4000);
        }

    fetch('http://localhost:3000/menu')
            .then(data => data.json());

// Slider==============================================================

    const sliders = document.querySelectorAll('.offer__slide'),
          prevSlideBtn = document.querySelector('.offer__slider-prev'),
          nextSlideBtn = document.querySelector('.offer__slider-next');
    let curSlideCount = document.querySelector('#current'),
        totalSlidesCount = document.querySelector('#total'),
        sliderIndex = 1;

        totalSlidesCount.textContent = sliders.length < 10 
            ? `0${sliders.length}` 
            : sliders.length;

        showSlider(sliderIndex);
        function showSlider(n){
            if(n > sliders.length){
                sliderIndex = 1;
            }
            if(n < 1){
                sliderIndex = sliders.length;
            }
            sliders.forEach(item => item.style.display = 'none');
            sliders[sliderIndex - 1].style.display = 'block';
            curSlideCount.textContent = sliderIndex < 10 
                ? `0${sliderIndex}` 
                : sliderIndex;
        };

        function plusSlider(n){
            showSlider(sliderIndex+=n);
        };

        prevSlideBtn.addEventListener('click', ()=> plusSlider(-1));
        nextSlideBtn.addEventListener('click', ()=> plusSlider(+1))
/* 
    curSlideCount.textContent = `01`; 
    totalSlidesCount.textContent = `0${sliders.length}`
    
    nextSlideBtn.addEventListener('click', () => {
        curSlideCount.textContent = `0${parseInt(curSlideCount.textContent) + 1}`;
        if(curSlideCount.textContent == sliders.length + 1){
            curSlideCount.textContent = `01`;
        };
        showHideSliders();
    });
    prevSlideBtn.addEventListener('click', () => {
        curSlideCount.textContent = `0${parseInt(curSlideCount.textContent) - 1}`;
        if(curSlideCount.textContent == 0){
            curSlideCount.textContent = `0${sliders.length}`;
        };
        showHideSliders();  
    });

    function showHideSliders(){
        sliders.forEach((el, i) => {
            el.classList.add('hide');
            if(parseInt(curSlideCount.textContent) - 1 == i){
                el.classList.remove('hide');
            };
        });
    };  

    showHideSliders();
 */
});