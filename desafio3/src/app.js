const express = require('express')
const {ProductList} = require('../../desafio2/desafio2')

/*Inicializo server */
const app = express()
app.use(express.urlencoded({extended:true}))

app.get('/products', (req,res)=>{
    let limit = req.query.limit 
    res.send(ProductList.getPropducts().slice(0,limit))
})

app.get('/products/:pid',(req,res)=>{
    let id = parseInt(req.params.pid)
    res.send( ProductList.getProductById(id))
})


app.listen(8080,()=> console.log('Server up')) 