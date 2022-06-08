// creando un array vacio
// if (localStorage.getItem("carro") === null) {
//     localStorage.setItem("carro", JSON.stringify([]));
// }
// tomando el array de carro del localstorage
// let carro = JSON.parse(localStorage.getItem("carro"));
// 
const carro = JSON.parse(localStorage.getItem('carro')) || [];

// tomando el contenedor principal d mi pag
let products = document.querySelector("#lista-productos");
let table = document.querySelector("table");

// el numero de orden d los productos y el precio total
let orden = 1;
let total = 0;

// creando como se vera la pag del carrito 
if (carro.length === 0) {  // si no hay items entoces
    carroVacio();
} else {  // si hay items entonces
    carro.forEach(product => {
    
        table.classList.remove("d-none");
        // creando las filas de la tabla p el product
        let fila = document.createElement("tr"),
        ordenCelda = document.createElement("th"),
        imgCelda = document.createElement("td"),
        nombreCelda = document.createElement("td"),
        precioCelda = document.createElement("td"),
        cantidadCelda = document.createElement("td"),
        removerCelda = document.createElement("td");

        // creando los elementos q van dentro d las celdas
        let img = document.createElement("img"),
        proCantidad = document.createElement("span"),
        removerBoton = document.createElement("a");
        img.className = "imagenProducto";

        // llenando los elementos con sus datos
        img.setAttribute("src", "../" + product.img);
        proCantidad.innerText = product.cantidad;
        let cantidadStyle = "padding: 0 10px; font-size: 18px; font-weight: bold";
        proCantidad.setAttribute("style", cantidadStyle);
        removerBoton.setAttribute("href", "#");
        removerBoton.innerHTML = "<i class='fas fa-trash-alt'></i>";
        let removerStyle = "font-size: 20px; text-decoration: none; color: #000";
        removerBoton.setAttribute("style", removerStyle);

        // llenando las tablas con los datos d los productos
        [ordenCelda, imgCelda, nombreCelda, precioCelda, cantidadCelda, removerCelda].forEach(Celda => {
            Celda.classList.add("align-middle");
        });
        ordenCelda.setAttribute("scope", "row");
        ordenCelda.innerText = orden++;
        nombreCelda.innerText = product.nombre;
        precioCelda.innerText = `$${product.precio} * ${product.cantidad} = $${(product.precio * product.cantidad).toFixed(2)}`;

        // botones para incrementarar o restar
        let restar = document.createElement("i"),
        incrementar = document.createElement("i");
        restar.className = "fas fa-minus";
        incrementar.className = "fas fa-plus";

        // boton para reiniciar la cantidad del producto

        restar.onclick = function() {
            if (this.nextElementSibling.innerText == 1) {
                carro.splice(carro.indexOf(carro.find(p => p.id === product.id)), 1);
                localStorage.setItem("carro", JSON.stringify(carro));
                this.parentElement.parentElement.remove();
                if (carro.length === 0) {
                    table.style.display = "none";
                    carroVacio();
                }
                total = 0;
                carro.forEach(p => total += p.cantidad * p.precio);
                totalprecio.innerText = `$${total.toFixed(2)}`;
            }else {
                let index = carro.indexOf(carro.find(p => p.id === product.id));
                carro[index].cantidad--;
                proCantidad.innerText = product.cantidad;
                precioCelda.innerText = `$${product.precio} * ${product.cantidad} = $${(product.precio * product.cantidad).toFixed(2)}`;
                total = 0;
                carro.forEach(p => total += p.cantidad * p.precio);
                totalprecio.innerText = `$${total.toFixed(2)}`;
                localStorage.setItem("carro", JSON.stringify(carro));
            }
        }

        // agregando la funcion de incrementar al boton 
        incrementar.onclick = () => {
            let index = carro.indexOf(carro.find(p => p.id === product.id));
            carro[index].cantidad++;
            proCantidad.innerText = product.cantidad;
            precioCelda.innerText = `$${product.precio} * ${product.cantidad} = $${product.precio * product.cantidad}`;
            total = 0;
            carro.forEach(p => total += p.cantidad * p.precio);
            totalprecio.innerText = `$${total.toFixed(2)}`;
            localStorage.setItem("carro", JSON.stringify(carro));
        }

        // agregando la funcion para restar al boton
        removerBoton.onclick = function(e) {
            e.preventDefault();
            carro.splice(carro.indexOf(carro.find(p => p.id === product.id)), 1);
            localStorage.setItem("carro", JSON.stringify(carro));
            this.parentElement.parentElement.remove();
            if (carro.length === 0) {
                table.style.display = "none";
                carroVacio();
            }
            cantidadProducto();
            total = 0;
            carro.forEach(p => total += p.cantidad * p.precio);
            totalprecio.innerText = `$${total.toFixed(2)}`;
        }

        // agregando elementos a los nodos padres
        imgCelda.appendChild(img);
        cantidadCelda.append(restar, proCantidad, incrementar);
        removerCelda.appendChild(removerBoton);
        fila.append(ordenCelda, imgCelda, nombreCelda, precioCelda, cantidadCelda, removerCelda);
        table.lastElementChild.appendChild(fila);

        // media query a full js
        if (screen.width < 578) {
            imgCelda.style.display = "none";
        }
    });

    // agregando la ultima fila de la tabla para mostrar el precio
    let totalprecioFila = document.createElement("tr"),
    totalprecioCelda = document.createElement("td");
    totalprecioCelda.setAttribute("colspan", "6");
    totalprecioCelda.classList.add("text-right");
    carro.forEach(p => total += p.cantidad * p.precio);
    totalprecioCelda.innerHTML = `<span style="font-size: 20px; margin-right: 20px;">Total Precio:</span>`;
    let totalprecio = document.createElement("span");
    totalprecio.style.fontWeight = "bold";
    totalprecio.style.fontSize = "20px";
    totalprecio.innerText = `$${total.toFixed(2)}`;
    totalprecioCelda.appendChild(totalprecio);
    totalprecioFila.appendChild(totalprecioCelda);
    table.appendChild(totalprecioFila);

    // boton pra finalizar compra con libreria

    botonFinalizar = document.createElement("button");
    botonFinalizar.setAttribute('id','finalizarCompra');
    botonFinalizar.innerText = 'Finalizar Compra';
    botonFinalizar.className = 'btn btn-dark';
    let divFinalizar = document.querySelector(".finalizarboton");
    divFinalizar.appendChild(botonFinalizar);

    botonFinalizar.addEventListener('click', ()=> {
        Swal.fire({
            title: 'Perfecto!',
            text: `En unos momentos pasaremos a finalizar tu compra, gracias por confiar. 
            Su total a pagar sera de $${total.toFixed(2)}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        })
    })

    // media query a full js
    if (screen.width < 768) {
        products.classList.remove("container");
        totalprecioCelda.classList.remove("text-right");
        totalprecioCelda.classList.add("text-left");
    }
    
}

// funcion para cambiar la cantidad del producto en el loguito de carrito de compras
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

// funcion por si el carrito esta vacio

function carroVacio() {
    
    table.style.display = "none";
    let message = document.createElement("h1");
    message.style.padding = "200px 0";
    message.style.border = "2px dashed rgb(167, 161, 161)";
    message.style.borderRadius = "10px";
    message.innerHTML = `<p style="text-align: center;">No hay nada en este carrito :( <br /><br /> Volve <a href="../index.html">pa atrás</a> y agregá algo...</p>`;
    products.appendChild(message);

    //  boton para finalizar la compra con libreria 

    botonFinalizar.innerText = 'No se puede finalizar la compra';
    botonFinalizar.className = 'btn btn-light';
    botonFinalizar.addEventListener('click', ()=> {
        Swal.fire({
            title: 'Error al finalizar',
            text: 'No se pudo finalizar, ya que no hay productos en el carrito!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    })
}




