// Урок 2. Продвинутая работа с функциями и классами
// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.

class Library {
    #books = [];

    constructor(books) {
        this.#books = books;
    }

    allBooks() {
        return this.#books
    }

    addBook(newBook) {
        this.#books.forEach(book => {
            if (book.title === newBook.title) {
                throw new Error('Такая книга уже есть в списке');
            }
        });
        this.#books.push(newBook);
        return ('книга добавлена');
    }

    removeBook(title) {
        for (let i = 0; i < this.#books.length; i++) {
            if (this.#books[i].title === title) {
                this.#books.splice(i, 1);
                return 'книга удалена';
            }
        }
        throw new Error('Такой книги нет в списке');
    }

    hasBook(title) {
        for (let i = 0; i < this.#books.length; i++) {
            if (this.#books[i].title === title) {
                return `${this.#books[i].title}, данная книга есть в библиотеке`;
            }
        }
        return `данной книги нет в библиотеке`;
    }
}

let books = [{
    title: "изучаем javascript",
    author: "Браун Этан",
    releaseYear: "2020"
},
{
    title: "основы программирования на языке java",
    author: "Курбатова Ирина Витальевна, Печкуров Андрей Виктороввич",
    releaseYear: "2024"
},
{
    title: "Java. Полное руководство",
    author: "Шилдт Герберт",
    releaseYear: "2018"
}];

const library = new Library(books);

function showBooks(booksFromLibrary) {
    booksFromLibrary.forEach(book => {
        console.log(`книга: ${book.title}\nавтор: ${book.author}\nгод издания: ${book.releaseYear}`);
        console.log();
    });
    console.log('=================================');
}

showBooks(library.allBooks());

let book = {
    title: "изучаем javascript",
    author: "Браун Этан",
    releaseYear: "2020"
}

let book1 = {
    title: "программирование на си шарп для начинающих",
    author: "Васильев Алексей Николаевич",
    releaseYear: "2018"
};

//library.addBook(book);
console.log(library.addBook(book1));

showBooks(library.allBooks());

console.log(library.hasBook('программирование на си шарп для начинающих'));

console.log(library.removeBook('основы программирования на языке java'));

showBooks(library.allBooks());

// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.

const reviewData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

let productData = [
    {
        product: "Apple iPhone 13"
    },
    {
        product: "Samsung Galaxy Z Fold 3"
    },
    {
        product: "Sony PlayStation 5"
    },
];

const products = document.querySelector('.products');
const container = document.querySelector('.container__reviews');
const dialogProduct = document.querySelector('.dialog__window__product');
const dialog = document.querySelector('.dialog');
const dialogTextarea = document.querySelector('.dialog__window__input');
const buttonSend = document.querySelector('#send');
const buttonClose = document.querySelector('#close');
const dialog1 = document.querySelector('#dialog1');
const buttonClose1 = document.querySelector('#close1');

function getIdReview() {
    let reviews = reviewData[reviewData.length - 1].reviews;
    let id = Number(reviews[reviews.length - 1].id);
    return (id + 1).toString();
}

productData.forEach(product => {
    products.insertAdjacentHTML('beforeend', `<div class="products__card">
                <p class="products__card__name">${product.product}</p>
                <button id="review" class="products__card__button">Оставить отзыв</button>
            </div>`);
});

function templating() {
    reviewData.forEach(review => {
        container.insertAdjacentHTML('beforeend', `<div class="container__reviews__review">
                    <p class="container__reviews__review__product">${review.product}</p>
                    <div class="list">
                        <ol class="list__ol">

                        </ol>
                    </div>
                </div>`);
    });

    let i = 0;

    const blocks = container.querySelectorAll('.list__ol');
    blocks.forEach(block => {

        reviewData[i].reviews.forEach(element => {
            block.insertAdjacentHTML('beforeend', `<li class="container__reviews__review__text">${element.text}</li>`);
        });
        i++;
    });
}

templating();

const productReviewButtons = document.querySelectorAll('#review');

function addReview() {

    let object = {};
    let objectReview = {};
    object.product = dialogProduct.textContent;
    object.reviews = [];
    objectReview.id = getIdReview();
    objectReview.text = dialogTextarea.value;
    object.reviews.push(objectReview);
    let logic = 0;

    reviewData.forEach(element => {
        if (element.product === object.product) {
            element.reviews = element.reviews.concat(object.reviews);
            logic = 1;
        }
    });
    if (logic === 0) {
        reviewData.push(object);   
    }
}

productReviewButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        let card = button.parentNode;
        let product = card.querySelector('.products__card__name').textContent;
        dialogProduct.textContent = product;
        dialog.showModal();
    });
});

buttonSend.addEventListener('click', function (e) {
    if (dialogTextarea.value.length > 50 && dialogTextarea.value.length < 500) {
        addReview();
        container.innerHTML = '';
        templating();
        dialogTextarea.value = '';
        dialog.close();
    } else {
        dialog1.showModal();
    }
});

buttonClose.addEventListener('click', function (e) {
    dialog.close();
});

buttonClose1.addEventListener('click', function (e) {
    dialog1.close();
});