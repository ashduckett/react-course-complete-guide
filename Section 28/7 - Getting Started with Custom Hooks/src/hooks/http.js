import { useReducer, useCallback } from "react";

const httpReducer = (curHttpState, action) => {
    switch(action.type) {
      case 'SEND':
        return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
      case 'RESPONSE':
        return { ...curHttpState, loading: false, data: action.responseData, extra: action.extra };
      case 'ERROR':
        return { loading: false, error: action.errorMessage };
      case 'CLEAR':
        return { ...curHttpState, error: null };
      default:
        throw new Error('Should now be reached!');
    }
  };

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null, data: null, extra: null, identifier: null });

    const sendRequest = useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp( { type: 'SEND', identifier: reqIdentifier } );
        
        // `https://react-hooks-update-97da8-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`
        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(responseData => {
            dispatchHttp( { type: 'RESPONSE', responseData: responseData, extra: reqExtra } );
        }).catch(error => {
            dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
        });

    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        reqIdentifier: httpState.identifier
    }
};

export default useHttp;