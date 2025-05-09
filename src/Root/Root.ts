import { store } from '../flux/Store';

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        store.subscribe(() => this.render());
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }

                .nav {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 20px;
                    padding: 10px;
                    background: #f8f9fa;
                    border-radius: 8px;
                }

                .nav-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    background: #007bff;
                    color: white;
                    cursor: pointer;
                }

                .nav-button:hover {
                    background: #0056b3;
                }
            </style>

            <div class="nav">
                <button class="nav-button" onclick="store.dispatch({type: 'CHANGE_PAGE', payload: 'home'})">Inicio</button>
                <button class="nav-button" onclick="store.dispatch({type: 'CHANGE_PAGE', payload: 'garden'})">Modificar Jardín</button>
                <button class="nav-button" onclick="store.dispatch({type: 'CHANGE_PAGE', payload: 'admin'})">Modificar Plantas</button>
            </div>

            <div id="content">
                <h1>Bienvenido a tu Jardín Virtual</h1>
            </div>
        `;
    }
}

customElements.define('root-element', Root);
