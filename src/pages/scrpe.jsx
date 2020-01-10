import React, { Component } from 'react'
import axios from 'axios'
import { Button, Col, Row, ListGroup} from 'react-bootstrap'

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
                <Row className="mb-5">
                    <Col xs="8" className="mx-auto text-center">
                        {
                            (this.state.total2.length !== 0) ? this.state.total2.map(item => {
                                return <ListGroup.Item>{item[0]} sejumlah {item[1]}<br/></ListGroup.Item> ;
                            }) : <Button variant="light" className="text-info" onClick={() => this.initScrap()}>Get Available Decks</Button>
                        }
                    </Col>
                </Row>
                {
                    this.state.total.map(singleDeck => {
                        return (
                            <Row className="mb-5">
                                <Col xs="12">
                                    <Button variant="light" className="text-info" onClick={() => this.first_try(singleDeck.link)}>Cek Harga{singleDeck.link}</Button>
                                </Col>
                            </Row>
                        )
                    })
                }
            </React.Fragment>
        )
    }
}

export default PageInitScrap;