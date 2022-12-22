class ProductManager {
    products;
    static id = 0;
    constructor(){
      this.products = []
    }
    addPorduct(product){
      if(this.products.every((e) => e.code != product.code)){
        product.id = ProductManager.id ++
        this.products.push(product)
      }
    }
    
    getPropducts(){
      return this.products;
    }
    
    getProductById(code){
      let res = this.products.filter((e)=> e.code === code)
      return res.length > 0 ? res : 'Not found'
    }
  }
  
  
  const compra = {title:'item 1', description: 'item numero uno', price: 1200, thumbnail:'www.google.com', code: 1, stock: 3000}
  const compra2 = {title:'item 2', description: 'item numero dos', price: 1200, thumbnail:'www.google.com', code: 2, stock: 2999}
  const compra3 = {title:'item 3', description: 'item numero tres', price: 1200, thumbnail:'www.google.com', code: 3, stock: 2999}
  const tickets = new ProductManager
  tickets.addPorduct(compra)
  
  const tickets2 = new ProductManager
  tickets.addPorduct(compra2)
  
  console.log('get products => ',tickets.getPropducts())
  console.log('getProductById => ',tickets.getProductById(2))
  console.log('getProductById => ',tickets.getProductById(3))
  
  console.log('static id=> ',ProductManager.id) 
  
  
  
  
  
  