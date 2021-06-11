import React from "react";

export default class Confirmation extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }

    render(){
        let cartList=JSON.parse(localStorage.getItem("cartList"));
        return(
            <div className="container w-50">
                <h1 className=""><u>Order Confirmation</u></h1>
                <h3 className="text-success">Your Order is Confirmed!</h3>
                <div>
                    <h4>Order List</h4>
                    {
                        Object.keys(cartList).map(itemkey=>{
                            return(
                                <table className="border border-success d-block">
                                    <tr>
                                        <td className="fs-1 p-5">{parseInt(itemkey)+1}.</td>
                                        <td className="p-4">
                                                <img src={cartList[itemkey].image} alt={cartList[itemkey].title} height="200px" width="250px" />
                                            </td>
                                        <td style={{width:"25rem"}}>
                                            <ul type="none" className="text-left">
                                                <li className="fs-2 text-capitalize fw-bolder">{cartList[itemkey].title}</li>
                                                <li className="fs-4 text-capitalize">Type: {cartList[itemkey].category}</li>
                                                <li className="font-weight-bold">Price: ₹{cartList[itemkey].price}/{cartList[itemkey].units}</li>
                                                <li className="text-capitalize">Quantity: {cartList[itemkey].count}</li>
                                                <li className="text-capitalize">About: {cartList[itemkey].description}</li>
                                                <li className=" text-capitalize">By {cartList[itemkey].company}</li>
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