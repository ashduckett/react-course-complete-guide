import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};


// This will be a part of every component that uses it
export const useStore = (shouldListen = true) => {

    // We create some state which has the global state as its initial value.
    const setState = useState(globalState)[1];

    // This function receives the action name and possibly a payload.
    // We grab the action out of our actions array passing in the state and the payload
    // This will return the new state which can then be merged to form the new global state.
    // We then call all registered listeners, passing in that new state and each listener is
    // actually a setState function attached to a listening component.
    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);


        globalState = { ...globalState, ...newState };

        for (const listener of listeners) {
            listener(globalState);
        }
    };

    useEffect(() => {
        if (shouldListen) {
            listeners.push(setState);
        }


        return () => {
            if (shouldListen) {
                listeners = listeners.filter(li => li !== setState);
            }
        }
    }, [setState, shouldListen]);

    return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions };
};