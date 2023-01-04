const fs = require('node:fs')

class ProductManager {
    products;
    static id = 0;
    constructor(path){
      this.path = path
      this.products = []
      this.loadFile()
      console.log('construido')
    }
    addPorduct(product){
        if( this.products.every((e) => e.code != product.code)){
            product.id = ProductManager.id ++
            this.products.push(product)
          
            this.saveInFile(this.products)
        }
    }
    
    getPropducts(){
      return this.loadFile();
    }
    
    getProductById(id){
      let res = this.products.filter((e)=> e.id === id)
      return res.length > 0 ? res : 'Not found'
    }

    getIndexById(id){
        return this.products.findIndex(e=> e.id === id)
    }

    saveInFile(arr){
        try{
            fs.writeFileSync(this.path, JSON.stringify(arr))
        }catch(err){
            console.log(err)
        }
    }

    updateProduct(id, arr){
        /* this.products = this.products.filter(e => e.id === id ? e = arr : false) */
        let index = this.getIndexById(id)
        let aux_id = this.products[index].id
        this.products[index] = arr
        this.products[index].id = aux_id
        this.saveInFile( this.products)
    }

    deleteProduct(id){
        let index = this.getIndexById(id)
        this.products.splice(index,1)
        this.saveInFile( this.products)
    }



    loadFile(){
        let _products;
        try{
            _products = JSON.parse(fs.readFileSync(this.path, 'UTF-8'))
        }catch(err){
            console.log(err)
        }
       
        this.products = _products
        return this.products
    }
  }

  let productList  = new ProductManager('../../desafio2/products.json')
  module.exports = {productList}

/* 
    let pro = new ProductManager('./products.json')

    const obj = {title:'new 2', desc: 'new desc 2', price: 2000, thumbnail: 'url', code: 2, stock:100}
    pro.addPorduct(obj)
    console.log('load file => ',pro.loadFile())
    console.log('get product by id => ',pro.getProductById(0))

    pro.updateProduct(0,{title:'new 2 update', desc: 'new desc 2', price: 2000, thumbnail: 'url', code: 2, stock:5000})

    const obj2 = {title:'new obj2 2', desc: 'new desc obj2', price: 2000, thumbnail: 'url', code: 3, stock:100}
    pro.addPorduct(obj2)
    console.log('load file =>  ',pro.loadFile())
    console.log('get product by id => ',pro.getProductById(1))

    const obj3 = {title:'new obj3 3', desc: 'new desc obj3', price: 3000, thumbnail: 'url', code: 4, stock:100}
    pro.addPorduct(obj3)
    console.log('load file =>  ',pro.loadFile())
    console.log('get product by id => ',pro.getProductById(2)) 
 */

  /*   pro.deleteProduct(1)  */
