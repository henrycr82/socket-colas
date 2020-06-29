// io() lo inicializamos en  server/sockets/socket.js
var socket = io()

//Función para establecer un canal de comunicación abierto con el server.
socket.on('connect', function() {
	console.log('Conectado con el servidor');
});

//Función para saber si perdimos comunicación con el server.
 socket.on('disconnect', function() {
	console.log('Perdimos conexión con el servidor');
});

//Para recuperar los parámetros de búsqueda
var searchParams = new URLSearchParams( window.location.search );
//small de public/escritorio.html
var label = $('small');

//si en la URl no tenemos el parámetro "escritorio"
if (!searchParams.has('escritorio')) {
	window.location = 'index.html';//retornamos al index
	//Lanzamos una excepción de Error. Sería como colocar un return, pero como no estoy dentro de una función uso el hrow new Error
	throw new Error('El escritorio es necesario');
}

//recuperamos el valor del parámetro "escritorio"
var escritorio = searchParams.get('escritorio');

console.log('Escritorio: ', escritorio);

//etiqueta h1 de public/escritorio.html
$('h1').text('Escritorio '+ escritorio);

//Al hacer click en el botón de la pagina public/escritorio.html
$('button').on('click', function() {
	
	 //Función para enviar información al server.
	 //atenderTicket nombre del evento
	 //{ escritorio:escritorio } enviamos el valor del parámetro "escritorio" que nos llega por la url
	 //function(respuesta) callback 
	 socket.emit('atenderTicket', { escritorio:escritorio }, function(respuesta) {
	 	//Si No hay tickets por atender
	 	if (respuesta==='No hay tickets por atender') {
	 		label.text(respuesta);
	 		alert(respuesta);
	 		return;
	 	}
	 	//Si hay Tickets mostramos el Ticket que estamos atendiendo
	 	label.text('Ticket' + respuesta.numero);
	 });

});