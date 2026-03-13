export class TropPauvreErreur extends Error {
    constructor(solde: number, prix: number) {
        super(`Fonds insuffisants — solde : ${solde}€, prix : ${prix}€`);
        this.name = "TropPauvreErreur";
    }
}