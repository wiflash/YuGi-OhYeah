const cheerio = require('cheerio');
const request = require('request');
const axios = require('axios');


const first_try = () => {
    axios.get('https://ygoprodeck.com/world-championship-2009-deck/')
        .then((response) => {
            let $ = cheerio.load(response.data);
            let big_list=[]
            let card= $('.monsters').next().text()
            const daftar= card.split("\n")
            daftar.forEach((item)=>{
                new_list=item.split(" x")
                big_list.push(new_list)
            })
            return big_list;
        })
        .then(console.log(response))
}

const second_try = (list) => {
    return list.map(item => {
        axios.get(`https://db.ygoprodeck.com/api/v5/cardinfo.php?name=${item[0]}`)
        .then((response) => response.data)
    })
}



request({
    method: 'GET',
    url: 'https://ygoprodeck.com/world-championship-2009-deck/'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    
    big_list=[]
    let card= $('.monsters').next().text()
    const daftar= card.split("\n")
    daftar.forEach((item)=>{
        new_list=item.split(" x")
        big_list.push(new_list)
    })
    console.log(big_list)
    const self=this
    let new_big_list=big_list.map(item=>
        axios.get(`https://db.ygoprodeck.com/api/v5/cardinfo.php?name=${item[0]}`)
        .then(function(response){
    // console.log(response.data)
})
.catch(function(error){
    // console.log(error)
}))
   console.log(new_big_list)
})

// const self=this
// big_list.map((item)=>{
// axios.get(`https://db.ygoprodeck.com/api/v5/cardinfo.php?name=${item[0]}`)
// .then(function(response){
//     store.setState({listNews:response.data.articles, isLoading:false})
//     console.log(response)
// })
// .catch(function(error){
//     store.setState({isLoading:false})
// })
// })