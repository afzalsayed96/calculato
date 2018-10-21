import React, { Component } from 'react';

const CalculatorApi = () => {

    const op1 = window.location.href.split('/')[3];
    const op2 = window.location.href.split('/')[4];
    
    let result
    try{
        if (op2!=null){
            result = escape(eval(op1+'/'+op2))
        }
        else{
        result = escape(eval(op1))
        }
    }
    catch(err){
        result = '???'
    }
    return(
        
        <h1>
            <big><strong>{(op1)+((op2!=null)?'/'+op2:'')} = {result}</strong></big>
        </h1>
    )
}

export default CalculatorApi