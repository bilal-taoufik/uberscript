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
        console.error("Erreur lors du chargement des repas");
        alert("Erreur lors du chargement des repas");
        throw error;
    }
}

function afficherMeals(meals: Meal[]) {
    const mealList = document.getElementById("mealList")!;
    
    meals.forEach((meal) => {
        const li = document.createElement("li");
        li.textContent = `${meal.name} - ${meal.price}€`;

        const button = document.createElement("button");
        button.textContent = "Commander";
        button.onclick = () => console.log("Commande :", meal.name);

        li.appendChild(button);
        mealList.appendChild(li);
    });
}



fetchMeals().then(afficherMeals).catch(() => {});
