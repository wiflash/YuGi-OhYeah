import request from 'request'
import axios from 'axios'
import cheerios from 'cheerio'
import React from 'react'

class Yugi extends React.Component{
    state={
        cardSetName:[],
        cardList:[],
        search:""


    }

    componentDidMount = () =>{
        console.log("HAHA")
        const self=this
        axios
        .get("https://db.ygoprodeck.com/api/v5/cardsets.php")
        .then(function(response){
            console.log("HOYA", response.data)
            self.setState({cardSetName:response.data})
            
        })
        .catch(function(error){
            console.log(error) })
         
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

    cardFilter= async setName=>{
        const {cardSetName}=this.state

        const finalList=cardSetName.filter(item=>{
            if (item.card_sets.set_name===setName){
                return item}
        })
        return false
    }
        render(){
            const item_nested=[]
            const{cardSetName}= this.state
            console.log("APasih", cardSetName)
            const setcard=cardSetName.map((item) =>{
            item_nested.push(item['Set Name'])
                return item_nested}
            )
               return <div>
                       {item_nested[0]}<br/>
                       {item_nested[1]}<br/>
                       {item_nested[2]}<br/>
                       {item_nested[3]}<br/>
                       {item_nested[4]}<br/>
                       {item_nested[5]}<br/>
                   </div>
    }

}

export default Yugi




        