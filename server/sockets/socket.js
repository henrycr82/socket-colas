//Asignamos por Destructuring 
const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control.js');

//Instanciamos la clase TicketControl
const ticketControl = new TicketControl();

//Verificar conexión con el cliente
//client información del usuario(cliente) que se conecto
io.on('connection', (client) => {
	
	//Función para recibir información desde el cliente public/nuevo-ticket.html public/socket.nuevo-ticket.js
	//'siguienteTicket' es el nombre del evento que se envio desde el cliente
	//'data' es el objeto que enviamos desde el cliente (null)
	//callback función para verificar la retroalimentanción (server/cliente).
	client.on('siguienteTicket',  (data, callback) => {
		//obtenemos el siguiente ticket
		let siguiente = ticketControl.siguiente();

		console.log(siguiente);

		//usamos el callback para enviar la información al cliente
		callback(siguiente);
	});

	//emitir ticket actual y arreglo de ultimos 4 tickets (ultimos4). Evento 'estadoActual'
	//cliente public/nuevo-ticket.html public/socket.nuevo-ticket.js
	//cliente public/publico.html public/socket.publico.js
	client.emit('estadoActual',  {
		actual: ticketControl.getUltimoTicket(),
		ultimos4: ticketControl.getUltimos4()
	});


	//Función para recibir información desde el cliente escritorio.html socket.escritorio.js
	//'atenderTicket' es el nombre del evento que se envio desde el cliente
	//'data' es el objeto que enviamos desde el cliente
	//callback función para verificar la retroalimentanción (server/cliente).
	client.on('atenderTicket',  (data, callback) => {

		//si en el objeto data no nos llega el número de escritorio
		if (!data.escritorio) {
			return callback({
				err: true,
				mensaje: 'El escritorio es necesario'
			});
		}

		//Llamamos el método para atender un ticket
		let atenderTicket = ticketControl.atenderTicket(data.escritorio);

		//retornamos al cliente el escritorio y ticket que se tiene que atender
		callback(atenderTicket);

		//Actualizar/notificar cambios en el arreglo ultimos4
		//Función para enviar información al cliente publico.html socket.publico.js
		//emit('ultimos4') es el nombre del evento que se enviara al cliente
		//'ultimos4' es el objeto que enviamos al cliente
		//broadcast me permitehacer un emit para que sea escuchado por todas paginas, no solamente publico.html socket.publico.js
		client.broadcast.emit('ultimos4',  {
			ultimos4: ticketControl.getUltimos4()
		});

	});

});