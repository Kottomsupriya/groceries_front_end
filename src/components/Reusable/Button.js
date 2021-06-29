import React from 'react';

//export default class Button extends React.Component{
  // render(){
  function Button(props) {  
  return(
            <button className="btn btn-success mt-3" type="submit">{props.buttonName}</button>
        )
    }
export default Button;
