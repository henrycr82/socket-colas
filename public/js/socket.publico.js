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

// label de public/publico.html
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

//Arreglo de tickets y escitorios
var lblTickets 		= [lblTicket1,lblTicket2,lblTicket3,lblTicket4];
var lblEscritorios 	= [lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4];

//Función para recibir información desde el server
//'estadoActual' es el nombre del evento que se envio desde el cliente
//'data' es el objeto que enviamos desde el server, el cúal contiene el ticket actual y los últimos 4 tickets atendidos
socket.on('estadoActual', function (data)  {
	console.log('Respuesta Server:', data);
	actualizaHTML(data.ultimos4)
}); 

//Función para recibir información desde el server
//on('ultimos4') es el nombre del evento que se envio desde el cliente
//'data' es el objeto que enviamos desde el server, el cúal contiene los últimos 4 tickets atendidos
socket.on('ultimos4', function (data)  {
	
	//para escuchar un audio cuando llegue un nuevo ticket
	var audio = new Audio('audio/new-ticket.mp3');
	audio.play();

	actualizaHTML(data.ultimos4)

}); 

//función para actualizar el HTML de public/publico.html
function actualizaHTML(ultimos4){
	for (var i = 0; i <= ultimos4.length - 1; i++) {		
		lblTickets[i].text('Ticket' + ultimos4[i].numero);
		lblEscritorios[i].text('Escritorio' + ultimos4[i].escritorio);
	}
}