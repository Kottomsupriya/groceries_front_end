import React from "react";
import delivery from './images/icon-delivery.png'
import nocontact from './images/No_contact_delivery.png'
import returns from './images/icon-return.png'

export default class ProductPage extends React.Component{
    constructor(){
        super();
        let data = localStorage.getItem('productPage');
        let dataList = JSON.parse(data);
        this.state={
            stockData:dataList
        }
    }
    render(){
        const {stockData} = this.state;
        return(
            <div className="container w-75">
                <div className="mt-5 border border-success">
                    <table>
                        <tr>
                            <td style={{width:"450px"}}><img src={stockData.image} alt="" width="300" /></td>
                            <td className="text-left">
                                <h1 className="text-capitalize pt-3 fw-bolder">{stockData.title} ({stockData.quantity} {stockData.units})</h1>
                                <h3  className="text-danger text-capitalize">From {stockData.company}</h3>
                                <h4 className="text-danger text-capitalize">in {stockData.category}</h4>
                                <h4>Price: <span className="fs-3 text-danger fw-bolder"> ₹{stockData.price}.00</span></h4>
                                <h6>Inclusive of all taxes.</h6>
                                <h4 className="text-success">Stock Available</h4>
                            </td>
                            <td>
                                <button className="btn btn-success m-5 fs-3 fw-bolder" style={{height:"75px",width:"200px"}}>Add to Cart</button>
                            </td>
                        </tr>
                    </table>   
                    <table className="w-100 mt-5 mb-5">
                        <tr>
                            <td>
                                <img src={returns} alt="Non-Returnable" id="nr"/>
                                <label for="nr">Non-Returnable</label>
                            </td>
                            <td>
                                <img src={delivery} alt="Free Delivery" />
                                <label>Free Delivery</label>
                            </td>
                            <td><img src={nocontact} alt="No Contact Delivery" />
                                <label>Contactless Delivery</label>
                            </td>
                        </tr>
                    </table>
                    <table className="text-left fs-4 m-5">
                        <tr>
                            <td className="fs-3 fw-bold">Full Product Details</td>
                        </tr>
                        <tr>
                            <td>Name: </td>
                            <td className="text-capitalize">{stockData.title}</td>
                        </tr>
                        <tr>
                            <td>Category: </td>
                            <td className="text-capitalize">{stockData.category}</td>
                        </tr>
                        <tr>
                            <td>Quantity: </td>
                            <td>{stockData.quantity} {stockData.units}</td>
                        </tr>
                        <tr>
                            <td>Description: </td>
                            <td className="text-capitalize">{stockData.description}</td>
                        </tr>
                        <tr>
                            <td>Manufacturer: </td>
                            <td className="text-capitalize">{stockData.company}</td>
                        </tr>
                        <tr>
                            <td>Country of Origin: </td>
                            <td>India</td>
                        </tr>
                    </table>
                </div>
                
            </div>
        )
    }
}