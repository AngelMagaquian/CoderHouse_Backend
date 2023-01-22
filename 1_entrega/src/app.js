const express = require('express')
const handlebars = require('express-handlebars')
const Socket = require('socket.io')
const app = express()

const routerProducts = require('./router/products.router')

const cartsRouter = require('./router/carts.router')
const { ProductList } = require('../class/product.class')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', routerProducts)
app.use('/api/carts', cartsRouter)

const PORT = 8080

const httpServer = app.listen(PORT, () =>
  console.log(`Server up on port: ${PORT}`)
);

const io = new Socket.Server(httpServer);

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.render('home',{})
})

app.get('/realTimeProducts', (req,res) => {
  res.render('realTimeProducts',{})
})


io.on("connection", (socket) => {
  console.log('New user session')
  
  let products = [{title:'test 1'}] /*Aca deberia tener la consulta a la api */

  socket.on('message', async (data)=>{
    let products = await ProductList.addProduct(data)
    
    io.emit("productList", ProductList.getPropducts())
  })
  
  
})




