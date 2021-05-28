import React from 'react';
import './homepage.css';
export default class Homepage extends React.Component{
    constructor(){
        super();
    }
    enterSite=e=>{
        e.preventDefault();
        this.props.history.push('/login');
    }
    render(){
        return(
            <div className="container">
                <div id="text">GREAT DEALS</div>
                <div id="text1">100% ORGANIC</div>
                <div id="text2">CONTACTLESS DELIVERIES</div>
                <div>
                    <a href="/#" onClick={e=>this.enterSite(e)}><button id="button1">Get Your Groceries Now</button></a>
                </div>
            </div>
        )
    }
}