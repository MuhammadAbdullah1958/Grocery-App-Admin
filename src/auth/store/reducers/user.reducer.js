import * as Actions from "../actions";

const initialState = {
  role: "guest",
  id: null,
};
console.log("Initial State:", initialState)
const user = function (state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      console.log("User Reducer:", action.payload)
      return {
        ...initialState,
        ...action.payload,
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState,
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
