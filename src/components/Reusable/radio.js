import React from 'react';

export default function Radio(props){
    return(
        // <div className="form-group row pb-3">
        //     <label htmlFor={props.config.id} className="col-sm-2 col-form-label">{props.config.name}:</label>
        //     <div className="col-sm-10">
        //         <input className="form-control" {...props.config} value={props.elementValue} />
        //     </div>
        // </div>
        <div className="form-group row pb-3">
            <label className="col-sm-2 col-form-label text-capitalize" htmlFor={props.config.id}>{props.config.id}:</label>
            <div className="col-sm-10 text-left" id={props.config.id}>
                <div className="col-sm-10">
                    {props.config.radios.map((radio)=>
                        <div key={radio.id}>
                            <input type="radio" {...radio}  className="form-check-input"/>
                            <label className="form-check-label text-capitalize" htmlFor={radio.id}>{radio.value}</label>
                        </div> 
                    )}
                </div>
            </div>
        </div>
    )
}