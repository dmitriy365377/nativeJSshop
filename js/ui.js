class UI {
  constructor(containerProducts, containerId, containerSearch, containerBasket) {
    this.init();
    this.container = document.querySelector(containerProducts);
    this.containerId = document.querySelector(containerId)
    this.containerBasket = document.querySelector(containerBasket)
    this.state = {
      pageSize: 8,
      currentPage: 1
    }
  }

  init() {
    this.printBeer();
    this.search();
  }

  search() {
    document.querySelector('#searching').oninput = function () {
      let val = this.value.trim()
      let items = [].slice.call(document.querySelectorAll('.products div'))
      console.log(items)
      if (val != "") {
        items.forEach(function (elem) {
          if (elem.innerText.search(val) == -1) {
            elem.classList.add('hide')
          }
          else {
            elem.classList.remove('hide')
          }
        })
      }
      else {
        items.forEach(function (elem) {
          elem.classList.remove('hide')
        })
      }
    }
  }

  printBeer() {
    beerApi.getBeerList().then(data => {
      const infoBeer = data.infoBeer;
      console.log(infoBeer.length);

      const table = document.querySelector("#table")
      const pagination = document.querySelector('#numbering')


      let pagesCount = Math.ceil(infoBeer.length / this.state.pageSize)
      let items = []
      for (let i = 1; i <= pagesCount; i++) {
        let span = document.createElement("span")
        span.setAttribute("class", "pagination")
        span.innerText = i
        pagination.appendChild(span)
        items.push(span)
      }

      showItems(items[0])

      for (let item of items) {
        item.addEventListener('click', function () {
          showItems(item)
        });
      }

      function showItems(item) {

        const active = document.querySelector('#numbering .pagination.active')
        if (active != null) {
          active.classList.remove("active")
        }

        item.classList.add("active")

        let pageNum = +item.innerHTML;

        let start = (pageNum - 1) * ui.state.pageSize;
        let end = start + ui.state.pageSize;
        let notes = infoBeer.slice(start, end)
        table.innerHTML = "";

        const allProducts = store.getProducts()
        ui.containerBasket.innerText = allProducts.length

        for (let i = 0; i < notes.length; i++) {

          const index = allProducts.indexOf(notes[i].id)
          if (index === -1) {
            var activeClass = ''
            var activeText = 'Добавить в корзину'
          } else {
            var activeClass = 'btn-active'
            var activeText = 'Удалить из корзины'
          }
 
          const item = document.createElement("div")
          item.setAttribute("class", "item")

          const name = document.createElement("div");
          name.setAttribute("class", "name");

          name.innerText = notes[i].name;

          const picture = document.createElement("img");
          picture.setAttribute("class", "img");
          picture.setAttribute("src", notes[i].image_url);

          const description = document.createElement("li");
          description.setAttribute("class", "description");
          description.innerText = notes[i].description;

          const btn = document.createElement("button");
          btn.setAttribute("class", "btn " + activeClass);
          btn.innerText = activeText;
 
          btn.addEventListener('click', function () {
            let id = notes[i].id
            let result = store.putProducts(id)

            ui.containerBasket.innerText = result.products.length;

            if (result.pushProduct) {
              this.classList.add('btn-active')
              this.innerText = 'Удалить из корзины'
            } else {
              this.classList.remove('btn-active')
              this.innerText = 'Добавить в корзину'
            }
          })
 
          item.appendChild(name);
          item.appendChild(picture)
          item.appendChild(description)
          item.appendChild(btn)
          table.appendChild(item)
        }
      }
    });
  }
}

// function checkTheBox() {
//   let checkbox = document.getElementById('checkbox1');
//   localStorage.setItem('checkbox1', checkbox.checked);
// }


// let checked = JSON.parse(localStorage.getItem("checkbox1"));
// document.getElementById("checkbox1").checked = checked;

