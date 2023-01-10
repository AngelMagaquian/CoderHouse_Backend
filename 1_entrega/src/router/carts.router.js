const express = require('express')
const routerCarts = express.Router();



routerCarts.post('/',(req,res)=>{
    res.send('carts')
})

routerCarts.get('/:cid',(req,res)=>{
    res.send('carts ' + req.params.cid)
})

routerCarts.post('/:cid/product/:pid',(req,res)=>{
    
})
module.exports = routerCarts;