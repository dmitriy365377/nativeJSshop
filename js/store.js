class Store {
    constructor() { }
    getProducts() {
        let products = []
        let itemsLocalStorage = localStorage.getItem('elements')
        if (itemsLocalStorage !== null) {
            products = JSON.parse(itemsLocalStorage)
        }
        return products
    }
    putProducts(id) {
        let products = this.getProducts()
        let index = products.indexOf(id)

        if (index === -1) {
            products.push(id)
            var pushProduct = true
        } else {
            products.splice(index, 1)
            var pushProduct = false
        }

        localStorage.setItem('elements', JSON.stringify(products))

        return {
            pushProduct: pushProduct,
            products: products
        }
    }
}

const store = new Store();





         