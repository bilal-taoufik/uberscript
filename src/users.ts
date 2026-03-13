import { TropPauvreErreur } from './erreurs.js';

export type Meal = {
    id: number;
    name: string;
    calories: number;
    price: number;
}

export type Order = {
    id: number;
    meals: Meal[];
    total: number;
}

export class User {
    id: number;
    name: string;
    wallet: number;
    orders: Order[];

    constructor(id: number, name: string, wallet: number) {
        this.id = id;
        this.name = name;
        this.wallet = wallet;
        this.orders = [];
    }
    orderMeal(meal: Meal): void {
        if (this.wallet < meal.price) {
            throw new TropPauvreErreur(this.wallet, meal.price);
        }

        this.wallet -= meal.price;

        this.orders.push({
            id: this.orders.length + 1,
            meals: [meal],
            total: meal.price
        });

        localStorage.setItem("orders", JSON.stringify(this.orders));
    }
}