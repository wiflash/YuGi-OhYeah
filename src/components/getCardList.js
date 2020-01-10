import axios from 'axios'
import React from 'react'


class Yugi extends React.Component{
    state={
        cardSetName:[],
        cardList:[],
        search:"Shadow of Infinity Sneak Peek Participation Card"
    }

    changeHandler = (e) => {
        let value = e.target.value;
        this.setState({ search: value });
        this.searchCard(value);
    }

    componentDidMount = async() =>{
        await axios.get("https://db.ygoprodeck.com/api/v5/cardinfo.php")
        .then((response) => {
            this.setState({cardSetName:response.data})
        })
        .catch((error) => {
            console.log(error) 
        })
    }


    searchCard = async nameSet=>{
        axios
        .get("https://db.ygoprodeck.com/api/v5/cardinfo.php")
        .then((response) => {
            console.log("HOYA", response.data)
            this.setState({cardSetName:response.data})
            this.cardFilter(nameSet)
        })
        .catch((error) => {
            console.log(error) 
        })}

    cardFilter = async nameSet => {
        // const {cardSetName,search}=this.state
        const finalList = this.cardSetName.filter(item=>{
            console.log("cek item on filter card", item)
            if(item.card_sets){
                if(item.card_sets[0].set_name === nameSet){    
                    return item;
                }

            } else {
                return "Not Found"
            }
        })
    }
    render(){
        return (
            <React.Fragment>
                {/* {finalList}<br/> */}
                {/* {item_nested[1]}<br/>
                {item_nested[2]}<br/>
                {item_nested[3]}<br/>
                {item_nested[4]}<br/>
                {item_nested[5]}<br/> */}
            </React.Fragment>
        )
    }

}

export default Yugi




        