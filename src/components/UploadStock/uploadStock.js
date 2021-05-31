import React from 'react'
import './uploadProduct.css'

export default class UploadProductPage extends React.Component {
    constructor(){
        super();
        this.state={
            userData:{
                image:'',
                category:'',
                title:'',
                quantity:'',
                units:'',
                price:'',
                description:''
            },
            errors:{
                image:'',
                category:'',
                title:'',
                quantity:'',  
                units:'',
                price:'',
                description:''              
            },
            visited:{
                image:false,
                category:false,
                title:false,
                quantity:false, 
                units:'', 
                price:false,
                description:false
            }
        }
    }

    handleUserdata=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        const {name,value}=e.target;
        let userData = this.state.userData;
        let errors = this.state.errors;
        switch(name){
            case 'image':
                visited.title=true;
                if(!value){
                    errors.image="Please Upload a Image"
                }
                else{
                    errors.image="";
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
                        userData.category=value;
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
                        userData.title=value;
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
                        errors.quantity="Enter only Digits & Min 5 Digits";
                    }
                    else{
                        errors.quantity="";
                        userData.quantity=value;
                    }
                }
                else{
                    errors.quantity="Enter quantity"
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
                        userData.units=value;
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
                        userData.price=value;
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
                        userData.description=value;
                    }
                }
                else{
                    errors.description="Enter description";
                }
                break;
            default:
                break;            
        }
        this.setState({userData,[name]:value});
        this.setState({errors,[name]:value})
        this.setState({visited,[name]:value})
    }
    submitData = e=>{
        e.preventDefault();
        const {errors}=this.state;
        const {visited}=this.state;
        if(visited.image && visited.title && visited.quantity && visited.category && visited.price && visited.description && visited.units){
            if(errors.image.length===0 && errors.category.length===0 && errors.title.length===0 && errors.quantity.length===0 && errors.price.length===0 && errors.description.length===0 && errors.units.length===0){
                alert("submitted");
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
        return(
            <div className="container mt-5">
                <table className="mr-auto ml-auto" cellPadding="5">
                    <tr>
                        <td className="text-right">Upload Image</td>
                        <td>
                            <div className="pl-5 ml-4">
                                <input type="file" name="image"/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{errors.image.length>0 && <span>*{errors.image}</span>}</td>
                    </tr>
                    <tr>
                        <td className="text-right"> Category</td>
                        <td>
                            <div className=" w-100">
                                <input type="text" name="category" placeholder="Enter Category" size="25" onChange={e => this.handleUserdata(e)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{errors.category.length>0 && <span>*{errors.category}</span>}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Title</td>
                        <td>
                            <div className="">
                                <input type="text" name="title" placeholder="Enter Title" size="25" onChange={e => this.handleUserdata(e)}/>
                            </div>
                        </td>
                    </tr>
                    <tr className="m-0">
                        <td></td>
                        <td>{errors.title.length>0 && <span>*{errors.title}</span>}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Quantity</td>
                        <td>
                            <div className="">
                                <input type="text" name="quantity" placeholder="Enter Quantity" size="25" onChange={e => this.handleUserdata(e)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{errors.quantity.length>0 && <span>*{errors.quantity}</span>} </td>
                    </tr>
                    <tr>
                        <td className="text-right">Units</td>
                        <td>
                        <input type="text" name="units" placeholder="Enter Units" size="25" onChange={e => this.handleUserdata(e)}/>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{errors.units.length>0 && <span>*{errors.units}</span>}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Price</td>
                        <td>
                            <div className="">
                                <input type="text" name="price" placeholder="Enter Price" size="25" onChange={e => this.handleUserdata(e)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{errors.price.length>0 && <span>*{errors.price}</span>}</td>
                    </tr>
                    <tr>
                        <td className="text-right">Description</td>
                        <td>
                            <div className="">
                                <textarea type="text" name="description" placeholder="Enter Description" cols="28" onChange={e => this.handleUserdata(e)}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{errors.description.length>0 && <span>*{errors.description}</span>}</td>
                    </tr>
                </table>
                <button type="submit" id="button" onClick={e=>this.submitData(e)}>Upload</button>
            </div>
            
    )
}
}
    