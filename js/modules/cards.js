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

module.exports = cards;