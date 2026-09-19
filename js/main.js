// Simulador: cotizador de proteccion solar

let opcion

// CLASE: molde de los productos del catalogo
class Producto {
    constructor(nombre, precioM2, categoria, instalacion) {
        this.nombre = nombre;
        this.precioM2 = precioM2;
        this.categoria = categoria;
        this.instalacion = instalacion;
    }

    // Metodo: calcula el valor segun los metros cuadrados
    cotizar(m2) {
        return this.precioM2 * m2 + this.instalacion;
    }

    // Metodo: modifica el precio del producto
    aplicarDescuento(porcentaje) {
        this.precioM2 = this.precioM2 - (this.precioM2 * porcentaje / 100);
    }
}

// Instancias creadas con new
const toldo = new Producto("Toldo", 1000, "Retractil", 50000);
const vela = new Producto("Vela", 500, "Sombra", 30000);
const cierre = new Producto("Cierre", 200, "Terraza", 40000);

// Catalogo de productos que ofrece la empresa
const catalogoProductos = [toldo, vela, cierre];

// Productos que el cliente va agregando a su cotizacion
const cotizacionCliente = [];

// Pide un numero y valida que sea valido
function pedirNumero(texto) {
    let numero;

    do {
        numero = parseInt(prompt(texto));

        if (isNaN(numero)) {
            alert("Debe ingresar un numero valido");
        }

    } while (isNaN(numero));

    return numero;
}

// Pide una posicion del catalogo y valida que exista
function pedirIndice(lista) {
    let indice;

    do {
        indice = parseInt(prompt("Ingrese la posicion (0 a " + (lista.length - 1) + "):"));

        if (isNaN(indice) || indice < 0 || indice >= lista.length) {
            alert("Esa posicion no existe");
        }

    } while (isNaN(indice) || indice < 0 || indice >= lista.length);

    return indice;
}

// Muestra el catalogo con los datos de cada objeto
function listarCatalogo(lista) {
    let mensaje = "Catalogo de productos:\n\n";

    for (const producto of lista) {
        mensaje = mensaje + lista.indexOf(producto) + ". " + producto.nombre + " (" + producto.categoria + ") - $" + producto.precioM2 + " por m2\n";
        console.log(producto);
    }

    alert(mensaje);
}

// Muestra lo que lleva cotizado el cliente
function listarCotizacion(lista) {

    if (lista.length == 0) {
        alert("Su cotizacion esta vacia");
        return;
    }

    let mensaje = "Mi cotizacion:\n\n";

    for (const item of lista) {
        mensaje = mensaje + "- " + item + "\n";
    }

    mensaje = mensaje + "\nTotal: " + lista.length + " productos";

    alert(mensaje);
    console.log(mensaje);
}

// El cliente decide si agrega el producto cotizado
function agregarACotizacion(producto, metros, valor) {
    const respuesta = prompt("Desea agregar el " + producto.nombre + " a su cotizacion? si/no").toLowerCase();

    if (respuesta == "si") {
        cotizacionCliente.push(producto.nombre + " de " + metros + " m2 - $" + valor);
        alert("Listo, ya tiene " + cotizacionCliente.length + " productos en su cotizacion");
    } else {
        alert("No se agrego el " + producto.nombre);
    }
}

// Cotiza cualquier producto del catalogo
function venderProducto(producto) {
    const metros = pedirNumero("Ingrese los metros cuadrados del " + producto.nombre + ":");
    const valor = producto.cotizar(metros);

    alert("El precio del " + producto.nombre + " es: $" + valor);
    console.log(producto.nombre + " de " + metros + " m2: $" + valor);

    agregarACotizacion(producto, metros, valor);
}

// Quita el ultimo producto de la cotizacion
function quitarUltimo() {

    if (cotizacionCliente.length == 0) {
        alert("Su cotizacion esta vacia");
    } else {
        const eliminado = cotizacionCliente.pop();
        alert("Se ha eliminado el elemento: " + eliminado);
    }
}

// Busca un producto en el catalogo
function buscarProducto(lista) {
    const buscado = prompt("Que producto quiere buscar?").toLowerCase();
    let encontrado = false;

    for (const producto of lista) {
        if (producto.nombre.toLowerCase() == buscado) {
            encontrado = true;
            alert(producto.nombre + " esta en el catalogo, en la posicion " + lista.indexOf(producto));
        }
    }

    if (encontrado == false) {
        alert("Ese producto no esta en el catalogo");
    }
}

// Aplica un descuento al producto elegido
function descontarProducto(lista) {
    listarCatalogo(lista);

    const indice = pedirIndice(lista);
    const porcentaje = pedirNumero("Que porcentaje de descuento quiere aplicar?");
    const elegido = lista[indice];

    elegido.aplicarDescuento(porcentaje);

    alert("El " + elegido.nombre + " ahora vale $" + elegido.precioM2 + " por m2");
    console.log(elegido);
}

function agregarEnPosicion(lista) {
    const indice = pedirIndice(lista);
    const nombre = prompt("Nombre del producto:");
    const precioM2 = pedirNumero("Precio por m2:");
    const categoria = prompt("Categoria del producto:");
    const instalacion = pedirNumero("Valor de la instalacion:");

    const nuevo = new Producto(nombre, precioM2, categoria, instalacion);

    lista.splice(indice, 0, nuevo);
    alert(nombre + " se agrego en la posicion " + indice);
    console.log(nuevo);
}

function eliminarDePosicion(lista) {
    const indice = pedirIndice(lista);
    const eliminado = lista.splice(indice, 1);

    alert("Se ha eliminado el elemento: " + eliminado[0].nombre);
}

function reemplazarEnPosicion(lista) {
    const indice = pedirIndice(lista);
    const nombre = prompt("Nombre del producto:");
    const precioM2 = pedirNumero("Precio por m2:");
    const categoria = prompt("Categoria del producto:");
    const instalacion = pedirNumero("Valor de la instalacion:");

    const reemplazo = new Producto(nombre, precioM2, categoria, instalacion);

    lista.splice(indice, 1, reemplazo);
    alert("La posicion " + indice + " ahora es: " + nombre);
    console.log(reemplazo);
}

// Gestiona el catalogo con splice
function gestionarCatalogo(lista) {
    listarCatalogo(lista);

    const accion = parseInt(prompt("Que desea hacer? \n1. Agregar producto en una posicion \n2. Eliminar producto \n3. Reemplazar producto"));

    switch (accion) {
        case 1:
            agregarEnPosicion(lista);
            break;
        case 2:
            eliminarDePosicion(lista);
            break;
        case 3:
            reemplazarEnPosicion(lista);
            break;
        default:
            alert("Opcion no valida");
    }
}

do {
    opcion = parseInt(prompt("Ingrese una opcion: \n1. Cotizar Toldo \n2. Cotizar Vela \n3. Cotizar Cierre \n4. Ver mi cotizacion \n5. Quitar ultimo producto de mi cotizacion \n6. Ver catalogo \n7. Buscar producto en el catalogo \n8. Gestionar catalogo \n9. Aplicar descuento a un producto \n10. Salir"));

    switch (opcion) {
        case 1:
            venderProducto(toldo);
            break;
        case 2:
            venderProducto(vela);
            break;
        case 3:
            venderProducto(cierre);
            break;
        case 4:
            listarCotizacion(cotizacionCliente);
            break;
        case 5:
            quitarUltimo();
            break;
        case 6:
            listarCatalogo(catalogoProductos);
            break;
        case 7:
            buscarProducto(catalogoProductos);
            break;
        case 8:
            gestionarCatalogo(catalogoProductos);
            break;
        case 9:
            descontarProducto(catalogoProductos);
            break;
        case 10:
            alert("Usted eligio salir");
            break;
        default:
            alert("Opcion no valida");
    }

} while (opcion !== 10);