import { AppDispatcher } from './Dispatcher';

export const Actions = {
    do: () => {
        AppDispatcher.dispatch({ type: "SET_PLANTS" });
    },
};
