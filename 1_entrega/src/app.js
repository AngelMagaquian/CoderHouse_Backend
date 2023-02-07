import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

/*Routes*/
import routerProducts from './router/products.routes.js'
import cartsRouter from'./router/carts.routes.js'
import chatRouter from './router/chat.routes.js';

/*Dao*/
import ProductList from '../dao/fileSystem/product.class.js'
import { messageModel } from '../dao/models/message.schema.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express()

app.set('port', process.env.PORT || 3000)

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/*Routes*/
app.use('/api/products', routerProducts)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)

mongoose.connect(
  `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@codercluster.fsti35d.mongodb.net/${process.env.DB_MONGO}?retryWrites=true&w=majority`,
  (error)=>{  error ? console.log(error) : console.log('mongodb is connected 🍃')}
)

const httpServer = app.listen(app.get('port'),()=>{
  console.log(`Listening on port ${app.get('port')} 🚀`);
  console.log('Starting socket.io 🌐');
});

const io = new Server(httpServer);

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.get('/', (req,res) => {
    res.render('home',{})
})

app.get('/realTimeProducts', (req,res) => {
  res.render('realTimeProducts',{})
})


let products = []
let message = []

io.on("connection", (socket) => {
  console.log('New user connected 🧑‍💻')

  socket.on('productMessage', async (data)=>{
    let products = await ProductList.addProduct(data)
    
    io.emit("productList", ProductList.getPropducts())
  })

  socket.on('message', (data) => {
    message.push(data)
    io.emit('messageLogs', message)
    messageModel.create(message)
  })
  
})




