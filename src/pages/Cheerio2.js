import request from 'request'
import axios from 'axios'
import cheerios from 'cheerio'
import React from 'react'

class Yugi extends React.Component{
    state={
        cardSetName:[],
        cardList:[],
        search:"Shadow of Infinity Sneak Peek Participation Card"
        


    }

    componentDidMount = async() =>{
            const self=this
            await axios
            .get("https://db.ygoprodeck.com/api/v5/cardinfo.php")
            .then(function(response){
                console.log("HOYA", response.data)
                self.setState({cardSetName:response.data})
                // this.cardFilter(nameSet)
            })
            .catch(function(error){
                console.log(error) 
            })
         
    }
    changeHandler = (e) => {
        let value = e.target.value;
        this.setState({ search: value });
        this.searchCard(value);
        // this.props.handleInputChange();
    }
    searchCard=async nameSet=>{
        const self=this
        axios
        .get("https://db.ygoprodeck.com/api/v5/cardinfo.php")
        .then(function(response){
            console.log("HOYA", response.data)
            self.setState({cardSetName:response.data})
            this.cardFilter(nameSet)
        })
        .catch(function(error){
            console.log(error) 
        })}

    cardFilter= async nameSet=>{
        // const {cardSetName,search}=this.state
        const finalList=this.cardSetName.filter(item=>{
            console.log("cek item on filter card", item)
            if(item.card_sets){
                if(item.card_sets[0].set_name === nameSet){    
                console.warn("ketemu", item.card_sets[0].set_name)
                }

            }else{
                return "Not Found"
            }
        })
    }
        render(){
            const {cardSetName,search}=this.state
            const finalList=cardSetName.filter(item=>{
                console.log("cek item on filter card", item)
                if(item.card_sets){
                    if(item.card_sets[0].set_name === search){    
                    console.warn("ketemu", item.card_sets[0].set_name)
                    }

                }
            })
            console.log("JJJJJJJ", finalList)
        
            // const item_nested=[]
            // const{cardSetName}= this.state
            // console.log("APasih", cardSetName)
            // const setcard=cardSetName.map((item) =>{
            // item_nested.push(item['Set Name'])
            // item_nested.forEach(function(element){
            //     return element}
            // )})
            
               return <div>
                       {finalList}<br/>
                       {/* {item_nested[1]}<br/>
                       {item_nested[2]}<br/>
                       {item_nested[3]}<br/>
                       {item_nested[4]}<br/>
                       {item_nested[5]}<br/> */}
                   </div>
    }

}

export default Yugi




        