import { AppDispatcher } from './Dispatcher';

export const setPlantas = (plantas: any[]) => {
    AppDispatcher.dispatch({
        type: 'SET_PLANTAS',
        payload: plantas
    });
};

export const setJardin = (jardin: { nombre: string; plantas: string[] }) => {
    AppDispatcher.dispatch({
        type: 'SET_JARDIN',
        payload: jardin
    });
};

export const setPagina = (pagina: 'home' | 'edit-garden' | 'edit-plants') => {
    AppDispatcher.dispatch({
        type: 'SET_PAGINA',
        payload: pagina
    });
};