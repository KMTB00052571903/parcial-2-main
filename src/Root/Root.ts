import { store } from '../flux/Store';
import { setPagina } from '../flux/Actions';

class Root extends HTMLElement {
    private unsubscribe: (() => void) | null = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        const listener = () => this.render();
        store.subscribe(listener);
        this.unsubscribe = () => store.unsubscribe(listener);
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    render() {
        if (!this.shadowRoot) return;

        const { pagina } = store.getState();

        this.shadowRoot.innerHTML = `
            <style>
                nav {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 24px;
                    background: #f5f5f5;
                    padding: 12px 0;
                    border-radius: 8px;
                }
                button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    background: #e0e0e0;
                    cursor: pointer;
                    font-size: 1rem;
                }
                button.active {
                    background: #4CAF50;
                    color: white;
                }
                #content {
                    min-height: 300px;
                }
            </style>
            <nav>
                <button id="btn-inicio" class="${pagina === 'home' ? 'active' : ''}">Inicio</button>
                <button id="btn-jardin" class="${pagina === 'edit-garden' ? 'active' : ''}">Modificar Jardín</button>
                <button id="btn-plantas" class="${pagina === 'edit-plants' ? 'active' : ''}">Modificar Plantas</button>
            </nav>
            <div id="content">
                ${pagina === 'home' ? '<home-page></home-page>' : ''}
                ${pagina === 'edit-garden' ? '<edit-garden-page></edit-garden-page>' : ''}
                ${pagina === 'edit-plants' ? '<edit-plants-page></edit-plants-page>' : ''}
            </div>
        `;

        this.shadowRoot.querySelector('#btn-inicio')?.addEventListener('click', () => setPagina('home'));
        this.shadowRoot.querySelector('#btn-jardin')?.addEventListener('click', () => setPagina('edit-garden'));
        this.shadowRoot.querySelector('#btn-plantas')?.addEventListener('click', () => setPagina('edit-plants'));
    }
}

export default Root;