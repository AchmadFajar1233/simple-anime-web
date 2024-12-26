import axios from 'axios'

try{
    const req = await axios({
        method: 'get',
        url: 'https://api.jikan.moe/v4/top/anime'
    })
    const res = req.data
    console.log(res)
} catch (err) {
    console.log(err)
}