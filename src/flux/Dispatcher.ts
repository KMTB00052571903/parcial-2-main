import { Plant } from '../services/Plants';

export interface Action {
    type: 'SET_PLANTS' | 'ADD_TO_GARDEN' | 'REMOVE_FROM_GARDEN' | 'CHANGE_PAGE' | 'UPDATE_GARDEN_NAME';
    payload?: Plant[] | number | string;
}

export class Dispatcher {
    private _listeners: Array<(action: Action) => void>;

    constructor() {
        this._listeners = [];
    }

    register(callback: (action: Action) => void): void {
        this._listeners.push(callback);
    }

    dispatch(action: Action): void {
        for (const listener of this._listeners) {
            listener(action);
        }
    }
}

export const AppDispatcher = new Dispatcher();
