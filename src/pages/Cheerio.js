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
        })

    cardFilter= async setName=>{
        const {cardSetName}=this.state
        const finalList=cardSetName.filter(item=>{
            if (item.card_sets.set_name===setName){
                return item}
        })
        return false
    }   
    
    }
        render(){
            const{cardSetName}= this.state
            console.log("APasih", cardSetName)
            const setcard=cardSetName.map((item)=>{
                return item["Set Name"].slice(0,5)}
                
            )
               return <div>
                   <ul>
                       <li>{setcard}</li>
                   </ul>
                   
                   </div>
    }

}

export default Yugi




        