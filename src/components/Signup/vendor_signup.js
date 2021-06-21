import React from 'react';
import './signup.css';
import * as signupFunction from './signupFunction'
import Navbar from '../NavBar/homeNavbar'

export default class VendorSignup extends React.Component{
    constructor(){
        super();
        this.state={
            userData:{
                name:'',
                email:'',
                mobile:'',
                company:'',
                password:'',
                address:''
            },
            errors:{
                name:'',
                email:'',
                mobile:'',
                company:'',
                password:'',
                address:''
            },
            visited:{
                name:false,
                email:false,
                mobile:false,
                company:false,
                password:false,
                address:false
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
            case 'name':
                visited.name=true;
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.name="Enter only characters";
                    }
                    else{
                        errors.name='';
                        userData.name=value;
                    }
                }
                else{
                    errors.name="Enter Name"
                }
                break;
            case 'email':
                visited.email=true;
                if(value.length>0){
                    if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)){
                        errors.email="Enter valid email"
                    }
                    else{
                        errors.email=""
                        userData.email=value;
                    }
                }
                else{
                    errors.email='Enter Password';
                }
                break;
            case 'company':
                visited.company=true;
                if(value.length>0){
                    if(!/^[A-Za-z ]+$/.test(value)){
                        errors.company="Enter only characters";
                    }
                    else{
                        errors.company='';
                        userData.company=value;
                    }
                }
                else{
                    errors.company="Enter Company Name"
                }
                break;
            case 'mobile':
                visited.mobile=true;
                if(value.length>0){
                    if(!/^\d{10}$/.test(value)){
                        errors.mobile="Enter 10 Digits";
                    }
                    else{
                        errors.mobile="";
                        userData.mobile=value;
                    }
                }
                else{
                    errors.mobile="Enter mobile number"
                }
                break;
            case 'password':
                visited.password=true;
                if(value.length>0){
                    if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(value)){
                        errors.password="Enter valid password";
                    }
                    else{
                        errors.password="";
                        userData.password=value;
                    }
                }
                else{
                    errors.password="Enter password"
                }
                userData.password=value;
                break;
            case 'address':
                visited.address=true;
                if(!value){
                    errors.address='Enter Address'
                }
                else{
                    errors.address=''
                    userData.address=value;
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
        if(visited.name && visited.email && visited.password && visited.company && visited.mobile && visited.address){
            if(errors.name.length===0 && errors.email.length===0 && errors.password.length===0 && errors.company.length===0 && errors.address.length===0 && errors.mobile.length===0){
                signupFunction.signupVendor(this.state.userData).then(res=>res.data);
                this.props.history.push('/login');
            }
            else{
                alert("Enter Valid Details")
            }
        }
        else{
            alert("Please Fill the Form");
        }
    }
    render(){
        const {errors}=this.state;
        return(
            <div className="container">
                <Navbar/>
                <div className="w-50 ml-auto mr-auto mt-5 mb-5 p-5 border border-success text-center">
                <h3 classname="font-weight-bold">Vendor Sign-Up</h3>
                <form onSubmit={e => this.submitData(e)}>
                    <div className="form-group">
                        <label  className="text-left">Name</label>
                        <input id="name" type="text" className="form-control" name="name" placeholder="Enter Your Name" onChange={e => this.handleUserdata(e)} />
                        {errors.name.length>0 && <span>*{errors.name}*</span>}
                    </div> 
                    <div className="form-group">
                        <label >Email</label>
                        <input id="email" type="text" className="form-control" name="email" placeholder="Enter Your email" onChange={e => this.handleUserdata(e)}/>
                        {errors.email.length>0 && <span>*{errors.email}*</span>}
                    </div>
                    <div className="form-group">
                        <label >Mobile Number</label>
                        <input id="mobile" type="text" className="form-control" name="mobile" placeholder="Enter number"onChange={e => this.handleUserdata(e)} />
                        {errors.mobile.length>0 && <span>*{errors.mobile}*</span>}
                    </div>
                    <div className="form-group">
                        <label  className="text-left">Company Name</label>
                        <input id="company" type="text" className="form-control" name="company" placeholder="Enter Your Company" onChange={e => this.handleUserdata(e)} />
                        {errors.company.length>0 && <span>*{errors.company}*</span>}
                    </div> 
                    <div className="form-group">
                        <label >Password</label>
                        <input id="password" type="password" className="form-control" name="password" placeholder="Enter Password" onChange={e => this.handleUserdata(e)} />
                        {errors.password.length>0 && <span>*{errors.password}*</span>}
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <textarea class="form-control" id="address" name="address" placeholder="Enter Address" rows="2" onChange={e => this.handleUserdata(e)}></textarea>
                        {errors.address.length>0 && <span>*{errors.address}*</span>}
                    </div>
                    <button type="submit" id="button" className="btn btn-success">Signup</button>
                </form>
                </div>
            </div>
        )
    }
}