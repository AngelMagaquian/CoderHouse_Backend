const fs = require('node:fs')
class Product {
    products;
    static id = 0;
    constructor(path){
      this.path = path
      this.products = []
      this.loadFile()
    }

    addProduct(product){
        if( this.products.every((e) => e.code != product.code)){
            product.id = Product.id ++
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

    updateProduct(id, changes){
        const _index = this.getIndexById(id)
        Object.entries(changes).map(e=>{
            this.products[_index][e[0]] = e[1]
        })
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

let ProductList  = new Product('./db/products.json')
module.exports = {ProductList}