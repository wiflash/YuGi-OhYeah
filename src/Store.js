import createStore from "unistore";
import axios from "axios";


const initialState = {
    username: "",
    password: "",
    email: "",
    avatar: "",
    isLogin: false,
    cards: [],
    isLoading: true
};

export const store = createStore(initialState);


const baseUrl = "https://db.ygoprodeck.com/api/v5/cardinfo.php";
export const actions = store => ({
    handleSetGlobal: (state, event) => {
        store.setState({ [event.target.name]: event.target.value });
    },

    getCardDetails: (state) => {
        axios.get(baseUrl)
            .then((response) => {
                store.setState({
                    deck: response.data,
                    isLoading: false
                })
            })
            .catch((error) => {
                store.setState({isLoading: true})
            });
    },

    setUserData: (state, userData) => {
        store.setState({
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar,
            isLogin: true
        })
    }
});