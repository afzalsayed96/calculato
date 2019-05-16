import types from '../../action_types';

export const initialState = {
  title: 'Calculato',
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
