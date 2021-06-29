import React from 'react';

export default function Textarea(props){
    return(
        <div className="form-group row pb-3">
            <label htmlFor={props.config.id} className="col-sm-2 col-form-label">{props.config.name}:</label>
            <div className="col-sm-10">
                <textarea className="form-control" {...props.config} value={props.elementValue} />
            </div>
        </div>
    )
}