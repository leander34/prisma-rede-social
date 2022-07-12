import express from 'express'
import { routes } from './routes'
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)
app.listen(3000, () => {
    console.log('API rodando na port 3000')
})