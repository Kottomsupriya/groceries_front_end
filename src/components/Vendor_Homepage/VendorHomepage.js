import React from 'react'
import * as stockFunction from './vendorStock'
import Navbar from '../NavBar/vendorNavbar'
import { connect } from 'react-redux';

class VendorHomepage extends React.Component{
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
    showStockList=e=>{
        e.preventDefault();
        let data=this.state.data;
        data.company = this.props.vendor.company;
        this.setState({data:data});
        stockFunction.stockSearch(data).then((res)=>{
            console.log(res.data);
            this.setState({stockList:res.data})
        })
    }
    logout=e=>{
        this.props.history.push('/login')
    }
    editStock=(e,data)=>{
        e.preventDefault();
        this.props.editDispatcher(data);
        this.props.history.push('/edit-stock');
    }
    deleteStock=(e,data)=>{
        e.preventDefault();
        stockFunction.deleteStock(data).then((res)=>{
            console.log(res);
        })
        this.props.history.push('/vendor-home')
        alert("Item Deleted");
        window.location.reload();
    }
    render(){
        const {stockList}=this.state;
        return(
            <div className="container">
                <Navbar/>
                <div className="row pt-5">
                    <div className="col">
                        <div>
                            <button id="catalogue_button" className="shadow-lg rounded" name="fruits" value="fruits" onClick={e=>this.showStockList(e)}>View Your Stock</button>
                        </div>
                    </div>
                    <div className="col">
                        <div>
                            <button id="catalogue_button" className="shadow-lg rounded" name="vegetables" value="vegetables" onClick={e=>this.toAddStock(e)}>Add New Stock</button>
                        </div>
                    </div>
                </div>
                    {
                        Object.keys(stockList).map(itemkey=>{
                            return(
                                <div>
                                    <table className="border border-success d-block w-75 ml-auto mr-auto mt-4 shadow-lg rounded">
                                        <tr>
                                            <td className="p-3">
                                                <img src={stockList[itemkey].image} alt={stockList[itemkey].title} height="200px" width="250px" />
                                            </td>
                                            <td style={{width:"25rem"}}>
                                                <ul type="none" className="text-left">
                                                    <li className="fs-2 text-capitalize fw-bolder">{stockList[itemkey].title}</li>
                                                    <li className="fs-4 text-capitalize">Type: {stockList[itemkey].category}</li>
                                                    <li className="font-weight-bold">Price: ₹{stockList[itemkey].price}/{stockList[itemkey].quantity}{stockList[itemkey].units}</li>
                                                    <li className="text-capitalize">About: {stockList[itemkey].description}</li>
                                                    <li className=" text-capitalize">By {stockList[itemkey].company}</li>
                                                    <li>Stock Available: {stockList[itemkey].totalStock}</li>
                                                </ul>     
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-success" onClick={e=>this.editStock(e,stockList[itemkey])}>Edit Stock</button><br/>
                                                <button type="button" className="btn btn-success mt-4" onClick={e=>this.deleteStock(e,stockList[itemkey])}>Delete Stock</button>
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

const mapStateToProps = state =>{
    console.log(state.vendor.vendorLogin);
    return{
        vendor: state.vendor.vendorLogin
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        editDispatcher: (data)=>dispatch({type:"editDetails",payload:data})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VendorHomepage);