import React from 'react'
import axios from 'axios'

export default class ViewStock extends React.Component{
    constructor(){
        super();
        this.state={
            company:'',
            stock_list:[]
        }
    }
    handleChange=e=>{
        e.preventDefault();
        this.setState({company:e.target.value});
    }
    viewStock=(e)=>{
        // alert(this.state.company);
        // let company=localStorage.getItem('company_name');
        axios.post('http://localhost:4500/vendor-stock',this.state.company)
        .then((res)=>{
            // alert(res.data);
            this.setState({stock_list:res.data});
        }).catch(err=>console.log(err));
    }
    render(){
        const {stock_list}=this.state;
        return(
            <div className="container p-5">
                <form onSubmit={e=>this.viewStock(e)}>
                    <input type="text" name="company" id="company" onChange={e=>this.handleChange(e)}/>
                    <button type="submit">Submit</button>
                </form>
                {
                    Object.keys(stock_list).map(itemkey=>{
                        return(
                            <div>
                                <table className="table table-success text-center">
                                    <tr key={itemkey}>
                                        <th><img src={(`./images/${stock_list[itemkey].image}.jpg`)} height="100px" width="100px" alt={stock_list[itemkey].title} /></th>
                                        <th>{stock_list[itemkey].category}</th>
                                        <th>{stock_list[itemkey].title}</th>
                                        <th>{stock_list[itemkey].quantity}</th>
                                        <th>{stock_list[itemkey].units}</th>
                                        <th>{stock_list[itemkey].price}</th>
                                        <th>{stock_list[itemkey].description}</th>
                                        <th>{stock_list[itemkey].company}</th>
                                    </tr>
                                </table>
                                <button>Edit</button>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
