class ServiceContainer {
    constructor(containerBasket, containerCart) {
        this.containerBasket = document.querySelector(containerBasket)
        this.containerCart = document.querySelector(containerCart)
        this.create()
        this.state = {
            overlayShown: false,
            scrollPosition: 0
        }
    }

    create() {

        const productCardPromise = this.getProductsCart();

        productCardPromise
            .then(productCard => {
                this.containerBasket.addEventListener('click', function () {

                    seriveContainer.showOverlay(productCard)

                })
            });
    }

    showOverlay(productCard) {

        seriveContainer.containerCart.style.display = 'flex'

        const wrapper = document.createElement("slot");
 
        for (let i = 0; i < productCard.length; i++) {

            const newIndex = productCard.indexOf(productCard[i].id)
            
            if (newIndex) {
                var activeClass = 'btn-active'
                var activeText = 'Удалить из корзины'
            }

            const item = document.createElement("div");
            item.setAttribute("class", "item");

            const name = document.createElement("div");
            name.setAttribute("class", "name");
            name.innerText = productCard[i].name;

            const picture = document.createElement("img");
            picture.setAttribute("class", "img");
            picture.setAttribute("src", productCard[i].image_url);

            const description = document.createElement("div");
            description.setAttribute("class", "description");
            description.innerText = productCard[i].description;

            const btn = document.createElement("button")
            btn.setAttribute("class", "btn " + activeClass);
            btn.innerText = activeText;

            btn.addEventListener('click', function () {
                let id = productCard[i].id
                let result = store.putProducts(id)

                if (result.pushProduct) {
                    this.classList.add('btn-active')
                    this.innerText = 'Удалить из корзины'
                }
            })

            item.appendChild(name);
            item.appendChild(picture);
            item.appendChild(description);
            item.appendChild(btn);
            wrapper.appendChild(item);
        }
        const close = document.createElement("div")
        close.setAttribute("class", "cart-close")
        close.addEventListener('click', function () {
            seriveContainer.containerCart.innerHTML = ""
            seriveContainer.containerCart.style.display = 'none'
        })
        seriveContainer.containerCart.appendChild(wrapper);
        seriveContainer.containerCart.appendChild(close);
    }

    getProductsCart() {
        return beerApi.getBeerList()
            .then(data => {
                const infoBeer = data.infoBeer;
                console.log(data);
                let produts = store.getProducts()
                let productCart = []
                for (let i = 0; i < infoBeer.length; i++) {
                    if (produts.indexOf(infoBeer[i].id) !== -1) {
                        productCart.push(infoBeer[i])
                    }
                }
                return productCart;
            }) 
    }
}

