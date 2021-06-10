import React from "react";

export default class Cart extends React.Component{
    constructor(){
        super();
        let data= JSON.parse(localStorage.getItem("cartList"));
        this.state={
            cartList:data
        }
    }
    render(){
        const {cartList}=this.state;
        return(
            <div className="container">
                <h1>Cart</h1>
                <div>
                    {
                    Object.keys(cartList).map(itemkey=>{
                        return(
                            <div>
                                <table>
                                    <tr>
                                        <td>
                                            <img src={cartList[itemkey].image} alt={cartList[itemkey].title} height="200px" width="250px" />
                                        </td>
                                        <td>
                                            {cartList[itemkey].title}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}