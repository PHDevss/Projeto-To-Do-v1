const express = require("express");
const res = require("express/lib/response");
// const date = require(__dirname+'/date.js')
const mongoose = require('mongoose')

const app = express()
const itens = []
// const workItens = []

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))

//BANCO DE DADOS 
mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true})

const itemsSchema = {
    name: String
}

const Item = mongoose.model("Item", itemsSchema)



//END BANCO DE DADOS

app.get('/', function (req, res) {
    // const day = date.getDate()
    Item.find({},function(err, foundItens) {
        if(err){
            console.log(err);
        }else{
            if(foundItens.length === 0){
                const item1 = new Item ({
                    name: 'Welcome to your todoList!'
                })
                const item2 = new Item ({
                    name: 'Hit the + button to add a new item.'
                })
                const item3 = new Item ({
                    name: '<== Hit this to delete an item.'
                })
                
                const defaultItems = [item1, item2, item3]
                
                Item.insertMany(defaultItems, function(err){
                    if(err){
                        console.log(err)
                    } else {
                        console.log('Successfully saved default items to DB.');
                    }
                })
            }

            foundItens.forEach(element => {
                itens.push(element.name)
            });
            res.render('list', { listTitle: "Today", itemAdicionado: itens })
        }
    })

})


app.post('/', function(req, res){
    const itemName = req.body.novoItem
    const newItem = new Item ({
        name: itemName
    })
    newItem.save()
    res.redirect('/')
})


app.get('/about', function (req, res) {
    res.render('about')
})

app.listen(3000, function () {
    console.log('Server');
})