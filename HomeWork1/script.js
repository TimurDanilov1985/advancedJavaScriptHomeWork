// Урок 1. Коллекции и итераторы. Модули
// Формат сдачи: ссылка на репозиторий.

// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

let musicCollection = [{
    title: "Once",
    artist: "Nightwish",
    year: "2004"
},
{
    title: "The Heart Of Everything ",
    artist: "Within Temptation",
    year: "2007"
},
{
    title: "Invisible Circles",
    artist: "After Forever",
    year: "2004"
},
{
    title: "Dim Days Of Dolor",
    artist: "Sirenia",
    year: "2016"
},
{
    title: "Secret Of Runes",
    artist: "Therion",
    year: "2001"
}];

musicCollection[Symbol.iterator] = function () {
    let index = 0;
    return {
        next() {
            if (index < musicCollection.length) {
                let result = { value: musicCollection[index], done: false };
                index++;
                return result;
            } else {
                return { done: true };
            }
        }
    }
}

for (const item of musicCollection) {
    console.log(`${item.title} - ${item.artist} (${item.year})`);
}

// Задание 2
// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:

// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:

// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:

// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.

let chefs = new Map();

chefs.set('пицца', 'Виктор');
chefs.set('суши', 'Ольга');
chefs.set('десерт', 'Дмитрий');

let menu = new Map();

menu.set('пицца', ['пепперони', 'маргарита']);
menu.set('суши', ['калифорния', 'филадельфия']);
menu.set('десерт', ['тирамису', 'чизкейк']);

let numberOfOrder = 0;
let orders = [];

let dishesAndChefs = new Map();

let customersAndOrders = new Map();

function order(nameCustomer, ...dishes) {
    numberOfOrder++;
    let order = {};
    let dishesAndChefs = [];
    let keys = menu.keys();
    keys.forEach(key => {
        let types = menu.get(key);
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < dishes.length; j++) {
                if (types[i] === dishes[j].split(' ')[1]) {
                    let preparation = `${dishes[j]} - повар: ${chefs.get(key)}`;
                    dishesAndChefs.push(preparation);
                }
            }
        }
    });
    order.id = numberOfOrder;
    order.customer = nameCustomer;
    order.dishes = dishes;
    order.dishesAndChefs = dishesAndChefs;
    orders.push(order);
}

function orderInformationOutput(orders) {
    console.log('Блюда и их повара:');
    orders.forEach(order => {
        order.dishesAndChefs.forEach(element => {
            console.log(element);
        });
    });
    console.log('Заказы:');
    orders.forEach(order => {
        let dishes = order.dishes;
        let stringDishes = '';
        for (let i = 0; i < dishes.length; i++) {
            if(i === dishes.length - 1) {
                stringDishes += dishes[i];
            } else {
                stringDishes += dishes[i] + ' , ';
            }
        }
        console.log(`Клиент ${order.customer} заказал: ${stringDishes}`);
    });
}

order('Алексей', 'пицца пепперони', 'десерт тирамису');
order('Мария', 'суши калифорния', 'пицца маргарита');
order('Ирина', 'десерт чизкейк');
order('Елена', 'пицца маргарита', 'десерт тирамису', 'суши филадельфия');

orderInformationOutput(orders);