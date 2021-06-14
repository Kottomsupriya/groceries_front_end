
import React from 'react';
import './userHomepage.css'
import * as stockSearchFunction from './stockSearch';
import fruitsImage from './images/fruits.jpg';
import vegetablesImage from './images/vegetables.jpg'
import dairyImage from './images/dairy.jpg'

export default class UserHomepage extends React.Component{
    constructor(){
        super();
        this.state={
            data:{
                search:''
            },
            dataList:[],
            showHome:true
        }
    }
    handleChange=(e)=>{
        e.preventDefault();
        let data = this.state.data;
        data.search=e.target.value;

        this.setState({data:data})
       // alert(this.state.data.search);
        this.setState({data:data});
    }
    handleCatChange=(e)=>{
        e.preventDefault();
        let data = this.state.data;
        data.search=e.target.value;
        this.setState({data:data})
        stockSearchFunction.stockSearch(this.state.data).then((res)=>{
            this.setState({dataList:res.data});
        })
        this.setState({showHome:false});
    }
    handleSearch=(e)=>{
        e.preventDefault();
        stockSearchFunction.stockSearch(this.state.data).then((res)=>{
            this.setState({dataList:res.data});
        })
        this.setState({showHome:false});
    }
    logout=e=>{
        this.props.history.push('/login')
    }
    cart=e=>{
        this.props.history.push('/shopping-cart')
    }
    orders=e=>{
        this.props.history.push('/your-orders')
    }
    productPage=(e,list)=>{
        let data = JSON.stringify(list);
        localStorage.setItem('productPage',data);
        this.props.history.push('/product-page');
    }
    render(){
        let {dataList}=this.state;
        return(
            <div className="container">
                <div className="text-right">
                    <button className="btn btn-success" onClick={e=>{this.logout(e)}}>Logout</button>
                    <button className="btn btn-success" onClick={e=>{this.cart(e)}}>Cart</button>
                    <button className="btn btn-success" onClick={e=>{this.orders(e)}}>Your Orders</button>
                </div>
                <div className="pt-3">
                    <form onSubmit={e=>this.handleSearch(e)}>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Search By Name, Category, Brand" id="searchBox" name="search" onChange={e=>this.handleChange(e)} />
                            <button class="btn btn-outline-success" type="submit" style={{width:"120px",fontSize:"20px"}}>Search</button>
                        </div>
                    </form>
                </div>
                <div className={this.state.showHome?"d-none":"d-block"}>
                    <div className={dataList.length===0?"d-none":"d-block"}>
                    {
                        Object.keys(dataList).map(itemkey=>{
                            return(
                                <div>
                                    <table className="border border-success d-block w-75 ml-auto mr-auto mt-4">
                                        <tr>
                                            <td className="p-3">
                                                <img src={dataList[itemkey].image} alt={dataList[itemkey].title} height="200px" width="250px" />
                                            </td>
                                            <td style={{width:"25rem"}}>
                                                <ul type="none" className="text-left">
                                                    <li className="fs-2 text-capitalize fw-bolder">{dataList[itemkey].title}</li>
                                                    <li className="fs-4 text-capitalize">Type: {dataList[itemkey].category}</li>
                                                    <li className="font-weight-bold">Price: ₹{dataList[itemkey].price}/{dataList[itemkey].units}</li>
                                                    <li className="text-capitalize">About: {dataList[itemkey].description}</li>
                                                    <li className=" text-capitalize">By {dataList[itemkey].company}</li>
                                                    <li>Stock Available: {dataList[itemkey].quantity}</li>
                                                </ul>     
                                            </td>
                                            <td>
                                                <button type="button" className="btn btn-success mt-4 fs-5" onClick={e=>this.productPage(e,dataList[itemkey])}>View Product</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className={dataList.length===0?"d-block":"d-none"}>
                        <h3 className="p-5">No Products Found</h3>
                    </div>
                </div>
                <div className={this.state.showHome?"d-block":"d-none"}>
                    <div className="row pt-5">
                        <div className="col">
                            <div>
                                <img src={fruitsImage} style={{display:"block"}} width="400px" height="320px" alt="Fruits" />
                                <button id="catalogue_button" name="fruits" value="fruits" onClick={e=>this.handleCatChange(e)}>Fruits</button>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img src={vegetablesImage} style={{display:"block"}} width="400px" height="320px" alt="Vegetables" />
                                <button id="catalogue_button" name="vegetables" value="vegetables" onClick={e=>this.handleCatChange(e)}>Vegetables</button>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img src={dairyImage} style={{display:"block"}} width="400px" height="320px" alt="Dairy" />
                                <button id="catalogue_button" name="dairy" value="dairy" onClick={e=>this.handleCatChange(e)}>Dairy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
