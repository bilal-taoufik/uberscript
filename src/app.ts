import { User, Meal } from './users.js';
import { TropPauvreErreur } from './erreurs.js';

const user = new User(1, "Bob", 30);

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

// affichage des repas
function afficherMeals(meals: Meal[]) {
    const mealList = document.getElementById("mealList")!;

    meals.forEach((meal) => {
        const li = document.createElement("li");
        li.textContent = `${meal.name} - ${meal.price}€`;

        const button = document.createElement("button");
        button.textContent = "Ajouter";
        button.onclick = () => {
            try {
                user.orderMeal(meal);
                afficherWallet();
                afficherMenu();
            } catch (error) {
                if (error instanceof TropPauvreErreur) {
                    alert(error.message);
                }
            }
        };

        li.appendChild(button);
        mealList.appendChild(li);
    });
}


// affichage du solde
function afficherWallet() {
    document.getElementById("wallet")!.textContent = `Solde : ${user.wallet}€`;
}

// affichage du menu
function afficherMenu() {
    const history = document.getElementById("menuList")!;
    history.innerHTML = "";
    user.orders.forEach((order) => {
        const li = document.createElement("li");
        li.textContent = `${order.meals[0].name} — ${order.total}€`;
        history.appendChild(li);
    });
}



async function init(): Promise<void> {
    afficherWallet();
    afficherMenu();
    try {
        const meals = await fetchMeals();
        afficherMeals(meals);
    } catch {}
}

init();