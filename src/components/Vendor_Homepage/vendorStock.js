import axios from 'axios'

let url='http://localhost:4500/vendor-stock'

export function stockSearch(title){
    return axios.post(url,title);
}