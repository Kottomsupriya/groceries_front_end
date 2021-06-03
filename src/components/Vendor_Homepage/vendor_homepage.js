import React from 'react'
import * as stockFunction from './vendorStock'

export default class Login extends React.Component{
    constructor(){
        super();
        this.state={
            data:{
                company:''
            },
            stockList:[]
        }
    }
    toAddStock=e=>{
        e.preventDefault();
        this.props.history.push('/upload-stock');
    }
    submitStockData=e=>{
        e.preventDefault();
        let data=this.state.data;
        data.company = localStorage.getItem('company_name');
        this.setState({data:data});
        alert(data.company);
        stockFunction.stockSearch(data).then((res)=>{
            this.setState({stockList:res.data})
        })
    }
    render(){
        const {stockList}=this.state;
        return(
            <div className="container w-75">   
                    <div className="m-5 p-5">
                        <button onClick={e => this.submitStockData(e)} id="button">View Your Stock</button>
                        <button onClick={e=>this.toAddStock(e)}>Add New Stock</button>
                    </div>
                    {
                        Object.keys(stockList).map(itemkey=>{
                            return(
                                <div className="border border-success p-3">
                                    <table className="table table-success text-center">
                                        <tr>
                                            <th>Image</th>
                                            <th>Category</th>
                                            <th>Title</th>
                                            <th>Quantity</th>
                                            <th>Units</th>
                                            <th>Price</th>
                                            <th>Description</th>
                                            <th>Company</th>
                                        </tr>
                                        <tr key={itemkey}>
                                            <td><img src={stockList[itemkey].image} alt={stockList[itemkey].title} /></td>
                                            <td>{stockList[itemkey].category}</td>
                                            <td>{stockList[itemkey].title}</td>
                                            <td>{stockList[itemkey].quantity}</td>
                                            <td>{stockList[itemkey].units}</td>
                                            <td>{stockList[itemkey].price}</td>
                                            <td>{stockList[itemkey].description}</td>
                                            <td>{stockList[itemkey].company}</td>
                                            <td><button>Edit</button><br/><button>Add Stock</button></td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })
                    }  
            </div>
        )
    }
}