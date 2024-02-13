function loadData() {
    // Завантаження даних про спортивне харчування з файлу sportsNutritionData.json
    fetch('data/sportsNutritionData.json')
        // Парсинг отриманих даних у форматі JSON
        .then(response => response.json())
        .then(sportsNutritionData => {
            // Завантаження даних про бренди з файлу brands.json
            fetch('data/brands.json')
                // Парсинг отриманих даних у форматі JSON
                .then(response => response.json())
                .then(brandsData => {
                    // Об'єднання даних про спортивне харчування та бренди
                    const mergedData = sportsNutritionData.map(product => {
                        // Підтримка кількох brandId у вигляді масиву
                        const brandDetails = product.brandId.map(id =>
                            // Знаходження даних про бренди за їх id
                            brandsData.find(brand => brand.id === id)
                        ).filter(Boolean); // Видалення будь-яких неіснуючих відповідностей
                        return {
                            ...product,
                            brandDetails
                        };
                    });
                    // Заповнення списку продуктів
                    populateList('sports-nutrition-list', mergedData, 'sports-nutrition');
                });
        })
        // Обробка помилок під час завантаження даних
        .catch(error => console.error('Помилка завантаження даних:', error));
}

// Функція для завантаження даних з JSON файлу
function loadDataFromJson(filePath, listId, category) {
    // Завантаження даних з вказаного JSON файлу
    fetch(filePath)
        // Парсинг отриманих даних у форматі JSON
        .then(response => response.json())
        .then(data => {
            // Заповнення списку продуктів
            populateList(listId, data, category);
        })
        // Обробка помилок під час завантаження даних
        .catch(error => console.error('Помилка завантаження даних:', error));
}

// Виклик функції для кожного набору даних
// loadDataFromJson('sportsNutritionData.json', 'sports-nutrition-list', 'sports-nutrition');
// Завантаження даних для категорії dietary-supplements
loadDataFromJson('data/dietarySupplementsData.json', 'dietary-supplements-list', 'dietary-supplements');
// Завантаження даних для категорії loss-weight
loadDataFromJson('data/lossweightData.json', 'loss-weight-list', 'loss-weight');
// Завантаження даних для категорії vitamins
loadDataFromJson('data/vitaminsData.json', 'vitamins-list', 'vitamins');
// Завантаження даних для категорії minerals
loadDataFromJson("data/minerals.json", 'minerals-list', "minerals");
// Завантаження даних для категорії hearth
loadDataFromJson("data/hearth.json", 'hearth-list', "hearth");
// Завантаження даних для категорії brain
loadDataFromJson("data/brain.json", 'brain-list', "brain");
// Завантаження даних для категорії liver
loadDataFromJson("data/liver.json", 'liver-list', "liver");
// Завантаження даних для категорії libido
loadDataFromJson("data/libido.json", 'libido-list', "libido");
// Завантаження даних для категорії vision
loadDataFromJson("data/vision.json", 'vision-list', "vision");
// Завантаження даних для категорії hair
loadDataFromJson("data/hair.json", 'hair-list', "hair");
// Завантаження даних для категорії acne
loadDataFromJson("data/acneData.json", 'acne-list', "acne");
// Завантаження даних для категорії aminoacides
loadDataFromJson("data/aminoacidesData.json", 'aminoacides-list', "aminoacides");
// Додайте виклики для інших категорій

function populateList(listId, data, category) {
    // Отримання списку за його ідентифікатором
    const list = document.getElementById(listId);

    // Додавання кожного елемента даних до списку
    data.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name;
        // Додавання події click для відображення інформації про продукт
        listItem.addEventListener("click", () => displayProductInfo(item, category));
        list.appendChild(listItem);
    });
}

function displayProductInfo(product, category) {
    // Отримання блоку інформації про продукт, контейнера та оверлею
    const productInfo = document.querySelector("#product-info");
    const container = document.querySelector(".container");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // Створення HTML коду для інформації про продукт
    let productInfoHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

    // Додавання інформації про бренд, якщо вона існує
    if (product.brandDetails && product.brandDetails.length > 0) {
        productInfoHTML += `<div class="brand-detail__container">`;
        product.brandDetails.forEach(brand => {
            productInfoHTML += `
            <div "brand-detail"class=>
                <p><b>${brand.id}.</b> <b> ${brand.name}</b></p>
                <p><b>Інгредієнти:</b> ${brand.description}</p>
                <p><b>Склад:</b> ${brand.percentage}</p>
            </div>`;
        });
        productInfoHTML += `</div>`;
    }
    else {
        // Якщо інформація про бренд не знайдена
        productInfoHTML += `<p>Інформація про бренд недоступна.</p>`;
    }

    // Додавання списку переваг, якщо він існує
    let benefitAdded = false;
    if (product.benefits && product.benefits.items && product.benefits.items.length > 0) {
        productInfoHTML += `<h4>Ефекти:</h4><ul>`;
        product.benefits.items.forEach(benefit => {
            productInfoHTML += `<li>${benefit}</li>`;
        });
        productInfoHTML += `</ul>`;
        benefitAdded = true;
    }

    // Додавання списку дозування, якщо він існує
    let dosageAdded = false;
    if (product.dosage && product.dosage.items && product.dosage.items.length > 0) {
        productInfoHTML += `<h4>Дозування:</h4><ul>`;
        product.dosage.items.forEach(dosage => {
            productInfoHTML += `<li>${dosage}</li>`;
        });
        productInfoHTML += `</ul>`;
        dosageAdded = true;
    }

    // Перевірка чи була додана інформація про переваги та дозування
    if (!benefitAdded && !dosageAdded) {
        productInfoHTML += `<p>Переваги та інформація про дозування недоступні.</p>`;
    }

    // Відображення інформації про продукт
    productInfo.innerHTML = productInfoHTML;

    // Додавання класу 'show' для відображення інформації про продукт та оверлею
    productInfo.classList.add("show");
    overlay.classList.add("show");

    // Закриття інформації про продукт при кліку на оверлей
    overlay.addEventListener("click", () => {
        productInfo.classList.remove("show");
        overlay.classList.remove("show");
    });

    // Додавання оверлею до контейнера
    container.appendChild(overlay);

    // Прокрутка до інформації про продукт
    productInfo.scrollIntoView({behavior: 'smooth'});
}

// Очікування завантаження вмісту сторінки
document.addEventListener('DOMContentLoaded', (event) => {
    // Завантаження даних
    loadData();
});
