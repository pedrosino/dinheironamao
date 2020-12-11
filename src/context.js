import React, { createContext, useReducer } from 'react';

const user = createContext(0);

const { Provider } = user;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, value) => {
    /*switch(action.type) {
      case 'action description':
        const newState = 'hello';// do something with the action
        return newState;
      default:
        throw new Error();
    };*/
    return value;
  }, 0);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { user, StateProvider };