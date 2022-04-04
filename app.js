const express = require("express");
const res = require("express/lib/response");

const app = express()
let itens = []
let workItens = []

app.set('view engine', 'ejs')

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))


app.get('/', function (req, res) {
    let today = new Date()
    
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }
    
    let day = today.toLocaleDateString('pt-BR', options)

    res.render('list', { listTitle: day, itemAdicionado: itens })
})


app.get('/work', function (req,res) {
    res.render('list', {listTitle: "Work List", itemAdicionado: workItens})
})

app.post('/', function(req, res){
    let item = req.body.novoItem
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