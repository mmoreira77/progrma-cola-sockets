
const fs = require('fs');

class Tikect{
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

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.ticket;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }

        // console.log(data);
        
    }

    siguiente(){
        this.ultimo += 1;

        let ticket = new Tikect(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Tikect ${this.ultimo}`;
    }

    getUltimoTicket(){
        return `Tikect ${this.ultimo}`;
    }
    
    getUltimo4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if (this.tickets.length === 0) {
            return 'No hay tickect';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Tikect(numeroTicket, escritorio);
        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1);  //Borra último elemento
        }
        console.log(this.ultimos4);

        this.grabarArchivo();
        return atenderTicket;
        
    }

    reiniciarConteo(){
                this.ultimo = 0;
                this.ticketss = [];
                this.ultimos4 = [];
                console.log('Se ha inicializado el sistema');
                this.grabarArchivo();
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            ticket: this.tickets,
            ultimos4: this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
        console.log('Sistema inicializado');
    }


}

module.exports = {
    TicketControl
};