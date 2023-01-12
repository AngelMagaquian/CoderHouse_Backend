const fs = require('node:fs')
class Cart {
    carts;
    static id = 0;
    constructor(path){
      this.path = path
      this.products = []
      this.loadFile()
    }

    addCart(carts){
        if( this.products.every((e) => e.code != product.code)){
            product.id = ProductManager.id ++
            this.products.push(product)
            this.saveInFile(this.products)
        }
    }

    getCart(){
        return this.loadFile();
    }
      
    /* getProductById(id){
      let res = this.products.filter((e)=> e.id === id)
      return res.length > 0 ? res : 'Not found'
    } */

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

    updateCart(id, arr){
        let index = this.getIndexById(id)
        let aux_id = this.products[index].id
        this.carts[index] = arr
        this.carts[index].id = aux_id
        this.saveInFile( this.carts)
    }

    deleteCart(id){
        let index = this.getIndexById(id)
        this.products.splice(index,1)
        this.saveInFile( this.carts)
    }

    loadFile(){
        let _carts;
        try{
            _carts = JSON.parse(fs.readFileSync(this.path, 'UTF-8'))
        }catch(err){
            console.log(err)
        }
       
        this.carts = _carts
        return this.carts
    }
}

let CartsList  = new Product('./db/carts.json')
module.exports = {CartsList}