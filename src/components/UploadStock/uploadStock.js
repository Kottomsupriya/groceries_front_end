import React from 'react'
import './uploadProduct.css'
import axios from 'axios';
import Navbar from '../NavBar/vendorNavbar'
import { connect } from 'react-redux';
import FormItems from '../Reusable/FormItems'

class UploadProductPage extends React.Component {
    constructor(){
        super();
        this.state={
            stockData:{
                image:'',
                category:'',
                title:'',
                quantity:'',
                totalStock:'',
                units:'',
                price:'',
                description:'',
                company:''
            },
            errors:{
                image:'',
                category:'',
                title:'',
                quantity:'', 
                totalStock:'', 
                units:'',
                price:'',
                description:'',            
            },
            visited:{
                image:false,
                category:false,
                title:false,
                quantity:false,
                totalStock:false,
                units:false, 
                price:false,
                description:false,
            },
            form:{
                image:{
                    elementType:'input',
                    elementConfig:{
                        type:'file',
                        id:'image',
                        name:'Upload Image',
                        accept:'.png, .jpg, .jpeg'
                    }
                },
                category:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'category',
                        name:'Category',
                        placeholder:"Enter Category"
                    }
                },
                title:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'title',
                        name:'Title',
                        placeholder:"Enter Title"
                    }
                },
                quantity:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'quantity',
                        name:'Quantity',
                        placeholder:"Enter Quantity"
                    }
                },
                totalStock:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'totalStock',
                        name:'totalStock',
                        placeholder:"Enter Total Stock"
                    }
                },
                units:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'units',
                        name:'Units',
                        placeholder:"Enter Units"
                    }
                },
                price:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'price',
                        name:'Price',
                        placeholder:"Enter Price"
                    }
                },
                description:{
                    elementType:'textarea',
                    elementConfig:{
                        rows:2,
                        id:'description',
                        name:'Description',
                        placeholder:"Enter Description"
                    }
                },
            }
        }
    }

    handleChange=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        const {id,value}=e.target;
        let stockData = this.state.stockData;
        let errors = this.state.errors;
        switch(id){
            case 'image':
                visited.image=true;
                if(!value){
                    const img = document.getElementById('img');
                    img.src='';
                    errors.image="Please Upload a Image"
                    stockData.image=''
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
                visited.category=true;
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
                visited.title=true;
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
                visited.quantity=true;
                if(value.length>0){
                    if(!/^\d{0,5}$/.test(value)){
                        errors.quantity="Enter only Digits & Max 5 Digits";
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
                visited.totalStock=true;
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
                visited.units=true;
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
                visited.price=true;
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
                visited.description=true;
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
        stockData.company=this.props.vendor.company;
        this.setState({stockData:stockData});
        this.setState({errors:errors});
        this.setState({visited:visited});
    }
    submitData = e=>{
        e.preventDefault();
        const {errors}=this.state;
        const {visited}=this.state;
        const {stockData}=this.state;
        if(visited.image && visited.title && visited.quantity && visited.totalStock && visited.category && visited.price && visited.description && visited.units){
            if(errors.image.length===0 && errors.category.length===0 && errors.title.length===0 && errors.quantity.length===0 && errors.totalStock.length===0 && errors.price.length===0 && errors.description.length===0 && errors.units.length===0){
                axios.post('http://localhost:4500/stock-upload',stockData).then((res)=>{
                    console.log(res);
                })
                this.props.history.push('/vendor-home')            
            }
            else{
                alert("Enter Valid Details")
            }
        }
        else{
            alert("Please Fill the Form");
        }
    }
    render() {
        const {errors}=this.state;
        let formElements = [];
        for(let key in this.state.form){
            formElements.push({
                id:key,
                config:this.state.form[key]
            })
        }
        return(
            <div className="container">
                <Navbar/>
                <h1 className="p-4">Add Stock</h1>
                <form onSubmit={e=>this.submitData(e)} className="w-50 mx-auto">
                {formElements && formElements.map((formElement)=>
                        <div>
                            {errors[formElement.id].length>0 && <span className="text-danger fw-bolder">*{errors[formElement.id]}*</span>}
                            <FormItems key={formElement.id} config={formElement.config} handleChange={e=>this.handleChange(e)} />
                            {formElement.id==='image'?<img src="" id="img" alt="" height="200px" className="shadow rounded my-3 img-fluid rounded-start" />:''}                 
                        </div>
                        )}
                    <button type="submit" className="btn btn-success">Submit</button><br/>
                </form>
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


export default connect(mapStateToProps)(UploadProductPage);
    