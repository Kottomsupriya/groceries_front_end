import React from "react";
import reactDom from "react-dom";
import './logo.css'

export default class Navbar extends React.Component{
    render(){
        return(
            <div>
                <nav className="navbar bg-success shadow rounded">
                    <div className="container text-white">
                        <div className="h1 text-start fw-bolder" id="logo">GROCERY STORE</div>
                        <ul class="nav justify-content-end">
                            <a className="btn btn-success" href="/login">Login</a>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}