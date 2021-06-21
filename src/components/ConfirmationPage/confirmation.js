import React from "react";
import Navbar from '../NavBar/userNavbar'
import { connect } from "react-redux";
import axios from 'axios';

class Confirmation extends React.Component{
    stockUpdate=()=>{
        for(let i=0;i<this.props.order.length;i++){
            let editData = this.props.order[i];
            editData.totalStock = editData.totalStock-editData.count;
            console.log(editData);
            axios.post('http://localhost:4500/stock-update',editData).then((res)=>{
                console.log(res);
            });
        }
    }
    render(){
        let orderlist=this.props.order;
        {this.stockUpdate()}
        return(
            <div className="container">
                <Navbar/>
                <h1 className=""><u>Order Confirmation</u></h1>
                <h3 className="text-success">Your Order is Confirmed!</h3>
                <div>
                    <h4>Order List</h4>
                    {
                        Object.keys(orderlist).map(itemkey=>{
                            return(
                                <table className="border border-success d-block w-50 mx-auto ml-auto">
                                    <tr>
                                        <td className="fs-1 p-5">{parseInt(itemkey)+1}.</td>
                                        <td className="p-4">
                                                <img src={orderlist[itemkey].image} alt={orderlist[itemkey].title} height="200px" width="250px" />
                                            </td>
                                        <td style={{width:"25rem"}}>
                                            <ul type="none" className="text-left">
                                                <li className="fs-2 text-capitalize fw-bolder">{orderlist[itemkey].title}</li>
                                                <li className="fs-4 text-capitalize">Type: {orderlist[itemkey].category}</li>
                                                <li className="font-weight-bold">Price: ₹{orderlist[itemkey].price}/{orderlist[itemkey].units}</li>
                                                <li className="text-capitalize">Quantity: {orderlist[itemkey].count}</li>
                                                <li className="text-capitalize">About: {orderlist[itemkey].description}</li>
                                                <li className=" text-capitalize">By {orderlist[itemkey].company}</li>
                                            </ul>     
                                        </td>
                                    </tr>
                                </table>
                            )        
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    console.log("orderlist:",state.user.orderDetails)
    console.log("user state:",state.user);
    return{
        order: state.user.orderDetails,
        user: state.user.userLogin
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        userLoginDispatcher: (data) => dispatch({type:"userLogin",payload: data}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);