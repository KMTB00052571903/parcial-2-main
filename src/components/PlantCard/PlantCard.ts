import { Plant } from '../../flux/Store';

class PlantCard extends HTMLElement {
    private plant: Plant = {
        id: '',
        nombreComun: '',
        nombreCientifico: '',
        imagen: '',
        descripcion: ''
    };

    static get observedAttributes() {
        return ['plant', 'en-jardin'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'plant') {
            this.plant = JSON.parse(newValue);
        }
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;
        const enJardin = this.getAttribute('en-jardin') === 'true';
        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 8px;
                    display: inline-block;
                    width: 200px;
                    cursor: pointer;
                    opacity: ${enJardin ? '1' : '0.5'};
                }
                img {
                    width: 100%;
                    height: auto;
                }
            </style>
            <div class="card">
                <img src="${this.plant.imagen}" alt="${this.plant.nombreComun}">
                <h3>${this.plant.nombreComun}</h3>
                <p>${this.plant.nombreCientifico}</p>
            </div>
        `;
        this.shadowRoot.querySelector('.card')?.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('plant-click', {
                detail: this.plant.id,
                bubbles: true,
                composed: true
            }));
        });
    }
}

customElements.define('plant-card', PlantCard); 