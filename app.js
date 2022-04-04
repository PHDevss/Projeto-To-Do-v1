const express = require("express");
const res = require("express/lib/response");

const app = express()
let itens = []

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

    res.render('list', { kindOfDay: day, itemAdicionado: itens })
})

app.post('/', function(req, res){
    let item = req.body.novoItem
    itens.push(item)
    res.redirect('/')
})


app.listen(3000, function () {
    console.log('Server');
})