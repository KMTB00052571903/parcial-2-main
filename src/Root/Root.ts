import { store } from '../flux/Store';
import { setPagina } from '../flux/Actions';

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        store.subscribe(this.render.bind(this));
    }

    render() {
        if (!this.shadowRoot) return;

        const { pagina } = store.getState();

        this.shadowRoot.innerHTML = `
            <nav>
                <button onclick="this.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }))">Inicio</button>
                <button onclick="this.dispatchEvent(new CustomEvent('navigate', { detail: 'edit-garden' }))">Modificar Jardín</button>
                <button onclick="this.dispatchEvent(new CustomEvent('navigate', { detail: 'edit-plants' }))">Modificar Plantas</button>
            </nav>
            <div id="content">
                ${pagina === 'home' ? '<home-page></home-page>' : ''}
                ${pagina === 'edit-garden' ? '<edit-garden-page></edit-garden-page>' : ''}
                ${pagina === 'edit-plants' ? '<edit-plants-page></edit-plants-page>' : ''}
            </div>
        `;

        this.shadowRoot.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const page = target.getAttribute('onclick')?.split("'")[1];
                if (page) setPagina(page as 'home' | 'edit-garden' | 'edit-plants');
            });
        });
    }
}

export default Root;