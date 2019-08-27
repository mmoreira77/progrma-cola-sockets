const { io } = require('../server');
const {TicketControl} = require('../clases/tikect-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

         let siguiente = ticketControl.siguiente();   
         callback(siguiente);
         console.log(siguiente);
         
    });

    //Emitir estadoa actual 
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimo4()
    });

    client.on('atenderTicket', (data, callback)=>{
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escrotorio es necesario'
            });
        }

        console.log(data.escritorio);
        
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //Actualizar pagina pública
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getUltimo4()
        });
    });

});