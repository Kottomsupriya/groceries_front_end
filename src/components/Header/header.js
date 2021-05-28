import React from 'react';
import './header.css'
export default class Header extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="container-fluid text-white" style={{height: 60,backgroundColor:"#1f7a1f"}}>
                <div className="container">
                    <div className="h1 text-start fw-bolder" id="logo_header">Grocery Store</div>
                </div>
            </div>
        )
    }
}