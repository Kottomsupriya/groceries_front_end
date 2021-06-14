import React from "react";

export default class Cart extends React.Component{
    constructor(){
        super();
        let data= JSON.parse(localStorage.getItem("cartList"));
        this.state={
            cartList:data,
            stockData:[],
        }
    }

    addItem=(e,index)=>{
        e.preventDefault();
        let cartList = JSON.parse(localStorage.getItem("cartList"));
        cartList[index].count = cartList[index].count + 1;
        localStorage.setItem("cartList",JSON.stringify(cartList));
        console.log(JSON.parse(localStorage.getItem("cartList")))
        this.setState({cartList:cartList});
        this.setState({count:cartList[index].count});
    }

    totalAmount=()=>{
        let totalCost = 0;
        let list = JSON.parse(localStorage.getItem("cartList"));
        for(let i = 0; i < list.length ; i++){
            totalCost = totalCost + (list[i].count * list[i].price);
        }
        return(totalCost);
    }
    remItem=(e,index)=>{
        e.preventDefault();
        let cartList = JSON.parse(localStorage.getItem("cartList"));
        if(cartList[index].count>1){
            cartList[index].count = cartList[index].count - 1;
        }
        else{
            cartList.splice(index,1);
        }
        localStorage.setItem("cartList",JSON.stringify(cartList));
        console.log(JSON.parse(localStorage.getItem("cartList")))
        this.setState({cartList:cartList});       
    }
    handlePayment=e=>{
        this.props.history.push("/payment");
    }
    render(){
        const {cartList}=this.state;
        return(
            <div className="container">
                <h1>Cart</h1>
                <div className="mb-3">
                    {
                    Object.keys(cartList).map(itemkey=>{
                        return(
                            <div>
                                <table className="border border-success d-block w-75 ml-auto mr-auto mt-4">
                                    <tr>
                                        <td className="p-3">
                                            <img src={cartList[itemkey].image} alt={cartList[itemkey].title} height="200px" width="250px" />
                                        </td>
                                        <td style={{width:"25rem"}}>
                                            <ul type="none" className="text-left">
                                                <li className="fs-2 text-capitalize fw-bolder">{cartList[itemkey].title}</li>
                                                <li className="fs-4 text-capitalize">Type: {cartList[itemkey].category}</li>
                                                <li className="font-weight-bold">Price: ₹{cartList[itemkey].price}/{cartList[itemkey].units}</li>
                                                <li className="text-capitalize">About: {cartList[itemkey].description}</li>
                                                <li className=" text-capitalize">By {cartList[itemkey].company}</li>
                                                <li className="text-capitalize fw-bold">{cartList[itemkey].count} X ₹{cartList[itemkey].price}.00 = ₹{cartList[itemkey].count*cartList[itemkey].price}.00</li>
                                            </ul>     
                                        </td>
                                        <td>
                                            <button className={cartList[itemkey].count===0?"btn btn-success m-5 fs-3 fw-bolder":"d-none"} onClick={e=>this.addItem(e)} style={{height:"65px",width:"250px"}} >Add to Cart <i class="fa fa-shopping-cart" style={{fontSize:"30px"}}></i></button>
                                            <div className={cartList[itemkey].count===0?"d-none":"form-inline"}>
                                                <button className="btn btn-success" onClick={e=>this.remItem(e,itemkey)} style={{height:"50px",width:"50px"}}>-</button>
                                                <h1 className="m-3">{cartList[itemkey].count}</h1>
                                                <button className="btn btn-success" onClick={e=>this.addItem(e,itemkey)} style={{height:"50px",width:"50px"}}>+</button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        )
                    })
                    }
                </div>
                <div>
                    <h2>Total Items: <span className="text-danger">{cartList.length}</span></h2>
                    <h2>Total Cost: <span className="text-danger">₹{this.totalAmount()}.00</span></h2>
                    <button className="btn btn-success" style={{height:"70px",width:"250px"}} onClick={e=>{this.handlePayment(e)}}>Proceed to Checkout</button>
                </div>
            </div>
        )
    }
}