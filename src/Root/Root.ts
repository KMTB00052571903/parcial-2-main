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

        const state = store.getState();
        const gardenPlants = state.gardenPlants || [];

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

                .plant-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                    gap: 16px;
                }

                .plant-card {
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                    padding: 12px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .plant-card img {
                    width: 80px;
                    height: 80px;
                    object-fit: contain;
                    margin-bottom: 8px;
                }

                .common-name {
                    font-weight: bold;
                    color: #2c3e50;
                }

                .scientific-name {
                    font-style: italic;
                    color: #7f8c8d;
                    font-size: 0.95em;
                }
            </style>

            <div class="nav">
                <button class="nav-button" onclick="store.dispatch({type: 'CHANGE_PAGE', payload: 'home'})">Inicio</button>
                <button class="nav-button" onclick="store.dispatch({type: 'CHANGE_PAGE', payload: 'garden'})">Modificar Jardín</button>
                <button class="nav-button" onclick="store.dispatch({type: 'CHANGE_PAGE', payload: 'admin'})">Modificar Plantas</button>
            </div>

            <div id="content">
                <h1>Mi Jardín Virtual</h1>
                <div class="plant-grid">
                    ${gardenPlants
                        .sort((a, b) => a.commonName.localeCompare(b.commonName))
                        .map(plant => `
                            <div class="plant-card">
                                <img src="${plant.image}" alt="${plant.commonName}">
                                <div class="common-name">${plant.commonName}</div>
                                <div class="scientific-name">${plant.scientificName}</div>
                            </div>
                        `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('root-element', Root);
        `;
    }
}

customElements.define('root-element', Root);
