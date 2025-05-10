import { store } from '../../flux/Store';
import { setJardin } from '../../flux/Actions';

class EditGardenPage extends HTMLElement {
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

        const { plantas, jardin } = store.getState();

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 16px;
                }
                .card {
                    /* la opacidad ahora se maneja en PlantCard */
                }
            </style>
            <div class="container">
                <h2>Modificar Jardín</h2>
                <input type="text" value="${jardin.nombre}" placeholder="Nombre del Jardín" id="jardinNombre">
                <button id="guardarNombre">Guardar Nombre</button>
                <div>
                    ${plantas.map(p => `
                        <plant-card 
                            plant='${JSON.stringify(p)}' 
                            en-jardin='${jardin.plantas.includes(p.id)}'
                        ></plant-card>
                    `).join('')}
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('#guardarNombre')?.addEventListener('click', () => {
            const input = this.shadowRoot?.querySelector('#jardinNombre') as HTMLInputElement;
            if (input) {
                setJardin({ ...jardin, nombre: input.value });
                this.render();
            }
        });

        this.shadowRoot.querySelectorAll('plant-card').forEach(card => {
            card.addEventListener('plant-click', (e: any) => {
                const plantId = e.detail;
                const newPlantas = jardin.plantas.includes(plantId)
                    ? jardin.plantas.filter(id => id !== plantId)
                    : [...jardin.plantas, plantId];
                setJardin({ ...jardin, plantas: newPlantas });
                this.render();
            });
        });
    }
}

customElements.define('edit-garden-page', EditGardenPage); 