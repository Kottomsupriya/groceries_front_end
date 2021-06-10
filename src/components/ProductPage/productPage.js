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
            stockData:dataList,
            list:{
                image:'',
                category:'',
                title:'',
                quantity:0,
                totalStock:0,
                units:'',
                price:0,
                description:'',
                count:0
            },
            cartList:[],
            count:0
        }
    }
    addItem=(e)=>{
        let cartList = JSON.parse(localStorage.getItem("cartList"));
        let stockData = this.state.stockData;
        let list = this.state.list;
        let found = false;
        let i;
        for(i = 0; i < cartList.length; i++){
            if(cartList[i]._id===stockData._id){
                found=true;
                break;
            }
        }
        if(!found){
            list._id=stockData._id;
            list.image=stockData.image;
            list.category=stockData.category;
            list.title=stockData.title;
            list.quantity=stockData.quantity;
            list.totalStock=stockData.totalStock;
            list.units=stockData.units;
            list.price=stockData.price;
            list.description=stockData.description;
            list.count = 1;
            cartList.push(list);
            console.log("new record")
        }
        else{
            cartList[i].count=cartList[i].count+1;
            console.log("existing record")
        }
        console.log("index:", i);
        console.log("data:", cartList);
        console.log("count:",this.state.count);
        localStorage.setItem("cartList",JSON.stringify(cartList));
        console.log(JSON.parse(localStorage.getItem("cartList")))
        // console.log(localStorage.getItem("cartList"))
        this.setState({cartList:cartList});
        this.setState({currentIndex:i});
        this.setState({count:cartList[i].count});
    }


    remItem=(e)=>{
        let cartList = JSON.parse(localStorage.getItem("cartList"));
        let stockData = this.state.stockData;
        let list = this.state.list;
        let i;
        for(i = 0; i < cartList.length; i++){
            if(cartList[i]._id===stockData._id){
                break;
            }
        }
        if(cartList[i].count>1){
            cartList[i].count=cartList[i].count-1;
            this.setState({count:cartList[i].count});

        }
        else{
            cartList.splice(i,1);
            console.log("0 items");
            this.setState({count:0});
        }
        console.log("count:",this.state.count);
        console.log("data:", cartList);
        localStorage.setItem("cartList",JSON.stringify(cartList));
        console.log(JSON.parse(localStorage.getItem("cartList")))
        // console.log(localStorage.getItem("cartList"))
        this.setState({cartList:cartList});
        this.setState({currentIndex:i});
        
    }
    render(){
        const {stockData} = this.state;
        const {cartList} = this.state;
        const {count} = this.state;
        const {currentIndex} = this.state;;
        return(
            <div className="container w-75">
                <div className="mt-5 border border-success">
                    <table>
                        <tr>
                            <td style={{width:"450px"}}><img src={stockData.image} alt="" width="300" /></td>
                            <td className="text-left">
                                <h1 className="text-capitalize pt-3 fw-bolder">{stockData.title} ({stockData.quantity} {stockData.units})</h1>
                                <h3  className="text-danger text-capitalize">From {stockData.company}</h3>                                <h4 className="text-danger text-capitalize">in {stockData.category}</h4>
                                <h4>Price: <span className="fs-3 text-danger fw-bolder"> ₹{stockData.price}.00</span></h4>
                                <h6>Inclusive of all taxes.</h6>
                                <h4 className="text-success">Stock Available</h4>
                            </td>
                            <td>
                                <button className={count===0?"btn btn-success m-5 fs-3 fw-bolder":"d-none"} onClick={e=>this.addItem(e)} style={{height:"65px",width:"250px"}} >Add to Cart <i class="fa fa-shopping-cart" style={{fontSize:"30px"}}></i></button>
                                <div className={count===0?"d-none":"form-inline m-5"}>
                                    <button className="btn btn-success" onClick={e=>this.remItem(e)} style={{height:"60px",width:"60px"}}>-</button>
                                    <h1 className="m-3">{count}</h1>
                                    <button className="btn btn-success" onClick={e=>this.addItem(e)} style={{height:"60px",width:"60px"}}>+</button>
                                </div>
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
                            <td>Price: </td>
                            <td className="text-capitalize">₹{stockData.price}.00</td>
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