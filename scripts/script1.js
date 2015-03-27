$("#btnInicioSesion" ).click(function() {
	var url = "";
	var usuario = $("#userName").val();
	var clave = $("#userPassword").val();
	$.post(url,{user:usuario,password:clave})
	.done(function(data){
		if(usuario == "usuario" && clave=="usuario"){
			window.location='#inicioUsuario';
			//$(location).attr(‘href’,"#inicioUsuario");
		}else if(usuario = "proveedor" && clave=="proveedor"){
			window.location='#inicioProveedor';
		}
		else{
			alert("Usuario no registrado");
		}
	})
	.fail(function(){
		alert("fallo en la peticion");
	});
});



$("#solicitarServicio").click(function(){
	var longitud, latitud;
	
	navigator.geolocation.getCurrentPosition(function(pos){
		var crd = pos.coords;
		longitud = crd.longitude;
		latitud = crd.latitude;
		console.log(latitud);
	});
	var texto = '<div class="page-header"><h1>Solicitar Servicio</h1></div><form method="POST"><div class="form-group"><label for="nombreCliente">Nombre</label><input type="text" class="form-control" placeholder="Nombre" id="nombreCliente" name="nombreCliente"/></div><div class="form-group"><label for="descripcionCliente">Descripcion</label><textarea class="form-control" rows="4" placeholder="Descripcion del servicio" id="descripcionCliente" name="descripcionCliente"></textarea></div><div class="form-group"><label for="tagsCliente">Tags</label><input type="text" data-role="tagsinput" class="form-control" rows="3" placeholder="Tags del servicio" id="tagsCliente" name="tagsCliente"/></div><input type=hidden" value="'+latitud+'" name="latitudCliente"/><input type="hidden" value="'+longitud+'" name="longitudCliente"/><div class="form-group"><button type="submit" class="btn btn-primary btn-lg">Solicitar</button></div></form>';
	$("#contenidoCliente").append(texto);
	$("#solicitarServicio").off('click');
});

$("#publicarServicio").click(function(){
	var longitud, latitud;
	navigator.geolocation.getcurrentposition(function(pos){
		longitud = pos.longitude;
		latitud = pos.latitude;
	});
	navigator.geolocation.getcurrentposition;
	var texto = '<div class="page-header"><h1>Publicar Servicio</h1></div><form method="POST"><div class="form-group"><label for="nombreProveedor">Nombre</label><input type="text" class="form-control" placeholder="Nombre" id="nombreProveedor" name="nombreProveedor"/></div><div class="form-group"><label for="descripcionProveedor">Descripcion</label><textarea class="form-control" rows="4" placeholder="Descripcion del servicio" id="descripcionProveedor" name="descripcionProveedor"></textarea></div><div class=form-group"><label for="tagsProveedor">Tags</label><input type="text" data-role="tagsinput" class="form-control" rows="3" placeholder="Tags del servicio" id="tagsProveedor" name="tagsProveedor"/></div><input type="hidden" value="'+latitud+'" name="latitudProveedor"/><input type="hidden" value="'+longitud+'" name="longitudProveedor"/><div class="form-group"><button type="submit" class="btn btn-primary btn-lg">Publicar</button></div></form>';
	$("#contenidoProveedor").append(texto);
	$("#publicarServicio").off('click');
});