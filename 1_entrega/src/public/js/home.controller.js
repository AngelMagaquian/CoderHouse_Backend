const add_element = (element, content)=>{
    const liEL = document.createElement('li');
    liEL.textContent = content
    element.appendChild(liEL)
}

const get_products = ()=>{
    fetch('/api/products').then( res => res.json()).then(response => {
        const proList = document.getElementById('product_list')
        response.map(e=>{
           add_element(proList,e.title)
        })
    })
}





window.addEventListener('load', function(){
    get_products()
})