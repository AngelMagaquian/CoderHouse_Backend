const express = require('express')

/* const fs = require('node:fs'); */
/* class ProductManager {
    products;
    static id = 0;
    constructor(path){
      this.path = path
      this.products = []
      this.loadFile()
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
        //this.products = this.products.filter(e => e.id === id ? e = arr : false) 
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
} */


/* const Pm = new ProductManager('../../desafio2/products.json') */

const {productList} = require('../../desafio2/desafio2')
/*Inicializo server */
const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/products', (req,res)=>{
    let limit = req.query.limit 
    res.send(productList.getPropducts().slice(0,limit))
})

app.get('/products/:pid',(req,res)=>{
    let id = parseInt(req.params.pid)
    res.send( productList.getProductById(id))
})


app.listen(8080,()=> console.log('Server up')) 