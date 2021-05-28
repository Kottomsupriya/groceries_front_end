import React from 'react'
import './UploadProductPage.css'

export default class UploadProductPage extends React.Component {
    constructor(){
        super();
        this.state={
            userData:{
                title:'',
                quantity:'',
                stock:'',
                price:'',
                description:''
            },
            errors:{
                title:'',
                quantity:'',
                stock:'',
                price:'',
                description:''
               
            },
            visited:{
                title:'',
                quantity:'',
                stock:'',
                price:'',
                description:''
               
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
                    errors.title="Enter Title"
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
                case 'stock':
                visited.stock=true;
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.stock="Enter only characters";
                    }
                    else{
                        errors.stock='';
                        userData.stock=value;
                    }
                }
                else{
                    errors.stock="Enter Name"
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
                            if(!/^[A-Za-z ]+$/.test(value)){
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
                    if(visited.title && visited.quantity && visited.stock && visited.price && visited.description ){
                        if(errors.title.length===0 && errors.quantity.length===0 && errors.stock.length===0 && errors.price.length===0 && errors.description.length===0 ){
                            //   this.props.history.push('/login');
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
               <div className="upload">
                    <form onSubmit={e => this.submitData(e)}>
                 <div class="mb-3">
                    <label for="formFile" class="form-label"></label>
                      <input class="form-control" type="file" id="formFile" /><br/><br />
                 </div>



            <div className="form-group">
               <label className="title1">Title </label>
                  <input type="text" name="title" placeholder="Enter Title" onChange={e => this.handleUserdata(e)}/>
                   {errors.title.length>0 && <span>*{errors.title}</span>}
                <br/> <br/>
           </div>

           <div className="form-group">
            <label className="quantity1">Quantity </label>
            <input type="text" name="quantity" placeholder="Enter Quantity" onChange={e => this.handleUserdata(e)}/>
            {errors.quantity.length>0 && <span>*{errors.quantity}</span>} 
            <br/><br/>
            </div>

            <div className="form-group">
            <label className="stock1">Stock </label>
            <input type="text" name="Stock" placeholder="Enter Stock" onChange={e => this.handleUserdata(e)}/>
            {errors.stock.length>0 && <span>*{errors.stock}</span>}
            <br/> <br/>
            </div>

            <div className="form-group">
            <label className="price1">Price </label>
            <input type="text" name="price" placeholder="Enter Price" onChange={e => this.handleUserdata(e)}/>
            {errors.price.length>0 && <span>*{errors.price}</span>} 
            <br/> <br/>
            </div>

            <div className="form-group">
            <label className="description1">Description</label>
            <textarea type="text" name="description" placeholder="Enter Description" onChange={e => this.handleUserdata(e)}/>
            {errors.description.length>0 && <span>*{errors.description}</span>}
            <br/> <br/>
            </div>

            <button type="submit" id="button">Upload</button>
         </form>
        </div>
    )
}
}
    