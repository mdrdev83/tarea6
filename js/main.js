// Simulador: cotizador de proteccion solar

let opcion

const precioToldo = 1000;
const precioVela = 500;
const precioCierre = 200;

// Catalogo de productos que ofrece la empresa
const catalogoProductos = ["Toldo", "Vela", "Cierre", "Pergola", "Cortina"];

// Productos que el cliente va agregando a su cotizacion
const cotizacionCliente = [];

// Funcion con for...of: sirve para listar cualquiera de las dos listas
function listarProductos(lista, titulo) {

    if (lista.length == 0) {
        alert(titulo + " esta vacia");
        return;
    }

    let mensaje = titulo + ":\n";

    for (const producto of lista) {
        mensaje = mensaje + "- " + producto + "\n";
    }

    mensaje = mensaje + "\nTotal: " + lista.length + " productos";

    alert(mensaje);
}

// Funcion: pide la medida, valida que sea numero y la retorna
function pedirMedida(producto) {
    let metros;

    do {
        metros = parseInt(prompt("Ingrese los metros cuadrados del " + producto + ":"));

        if (isNaN(metros)) {
            alert("Debe ingresar un numero valido");
        }

    } while (isNaN(metros));

    return metros;
}

// Funcion: el cliente decide si agrega el producto cotizado
function agregaraCotizacion(producto, metros, valor) {
    const respuesta = prompt("Desea agregar el " + producto + " a su cotizacion? si/no").toLowerCase();

    if (respuesta == "si") {
        cotizacionCliente.push(producto + " de " + metros + " m2 - $" + valor);
        alert("Listo, ya tiene " + cotizacionCliente.length + " productos en su cotizacion");
    } else {
        alert("No se agrego el " + producto);
    }
}

// Funciones flecha: calculan el valor de cada producto
const cotizarToldo = (m2, precio) => m2 * precio + 50000;
const cotizarVela = (m2, precio) => m2 * precio;
const cotizarCierre = (m2, precio) => m2 * precio * 0.9;

do {
    opcion = parseInt(prompt("Ingrese una opcion: \n1. Cotizar Toldo \n2. Cotizar Vela \n3. Cotizar Cierre \n4. Ver mi cotizacion \n5. Quitar ultimo producto de mi cotizacion \n6. Ver catalogo \n7. Buscar producto en el catalogo \n8. Reemplazar producto del catalogo \n9. Salir"));

    switch (opcion) {
        case 1:
            let m2Toldo = pedirMedida("Toldo");
            let cotizacionToldo = cotizarToldo(m2Toldo, precioToldo);
            alert("El precio del Toldo es: " + cotizacionToldo);
            agregaraCotizacion("Toldo", m2Toldo, cotizacionToldo);
            break;
        case 2:
            let m2Vela = pedirMedida("Vela");
            let cotizacionVela = cotizarVela(m2Vela, precioVela);
            alert("El precio de la Vela es: " + cotizacionVela);
            agregaraCotizacion("Vela", m2Vela, cotizacionVela);
            break;
        case 3:
            let m2Cierre = pedirMedida("Cierre");
            let cotizacionCierre = cotizarCierre(m2Cierre, precioCierre);
            alert("El precio del Cierre es: " + cotizacionCierre);
            agregaraCotizacion("Cierre", m2Cierre, cotizacionCierre);
            break;
        case 4:
            listarProductos(cotizacionCliente, "Mi cotizacion");
            break;
        case 5:
            // Manipulacion de extremos: pop
            if (cotizacionCliente.length == 0) {
                alert("Su cotizacion esta vacia");
            } else {
                const eliminado = cotizacionCliente.pop();
                alert("Se ha eliminado el elemento: " + eliminado);
            }
            break;
        case 6:
            listarProductos(catalogoProductos, "Catalogo de productos");
            break;
        case 7:
            // Busqueda y validacion
            const buscado = prompt("Que producto quiere buscar?");

            if (catalogoProductos.includes(buscado)) {
                const posicion = catalogoProductos.indexOf(buscado);
                alert(buscado + " esta en el catalogo, en la posicion " + posicion);
            } else {
                alert(buscado + " no esta en el catalogo");
            }
            break;
        case 8:
            // Actualizacion por indice: splice
            const indice = parseInt(prompt("Que posicion del catalogo quiere reemplazar? (0 a " + (catalogoProductos.length - 1) + ")"));

            if (isNaN(indice) || indice < 0 || indice >= catalogoProductos.length) {
                alert("Esa posicion no existe en el catalogo");
            } else {
                const reemplazo = prompt("Por que producto lo quiere reemplazar?");
                catalogoProductos.splice(indice, 1, reemplazo);
                alert("La posicion " + indice + " ahora es: " + reemplazo);
            }
            break;
        case 9:
            alert("Usted eligio salir");
            break;
        default:
            alert("Opcion no valida");
    }

} while (opcion !== 9);