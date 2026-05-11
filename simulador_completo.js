
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");
    document.getElementById("credito").classList.remove("activa");
}

function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let tasaEntero = recuperarInt("tasaInteres");
  if(tasaEntero >= 10 && tasaEntero <= 20){
    mostrarTexto("mensajeTasa",`Tasa configurada correctamente: ${tasaEntero} %`);
    tasaInteres = tasaEntero;
  } else {
        mostrarTexto("mensajeTasa",`La tasa debe estar entre 10 % y 20 %`);
  }    
}

function guardarCliente(){
  let valorCedula = recuperaraTexto("cedula");
  let valorNombre = recuperaraTexto("nombre");
  let valorApellido = recuperaraTexto("apellido");
  let valorIngresos = recuperarInt("ingresos");
  let valorEgresos = recuperarInt("egresos");

  let clienteExistente = buscarCliente(valorCedula);

  if(clienteExistente == null){
  let clienteNuevo = {
    cedula: valorCedula,
    nombre: valorNombre,
    apellido: valorApellido,
    ingresos: valorIngresos,
    egresos: valorEgresos
  };
  clientes.push(clienteNuevo);
  } else {
    clienteExistente.nombre = valorNombre;
    clienteExistente.apellido = valorApellido;
    clienteExistente.ingresos = valorIngresos;
    clienteExistente.egresos = valorEgresos;  }
  pintarClientes();  
  }
 
function pintarClientes(){
  let bodyTabla = document.getElementById("tablaClientes");
  let contenidoTabla = "";
  for(let i = 0; i < clientes.length; i ++){
  let arregloClientes = clientes[i]
  contenidoTabla += 
    `<tr>
          <td> ${arregloClientes.cedula} </td>
          <td> ${arregloClientes.nombre} </td>
          <td> ${arregloClientes.apellido} </td>
          <td> ${arregloClientes.ingresos} </td>
          <td> ${arregloClientes.egresos} </td>
          <td>
            <button onclick="seleccionarCliente('${arregloClientes.cedula}')">Actualizar</button>
            <button>Eliminar</button>
          </td>
        </tr>`
  }
  bodyTabla.innerHTML = contenidoTabla;
}

function buscarCliente(cedula){
    let elementoCliente;
    let clienteEncontrado = null;
    for (let i = 0; i < clientes.length; i ++){
        elementoCliente = clientes [i];
        if(elementoCliente.cedula == cedula){
            clienteEncontrado = elementoCliente;
            break 
        }
    }
    return clienteEncontrado;
}

function seleccionarCliente(cedula){
  let clienteSeleccionado = buscarCliente(cedula);

        mostrarTextoEnCaja("cedula",clienteSeleccionado.cedula);
        mostrarTextoEnCaja("nombre",clienteSeleccionado.nombre);
        mostrarTextoEnCaja("apellido",clienteSeleccionado.apellido);
        mostrarTextoEnCaja("ingresos",clienteSeleccionado.ingresos);
        mostrarTextoEnCaja("egresos",clienteSeleccionado.egresos);
  }

  function limpiar(){
        mostrarTextoEnCaja("cedula","");
        mostrarTextoEnCaja("nombre","");
        mostrarTextoEnCaja("apellido","");
        mostrarTextoEnCaja("ingresos","");
        mostrarTextoEnCaja("egresos","");
        }

  function buscarClienteCredito(){
    let idCajadeTexto = document.getElementById("buscarCedulaCredito");
    let cedulaIngresada = idCajadeTexto.value;
    let resultadoBusqueda = buscarCliente(cedulaIngresada);
    
    let contenedorDatos = document.getElementById("datosClienteCredito");
    
    if(resultadoBusqueda == null){
      contenedorDatos.innerHTML = "Cliente no encontrado";
      } else {
        clienteSeleccionado = resultadoBusqueda;
        contenedorDatos.innerHTML = `
          <h3>Datos del Cliente</h3>
          <p><strong>Cédula: </strong>${resultadoBusqueda.cedula}</p>
          <p><strong>Nombre: </strong>${resultadoBusqueda.nombre}</p>
          <p><strong>Apellido: </strong>${resultadoBusqueda.apellido}</p>
          <p><strong>Ingresos: </strong>$ ${resultadoBusqueda.ingresos}</p>
          <p><strong>Egresos: </strong>$ ${resultadoBusqueda.egresos}</p>
          `;
      }
  }

  function calcularCredito() {

    if(clienteSeleccionado == null){
      alert("Primero debe buscar un cliente por cédula");
      return;
    }

    let ingresos = clienteSeleccionado.ingresos;
    let egresos = clienteSeleccionado.egresos;

    let valorDisponibleFloat = calcularDisponible(ingresos, egresos);

    let capacidadPago = calcularCapacidadPago(valorDisponibleFloat);

    let monto = parseFloat(document.getElementById("montoCredito").value) || 0;
    // Va el cero por si acaso ingresan erróneamente algún dato o lo dejan vacío, lo cual devolvería NaN.

    let plazoAnios = parseInt(document.getElementById("plazoCredito").value) || 0;

    let interesSimple = calcularInteresSimple(monto, tasaInteres, plazoAnios);
    let totalPagar = calcularTotalPagar(monto, interesSimple);
    let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);

    let resultadoCredito = document.getElementById("resultadoCredito");
    let analisisCredito = aprobarCredito(capacidadPago, cuotaMensual);

    resultadoCredito.innerHTML = `
        Capacidad de pago: $ ${capacidadPago.toFixed(2)} <br>
        Total a pagar: $ ${totalPagar.toFixed(2)} <br>
        Cuota mensual: $ ${cuotaMensual.toFixed(2)} <br>
        <strong>Resultado: ${analisisCredito ? "Aprobado" : "Rechazado"}</strong>
    `;

    resultadoCredito.className = analisisCredito ? "aprobado" : "rechazado";
  }