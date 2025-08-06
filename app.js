import express from 'express'
import c from 'config'
import router from './router.js'
import { usersRouter } from '#Components/users/router.js'
import { client } from '#Libs/db/databse.js'
import { createTables } from '#Libs/db/create-tables.js'


const App=express()

App.use(express.json())

App.use(router)
App.use(usersRouter)

createTables(client)

App.listen(c.get('SERVER.PORT'),()=>{
    console.log(`Сервер запущен на порту ${c.get('SERVER.PORT')}`);
    
})