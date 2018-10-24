import types from "../../action_types";
import mexp from "math-expression-evaluator";
import keys from "../../constants/calc";

export const initialState = {
  display: "",
  expression: "",
  opAllowed: false
};

const calculate = expr => {
  try {
    return mexp.eval(expr);
  } catch (err) {
    return keys.ERR;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.NUM_PRESSED: {
      const num = action.payload;
      return { display: `${state.display}${num}`, expression: `${state.expression}${num}`, opAllowed: true }; 
    }
    case types.OP_PRESSED: {
      if (!state.opAllowed) return state;
      const { display, value } = action.payload;
      return { display: `${state.display} ${display} `, expression: `${state.expression} ${value} `, opAllowed: false }; 

    }
    case types.EQ_PRESSED: {
      const result = calculate(state.expression);
      return { ...initialState, display: result, expression: result };
    }
    case types.CE_PRESSED: {
      return initialState;
    }
    default:
      return state;
  }
}
