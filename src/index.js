class PizzaType{
    static Margaret = {
        id: "Margaret",
        name: "Маргарита",
        price: 500,
        calories: 300
    }

    static Pepperoni = {
        id: "Pepperoni",
        name: "Пеперони",
        price: 800,
        calories: 400
    }

    static Bavarian = {
        id: "Bavarian",
        name: "Бавария",
        price: 700,
        calories: 450
    }
}
class PizzaSize {
    static Big = {
        id: "big",
        name: "Большая",
        price: 200,
        calories: 200
    }

    static Small = {
        id: "small",
        name: "Маленькая",
        price: 100,
        calories: 100
    }
}

class AdditionallyAddPizza {
    static CreamyMozzarella = {
        id: "CreamyMozzarella",
        name: "Сливочная Мацарела",
        info: {
            small: {
                price: 50,
                calories: 0
            },
            big: {
                price: 100,
                calories: 0
            }
        }
    }

    static CheeseBoard = {
        id: "CheeseBoard",
        name: "Сырный борт",
        info: {
            small: {
                price: 150,
                calories: 50
            },
            big: {
                price: 300,
                calories: 50
            }
        }
    }

    static CheddarParmesan = {
        id: "CheddarParmesan",
        name: "Чедер и пармезан",
        info: {
            small: {
                price: 150,
                calories: 50
            },
            big: {
                price: 300,
                calories: 50
            }
        }
    }
}

class Pizza {
    constructor(type, size) {
        this.type = type;
        this.size = size;
        this.toppings = [];
    }

    addTopping(topping){
        this.toppings.push(topping);
    }

    getToppings(){
        return this.toppings;
    }

    removeTopping(topping){
        this.toppings = this.toppings.filter(t => t !== topping);
    }

    getSize(){
        return this.size.name;
    }

    getType(){
        return this.type.name;
    }

    calculatePrice(){
        return this.type.price +
            this.size.price +
            this.toppings.reduce((total, currentValue) => total + currentValue.info[this.size.id === 'small' ? 'small' : 'big'].price, 0)
    }

    calculateCalories(){
        return this.type.calories +
            this.size.calories +
            this.toppings.reduce((total, currentValue) => total + currentValue.info[this.size.id === 'small' ? 'small' : 'big'].calories, 0)
    }
}

const pizza = new Pizza(PizzaType.Bavarian, PizzaSize.Big);
pizza.addTopping(AdditionallyAddPizza.CheeseBoard)
pizza.addTopping(AdditionallyAddPizza.CreamyMozzarella)
pizza.removeTopping(AdditionallyAddPizza.CheeseBoard)
console.log(pizza.calculatePrice())