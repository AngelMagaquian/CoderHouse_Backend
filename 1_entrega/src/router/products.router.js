const express = require('express');
const routerProducts = express.Router();
const {ProductList} = require('../../class/product.class')

routerProducts.get('/', (req,res)=>{
    const _limit = req.query.limit 
    const _pro = ProductList.getPropducts().slice(0,_limit)
    if(Object.entries(_pro).length != 0){
        res.status(200).send(_pro)
    }else{
        res.status(400).send('Empty data')
    }

})

routerProducts.get('/:pid',(req,res)=>{
    const _id = parseInt(req.params.pid)
    const _pro = ProductList.getProductById(_id)
    
    if(Object.entries(_pro).length != 0){
        res.status(200).send(_pro)
    }else{
        res.status(400).send('Empty data')
    }
})

routerProducts.post('/',(req,res)=>{
    const _pro = req.body
    if(Object.entries(_pro).length != 0){
        ProductList.addProduct(_pro)
        res.status(200).send('OK')
    }else{
        res.status(400).send('Empty data')
    }
   
})

routerProducts.put('/:pid',(req,res)=>{
    const _id = parseInt(req.params.pid)
    const _pro = req.body
    if(Object.entries(_pro).length != 0){
        ProductList.updateProduct(_id,_pro)
        res.status(200).send('OK')
    }else{
        res.status(400).send('Empty data')
    }
})

routerProducts.delete('/:pid',(req,res)=>{
    const _id = parseInt(req.params.pid)
    ProductList.deleteProduct(_id)
    res.status(200).send('OK')
})
module.exports = routerProducts