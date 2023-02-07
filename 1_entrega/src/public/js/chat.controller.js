const socket = io();
const chatBox = document.getElementById('chatBox');
const btnSend = document.getElementById('btnSend');

let log = document.getElementById('messageLogs');
let user = window.prompt('Escriba su nombre');


const sendMessage = (message, element)=>{
    if(message.length > 0){
        socket.emit('message', {
            user,
            message
        })
        element.value=''
    }
}

const printMessage = (arr, element)=>{
    let message = ''
    arr.map(e =>{
        message +=`
        <div class="row">
            <div class="card">
                <div clas="card-header">
                    <div class="card-title">${e.user}</div>
                </div>
                <div class="card-body">
                    <p>${e.message}</p>
                </div>
            </div>
        </div>
       
        `
    })
    element.innerHTML = message
}

socket.on('messageLogs', (data)=>{
    printMessage(data, log)
})

btnSend.addEventListener('click', (e)=>{
    sendMessage(chatBox.value.trim(), chatBox)
})
chatBox.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){ sendMessage(chatBox.value.trim(), chatBox)}
})

