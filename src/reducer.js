const reducer = (state, action) => {
  switch (action.type) {
    case 'modal':
      return {...state, modalState: action.payload};
    case 'count':
      return {
        ...state,
        counter: `${
          action.payload !== 0 ? parseInt(state.counter) + parseInt(action.payload) : action.payload
        }`,
      };
    default:
      return state;
  }
};

export default reducer;
