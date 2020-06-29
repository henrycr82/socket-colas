//requires
const fs = require('fs');

class Ticket {

	constructor(numero, escritorio){
		
		this.numero = numero;
		this.escritorio = escritorio;
	}
}

class TicketControl {

	constructor(){
		
		this.ultimo = 0;
		this.hoy = new Date().getDate();
		this.tickets = [];
		this.ultimos4 = [];

		//leemos el archivo .json con la data (valor del atributo último)
		let data = require('../data/data.json');

		//Si el elemento data.hoy del data.json es igual a la fecha actual
		if (data.hoy===this.hoy) {
			this.ultimo = data.ultimo;
			this.tickets = data.tickets;
			this.ultimos4 = data.ultimos4;
		} else {
			this.reiniciarConteo();
		}

	}

	//Le incrementamos 1 a la propiedad ultimo
	siguiente(){
		this.ultimo += 1;
		
		//instanciamos la clase Ticket
		let ticket = new Ticket(this.ultimo,null);

		//agregamos el ticket al arreglo de tickets
		this.tickets.push(ticket);
		
		this.grabarArchivo();

		return `Ticket ${this.ultimo}`;
	}

	//para obtener el uĺtimo ticket
	getUltimoTicket(){
		return `Ticket ${this.ultimo}`;
	}

	//para obtener los datosdel arreglo ultimos4
	getUltimos4(){
		return this.ultimos4;
	}

	atenderTicket( escritorio ){

		//valido que arreglo de tickets no este vacio
		if (this.tickets.length === 0) {
			return 'No hay tickets por atender';
		}

		//tomo el número del primer ticket por atender del arreglo
		let numeroTicket = this.tickets[0].numero;

		//elimino el primer elemto del arreglo que ya atendi
		this.tickets.shift();


		//Instancio la clase Ticket para el nuevo ticket que voy a atender
		let atenderTicket = new Ticket(numeroTicket, escritorio);

		//agregar el ticket que vamos a atender al inicio del arreglo ultimos4
		this.ultimos4.unshift( atenderTicket );

		//borrar el último elemto del arreglo (ultimos4) cuando temga mas de cuatro(4) elementos
		if ( this.ultimos4.length > 4 ) {
			this.ultimos4.splice(-1,1);//borra el último elemto del arreglo
		}

		console.log('Ultimos 4');
		console.log(this.ultimos4);

		//grabamos la imformación en data.json
		this.grabarArchivo();

		//retornamos el Ticket que tengo que atender
		return atenderTicket;


	}

	//reiniciamos en 0 la propiedad ultimo
	reiniciarConteo()
	{
		this.ultimo = 0;
		this.tickets = [];//vaciamos nuestro arreglo de tickets
		this.ultimos4 = [];//vaciamos nuestro arreglo de ultimos cuatro tickets atendidos (ultimos4)
		console.log('Se reinicio el contador del nuestro archivo .json');
		this.grabarArchivo();
	}

	//Para guardar en el data.json
	grabarArchivo(){

		//armamos nuestro json
		let jsonData = {
			ultimo: this.ultimo, 
			hoy: this.hoy,
			tickets: this.tickets,
			ultimos4: this.ultimos4
		}

		//lo enviamos como un string
		let jsonDataString = JSON.stringify(jsonData);

		//guardamos
		fs.writeFileSync('./server/data/data.json', jsonDataString);

	}

}

//Exportamos la clase
module.exports = {
	TicketControl
}