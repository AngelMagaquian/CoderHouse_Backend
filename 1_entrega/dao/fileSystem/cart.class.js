import * as fs from 'fs';
class Cart {
    carts;
    constructor(path){
      this.path = path
      this.carts = []
      this.loadFile()
    }

    addCart(){
        const cart = {products:[]}
        cart.id = this.getLastId()
        this.carts.push(cart)
        this.saveInFile(this.carts)
    }

    getCart(){
        return this.loadFile();
    }
      
    getCartById(id){
      let res = this.carts.filter((e)=> e.id === id)
      return res.length > 0 ? res : false
    }

    getIndexById(id){
        return this.carts.findIndex(e=> e.id === id)
    }

    addProduct(id,pro){

        const _index = this.getIndexById(id)

        if(this.carts[_index]){
            if(this.carts[_index].products.filter(e=> e.id === pro).length > 0){
                this.carts[_index].products.map((x,i)=>{  
                    if(x.id === pro){this.carts[_index].products[i].quantity ++}
                })
            }else{
                this.carts[_index].products.push({id:pro, quantity: 1})
            }
            this.saveInFile(this.carts)
        }
        /* if(this.carts[_index]){
            if(this.carts[_index].products.length > 0){
                
                if(this.carts[_index].products.filter(e=> e.id === pro).length > 0){
                    this.carts[_index].products.map((x,i)=>{
                        
                        if(x.id === pro){this.carts[_index].products[i].quantity ++}
                    })
                }else{
                    this.carts[_index].products.push({id, quantity: 1})
                }
               
            }else{
                
                this.carts[_index].products.push({id, quantity: 1})
            }
           
            this.saveInFile(this.carts)
           
        } */
    }

    saveInFile(arr){
        try{
            fs.writeFileSync(this.path, JSON.stringify(arr))
        }catch(err){
            console.log(err)
        }
    }

    updateCart(id, arr){
        let index = this.getIndexById(id)
        let aux_id = this.products[index].id
        this.carts[index] = arr
        this.carts[index].id = aux_id
        this.saveInFile( this.carts)
    }

    deleteCart(id){
        let index = this.getIndexById(id)
        this.carts.splice(index,1)
        this.saveInFile( this.carts)
    }

    loadFile(){
        let _carts;
        try{
            _carts = JSON.parse(fs.readFileSync(this.path, 'UTF-8'))
        }catch(err){
            console.log(err)
        }
       
        this.carts = _carts
        return this.carts
    }

    getLastId(){
        let _carts = this.loadFile()
        let id = _carts.length > 0 ? _carts[_carts.length - 1].id + 1 : 1;
        return id
    }
}

let CartsList  = new Cart('./db/carts.json')
export default CartsList