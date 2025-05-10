import { store } from '../../flux/Store';
import { setPlantas } from '../../flux/Actions';

class EditPlantsPage extends HTMLElement {
    private selectedPlantId: string | null = null;
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

        const { plantas } = store.getState();
        const selectedPlant = this.selectedPlantId ? plantas.find(p => p.id === this.selectedPlantId) : null;

        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    padding: 16px;
                }
                .form {
                    margin-top: 16px;
                    padding: 16px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                }
                .form input, .form textarea {
                    width: 100%;
                    margin-bottom: 8px;
                    padding: 8px;
                }
                .form button {
                    padding: 8px 16px;
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
            </style>
            <div class="container">
                <h2>Modificar Plantas</h2>
                <div>
                    ${plantas.map(p => `
                        <plant-card 
                            plant='${JSON.stringify(p)}' 
                        ></plant-card>
                    `).join('')}
                </div>
                ${selectedPlant ? `
                    <div class="form">
                        <h3>Editar Planta</h3>
                        <input type="text" id="nombreComun" value="${selectedPlant.nombreComun}" placeholder="Nombre Común">
                        <input type="text" id="nombreCientifico" value="${selectedPlant.nombreCientifico}" placeholder="Nombre Científico">
                        <input type="text" id="imagen" value="${selectedPlant.imagen}" placeholder="URL de la Imagen">
                        <textarea id="descripcion" placeholder="Descripción">${selectedPlant.descripcion}</textarea>
                        <button id="guardarPlanta">Guardar Cambios</button>
                        <button id="cancelarEdicion">Cancelar</button>
                    </div>
                ` : ''}
            </div>
        `;

        this.shadowRoot.querySelectorAll('plant-card').forEach(card => {
            card.addEventListener('plant-click', (e: any) => {
                const plantId = e.detail;
                this.selectedPlantId = plantId;
                this.render();
            });
        });

        this.shadowRoot.querySelector('#guardarPlanta')?.addEventListener('click', () => {
            if (!this.selectedPlantId) return;

            const nombreComun = (this.shadowRoot?.querySelector('#nombreComun') as HTMLInputElement)?.value;
            const nombreCientifico = (this.shadowRoot?.querySelector('#nombreCientifico') as HTMLInputElement)?.value;
            const imagen = (this.shadowRoot?.querySelector('#imagen') as HTMLInputElement)?.value;
            const descripcion = (this.shadowRoot?.querySelector('#descripcion') as HTMLTextAreaElement)?.value;

            const updatedPlantas = plantas.map(p => 
                p.id === this.selectedPlantId 
                    ? { ...p, nombreComun, nombreCientifico, imagen, descripcion }
                    : p
            );

            setPlantas(updatedPlantas);
            this.selectedPlantId = null;
            this.render();
        });

        this.shadowRoot.querySelector('#cancelarEdicion')?.addEventListener('click', () => {
            this.selectedPlantId = null;
            this.render();
        });
    }
}

customElements.define('edit-plants-page', EditPlantsPage); 