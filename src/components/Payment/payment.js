import React from 'react';

export default class Payment extends React.Component{
    constructor(){
        super();
        this.state={
            nameErr:'',
            numErr:'',
            dateErr:'',
            cvvErr:'',
            visited:{
                name:false,
                num:false,
                date:false,
                cvv:false
            }
        }
    }

    handleName=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.name=true;
        if(value.length>0){
            if(!/^[A-Za-z]+$/.test(value)){
                this.setState({nameErr:'Enter only alphabets'});
            }
            else{
                this.setState({nameErr:''});
            }
        }
        else{
            this.setState({nameErr:'Enter Name'});
        }
    }
    handleCnum=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.num=true;
        if(value.length>0){
            if(/^([0-9]{16})$/.test(value)){
                this.setState({numErr:''})
            }
            else{
                this.setState({numErr:'Enter 16 digits'})
            }
        }
        else{
            this.setState({numErr:'Enter card number'})
        }
    }
    handleDate=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.date=true;
        if(value.length>0){
            if(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)){
                this.setState({dateErr:''})
            }
            else{
                this.setState({dateErr:'Enter valid date'})
            }
        }
        else{
            this.setState({dateErr:'Enter date'})
        }
    }
    handleCvv=e=>{
        e.preventDefault();
        let value=e.target.value;
        let visited = this.state.visited;
        visited.cvv=true;
        if(value.length>0){
            if(/^([0-9]{3})$/.test(value)){
                this.setState({cvvErr:''})
            }
            else{
                this.setState({cvvErr:'Enter 3 digits'})
            }
        }
        else{
            this.setState({cvvErr:'Enter CVV number'})
        }
    }
    handleSubmit=e=>{
        e.preventDefault();
        let {nameErr,numErr,cvvErr,dateErr}=this.state;
        let {visited} = this.state;
        if(visited.name  && visited.num && visited.cvv && visited.date){
            if(nameErr.length===0 && numErr.length===0 && cvvErr.length===0 && dateErr.length===0){
                //this.props.history.push('/booking/ticket');
                alert("Successfully paid")
            }
            else{
                alert('Please enter Valid fields')
            }
        }
        else{
            alert("Please Fill Valid Fields");
        }
    }
    paymentSummary=()=>{
        let list = JSON.parse(localStorage.getItem("cartList"));
        let totalCost = 0;
        for(let i = 0; i < list.length ; i++){
            totalCost = totalCost + (list[i].count * list[i].price);
        }
            return(
                <div className="p-5 mt-4 text-center">
                    <h3 className="text-success">Payment Summary</h3>
                    <table className="mx-auto text-right text-white bg-success border border-success fs-4">
                        <tr>
                            <td className="pr-5 pl-5 pt-4 pb-4">Total Items: </td>
                            <td className="pr-5 pl-5 pt-4 pb-4">{list.length}</td>
                        </tr>
                        <tr>
                            <td className="pr-5 pl-5 pt-4 pb-4">Total Amount: </td>
                            <td className="pr-5 pl-5 pt-4 pb-4">{totalCost}</td>
                        </tr>
                    </table>
                </div>
            )
    }
    render(){
        const {nameErr,numErr,cvvErr,dateErr}=this.state;
        return(
           <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <h1 className="mt-5">Payment</h1>
                        <form className="form-group" onSubmit={e=>this.handleSubmit(e)}>
                            <table className="mx-auto text-left mt-1">
                                <tr>
                                    <td className="p-4 text-right">Name on Card:</td>
                                    <td className="p-4"><input className="form-control" name="Cname"type="text" placeholder="Enter Name" onChange={this.handleName}/></td>
                                </tr>
                                <tr><td></td><td>{nameErr.length>0 && <span>*{nameErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-right">Card Number:</td>
                                    <td className="p-4"><input className="form-control" name="Cnum" type="text" placeholder="Enter Card Number" onChange={this.handleCnum}/></td>
                                </tr>
                                <tr><td></td><td>{numErr.length>0 && <span>*{numErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-right">Expiry Date:</td>
                                    <td className="p-4"><input className="form-control" num="Cdate" type="text" placeholder="MM/YY" onChange={this.handleDate}/></td>
                                </tr>
                                <tr><td></td><td>{dateErr.length>0 && <span>*{dateErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-right">CVV:</td>
                                    <td className="p-4"><input className="form-control" name="Cvv" type="password" placeholder="CVV" onChange={this.handleCvv}/></td>
                                </tr>
                                <tr><td></td><td>{cvvErr.length>0 && <span>*{cvvErr}*</span>}</td></tr>
                                <tr>
                                    <td className="p-4 text-center" colSpan="2"><button id="button" type="submit" className="btn btn-success">Pay</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                    <div className="col">
                        {this.paymentSummary()}
                    </div>
                </div>
           </div>
        )
    }
}