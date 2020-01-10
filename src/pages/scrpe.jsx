import React, { Component } from 'react'
import axios from 'axios'

const cheerio = require('cheerio')

const zens = 'https://app.zenscrape.com/api/v1/get&apikey=c3f40d10-330a-11ea-a1e3-a56601a5063a&url='
const baseUrl = 'https://ygoprodeck.com/deck-search/?sort_order=_sfm_total_views+desc+num'
// let total = [];

//const setan = zens + encodeURIComponent(baseUrl+hal)
const tua = 'Duel Terminal 6b'
const tua1 = 'https://db.ygoprodeck.com/api/v5/cardinfo.php?set='
const tua2 = tua1 + encodeURIComponent(tua)

const tua4 = 'https://db.ygoprodeck.com/api/v5/cardsets.php'


class PageInitScrap extends Component {
    state = {
        total: [],
        total2: []
    }

    initScrap = () => { 
        console.log("masuk bos")
        const pages = [''];//,'&sf_paged=2']; //,'&sf_paged=3','&sf_paged=4','&sf_paged=5'];
        pages.map(hal => {
            const self = this
            axios.get("https://cors-anywhere.herokuapp.com/"+baseUrl).then(async (response) => {
                //console.warn("cek response axios init ", response.data);
                const $ = cheerio.load(response.data);
                //console.log($('h2 a').attr('href'))
                let local = []
                $('h2 a').each((i,elem) => {
                    let item = {"link":($(elem).attr('href')),"price":0}
                    console.log(item)
                    local.push(item)                    
                })
                local = local.slice(0, -2)
                console.log(local)
                console.warn("sempat masuk")
                self.setState({total:local})
                
            }, (err) => console.log(err) );
            return null
        });
    }
    
    first_try = (name) => {
        //console.log(deckName)

        const self = this
        // deckName.map(name => {

        // })
        axios.get("https://cors-anywhere.herokuapp.com/"+name)
            .then((response) => {
                let $ = cheerio.load(response.data);
                let big_list=[]
                const cardType = [".monsters",".spells",".traps",".extra",".side"]
                cardType.map((type) => {
                    let card= $(type).next().text()
                    const daftar= card.split("\n")
                    daftar.forEach((item)=>{
                        let new_list=item.split(" x")
                        big_list.push(new_list)
                    })
                })

                self.setState({total2:big_list})
                console.log(self.state.total2)
                // return big_list;

            })
    }
         
    initScrap2 = () => { 
        console.log("masuk bos")
        const pages = [''];//,'&sf_paged=2']; //,'&sf_paged=3','&sf_paged=4','&sf_paged=5'];
        pages.map(hal => {
            const self = this
            axios.get(zens + encodeURIComponent(baseUrl+hal)).then((response) => {
                //console.log(response.data)
                //console.log(response.data[0].card_images[0].image_url_small)
                const $ = cheerio.load(response.data);
                let local = []
                $('.fp-wall-deck-search h2 a').each((i,elem) => {
                    local[i] = $(this).attr('href')
                })
                //console.log($)
                //Array.prototype.push.apply(total,local)
                self.setState({total2:local.slice(0,-2)})
                
            }, (err) => console.log(err) );
            return null
        });
    }
    initScrap3 = () => {

    }
    render() {
        //console.log(this.state.total) //[0].card_images[0].img_url_small)
        console.warn('total nih bos', this.state.total)
        return (
            <React.Fragment>
                <div className="random">{this.state.total.map(item => {
                    return item.link //["Set Name"]
                })}
                </div>
                <button onClick={() => this.initScrap()}>KLIK</button>
                <button onClick={() => this.initScrap2()}>KLIK2</button>
                <button onClick={() => this.first_try(this.state.total)}>FT</button>
                {
                    (this.state.total2.length !== 0) ? this.state.total2.map(item => {
                        return <div>{item[0]} sejumlah {item[1]}</div>;
                    }) : <div></div>
                }

                <br />
                {
                    this.state.total.map(singleDeck => {
                        return (
                            <div>
                                <button onClick={() => this.first_try(singleDeck.link)}>Cek Harga{singleDeck.link}</button>
                                <p>{singleDeck.price}</p>
                            </div>
                        )
                    })
                }
                {/* {
                    this.state.total.map(item => {
                        return <img src={item.card_images[0].image_url_small} width="150px" alt=""></img>
                    })
                } */}
                {/* {
                    this.state.total.reduce( (prevVal, curVal) => {

                    })
                } */}
                <div>{this.state.total2}</div>
            </React.Fragment>
        )
    }
}

export default PageInitScrap;