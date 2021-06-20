import React from 'react'
import './editStock.css'
import axios from 'axios';
import Navbar from '../NavBar/vendorNavbar'
import { connect } from 'react-redux';

class EditStock extends React.Component {
    constructor(props){
        super(props);
        this.state={
            stockData:this.props.edit,
            errors:{
                image:'',
                category:'',
                title:'',
                quantity:'',
                totalStock:'',
                units:'',
                price:'',
                description:'',            
            }
        }
    }

    handleStockData=e=>{
        e.preventDefault();
        const {name,value}=e.target;
        let stockData = this.state.stockData;
        let errors = this.state.errors;
        switch(name){
            case 'image':
                if(!value){
                    errors.image="Please Upload a Image"
                }
                else{
                    errors.image="";
                    const file = e.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function(f){
                        const img = document.getElementById('img');
                        img.src=f.target.result;
                        stockData.image=f.target.result;
                    }
                    const  i = reader.readAsDataURL(file);
               }
                break;
            case 'category':
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.category="Enter only characters";
                    }
                    else{
                        errors.category='';
                        stockData.category=value;
                    }
                }
                else{
                    errors.category="Enter Category"
                }
                break;
            case 'title':
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.title="Enter only characters";
                    }
                    else{
                        errors.title='';
                        stockData.title=value;
                    }
                }
                else{
                    errors.title="Enter a Title"
                }
                break;
            case 'quantity':
                if(value.length>0){
                    if(!/^\d{0,5}$/.test(value)){
                        errors.quantity="Enter only Digits & Min 5 Digits";
                    }
                    else{
                        errors.quantity="";
                        stockData.quantity=value;
                    }
                }
                else{
                    errors.quantity="Enter quantity"
                }
                break;
            case 'totalStock':
                if(value.length>0){
                    if(!/^\d{0,5}$/.test(value)){
                        errors.totalStock="Enter only Digits & Max 5 Digits";
                    }
                    else{
                        errors.totalStock="";
                        stockData.totalStock=value;
                    }
                }
                else{
                    errors.totalStock="Enter Total Stock"
                }
                break;
            case 'units':
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.units="Enter only characters";
                    }
                    else{
                        errors.units='';
                        stockData.units=value;
                    }
                }
                else{
                    errors.units="Enter Units";
                }
                break;            
            case 'price':
                if(value.length>0){
                    if(!/^\d{0,5}$/.test(value)){
                        errors.price="Enter only Digits & min 5 digits";
                    }
                    else{
                        errors.price="";
                        stockData.price=value;
                    }
                }
                else{
                    errors.price="Enter price"
                }
                break;
            case 'description':
                if(value.length>0){
                    if(!(value)){
                        errors.description="Enter only characters";
                    }
                    else{
                        errors.description='';
                        stockData.description=value;
                    }
                }
                else{
                    errors.description="Enter description";
                }
                break;
            default:
                break;            
        }
        stockData.company=localStorage.getItem('company_name');
        this.setState({stockData,[name]:value});
        this.setState({errors,[name]:value})
    }
    submitData = e=>{
        e.preventDefault();
        const {errors}=this.state;
        const {stockData}=this.state;
        if(errors.image.length===0 && errors.category.length===0 && errors.title.length===0 && errors.quantity.length===0 && errors.totalStock.length===0 && errors.price.length===0 && errors.description.length===0 && errors.units.length===0){
            axios.post('http://localhost:4500/stock-update',stockData).then((res)=>{
                console.log(res);
            })
            this.props.history.push('/vendor-home')            
        }
        else{
            alert("Enter Valid Details")
        }
    }
    render(){
        const {errors}=this.state;
        const {stockData}=this.state;
        return(
            <div className="container">
                <Navbar/>
                <h1 className="p-4">Edit Stock</h1>
                <form onSubmit={e=>this.submitData(e)} className="w-50 ml-auto mr-auto">
                    <div className="form-group row">
                        <label for="file" class="col-sm-2 col-form-label">Upload</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control" id="image" name="image" accept=".png, .jpg, .jpeg" onChange={e=>this.handleStockData(e)}/>
                            {errors.image.length>0 && <span>*{errors.image}</span>}<br/>
                        </div>
                    </div>
                    <img src={stockData.image} id="img" alt="" height="200px"/><br/>
                    <div className="form-group row">
                        <label for="category" class="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={stockData.category} id="category" name="category" onChange={e => this.handleStockData(e)}/>
                            {errors.category.length>0 && <span>*{errors.category}</span>}<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="title" class="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={stockData.title} id="title" name="title" onChange={e => this.handleStockData(e)}/>
                            {errors.title.length>0 && <span>*{errors.title}</span>}<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="quantity" class="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={stockData.quantity} id="quantity" name="quantity" onChange={e => this.handleStockData(e)}/>
                            {errors.quantity.length>0 && <span>*{errors.quantity}</span>}<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="totalStock" class="col-sm-2 col-form-label">Total Stock</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={stockData.totalStock} id="totalStock" name="totalStock" onChange={e => this.handleStockData(e)}/>
                            {errors.totalStock.length>0 && <span>*{errors.totalStock}</span>}<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="units" class="col-sm-2 col-form-label">Units</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={stockData.units} id="units" name="units" onChange={e => this.handleStockData(e)}/>
                            {errors.units.length>0 && <span>*{errors.units}</span>}<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="price" class="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={stockData.price} id="price" name="price" onChange={e => this.handleStockData(e)}/>
                            {errors.price.length>0 && <span>*{errors.price}</span>}<br/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="description" class="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" value={stockData.description} id="description" name="description" onChange={e => this.handleStockData(e)}/>
                            {errors.description.length>0 && <span>*{errors.description}</span>}<br/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button><br/>
                </form>
            </div>            
        )
    }
}

const mapStateToProps = state =>{
    return{
        edit: state.vendor.editDetails
    }
}


export default connect(mapStateToProps)(EditStock);