import React from 'react'
import './login.css'
import * as loginFunction from './loginFunction.js';
import Navbar from '../NavBar/homeNavbar'
import { connect } from 'react-redux';
import FormItems from '../Reusable/FormItems';
import Button from '../Reusable/Button';

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            userEmail:'',
            userPassword:'',
            vendorEmail:'',
            vendorPassword:'',
            visited:{
                userEmail:false,
                userPassword:false,
                vendorEmail:false,
                vendorPassword:false
            },
            userForm:{
                useremail:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'userEmail',
                        name:'Email',
                        placeholder:"Enter Your email"
                    }
                },
                userpassword:{
                    elementType:'input',
                    elementConfig:{
                        type:'password',
                        id:'userPassword',
                        name:'Password',
                        placeholder:"Enter Your password"
                    }
                }
            },
            vendorForm:{
                vendoremail:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        id:'vendorEmail',
                        name:'Email',
                        placeholder:"Enter Your email"
                    }
                },
                vendorpassword:{
                    elementType:'input',
                    elementConfig:{
                        type:'password',
                        id:'vendorPassword',
                        name:'Password',
                        placeholder:"Enter Your password"
                    }
                }
            }
        }
    }
    handleChange=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        let value = e.target.value;
        let id = e.target.id;
        switch(id){
            case 'userEmail':
                visited.userEmail=true;
                this.setState({userEmail:value});
                break;
            case 'userPassword':
                visited.userPassword=true;
                this.setState({userPassword:value});
                break;
            case 'vendorEmail':
                visited.vendorEmail=true;
                this.setState({vendorEmail:value});
                break;
            case 'vendorPassword':
                visited.vendorPassword=true;
                this.setState({vendorPassword:value});
                break;
            default:
                break;
        }
    }
    toUserSignUp=e=>{
        e.preventDefault();
        this.props.history.push('/user-signup');
    }
    toVendorSignUp=e=>{
        e.preventDefault();
        this.props.history.push('/vendor-signup');
    }
    submitUserData=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        if(visited.userEmail && visited.userPassword){
            let login=false;
            let name='';
            let email=this.state.userEmail;
            let password=this.state.userPassword;
            loginFunction.user_login(email,password).then((res)=>{
                this.props.userLoginDispatcher(res.data)
                login=res.data.login;
                name=res.data.name;
                //localStorage.setItem('user_name',name);
                if(login){
                    var msg = 'Welcome '+name;
                    this.props.history.push('/user-home');
                    alert(msg);
                }
                else{
                    alert("invalid username/password");
                }
            })
        }
        else{
            alert("Please enter all fields");
        }
    }
    submitVendorData=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        if(visited.vendorEmail && visited.vendorPassword){
            let login=false;
            let name='';
            let email=this.state.vendorEmail;
            let password=this.state.vendorPassword;
            loginFunction.vendor_login(email,password).then((res)=>{
                this.props.vendorloginDispatcher(res.data);
                login=res.data.login;
                name=res.data.name;
                if(login){
                    var msg = 'Welcome '+name;
                    this.props.history.push('/vendor-home');
                    alert(msg);
                }
                else{
                    alert("invalid username/password");
                }
            })
        }
        else{
            alert("Please enter all fields");
        }
    }
    render(){
        let userFormElements = [];
        let vendorFormElements = [];
        for(let key in this.state.userForm){
            userFormElements.push({
                id:key,
                config:this.state.userForm[key]
            })
        }
        for(let key in this.state.vendorForm){
            vendorFormElements.push({
                id:key,
                config:this.state.vendorForm[key]
            })
        }
        return(
            <div className="container">
                <Navbar/>
                <div className="row mt-5 mb-5">
                    <div className="col m-5 p-5 border border-success shadow-lg p-3 mb-5 bg-body rounded">
                        <h3 className="fw-bolder">USER LOGIN</h3>
                        <form onSubmit={e => this.submitUserData(e)} className="my-4">
                        {userFormElements && userFormElements.map((formElement)=>
                            <FormItems key={formElement.id} config={formElement.config} handleChange={e=>this.handleChange(e)} />
                        )}
                            {/* <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" name="email" className="form-control" placeholder="Enter Your email" onChange={e => this.handleUserEmail(e)} />
                            </div> */}
                            {/* <FormItems elementType={this.state.useremail.elementType} elementConfig={this.state.useremail.elementConfig} handleChange={e=>this.handleChange(e)} /> */}
                            {/* <div className="form-group">
                                <label >Password</label>
                                <input id="password" type="password" name="password" className="form-control" placeholder="Enter Password" onChange={e => this.handleUserPassword(e)} />
                            </div> */}
                            {/* <FormItems elementType={this.state.userpassword.elementType} elementConfig={this.state.userpassword.elementConfig} handleChange={e=>this.handleChange(e)} /> */}
                            {/* <div className="mt-4">
                                <button type="submit" id="button" className="btn btn-success">Login</button>
                            </div> */}
                            <Button buttonName="Login"/>
                        </form>
                        <div className="mt-4">
                            New User? 
                            <a href="/#" onClick={e=>this.toUserSignUp(e)} className="text-blue"> Sign-Up Here</a>
                        </div>
                    </div>
                    <div className="col m-5 p-5 border border-success shadow-lg p-3 mb-5 bg-body rounded">
                        <h3 className="fw-bolder">VENDOR LOGIN</h3>
                        <form onSubmit={e => this.submitVendorData(e)} className="my-4">
                            {vendorFormElements && vendorFormElements.map((formElement)=>
                                <FormItems key={formElement.id} config={formElement.config} handleChange={e=>this.handleChange(e)} />
                            )}
                            <Button buttonName="Login"/>
                            {/* <div className="mt-4"><button type="submit" id="button" className="btn btn-success">Login</button></div> */}
                        </form>
                        <div className="mt-4">
                            New User? 
                            <a href="/#" onClick={e=>this.toVendorSignUp(e)} className="text-blue"> Sign-Up Here</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        userLoginDispatcher: (data) => dispatch({type:"userLogin",payload: data}),
        vendorloginDispatcher: (data) => dispatch({type:"vendorLogin",payload: data})
    }
}


export default connect(null,mapDispatchToProps)(Login)