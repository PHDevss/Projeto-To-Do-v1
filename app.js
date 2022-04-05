const express = require("express");
const res = require("express/lib/response");
const date = require(__dirname+'/date.js')

const app = express()
const itens = []
const workItens = []

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))


app.get('/', function (req, res) {
    const day = date.getDate()
    res.render('list', { listTitle: day, itemAdicionado: itens })
})


app.get('/work', function (req,res) {
    res.render('list', {listTitle: "Work List", itemAdicionado: workItens})
})

app.post('/', function(req, res){
    const item = req.body.novoItem
    if(req.body.list === 'Work') {
        workItens.push(item)
        res.redirect('/work')
    } else {
        itens.push(item)
        res.redirect('/')
    }
})


app.get('/about', function (req, res) {
    res.render('about')
})

app.listen(3000, function () {
    console.log('Server');
})