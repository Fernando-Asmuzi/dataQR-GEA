export interface Image {
    tipo: string | ArrayBuffer | null;
    encodedImage: string;
}

export const emptyImage = (): Image => ({
    tipo: '',
    encodedImage: ''
});