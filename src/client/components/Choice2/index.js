import React, { useEffect } from "react";
import "./choice2.css";
// const sd  = require('./qwe.jpeg');
const Choice2 = (props) => {
    return(
        <div>
        {props.image ? 
        <div className="photo" onClick={() => props.onClick()}><img src={require(`../../seds/images/${props.image}`)} alt={props.value}/></div>
            :
        <div>Loading</div>}
        </div>
    )
}

export default Choice2;

// src={require(`../../seds/images/${props.image}`)}