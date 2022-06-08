// // creando un array vacio
const carro = JSON.parse(localStorage.getItem('carro')) || [];

// definiendo botones pa añadir
let añadir = document.querySelectorAll(".añadir");

for (let button of añadir) {
    button.addEventListener("click", function(e) {
        e.preventDefault();

        // checkeando si el array del carrito existe o no
        if (JSON.parse(localStorage.getItem("carro")) === null) {
            localStorage.setItem("carro", JSON.stringify([]));
        }
        

        // creando los valores de los obj. para añadirlos al carrito
        let carro = JSON.parse(localStorage.getItem("carro"));
        let id = this.parentNode.parentNode.getAttribute("id");
        let img = this.parentNode.previousElementSibling.getAttribute("src");
        let nombre = this.parentElement.firstElementChild.innerText;
        let precio = Number(this.previousElementSibling.lastElementChild.innerText);

        // chekeando si el producto clickeado existe ya en el carrito o no
        let product = carro.find(pro => pro.id == id);
        if (product === undefined) {
            carro.push({
                id: id,
                img: img,
                nombre: nombre,
                precio: precio,
                cantidad: 1
            });

        } else {
            product.cantidad++;
        }
        
        // añadiendo el producto clickeado al carrito
        localStorage.setItem("carro", JSON.stringify(carro));

        // llamando a la funcion para actualizar la qty de productos
        cantidadProducto();

        Toastify({
            text: "Producto agregado!",
            offset: {
                x: 0, 
                y: 50 
            },
            duration: 1300,
            style: {
                background: "linear-gradient(to left, black, grey)",
            },
        }).showToast();
    });
}

// funcion para cambiar la qty de productos al lado del loguito de carrito
function cantidadProducto() {
    if (localStorage.getItem("carro") === null) {
        document.getElementById("cantidadProducto").innerText = 0;
    } else {
        let carro = JSON.parse(localStorage.getItem("carro"));
        document.getElementById("cantidadProducto").innerText = carro.length;
    }
}

cantidadProducto();

setInterval(cantidadProducto, 1000);

// fetch y api, creando tabla de datos. 

let url = "productos.json";
fetch(url)
    .then(response => response.json())
    .then(data => mostrarDatos(data))
    .catch(error => console.log(error))

const mostrarDatos = (data) => {
    console.log(data)
    let body = ``
    for (let i=0 ; i < data.length; i++) {
        body += `<tr><td> ${data[i].id} </td><td> ${data[i].titulo} </td><td> ${data[i].precio} </td><td> ${data[i].gama} </td></tr>`
    }
    document.getElementById(`datos`).innerHTML = body
}
