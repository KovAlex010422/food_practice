import calculator from './modules/calculator';
import cards from'./modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {

    calculator();
    cards();
    form();
    modal();
    slider();
    tabs();
    timer();
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