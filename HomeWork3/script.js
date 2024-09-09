// Урок 3. Промисы. Хранилище
// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

let productsAndReviews = [];
const addReviewButton = document.querySelector('#addReview');
const inputProductName = document.querySelector('.review__field__input');
const inputReviewPrduct = document.querySelector('.review__textarea__input');
const dialog = document.querySelector('#dialog');
const dialog1 = document.querySelector('#dialog1');
const dialog2 = document.querySelector('#dialog2');
const closeButtons = document.querySelectorAll('#close');
const list = document.querySelector('.products__list');
let logic = 0;

//window.localStorage.clear();

function loadData() {
    if (window.localStorage.getItem('products') !== null) {
        productsAndReviews = window.localStorage.getItem('products');
        productsAndReviews = JSON.parse(productsAndReviews);
    }
}

loadData();

function renderProducts(productsAndReviews) {

    let index = 0;

    productsAndReviews.forEach(obj => {
        list.insertAdjacentHTML('beforeend', `
            <div class="products__list__block">

                <li class="products__list__block__item">${obj.product}</li>

                <div class="products__list__block__reviews">

                    <ol class="products__list__block__reviews__ol">

                    </ol>

                </div>

            </div>`);
    });

    const orderedLists = document.querySelectorAll('.products__list__block__reviews__ol');

    orderedLists.forEach(list => {
        productsAndReviews[index].reviews.forEach(element => {
            list.insertAdjacentHTML('beforeend', `
                <li class="products__list__block__reviews__ol__item">${element.review}</li>
                <button class="products__list__block__reviews__ol__button">Удалиь отзыв</button>`);
        });
        index++;
    });
}

renderProducts(productsAndReviews);

function reload() {

    const products = document.querySelectorAll('.products__list__block__item');
    const deleteButtons = document.querySelectorAll('.products__list__block__reviews__ol__button');

    products.forEach(product => {

        product.addEventListener('click', function (e) {

            if (product.hasAttribute('id')) {
                product.removeAttribute('id');
            } else {
                product.setAttribute('id', 'active');
                let array = Array.from(products)
                let z = array.indexOf(product);
                for (let i = 0; i < array.length; i++) {
                    if (i !== z) {
                        array[i].removeAttribute('id');
                    }
                }
            }

            products.forEach(product => {

                if (product.getAttribute('id') === 'active') {
                    product.style = 'color: orange';
                    product.nextElementSibling.style = 'display: block';
                } else {
                    product.nextElementSibling.style = 'display: none';
                    product.style = 'color: none';
                }

            });
        });
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            let review = button.previousElementSibling;
            let product = button.parentNode.parentNode.previousElementSibling;
            let array = [];
            let index = 0;
            let index1 = 0;
            productsAndReviews.forEach(element => {
                
                if (element.product === product.textContent) {

                    array = element.reviews;

                    for (let i = 0; i < array.length; i++) {
                        if (array[i].review === review.textContent) {
                            index = i;
                            break;
                        }
                    }

                    array.splice(index, 1);
                    element.reviews = array;

                    if (element.reviews.length === 0) {
                        index1 = productsAndReviews.indexOf(element);
                        productsAndReviews.splice(index1, 1);
                        list.innerHTML = '';
                        renderProducts(productsAndReviews);
                        reload();
                        window.localStorage.setItem('products', JSON.stringify(productsAndReviews));
                    } else {
                        list.innerHTML = '';
                        renderProducts(productsAndReviews);
                        reload();
                        window.localStorage.setItem('products', JSON.stringify(productsAndReviews));
                    }
                }
            });
        });
    });
}

reload();

function addReview() {
    let productReviews = [];
    let reviewObject = {};
    let object = {}
    let logic = 0;
    object.product = inputProductName.value;
    reviewObject.review = inputReviewPrduct.value;
    productsAndReviews.forEach(obj => {
        if (obj.product === inputProductName.value) {
            obj.reviews.push(reviewObject);
            logic++;
        }
    });
    if (logic === 0) {
        productReviews.push(reviewObject);
        object.reviews = productReviews;
        productsAndReviews.push(object);
    }
    list.innerHTML = '';
    renderProducts(productsAndReviews);
    reload();
    window.localStorage.setItem('products', JSON.stringify(productsAndReviews));
}

function checkInput() {
    if (inputProductName.value.length === 0) {
        dialog.showModal();
        return false;
    } else if (inputReviewPrduct.value.length === 0) {
        dialog2.showModal();
        return false;
    } else {
        return true;
    }
}

closeButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        dialog.close();
        dialog1.close();
        dialog2.close();
    });
});

addReviewButton.addEventListener('click', function (e) {
    if (checkInput()) {
        addReview();
        dialog1.showModal();
        inputProductName.value = '';
        inputReviewPrduct.value = '';
    }
});

