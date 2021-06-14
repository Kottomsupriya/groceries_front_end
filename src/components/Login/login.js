import React from 'react'
import './login.css'
import * as loginFunction from './loginFunction.js'

export default class Login extends React.Component{
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
            }
        }
    }
    handleUserEmail=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        visited.userEmail=true;
        let value = e.target.value;
        this.setState({userEmail:value});
    }
    handleUserPassword=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        visited.userPassword=true;
        let value = e.target.value;
        this.setState({userPassword:value});
    }
    handleVendorEmail=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        visited.vendorEmail=true;
        let value = e.target.value;
        this.setState({vendorEmail:value});
    }
    handleVendorPassword=e=>{
        e.preventDefault();
        let visited=this.state.visited;
        visited.vendorPassword=true;
        let value = e.target.value;
        this.setState({vendorPassword:value});
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
                login=res.data.login;
                name=res.data.name;
                localStorage.setItem('user_name',name);
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
                login=res.data.login;
                name=res.data.name;
                localStorage.setItem('company_name',res.data.company);
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
        return(
            <div className="container w-75">
                <div className="row mt-5">
                    <div className="col m-5 p-5 border border-success">
                        <h3>User Login</h3>
                        <form onSubmit={e => this.submitUserData(e)}>
                            <div className="form-group">
                                <label for="email" className="text-left">Email</label>
                                <input id="email" type="text" name="email" className="form-control" placeholder="Enter Your email" onChange={e => this.handleUserEmail(e)} />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input id="password" type="password" name="password" className="form-control" placeholder="Enter Password" onChange={e => this.handleUserPassword(e)} />
                            </div>
                            <div className="mt-4"><button type="submit" id="button">Login</button></div>
                        </form>
                        <div className="mt-4">
                            New User? 
                            <a href="/#" onClick={e=>this.toUserSignUp(e)} className="text-blue"> Sign-Up Here</a>
                        </div>
                    </div>
                    <div className="col m-5 p-5 border border-success">
                        <h3>Vendor Login</h3>
                        <form onSubmit={e => this.submitVendorData(e)}>
                            <div className="form-group">
                                <label className="text-left">Email</label>
                                <input id="email" type="text" name="email" className="form-control" placeholder="Enter Your email" onChange={e => this.handleVendorEmail(e)} />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input id="password" type="password" name="password" className="form-control" placeholder="Enter Password" onChange={e => this.handleVendorPassword(e)} />
                            </div>
                            <div className="mt-4"><button type="submit" id="button">Login</button></div>
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