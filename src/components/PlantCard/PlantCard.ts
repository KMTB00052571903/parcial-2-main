import { Plant } from '../../flux/Store';

class PlantCard extends HTMLElement {
    private plant: Plant = {
        id: '',
        nombreComun: '',
        nombreCientifico: '',
        imagen: '',
        descripcion: ''
    };

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['plant'];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === 'plant') {
            this.plant = JSON.parse(newValue);
            this.render();
        }
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    padding: 16px;
                    margin: 8px;
                    display: inline-block;
                    width: 200px;
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
    }
}

customElements.define('plant-card', PlantCard); 