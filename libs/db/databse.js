import pgPromise from 'pg-promise'
import c from 'config'


const pgp = pgPromise()
export const client = pgp(c.get('DATABASE'))

client.connect()
    .then((connect) => {
        console.log('Connect to DB success')
        connect.done()
    })
    .catch((error) => {
        console.error('DataBase connection Error', error)
    });

