//Comando para establecer la cominicacion
var socket = io();
var label = $('#lblNuevoTicket');
 
socket.on('connect', ()=>{
    console.log('Conectado al servidor');
    
});

socket.on('disconnect', ()=>{
    console.log('Desconectado del servidor');
    
});

//Escuchando estado actual desde el servidor
socket.on('estadoActual', (ticket)=>{
    console.log(ticket);
    label.text('Actual: ' + ticket.actual);
    
});


$('button').on('click', ()=>{
    socket.emit('siguienteTicket', null, (siguienteTickeet)=>{
        label.text(siguienteTickeet);
    });
    console.log('Click aquí');    
});