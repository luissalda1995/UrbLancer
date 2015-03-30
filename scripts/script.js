$("#btnInicioSesion").click(function() {
// Función llamada al presionar el botón de inicio de sesión.
	var url = "http://localhost:3000/login";
	var usuario = $("#userName").val();
	var clave = $("#userPassword").val();
	// Obtener los valores de los campos mediante JSON.
	$.post(url, { user : usuario, password : clave })
	.done(function(data) {
	// No importa realmente que es lo que retorne este POST, vamos a trabajar
	// por ahora con unos valores de usuario y clave quemados en el código.
	// 'data' es el objeto retornado por el servidor luego del POST, muy útil
	// para posteriormente revisar el estado del request, preferiblemente se
	// espera que este retorne un cookie o token o algo que permita identificar
	// a la persona que se ha loggeado.
		if(usuario == "usuario" && clave == "usuario") {
		// Ir al inicio del usuario
			window.location='#inicioUsuario';
		}
		else if(usuario == "proveedor" && clave == "proveedor") {
		// Ir al inicio del proveedor
			window.location='#inicioProveedor';
		}
		else{
		// Avisar que la persona no está registrada
			alert("Usuario no registrado");
		}
	})
	.fail(function(){
	// Si hay un fallo en el POST.
		alert("fallo en la peticion");
	});
});

function obtenerMatches(data) {
// Luego de mandar la solicitud al servidor, este me retorna unos proveedores que potencial-
// mente coinciden con mi solicitud dada.
	$("#contenidoCliente").empty();
	for(var i = 0; i < data.results.length; i++) {
		$("#contenidoCliente").append("<p>" + JSON.stringify(data.results[i]) + "</p><br />");
	}
}

function handlerSolicitudServicio() {
// Esta funcion configura el handler del botón de solicitud de servicio, puesto que el botón
// se crea dinámicamente, entonces es necesario configurar su uso luego de su creación, no
// al momento de cargar la página inicialmente.
	$("#btnSolicitarServicio").click(function() {
		var JSON_Solicitud = {};
		JSON_Solicitud["nombre"] =      document.getElementById("nombreCliente").value;
		// Preferiblemente ingresarlo luego desde base de datos con un cookie o algo.
		JSON_Solicitud["descripcion"] = document.getElementById("descripcionCliente").value;
		JSON_Solicitud["tags"] =        document.getElementById("tagsCliente").value;
		// TODO: Posteriormente agregar campo con el monto posiblemente preferido a pagar. 
		JSON_Solicitud["latitud"] =     document.getElementById("latitudCliente").value;	
		JSON_Solicitud["longitud"] =    document.getElementById("longitudCliente").value;
		//alert("El POST a realizar con la solicitud es:\n" + JSON.stringify(JSON_Solicitud));
		var url = "http://localhost:3000/request"
		$.post(url, JSON_Solicitud).done(function (data) {
		// Enviar el JSON con la solicitud al servidor mediante un request POST.
			obtenerMatches(data);
		});
	});
}

$("#solicitarServicio").click(function() {
// Cuando seleccionamos la tab 'solicitar servicio' del usuario
	var longitud, latitud;
	navigator.geolocation.getCurrentPosition(function(pos){
		var crd = pos.coords;
		longitud = crd.longitude;
		latitud = crd.latitude;
	});
	// Obtener la geolocalización del navegador
	var texto =
	'<div class="page-header">' +
		'<h1>Solicitar Servicio</h1>' +
	'</div>' +
	'<form method="POST">' +
		'<div class="form-group">' +
			'<label for="nombreCliente">Nombre</label>' +
			'<input type="text" class="form-control" placeholder="Nombre" id="nombreCliente" name="nombreCliente"/>' +
			// El usuario ingresa su nombre
		'</div>' +
		'<div class="form-group">' +
			'<label for="descripcionCliente">Descripcion</label>' +
			'<textarea class="form-control" rows="4" placeholder="Descripcion del servicio" id="descripcionCliente" name="descripcionCliente">' +
			'</textarea>' +
			// El usuario ingresa una descripción de lo necesario
		'</div>' +
		'<div class="form-group">' +
			'<label for="tagsCliente">Tags: </label>' +
			'<input type="text" data-role="tagsinput" class="form-control" rows="3" placeholder="cerrajería, plomería, etc" id="tagsCliente" name="tagsCliente"/>' +
			// El usuario ingresa una lista de tags potencialmente relacionados a sus necesidades
		'</div>' +
		'<input type="hidden" value="' + latitud + '" name="latitudCliente" id="latitudCliente"/>' +
		'<input type="hidden" value="' + longitud + '" name="longitudCliente" id="longitudCliente"/>' +
		// El navegador ingresa por debajo las coordenadas del usuario
        '<a href="#inicioUsuario" class="btn" id="btnSolicitarServicio">Solicitar Servicio<i class="fa fa-sign-in"></i></a>' +
	'</form>';
	$("#contenidoCliente").append(texto);
	$("#solicitarServicio").off('click');
	// Con esto, el usuario va a hacer un submit del servicio que necesita, con toda la información necesaria.
	handlerSolicitudServicio();
	// Como el boton fue creado dinámicamente, se necesita configurar su handler luego de su creación.
});


function handlerOfrecerServicio() {

}

$("#ofrecerServicio").click(function() {
// Cuando seleccionamos la tab 'ofrecer servicio' del proveedor
	var longitud, latitud;
	navigator.geolocation.getcurrentposition(function(pos){
		longitud = pos.longitude;
		latitud = pos.latitude;
	});
	navigator.geolocation.getcurrentposition;
	var texto = 
	'<div class="page-header">' +
	'<h1>Solicitudes Servicio</h1>' +
	'</div>' +
	'<form method="POST">' +
	    '<div class="form-group">' + 
	        '<label for="nombreProveedor">Nombre</label>' +
	        '<input type="text" class="form-control" placeholder="Nombre" id="nombreProveedor" name="nombreProveedor"/>' +
	        // El usuario ingresa su nombre
	    '</div>' +
		'<div class="form-group">' +
			'<label for="descripcionProveedor">Descripcion</label>' +
			'<textarea class="form-control" rows="4" placeholder="Descripcion del servicio" id="descripcionProveedor" name="descripcionProveedor">' +
			'</textarea>' +
			// El proveedor ingresa una descripción de lo que este provee
		'</div>' +
		'<div class=form-group">' +
			'<label for="tagsProveedor">Tags</label>' +
			'<input type="text" data-role="tagsinput" class="form-control" rows="3" placeholder="Tags del servicio" id="tagsProveedor" name="tagsProveedor"/>' +
			// El usuario ingresa una lista de tags relacionados a su servicio
		'</div>'
		'<input type="hidden" value="' + latitud + '" name="latitudProveedor"/>' +
		'<input type="hidden" value="' + longitud + '" name="longitudProveedor"/>' + 
		// El navegador ingresa por debajo las coordenadas del proveedor
        '<span class="group-btn">' +
            '<a href="#inicioProveedor" class="btn btn-primary btn-lg" id="btnOfrecerServicio">Ofrecer Servicio<i class="fa fa-sign-in"></i></a>' +
        '</span>' +
	'</form>';
	$("#contenidoProveedor").append(texto);
	$("#ofrecerServicio").off('click');
});