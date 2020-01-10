import React, { Component } from 'react'
import axios from 'axios'

const cheerio = require('cheerio')


const baseUrl = 'https://ygoprodeck.com/deck-search/?sort_order=_sfm_total_views+desc+num'

const tua1 = 'https://db.ygoprodeck.com/api/v5/cardinfo.php?set='

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
                const $ = cheerio.load(response.data);
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
    
    //by masWo
    first_try = (name) => {

        const self = this
        
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

            })
    }
         
   
    render() {
        return (
            <React.Fragment>
                {/* <div className="random">{this.state.total.map(item => {
                    return item.link //["Set Name"]
                })}
                </div> */}
                <button onClick={() => this.initScrap()}>Get Available Decks</button>
                {/* <button onClick={() => this.initScrap2()}>KLIK2</button> */}
                <button onClick={() => this.first_try(this.state.total)}>Get Deck List</button>
                {
                    (this.state.total2.length !== 0) ? this.state.total2.map(item => {
                        return <div>{item[0]} sejumlah {item[1]}<br/></div> ;
                    }) : <div></div>
                }

                <br />
                {
                    this.state.total.map(singleDeck => {
                        return (
                            <div>
                                <button onClick={() => this.first_try(singleDeck.link)}>Cek Harga{singleDeck.link}</button>
                                <h3>HARGA {singleDeck.price}</h3>
                            </div>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default PageInitScrap;