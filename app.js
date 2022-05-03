const express = require("express");
// const date = require(__dirname+'/date.js')
const mongoose = require('mongoose')
const _ = require('lodash')
const PORT = process.env.PORT || 3000;

const app = express()
// let itens = []
// const workItens = []

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))

app.use((req, res, next) => {
    if (req.params.customListName == "favicon.ico") req.params.customListName = null;
    next();
})

//BANCO DE DADOS 
mongoose.connect('mongodb+srv://admin-phfoliveira:Prozy123@cluster0.xbyn2.mongodb.net/todolistDB', {useNewUrlParser: true})

const itemsSchema = {
    name: String
}

const Item = mongoose.model("Item", itemsSchema)

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

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model('List', listSchema)

//END BANCO DE DADOS

app.get('/', function (req, res) {
    // const day = date.getDate()
    Item.find({},function(err, foundItens) {
        if(err){
            console.log(err);
        }else{
            if(foundItens.length === 0){
                Item.insertMany(defaultItems, function(err){
                    if(err){
                        console.log(err)
                    } else {
                        console.log('Successfully saved default items to DB.');
                    }
                })
                res.redirect('/')
            } else {
                res.render('list', { listTitle: "Today", itemAdicionado: foundItens })
            }
        }
    })
})

app.get('/:customListName', function (req, res) {
    const customListName = _.capitalize(req.params.customListName)
    List.findOne({ name: customListName }, function(err, foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
                list.save()
                res.redirect('/' + customListName)
            } else {
                res.render('list', { listTitle: foundList.name, itemAdicionado: foundList.items })
            }
        }
    }) 
})

app.post('/', function(req, res){
    const itemName = req.body.novoItem
    const listName = req.body.list
    const newItem = new Item ({
        name: itemName
    })
    if(listName === 'Today'){
        newItem.save()
        res.redirect('/')
    } else {
        List.findOne({name: listName}, function(err, foundList){
            foundList.items.push(newItem)
            foundList.save()
            res.redirect('/' + listName)
        })
    }
})

app.post('/delete', function(req, res){
    const checkedItemId = req.body.checkbox
    const listName = req.body.listName

    if(listName === 'Today'){
        Item.findByIdAndRemove(checkedItemId, function(err){
            if(!err){
                console.log('Successfully removed selected item from DB.');
                res.redirect('/')
            } 
        })
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function (err, foundList) { 
            if(!err){
                res.redirect('/' + listName)
            }
         })
    }
})


app.get('/about', function (req, res) {
    res.render('about')
})

listen(PORT, () => console.log(`Listening on ${ PORT }`))