const calcularCosto = (curso) => {
    let precio = 0
    if (curso.toLowerCase() == "java") {
        precio = 1200
    } else if (curso.toLowerCase() == "php"){
        precio = 800
    } else if (curso.toLowerCase() == ".net"){
        precio = 1500
    }
    return precio
}

const verificarDescuento = (pago) => {
    let descuento = 0
    if(pago.toLowerCase() == "efectivo") {
        descuento = 10
    }
    return descuento
}

module.exports = {
    calcularCosto,
    verificarDescuento
}