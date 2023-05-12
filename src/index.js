import {Pizza} from "./pizza.js";
import {PizzaType} from "./pizza.js";
import {PizzaSize} from "./pizza.js";
import {AdditionallyAddPizza} from "./pizza.js";

const pizza = new Pizza(null, null);

function createPizzaButton(pizzaType) {
    const pizzaButtonContainer = document.createElement("div");
    pizzaButtonContainer.classList.add("PizzaButtonContainer")
    const pizzaButton = document.createElement("button");
    const pizzaImg = document.createElement("img");
    const pizzaNameSpan = document.createElement("span");
    if (pizzaType === PizzaType.Margaret) {
        pizzaImg.src = "assets/img/Margaret.jpg";
        pizzaImg.alt = "Margaret Pizza";
    } else if (pizzaType === PizzaType.Pepperoni) {
        pizzaImg.src = "assets/img/Pepperoni.jpg";
        pizzaImg.alt = "Pepperoni Pizza";
    } else if (pizzaType === PizzaType.Bavarian) {
        pizzaImg.src = "assets/img/Bavarian.jpeg";
        pizzaImg.alt = "Bavarian Pizza";
    }

    pizzaNameSpan.textContent = pizzaType.name;

    pizzaButton.classList.add('PizzaTypeStyle');
    pizzaButton.appendChild(pizzaImg);
    pizzaButton.appendChild(pizzaNameSpan);
    pizzaButtonContainer.appendChild(pizzaButton);

    pizzaButton.addEventListener("click", function() {
        pizza.type = pizzaType;
        updateButtonBuyText();
    });

    return pizzaButtonContainer;
}

function createToppingButton(toppingType) {
    const toppingButtonContainer = document.createElement("div");
    toppingButtonContainer.classList.add("ToppingListDiv")
    const toppingButton = document.createElement("button");
    const toppingImg = document.createElement("img");
    const toppingNameSpan = document.createElement("span");
    toppingNameSpan.classList.add("ToppingNameSpan")

    if (toppingType === AdditionallyAddPizza.CreamyMozzarella) {
        toppingImg.src = "assets/img/CreamyMozzarella.jpg";
        toppingImg.alt = "Creamy Mozzarella";
    } else if (toppingType === AdditionallyAddPizza.CheeseBoard) {
        toppingImg.src = "assets/img/CheeseBoard.png";
        toppingImg.alt = "Cheese Board";
    } else if (toppingType === AdditionallyAddPizza.CheddarParmesan) {
        toppingImg.src = "assets/img/CheddarParmesan.jpg";
        toppingImg.alt = "Cheddar Parmesan";
    }


    if(pizza.size !== null){
        toppingNameSpan.textContent = `${toppingType.name} ${toppingType.info[pizza.size.id === 'small' ? 'small' : 'big'].price}`;
    }else{
        toppingNameSpan.textContent = `${toppingType.name} 0`;
    }

    toppingButton.classList.add('toppingButtonStyle');
    toppingButton.appendChild(toppingImg);
    toppingButton.appendChild(toppingNameSpan);
    toppingButtonContainer.appendChild(toppingButton);

    const toppingCountContainer = document.createElement("div");
    const toppingCountPlusButton = document.createElement("button");
    const toppingCountMinusButton = document.createElement("button");
    const toppingCountValue = document.createElement("span");

    toppingCountContainer.classList.add('toppingCountContainer');
    toppingCountPlusButton.classList.add('toppingCountButton');
    toppingCountMinusButton.classList.add('toppingCountButton');
    toppingCountValue.classList.add('toppingCountValue');

    toppingCountPlusButton.textContent = "+";
    toppingCountMinusButton.textContent = "-";
    toppingCountValue.textContent = "1";

    toppingCountContainer.appendChild(toppingCountMinusButton);
    toppingCountContainer.appendChild(toppingCountValue);
    toppingCountContainer.appendChild(toppingCountPlusButton);

    toppingCountContainer.style.display = "none";

    toppingButtonContainer.appendChild(toppingCountContainer);

    let count = 0;

    toppingButton.addEventListener("click", function () {
        toppingCountContainer.style.display = "block";
        if(count !== 1){
            pizza.addTopping(toppingType);
            updateButtonBuyText();
            count = 1;
        }

        toppingCountPlusButton.addEventListener("click", function () {
            let count = parseInt(toppingCountValue.textContent) + 1;
            if (count <= 10) {
                toppingCountValue.textContent = count.toString();
                pizza.addTopping(toppingType);
                updateButtonBuyText();
            }
        });

        toppingCountMinusButton.addEventListener("click", function () {
            let count = parseInt(toppingCountValue.textContent) - 1;
            if (count >= 0) {
                toppingCountValue.textContent = count.toString();
                pizza.removeTopping(toppingType);
                updateButtonBuyText();
            }
        });
    });

    return toppingButtonContainer
}

function createPizzaSizeButtons() {
    const pizzaSizeContainer = document.createElement("div");
    pizzaSizeContainer.classList.add("PizzaSizeContainer");
    const bigButton = document.createElement("button");
    bigButton.classList.add("button_size_big")
    const smallButton = document.createElement("button");
    smallButton.classList.add("button_size_small");
    bigButton.textContent = PizzaSize.Big.name;
    smallButton.textContent = PizzaSize.Small.name;

    pizzaSizeContainer.appendChild(bigButton);
    pizzaSizeContainer.appendChild(smallButton);

    bigButton.addEventListener("click", function() {
        pizza.size = PizzaSize.Big;
        updateButtonBuyText();
    });

    smallButton.addEventListener("click", function() {
        pizza.size = PizzaSize.Small;
        updateButtonBuyText();
    });

    return pizzaSizeContainer;
}


function createButtonBuy() {
    const buttonBuyContainer = document.createElement("div");

    const buttonBuy = document.createElement("button");
    buttonBuy.classList.add("button_buy");
    buttonBuyContainer.appendChild(buttonBuy);

    if (pizza.type !== null) {
        buttonBuy.textContent = `Добавить к корзину за ${pizza.calculatePrice()} (${pizza.calculateCalories()} кКалл)`;
    } else {
        buttonBuy.textContent = `Добавить к корзину за 0 (0 кКалл)`;
    }

    buttonBuy.setAttribute("id", "button-buy");

    return buttonBuyContainer;
}

function updateButtonBuyText() {
    const buttonBuy = document.querySelector(".button_buy");
    if (buttonBuy) {
        if (pizza.type === null || pizza.size === null) {
            buttonBuy.textContent = `Добавить к корзину за 0 (0 кКалл)`;
        } else {
            buttonBuy.textContent = `Добавить к корзину за ${pizza.calculatePrice()} (${pizza.calculateCalories()} кКалл)`;
        }
    }
}

const pizzaButtonContainer = document.createElement("div");
pizzaButtonContainer.classList.add("PizzaList");
const pizzaButtonsWindow = [createPizzaButton(PizzaType.Margaret), createPizzaButton(PizzaType.Pepperoni), createPizzaButton(PizzaType.Bavarian)];

pizzaButtonsWindow.forEach(button => {
    pizzaButtonContainer.appendChild(button);
});

const pizzaSizeButtons = createPizzaSizeButtons();
const toppingButtonContainer = document.createElement("div");
toppingButtonContainer.classList.add("ToppingList");
const toppingButtons = [createToppingButton(AdditionallyAddPizza.CreamyMozzarella), createToppingButton(AdditionallyAddPizza.CheeseBoard), createToppingButton(AdditionallyAddPizza.CheddarParmesan)];
toppingButtons.forEach(button => {
    if (button !== undefined) {
        toppingButtonContainer.appendChild(button);
    }
});
const buttonBuy = createButtonBuy();
updateButtonBuyText();

const h1 = document.createElement("h1");
h1.textContent = "Выбери размер";
const OrderList = document.createElement("div");
OrderList.classList.add("OrderList");
OrderList.appendChild(h1);
OrderList.appendChild(pizzaSizeButtons);
OrderList.appendChild(toppingButtonContainer);
OrderList.appendChild(buttonBuy);

const warpPizzaWindow = document.createElement("div");
warpPizzaWindow.classList.add("warpPizzaWindow");
warpPizzaWindow.appendChild(pizzaButtonContainer);
warpPizzaWindow.appendChild(OrderList);
document.body.appendChild(warpPizzaWindow)



