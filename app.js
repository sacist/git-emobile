import express from 'express'
import c from 'config'
import router from './router.js'
import { usersRouter } from './components/users/router.js'
import { client } from './libs/db/databse.js'
import { createTables } from './libs/db/create-tables.js'


const App=express()

App.use(express.json())

App.use(router)
App.use(usersRouter)

createTables(client)

App.listen(c.get('SERVER.PORT'),()=>{
    console.log(`Сервер запущен на порту ${c.get('SERVER.PORT')}`);
    
})