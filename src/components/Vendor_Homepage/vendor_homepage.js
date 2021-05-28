import React from 'react'

export default class VendorHomepage extends React.Component{
    constructor(){
        super();
    }
    handleStock=e=>{
        e.preventDefault();
        this.props.history.push('/view-stock');
    }
    handleUploadStock=e=>{
        e.preventDefault();
        this.props.history.push('/upload-stock');
    }
    render(){
        return(
            <div className="container mt-5 mb-5 p-5 w-50">
                <div className="row">
                    <div className="col">
                        <button onClick={e=>this.handleStock(e)}>View Your Stocks</button>
                    </div>
                    <div className="col">
                        <button onClick={e=>this.handleUploadStock(e)}>Upload Your Stocks</button>
                    </div>
                </div>
            </div>
        )
    }
}