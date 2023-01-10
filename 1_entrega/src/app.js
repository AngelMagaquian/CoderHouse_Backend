const express = require('express')
const app = express()

const routerProducts = require('./router/products.router')

const cartsRouter = require('./router/carts.router')

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/products', routerProducts)
app.use('/api/carts', cartsRouter)

const port = 8080
app.listen(port,()=> console.log('Server up')) 


