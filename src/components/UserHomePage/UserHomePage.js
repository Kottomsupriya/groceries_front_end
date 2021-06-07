import React from 'react';
import './userHomepage.css'
import * as stockSearchFunction from './stockSearch';
import fruitsImage from './images/fruits.jpg';
import vegetablesImage from './images/vegetables.jpg'
import dairyImage from './images/dairy.jpg'

export default class UserHomepage extends React.Component{
    constructor(){
        super();
        this.state={
            data:{
                search:''
            },
            dataList:[],
            noResults:false
        }
    }
    handleChange=(e)=>{
        e.preventDefault();
        let data = this.state.data;
        data.search=e.target.value;
        this.setState({data:data})
        alert(this.state.data.search);
    }
    handleCatChange=(e)=>{
        e.preventDefault();
        let data = this.state.data;
        data.search=e.target.value;
        this.setState({data:data})
        alert(this.state.data.search);
        stockSearchFunction.stockSearch(this.state.data).then((res)=>{
            alert(JSON.stringify(res));
        })
    }
    handleSearch=(e)=>{
        e.preventDefault();
        stockSearchFunction.stockSearch(this.state.data).then((res)=>{
            alert(JSON.stringify(res));
        })
    }
    render(){
        return(
            <div className="container">
                <div className="pt-3">
                    <form onSubmit={e=>this.handleSearch(e)}>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Search By Name, Category, Brand" id="searchBox" name="search" onChange={e=>this.handleChange(e)} />
                            <button class="btn btn-outline-success" type="submit" style={{width:"120px",fontSize:"20px"}}>Search</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="row pt-5">
                        <div className="col">
                            <div>
                                <img src={fruitsImage} style={{display:"block"}} width="400px" height="320px" alt="Fruits" />
                                <button id="catalogue_button" name="fruits" value="fruits" onClick={e=>this.handleCatChange(e)}>Fruits</button>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img src={vegetablesImage} style={{display:"block"}} width="400px" height="320px" alt="Vegetables" />
                                <button id="catalogue_button" name="vegetables" value="vegetables" onClick={e=>this.handleCatChange(e)}>Vegetables</button>
                            </div>
                        </div>
                        <div className="col">
                            <div>
                                <img src={dairyImage} style={{display:"block"}} width="400px" height="320px" alt="Dairy" />
                                <button id="catalogue_button" name="dairy" value="dairy" onClick={e=>this.handleChange(e)}>Dairy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}