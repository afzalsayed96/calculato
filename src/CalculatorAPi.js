import React, { Component } from 'react';
import mexp from 'math-expression-evaluator';

const CalculatorApi = (props) => {

    const expr = props.location.pathname.slice(1);
    let result
    try {
        result = mexp.eval(expr)
    }
    catch (err) {
        result = '???'
    }
    return (

        <h1>
            <big><strong>{expr} = {result}</strong></big>
        </h1>
    )
}

export default CalculatorApi
