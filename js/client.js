// JavaScript source code

const Socket = io('http://localhost:2000')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const Online = document.querySelector(".OnlineUsers");
var audio = new Audio('Pop.mp3');




const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
    
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:  ${message}`, 'right');
    Socket.emit('send', message);
    messageInput.value = ''
})


const name = prompt("Enter your name to join");

Socket.emit('new-user-joined', name);
//console.log(name, ' joined')

Socket.on('user-joined', name=> {
    append( name + '    joined the chat', 'left');
})

Socket.on('receive', data=> {
   
append(`${data.name}: ${data.message}`, + 'left');
audio.play();
})  


Socket.on('left', name=>{
    append(`${name} left the chat`, 'left');
})
