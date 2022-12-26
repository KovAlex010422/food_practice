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

module.exports = tabs;