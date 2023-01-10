const express = require('express')
const routerProducts = express.Router();

const {ProductList} = require('../../class/product.class')

console.log(ProductList)

routerProducts.post('/',(req,res)=>{
    res.send('Productos')
})

routerProducts.put('/:pid',(req,res)=>{
    res.send('Productos' + req.params.pid)
})

routerProducts.delete('/:pid',(req,res)=>{
    
})
module.exports = routerProducts