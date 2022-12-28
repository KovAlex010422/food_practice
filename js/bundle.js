/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator(){
    
    const calcResult = document.querySelector('.calculating__result span');


    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375)
    }

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            calcResult.textContent = '______';
            return;
        }
        if(sex === 'female'){
            calcResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else{
            calcResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(selector, ativeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach( el => {
            el.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }
    
                elements.forEach(el => {
                    el.classList.remove(ativeClass);
                });
    
                e.target.classList.add(ativeClass);
                console.log(ratio, sex);
                calcTotal();
            })
        })
    }

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            };

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
        calcTotal();
        });
    }

    function initLocalSetting(selector, activeClass){
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if(element.getAttribute('id') === localStorage.getItem('sex')){
                element.classList.add(activeClass);
            } 
            
            if(element.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                element.classList.add(activeClass);
            }
        })
    }

    calcTotal();
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
    
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
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function form(){
    
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

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(){
    
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

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
    
    const sliders = document.querySelectorAll('.offer__slide'),
          slidersBlock = document.querySelector('.offer__slider'),
          prevSlideBtn = document.querySelector('.offer__slider-prev'),
          nextSlideBtn = document.querySelector('.offer__slider-next'),
          curSlideCount = document.querySelector('#current'),
          totalSlidesCount = document.querySelector('#total'),
          slidersWrap = document.querySelector('.offer__slider-wrapper'),
          slidersLine = document.querySelector('.offer__slider-line'),
          width = window.getComputedStyle(slidersWrap).width,
          carousel = document.createElement('ol'),
          dotsArr = [];

    let sliderIndex = 1,
        offset = 0;

    slidersBlock.style.position = 'relative';
    carousel.classList.add('carousel-indicators');

    slidersBlock.append(carousel);

    for(let i=0; i < sliders.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if(i == 0){
            dot.style.opacity = 1;
        };
        carousel.append(dot);
        dotsArr.push(dot);
    };

    slidersLine.style.width = 100 * sliders.length + '%';
    slidersLine.style.display = 'flex';
    slidersLine.style.transition = '1s all';
    slidersWrap.style.overflow = 'hidden';
    
    sliders.forEach(slide => {
        slide.style.width = slidersWrap;
    });

    setZeroBeforeNum();

    nextSlideBtn.addEventListener('click', () => {
        if(offset == -(sliders.length - 1) * +(width.slice(0, width.length -2))) {
            offset = 0;
        } else {
            offset-= +(width.slice(0, width.length -2));
            console.log(offset);
        }
        slidersLine.style.transform = `translateX(${offset}px)`;

        sliderIndex == sliders.length ? sliderIndex = 1 : sliderIndex++;
        curSlideCount.textContent = sliderIndex < 10 ? `0${sliderIndex}` : sliderIndex;

        dotOpacity();
    });

    prevSlideBtn.addEventListener('click', () => {
        if(offset == 0){
            offset = -(sliders.length - 1 ) * +(width.slice(0, width.length -2))
        } else {
            offset += +(width.slice(0, width.length -2));
        }
        slidersLine.style.transform = `translateX(${offset}px)`;

        sliderIndex == 1 ? sliderIndex = sliders.length : sliderIndex--;
        curSlideCount.textContent = sliderIndex < 10 ? `0${sliderIndex}` : sliderIndex;

        dotOpacity();
    });

    function setZeroBeforeNum(){
        if(sliders.length < 10){
            totalSlidesCount.textContent = `0${sliders.length}`;
            curSlideCount.textContent = `0${sliderIndex}`;
        } else {
            totalSlidesCount.textContent = sliders.length;
            curSlideCount.textContent = sliderIndex;
        };
    };

    function dotOpacity(){
        dotsArr.forEach(dot => dot.style.opacity = '0.5');
        dotsArr[sliderIndex - 1].style.opacity = 1;
    }

    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            slidersLine.style.transform = `translateX(-${offset}px)`;
            dotOpacity();
            setZeroBeforeNum();

        });
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
    
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

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(){
    
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

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
/*      First variant

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
        nextSlideBtn.addEventListener('click', ()=> plusSlider(+1)); */
/* 
        My code
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
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map