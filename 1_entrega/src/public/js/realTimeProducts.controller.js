const socket = io();

const add_element = (element, content)=>{
    const liEL = document.createElement('li');
    liEL.textContent = content
    element.appendChild(liEL)
}



document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault()

    const new_product = {
        title: document.getElementById('pro_title').value,
        desc: document.getElementById('pro_desc').value,
        code: document.getElementById('pro_code').value,
        price: 0,
        status: true,
        stock: 0,
        category: "",
        thumbnails:[""]
    }
    socket.emit('productMessage', new_product)
})



socket.on('productList', data =>{
    const proList = document.getElementById('product_list')
    data.map(e=>{
        add_element(proList,e.title)
     }) 
})