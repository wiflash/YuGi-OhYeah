import createStore from "unistore";
import axios from "axios";


const initialState = {
    username: "",
    password: "",
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

    setUserData: (state, data) => {
        localStorage.setItem("apiKey", data.apiKey);
        localStorage.setItem("email", data.email);
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("isLogin", true);
    }
});