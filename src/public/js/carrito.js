
//function 

// peticion fetch para recuperar los datos del carrito
const getProducts = () => {
    fetch('http://localhost:3000/api/carrito')
        .then(response => response.json())
        .then(data => {

            if (data.code == 200) {
                cargarCarrito(data.data)
                cargarPrecio(data.data)

            } else {
                alert('Ha ocurrido un error al cargar los productos' + code.message)
            }
        })
}
const main = () => {
    getProducts()
}


// <p class="text-center">categoria : ${productos.categoria}</p>

const cargarCarrito = (cart) => {
    let contenedor = document.querySelector('.carrito')
    let template = '';
    console.log(cart)
    if (cart.length > 0) {
        cart.forEach(productos => {

            template += `
                <div class="grid grid-cols-5 mb-1">
                   <div class="">
                       <img src="${productos.imagen}"
                           class="object-cover rounded-l-lg h-40" alt="">
                   </div>
                   <div class="flex flex-col ">
                       <h3 class="text-xl font-semibold text-center">${productos.nombre}</h3>
                       <a href="#" onclick="eliminarCarrito('${productos.id}')" class="font-semibold hover:text-red-400 text-center">eliminar</a>
                   </div>
                   <div class="flex flex-col content-center">
                       <h3 class="text-center">cantidad </h3>
                       <div class="flex justify-between mx-10"> 
                       <a href="#"class="text-center text-xl font-bold hover:text-green-500"  max="${productos.stock}" onclick="sumar('${productos.id}')">+ </a>
                       <p class="text-center " max="${productos.stock}"  min="0"> ${productos.cantidad}</p>
                       <a href="#"class="text-center text-xl font-bold hover:text-red-500" onclick="restar('${productos.id}')" min="0" max="${productos.stock}">- </a>
                       </div>

                   </div>
                   <div class="flex flex-col">
                       <h3 class="text-center">precio </h3>
                       <p class="text-center">$ ${productos.precio}</p>
                   </div>
                   <div class="flex flex-col">
                       <h3 class="text-center">total por producto </h3>
                       <p class="text-center">$ ${productos.precio * productos.cantidad}</p>
                   </div>
               
               </div>`
        });
        contenedor.innerHTML = template
    } else {
        contenedor.innerHTML = template = `  
        <div">
            <h3 class="text-center">Carrito vacio</h3>
        </div>`
    }

}
const cargarPrecio = (productos) => {
    let compra = document.querySelector('.comprar')
    let templatee = '';
    if (productos.length > 0) {
        let totalCompra = productos.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.cantidad * currentValue.precio), 0
        );
        let cantidadTotal = productos.reduce(
            (accumulator, currentValue) => (accumulator += currentValue.cantidad), 0
        );
        templatee = `
         
                <h3 class="text-3xl font-semibold text-center text-white mt-2">detalle compra</h3>
            <div class="grid grid-cols-3 mt-10 p-2 ">
                <p class=" font-semibold text-white col-span-2">cantidad de productos : </p>
                <p class="text-center font-semibold text-white">${cantidadTotal}</p>
            </div>
            <div class="grid grid-cols-3 mt-3 p-2 ">
                <p class=" font-semibold text-white col-span-2">total a comprar : </p>
                <p class="text-center font-semibold text-white">$${totalCompra}</p>
            </div>
    
            <div class="grid grid-cols-1 p-5">
                <a href="" onclick="comprar()" class="w-full py-3 bg-green-400 hover:bg-green-500 rounded text-white text-center text-xl">Comprar</a>
            </div>
         `

        compra.innerHTML = templatee
    } else {
        compra.innerHTML = templatee = `  
        <div">
            <h3 class="text-center text-white">debes realizar una compra</h3>
        </div>`
    }

}
//modificar cantiadad
const restar = (id) => {

    fetch("/api/carrito/" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            getProducts()
            location.reload();
        })
        .catch(error => {
            alert(error)
        });

}

const eliminarCarrito = (id) => {
    fetch("/api/v1/carrito/" + id, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(result => {
            alert(result.message);
            getProducts()
            location.reload();
        })
        .catch(error => {
            alert(error)
        });
}
const sumar = (id) => {
    let url = "http://localhost:3000/api/carrito/" + id;
    console.log(url)
    fetch(url, {
        method: "GET",
        redirect : 'manual'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.code == 400 || data.code == 500) {
                alert("Se ha generado el siguiente problema: " + data.message)
            } else {

                location.reload()

            }
        }).catch(error => console.log(error))
}


const comprar = () => {
    let id = 1;
    let client = {
        id: id
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch("http://localhost:3000/api/ventas", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(client),
        redirect : 'manual'
    })
        .then(response =>
         console.log(response))
            return response.json
        .then(data => {
            if (data.code == 500) {
                // errorCompra()
                // main()
            } else {
                // mensaje();
                // main();
            }
        })
        .catch(error => {
            console.log(error)
            alert("error al cargar los productos")
        })
}
const mensaje = () => {
    let mensaje = document.querySelector('.mensaje')
    let template = ''

    setTimeout(() => {
        template = `<div class="container mx-auto bg-pink-600 p-4">
                        <p class="text-center text-2xl text-white font-bold">Compra realizada con exito</p>
                    </div>`
        mensaje.innerHTML = template;
    }, 4000);
}
const errorCompra = () => {
    let mensaje = document.querySelector('.mensaje')
    let template = ''

    setTimeout(() => {
        template = `<div class="container mx-auto bg-red-600 p-4">
                            <p class="text-center text-2xl text-white font-bold">ha ocurrido un error</p>
                    </div>`
        mensaje.innerHTML = template;
    }, 4000);
}
main()