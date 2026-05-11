function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
    function recuperarInt(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorEntero=parseInt(valorCaja);
        return valorEntero;
    }
    function recuperarFloat(idComponente){
        let valorCaja=recuperaraTexto(idComponente);
        let valorFlotante=parseFloat(valorCaja);
        return valorFlotante;
    }
    function mostrarTexto(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.innerText=mensaje;
    }
    function mostrarTextoEnCaja(idComponente,mensaje){
        let componente;
        componente=document.getElementById(idComponente);
        componente.value=mensaje;
    }
    
    function mostrarImagen(idComponente,rutaImagen){
        let componente;
        componente=document.getElementById(idComponente);
        componente.src = rutaImagen;
    }

    function calcularDisponible(ingresos, egresos) {
    let valorDisponible = ingresos - egresos;
    return valorDisponible <= 0 ? 0 : valorDisponible;
    }

    function calcularCapacidadPago(montoDisponible) {
    return montoDisponible / 2;
    }

    function calcularInteresSimple(monto, tasa, plazoAnios) {
        return monto * (tasa / 100) * plazoAnios;
    }

    function calcularTotalPagar(monto, interes) {
        let impuestoSolca = 0; //Al usar las funciones del ejercicio anterior,
        // se incluía los $ 100 de Solca. Sigo llamando a esta función desde html, 
        // aunque con valor cero, en caso de que en la parte 3 sí pidan este valor,
        //ahí solo le cambiaré a 100 o lo que se pida.
        
        return monto + interes + impuestoSolca;
    }

    function calcularCuotaMensual(totalPagar, plazoAnios) {
        return totalPagar / (plazoAnios * 12);
    }

    function aprobarCredito(capacidadPago, cuotaMensual) {
        return capacidadPago > cuotaMensual;
    }