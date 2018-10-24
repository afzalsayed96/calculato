import types from '../../action_types';

export const initialState = {
  title: 'Calculator Demo',
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
