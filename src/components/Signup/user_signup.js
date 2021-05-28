import React from 'react';
import './signup.css';
import * as signupFunction from './signupFunction'

export default class UserSignup extends React.Component{
    constructor(){
        super();
        this.state={
            userData:{
                name:'',
                email:'',
                mobile:'',
                password:'',
                dob:'',
                gender:'',
                address:''
            },
            errors:{
                name:'',
                email:'',
                mobile:'',
                password:'',
                dob:'',
                gender:'',
                address:''
            },
            visited:{
                name:false,
                email:false,
                mobile:false,
                password:false,
                dob:false,
                gender:false,
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
            case 'dob':
                visited.dob=true;
                if(!/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(value)){
                    errors.dob="Enter Date of Birth";
                }
                else{
                    errors.dob="";
                    userData.dob=value;
                }
                break;
            case 'gender':
                visited.gender=true;
                if(!(value==='male'||value==='female')){
                    errors.gender='Select a Gender'
                }
                else{
                    errors.gender='';
                    userData.gender=value;
                }
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
        if(visited.name && visited.email && visited.password && visited.dob && visited.gender && visited.mobile && visited.address){
            if(errors.name.length===0 && errors.email.length===0 && errors.password.length===0 && errors.dob.length===0 && errors.gender.length===0 && errors.mobile.length===0 && errors.address.length===0){
                signupFunction.signupUser(this.state.userData).then(res=>res.data);
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
            <div>
                <div className="container w-25 mt-5 mb-5 border border-success p-5">
                    <h3 classname="font-weight-bold">User Sign-Up</h3>
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
                            <label >Password</label>
                            <input id="password" type="password" className="form-control" name="password" placeholder="Enter Password" onChange={e => this.handleUserdata(e)} />
                            {errors.password.length>0 && <span>*{errors.password}*</span>}
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <textarea class="form-control" id="address" name="address" placeholder="Enter Address" rows="2" onChange={e => this.handleUserdata(e)}></textarea>
                            {errors.address.length>0 && <span>*{errors.address}*</span>}
                        </div>
                        <div className="form-group">
                            <label> Date of Birth</label>
                            <input id="dob" type="text" className="form-control" name="dob" placeholder="DD-MM-YYYY" onChange={e => this.handleUserdata(e)} />
                            {errors.dob.length>0 && <span>*{errors.dob}*</span>}
                        </div>
                        <div className="form-group">
                        <label>Gender</label><br/>
                            <div className="form-check form-check-inline">
                                <label >Male</label>
                                <input id="male" type="radio" className="form-check-input" name="gender" value="male" onChange={e => this.handleUserdata(e)} />
                            </div>
                            <div className="form-check form-check-inline">
                                <label>Female</label>
                                <input id="female" type="radio" className="form-check-input" name="gender" value="female" onChange={e => this.handleUserdata(e)} />
                            </div>
                            {errors.gender.length>0 && <span>{errors.gender}</span>}
                        </div>
                        <button type="submit" id="button">Signup</button>
                    </form>
                </div>
            </div>
        )
    }
}