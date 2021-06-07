import React from 'react'
import * as stockFunction from './vendorStock'

export default class VendorHomepage extends React.Component{
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
                                <div>
                                    <table className="mr-auto ml-auto border border-success">
                                        <tr>
                                            <td className="p-3">
                                                <img src={stockList[itemkey].image} alt={stockList[itemkey].title} height="200px" width="250px" />
                                            </td>
                                            <td className="p-5">
                                                <ul type="none" className="text-left">
                                                    <li className="pl-2 fs-2 text-capitalize fw-bolder">{stockList[itemkey].title}</li>
                                                    <li className="p-2 fs-4 text-capitalize">Type: {stockList[itemkey].category}</li>
                                                    <li className="p-2 text-capitalize">About: {stockList[itemkey].description}</li>
                                                    <li className="p-2">Price: ₹{stockList[itemkey].price}/{stockList[itemkey].units}</li>
                                                    <li className="p-2 text-capitalize">Brand: {stockList[itemkey].company}</li>
                                                    <li className="p-2">Stock Available: {stockList[itemkey].quantity}</li>
                                                </ul>
                                                <button>Edit</button>
                                            </td>
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