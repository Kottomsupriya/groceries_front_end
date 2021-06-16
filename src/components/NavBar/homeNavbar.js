import React from "react";
import reactDom from "react-dom";

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar bg-success">
                    <div className="container text-white">
                        <div className="h1 text-start fw-bolder" id="logo_header">Grocery Store</div>
                    </div>
                </nav>
            </div>
        )
    }
}