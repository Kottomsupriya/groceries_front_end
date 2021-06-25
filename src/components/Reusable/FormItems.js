import React from "react";

export default class FormItems extends React.Component{
    handleChange=(e)=>{
        this.props.handleChange(e);
    }
    render(){
        let input;
        switch(this.props.config.elementType){
            case 'input':
                input = <div className="form-group row pb-3">
                            <label htmlFor={this.props.config.elementConfig.id} className="col-sm-2 col-form-label">{this.props.config.elementConfig.name}:</label>
                            <div className="col-sm-10">
                                <input className="form-control" {...this.props.config.elementConfig} value={this.props.elementValue} onChange={e => this.handleChange(e)} />
                            </div>
                        </div>
                    break;
                case 'textarea':
                    input = <div className="form-group row pb-3">
                                <label htmlFor={this.props.config.elementConfig.id} className="col-sm-2 col-form-label">{this.props.config.elementConfig.name}:</label>
                                <div className="col-sm-10">
                                    <textarea className="form-control" {...this.props.config.elementConfig} value={this.props.elementValue} onChange={e=>this.handleChange(e)} />
                                </div>
                            </div>
                        break;
                case 'radio':
                    input = <div className="form-group row pb-3">
                                <label className="col-sm-2 col-form-label text-capitalize" htmlFor={this.props.config.elementConfig.id}>{this.props.config.elementConfig.id}:</label>
                                <div className="col-sm-10 text-left" id={this.props.config.elementConfig.id}>
                                    <div className="col-sm-10">
                                        {this.props.config.elementConfig.radios.map((radio)=>
                                        <div key={radio.id}>
                                            <input type="radio" {...radio} onChange={e => this.handleChange(e)} className="form-check-input"/>
                                            <label className="form-check-label text-capitalize" htmlFor={radio.id}>{radio.value}</label>
                                        </div> 
                                        )   
                                    }
                                    </div>
                                </div>
                            </div>
                            break;
                default:
                    break;
        }
        return(
            <div>
                {input}
            </div>

        )
    }
}