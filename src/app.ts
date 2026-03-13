import { ErreurCustom } from './erreurs.js';

type Meal = {
    id: number;
    name: string;
    calories: number;
    price: number;
};

async function fetchMeals(): Promise<Meal[]> {
    try {
        const response = await fetch("https://keligmartin.github.io/api/meals.json");
        const meals = await response.json();
        console.log(meals);

        return meals;

    } catch (error) {
        console.error("Erreur du chargement des repas", error);
        if (error instanceof ErreurCustom) {
            alert(error.message);
        } else {
            alert("Erreur du chargement des repas");
        }
        throw error;
    }
}

fetchMeals();
