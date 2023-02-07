import { Router } from "express";
import CartsList from '../../dao/fileSystem/cart.class.js'
const routerCarts = Router();

routerCarts.post('/',(req,res)=>{
    CartsList.addCart()
    res.status(200).send('OK')
})

routerCarts.get('/:cid',(req,res)=>{
    const _id = parseInt(req.params.cid)
    const _carts = CartsList.getCartById(_id)
    if(Object.entries(_carts).length != 0){
        res.status(200).send(_carts)
    }else{
        res.status(400).send('Empty data')
    }
})

routerCarts.post('/:cid/product/:pid',(req,res)=>{
    const _id = parseInt(req.params.cid)
    const _pro = parseInt(req.params.pid)

    CartsList.addProduct(_id, _pro)
    res.status(200).send('OK')
})

export default routerCarts;