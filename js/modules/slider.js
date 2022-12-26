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

module.exports = slider;