// io() lo inicializamos en  server/sockets/socket.js
var socket = io()

// label de public/nuevo-ticket.html
var label = $('#lblNuevoTicket');

//Función para establecer un canal de comunicación abierto con el server.
socket.on('connect', function() {
	console.log('Conectado con el servidor');
});

//Función para saber si perdimos comunicación con el server.
 socket.on('disconnect', function() {
	console.log('Perdimos conexión con el servidor');
});


//Función para recibir información desde el server
//'estadoActual' es el nombre del evento que se envio desde el cliente
//'respuesta' es el objeto que enviamos desde el server, el cúal contiene el ticket actual
socket.on('estadoActual', function (respuesta)  {
	//console.log('Respuesta Server:', respuesta);
	label.text(respuesta.actual);
}); 

//Al hacer click en el botón de la pagina public/nuevo-ticket.html
$('button').on('click', function() {	
	 //Función para enviar información al server.
	 //siguienteTicket nombre del evento
	 //null en este caso no enviamos ningun valor
	 //function(siguienteTicket) callback 
	 socket.emit('siguienteTicket', null, function(siguienteTicket) {
	 	//le asignamos el valor de siguienteTicket al label
	 	label.text(siguienteTicket);
	 });

});
