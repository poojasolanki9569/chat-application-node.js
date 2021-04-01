const socket = io("http://localhost:3000")
const form = document.getElementById('send-text-form');
const input = document.getElementById('text-input');
const containers = document.querySelector('.chat-area');
var audio = new Audio('msgSound.wav');
const appendMsg = (message, position) => {
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('text-dark', 'mt-2', 'mb-2', 'fs-3', 'bg-light','p-2', 'shadow-lg', 'rounded');
    msgElement.classList.add(position);
    containers.append(msgElement);
    audio.play();
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value;
    appendMsg(`You: ${message}`, 'text-right');
    socket.emit('send', message);
    input.value = '';
});

// const name = prompt("Enter your name to join Buddy Chat: ");
let name;

do{
    name = prompt("Enter your name to join Buddy Chat: ");
}while(!name);

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    appendMsg(`${name} is joined the Buddy Chat.`, 'text-right');
});

socket.on('receive', data => {
    appendMsg(`${data.name}: ${data.message}`, 'text-left');
});

socket.on('leave-chat', name => {
    appendMsg(`${name} left the Buddy Chat.`, 'text-right');
});