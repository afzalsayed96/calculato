import types from "../action_types";
import keys from "../constants/calc";

const onCalcAction = (keyPressed, isNumber) => dispatch => {
  if (isNumber) {
    dispatch({ type: types.NUM_PRESSED, payload: parseInt(keyPressed) });
    return;
  }

  const op = {
    [keys.PLUS]: "+",
    [keys.MINUS]: "-",
    [keys.MULT]: "*",
    [keys.DIV]: "/"
  };

  switch (keyPressed) {
    case keys.CE:
      dispatch({ type: types.CE_PRESSED, payload: {} });
      break;
    case keys.EQ:
      dispatch({ type: types.EQ_PRESSED, payload: {} });
      break;
    default:
      dispatch({
        type: types.OP_PRESSED,
        payload: { display: keyPressed, value: op[keyPressed] }
      });
  }
};

export default onCalcAction;
