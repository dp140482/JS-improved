const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <img src="img/warehouse.jpeg" alt="склад">
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    /* Для устранения запятых собираем содержимое массива в строку
       при помощи распаковки (SPREAD) в список аргументов метода
       конкатенации объекта "пустая строка". */
    document.querySelector('.products').innerHTML = ''.concat(...productsList);
};

renderPage(products);