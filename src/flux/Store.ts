import { AppDispatcher, Action } from './Dispatcher';

export interface Plant {
    id: string;
    nombreComun: string;
    nombreCientifico: string;
    imagen: string;
    descripcion: string;
}

export type State = {
    plantas: Plant[];
    jardin: {
        nombre: string;
        plantas: string[]; // IDs de plantas en el jardín
    };
    pagina: 'home' | 'edit-garden' | 'edit-plants';
};

type Listener = (state: State) => void;

class Store {
    private _myState: State = {
        plantas: [
            { id: '1', nombreComun: 'Rosa', nombreCientifico: 'Rosa', imagen: 'https://mamabruja.com/wp-content/uploads/2021/10/ivan-jevtic-p7mo8-CG5Gs-unsplash-2-1200x800.jpg', descripcion: 'Arbusto de Asia, florece en primavera, requiere sol pleno y riego moderado.' },
            { id: '2', nombreComun: 'Girasol', nombreCientifico: 'Helianthus annuus', imagen: 'https://zinniaflors.com/modules/ph_simpleblog/covers/104.jpg', descripcion: 'Planta anual de América del Norte, florece en verano, requiere sol pleno y riego moderado.' },
            { id: '3', nombreComun: 'Tulipán', nombreCientifico: 'Tulipa', imagen: 'https://www.floristeriamorris.com/wp-content/uploads/todo-lo-que-necesitas-saber-sobre-tulipanes-cuidados-floracion-y-colores.jpg', descripcion: 'Bulbosa de Asia Central, florece en primavera, requiere sol pleno y riego moderado.' },
            { id: '4', nombreComun: 'Narciso', nombreCientifico: 'Narcissus', imagen: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUpMltGyNDbyx_62cTiXQRlW1LOLFTtALRaC-IiZk2FzvTchZ5ZMpXODNqlodZd75_M6bwT4r6kBX44Vq_UqWoKkzIT3pbdNb6n522x-kff8rJCwceZF2uziMlx5BNTmN_yH_x8srSezw/s1600/narciso-blanco-y-rosa.jpg', descripcion: 'Bulbosa de Europa, florece en primavera, requiere sol pleno y riego moderado.' },
            { id: '5', nombreComun: 'Lirio', nombreCientifico: 'Lilium', imagen: 'https://www.interflora.es/blog/wp-content/uploads/lirios-grandes-1-1024x894.jpg', descripcion: 'Perenne del Hemisferio Norte, florece en verano, requiere sol pleno y riego moderado.' },
            { id: '6', nombreComun: 'Caléndula', nombreCientifico: 'Calendula officinalis', imagen: 'https://sembramos.com.co/wp-content/uploads/2022/12/calendula-planta-pixabay-1200x800.jpg', descripcion: 'Anual de Europa del Sur, florece de primavera a otoño, requiere sol pleno y riego moderado.' },
            { id: '7', nombreComun: 'Clavel', nombreCientifico: 'Dianthus caryophyllus', imagen: 'https://inaturalist-open-data.s3.amazonaws.com/photos/38101/large.jpg', descripcion: 'Perenne de la región Mediterránea, florece de primavera a verano, requiere sol pleno y riego moderado.' },
            { id: '8', nombreComun: 'Pensamiento', nombreCientifico: 'Viola tricolor', imagen: 'https://estag.fimagenes.com/img/v2/7e5/1103989_534017_900.jpg', descripcion: 'Anual de Europa, florece de primavera a verano, requiere sol pleno y riego moderado.' },
            { id: '9', nombreComun: 'Hortensia', nombreCientifico: 'Hydrangea macrophylla', imagen: 'https://www.consumer.es/app/uploads/2019/07/img_hortensia-azul.jpg', descripcion: 'Arbusto de Asia, florece en verano, requiere sombra parcial y riego abundante.' },
            { id: '10', nombreComun: 'Azalea', nombreCientifico: 'Rhododendron', imagen: 'https://bouqs.com/blog/wp-content/uploads/2024/08/shutterstock_2470487527-min.jpg', descripcion: 'Arbusto de Asia, florece en primavera, requiere sombra parcial y riego moderado.' },
            { id: '11', nombreComun: 'Peonía', nombreCientifico: 'Paeonia', imagen: 'https://alblancatelier.com/cdn/shop/products/simbologiapeoniaalblanc2_800x.jpg?v=1745654627', descripcion: 'Perenne de Asia, florece de primavera a verano, requiere sol pleno y riego moderado.' },
            { id: '12', nombreComun: 'Orquídea', nombreCientifico: 'Orchidaceae', imagen: 'https://www.floresyplantas.net/wp-content/uploads/flor-de-phalaenopsis.jpg', descripcion: 'Epífita de distribución mundial, florece en temporadas variables, requiere luz indirecta y riego moderado.' },
            { id: '13', nombreComun: 'Iris', nombreCientifico: 'Iris germanica', imagen: 'https://www.lasaponaria.es/img/cms/800px-purple_iris_flower.jpg', descripcion: 'Perenne de Europa, florece en primavera, requiere sol pleno y riego moderado.' },
            { id: '14', nombreComun: 'Geranio', nombreCientifico: 'Pelargonium', imagen: 'https://jardineros.com.co/wp-content/uploads/2022/01/Geranio-o-novio2.jpg', descripcion: 'Perenne de África del Sur, florece de primavera a verano, requiere sol pleno y riego moderado.' },
            { id: '15', nombreComun: 'Lavanda', nombreCientifico: 'Lavandula angustifolia', imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/1200px-Single_lavender_flower02.jpg', descripcion: 'Arbusto de la región Mediterránea, florece en verano, requiere sol pleno y riego bajo.' },
            { id: '16', nombreComun: 'Salvia', nombreCientifico: 'Salvia officinalis', imagen: 'https://img77.uenicdn.com/image/upload/v1688101535/business/a377478f-3db9-4a6a-b011-d051a0c24541.jpg', descripcion: 'Arbusto de la región Mediterránea, florece en verano, requiere sol pleno y riego moderado.' },
            { id: '17', nombreComun: 'Tomillo', nombreCientifico: 'Thymus vulgaris', imagen: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Starr-080812-9700-Thymus_vulgaris-leaves-Makawao-Maui_%2824807095872%29.jpg', descripcion: 'Arbusto de la región Mediterránea, florece en verano, requiere sol pleno y riego bajo.' },
            { id: '18', nombreComun: 'Menta', nombreCientifico: 'Mentha', imagen: 'https://www.lasaponaria.es/img/cms/menta-immagine.jpg', descripcion: 'Perenne de Europa y Asia, florece en verano, requiere sol pleno a sombra parcial y riego abundante.' },
            { id: '19', nombreComun: 'Albahaca', nombreCientifico: 'Ocimum basilicum', imagen: 'https://agroactivocol.com/wp-content/uploads/2020/08/7e2db098-albahaca-basil-adobestock_81129315-scaled-1.jpg.webp', descripcion: 'Anual de India, florece en verano, requiere sol pleno y riego moderado.' },
            { id: '20', nombreComun: 'Perejil', nombreCientifico: 'Petroselinum crispum', imagen: 'https://www.finedininglovers.com/es/sites/g/files/xknfdk1706/files/2023-04/ES%20SEO%20Perejil_%C2%A9unsplash_chandan%20chaurasia%20%281%29_0.jpg', descripcion: 'Bienal de la región Mediterránea, florece en verano, requiere sol pleno a sombra parcial y riego moderado.' }
        ],
        jardin: { nombre: 'Mi Jardín', plantas: [] },
        pagina: 'home'
    };

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));
    }

    getState() {
        return this._myState;
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case "SET_PLANTAS":
                if (action.payload && Array.isArray(action.payload)) {
                    this._myState.plantas = action.payload;
                    this._emitChange();
                }
                break;
            case "SET_JARDIN":
                if (action.payload && typeof action.payload === 'object') {
                    this._myState.jardin = action.payload;
                    this._emitChange();
                }
                break;
            case "SET_PAGINA":
                if (action.payload && ['home', 'edit-garden', 'edit-plants'].includes(action.payload)) {
                    this._myState.pagina = action.payload as 'home' | 'edit-garden' | 'edit-plants';
                    this._emitChange();
                }
                break;
        }
    }

    private _emitChange(): void {
        for (const listener of this._listeners) {
            listener(this._myState);
        }
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
}

export const store = new Store();