// TODO: arregla typos de "error", maneja caso de error y exito
export interface Plant {
    id: number;
    commonName: string;
    scientificName: string;
    image: string;
    description: string;
    careInstructions: string;
    sunLight: string;
    water:string;
    temperature:string;
}
export async function getPlants(): Promise<Plant[]> {
    try {
        const response = await fetch('http://192.168.131.101:8080/dca/api/plants');
        if (!response.ok) {
            throw new Error('Error al obtener las plantas');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}
