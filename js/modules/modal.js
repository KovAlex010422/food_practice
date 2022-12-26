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

module.exports = modal;