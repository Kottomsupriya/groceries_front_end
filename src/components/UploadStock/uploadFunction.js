import axios from 'axios'

let url='http://localhost:4500/stock-upload'

export function signupUser(newStockData){
    return axios.post(url,newStockData);
}