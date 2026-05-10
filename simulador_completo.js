
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
}

function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let tasaEntero = recuperarInt("tasaInteres");
  if(tasaEntero >= 10 && tasaEntero <= 20){
    mostrarTexto("mensajeTasa",`Tasa configurada correctamente: ${tasaEntero} %`);
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