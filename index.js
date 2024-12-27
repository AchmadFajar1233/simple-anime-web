import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const app = express()
const port = 3000

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    try {
        const request = await axios({
            method: 'get',
            url: 'https://api.jikan.moe/v4/top/anime',
        })
        const response = request.data
        res.render('index.ejs', {data: response.data})
    } catch (err) {
        console.log('error ' + err.message)
    }
})
app.get('/ongoing', async(req, res) => {
    try{
        const request = await axios({
            method: 'get',
            url: 'https://api.jikan.moe/v4/seasons/now'
        })
        const response = request.data.data
        res.render('index.ejs', {data: response})
    } catch(err){
        console.log(err)
    }
})
app.get('/comingsoon', async(req, res) => {
    try{
        const request = await axios({
            method: 'get',
            url: 'https://api.jikan.moe/v4/seasons/upcoming'
        })
        const response = request.data.data
        res.render('index.ejs', {data: response})
    } catch (err) {
        console.log(err)
    }
})
app.get('/anime/:mal_id', async (req, res) => {
    const id = req.params.mal_id
    try{
        const request = await axios({
            method: 'get',
            url: `https://api.jikan.moe/v4/anime/${id}`
        })
        const response = request.data.data
        res.render('anime.ejs', {data: response})
    } catch (err){
        console.log(err)
    }
})
app.get('/otherPage', (req, res) => {
    res.render('page3.ejs')
})
app.listen(port, () => {
    console.log('server dijalankan di port ' + port)
})