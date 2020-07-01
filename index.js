require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    ctrl = require('./products_controller'),
    {SERVER_PORT, CONNECTION_STRING} = process.env,
    app = express();

    app.use(express.json())

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db)
    console.log('db connected')
}).catch(err=>console.log(err))

//endpoints
app.get('/api/products', ctrl.getAll)
app.get('/api/products/:id', ctrl.getOne)
app.put('/api/products/:id',ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

    app.listen(SERVER_PORT, ()=>console.log(`Server rockin on ${SERVER_PORT}`))
