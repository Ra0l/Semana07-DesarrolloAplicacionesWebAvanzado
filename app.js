const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const hbs = require('hbs')

const op = require('./operaciones')

let curso = ''
let modulo = ''
let pago = ''

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// Express HBS engine
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // res.sendFile(__dirname+'/views/index.hbs')
    res.render('index')
})

app.get('/cursos', (req, res) => {
    // res.sendFile(__dirname+'/views/nosotros.hbs')
    res.render('cursos')
})

app.get('/modulos', (req, res) => {
    // res.sendFile(__dirname+'/views/nosotros.hbs')
    res.render('modulos')
})

app.get('/pago', (req, res) => {
    // res.sendFile(__dirname+'/views/contacto.hbs')
    res.render('pago')
})

app.post('/modulos', (req, res) => {
    // console.log(req.body)
    curso = req.body.curso
    
    res.render('modulos', {
        curso,
    })
})

app.post('/pago', (req, res) => {
    // console.log(req.body)
    if(typeof req.body.modulo == 'string') {
        modulo = req.body.modulo
    } else {
        modulo = req.body.modulo.join()
    }
    
    res.render('pago', {
        modulo,
    })
})

app.post('/detalles', (req, res) => {
    // console.log(req.body)
    pago = req.body.pago
    
    let costo = op.calcularCosto(curso)
    let descuento = op.verificarDescuento(pago)

    let costo_final = costo - (costo * (descuento/100))

    res.render('detalles', {
        curso,
        modulo,
        pago,
        costo_final,
        costo,
        descuento
    })
})



app.get('*', function(req, res){
    res.render('notfound')
});

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
})