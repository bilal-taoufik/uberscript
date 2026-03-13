export class ErreurCustom extends Error {
    constructor(message: string = "Erreur") {
        super(message);
        this.name = "Erreur";
    }
}