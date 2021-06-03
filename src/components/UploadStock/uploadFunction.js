import axios from 'axios'

let url='http://localhost:4500/stock-upload'

export function addStock(newStockData){
    return axios.post('http://localhost:4500/stock-upload/add',newStockData);
}