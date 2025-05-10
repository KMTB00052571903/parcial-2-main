import { store } from '../../flux/Store';

class HomePage extends HTMLElement {
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

        const { plantas, jardin } = store.getState();
        const plantasEnJardin = plantas.filter(p => jardin.plantas.includes(p.id)).sort((a, b) => a.nombreComun.localeCompare(b.nombreComun));

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 16px;
                }
            </style>
            <div class="container">
                <h2>Mi Jardín: ${jardin.nombre}</h2>
                ${plantasEnJardin.map(p => `<plant-card plant='${JSON.stringify(p)}'></plant-card>`).join('')}
            </div>
        `;
    }
}

customElements.define('home-page', HomePage); 