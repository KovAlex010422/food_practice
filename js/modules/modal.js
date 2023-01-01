function modalCloseFunc(modalSelektor){
    const modal = document.querySelector(modalSelektor);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modalOpenFunc(modalSelektor, modalTimerId) {
    const modal = document.querySelector(modalSelektor);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId){
        clearInterval(modalTimerId);  
    }
};

function modal(trigerSelektor, modalSelektor, modalTimerId){
    
    const openModal = document.querySelectorAll(trigerSelektor),
          modalWindow = document.querySelector(modalSelektor)/* ,
          closeModal = document.querySelector('[data-modalClose]') */;


    openModal.forEach(el => el.addEventListener('click', () => modalOpenFunc(modalSelektor, modalTimerId)));

    modalWindow.addEventListener('click', (e)=> {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == ''){
            modalCloseFunc(modalSelektor);
        }
    });

    document.addEventListener('keydown', (e)=> {
        if(e.code === 'Escape' && modalWindow.classList.contains('show') ){
            modalCloseFunc(modalSelektor);
        }
    });

    function showModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpenFunc(modalSelektor, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

};

export default modal;
export {modalOpenFunc, modalCloseFunc}