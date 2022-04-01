const express = require("express");
const res = require("express/lib/response");

const app = express()

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    let today = new Date()
    let currentDay = today.getDay()
    let day = ''
    switch (currentDay) {
        case 0: 
            day = 'Domingo'
            break
        case 1: 
            day = 'Segunda-feira'
            break
        case 2: 
            day = 'Terça-feira'
            break
        case 3: 
            day = 'Quarte-feira'
            break
        case 4: 
            day = 'Quinta-feira'
            break
        case 5: 
            day = 'Sexta-feira'
            break
        case 6: 
            day = 'Sábado'
            break
        default:
            console.log(Day + ' inválido!')
    }
    res.render('list', {kindOfDay: day})
})



app.listen(3000, function () {
    console.log('Server');
})