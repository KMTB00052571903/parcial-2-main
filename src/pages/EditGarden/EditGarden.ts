import { store } from '../../flux/Store';
import { setJardin } from '../../flux/Actions';

class EditGardenPage extends HTMLElement {
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

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 16px;
                }
                .card {
                    opacity: 0.5;
                }
                .card.in-garden {
                    opacity: 1;
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
                            class="${jardin.plantas.includes(p.id) ? 'in-garden' : ''}"
                            onclick="this.dispatchEvent(new CustomEvent('toggle-plant', { detail: '${p.id}' }))"
                        ></plant-card>
                    `).join('')}
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('#guardarNombre')?.addEventListener('click', () => {
            const input = this.shadowRoot?.querySelector('#jardinNombre') as HTMLInputElement;
            if (input) {
                setJardin({ ...jardin, nombre: input.value });
            }
        });

        this.shadowRoot.querySelectorAll('plant-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                const plantId = target.getAttribute('onclick')?.split("'")[1];
                if (plantId) {
                    const newPlantas = jardin.plantas.includes(plantId)
                        ? jardin.plantas.filter(id => id !== plantId)
                        : [...jardin.plantas, plantId];
                    setJardin({ ...jardin, plantas: newPlantas });
                }
            });
        });
    }
}

customElements.define('edit-garden-page', EditGardenPage); 