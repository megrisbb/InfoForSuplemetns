function loadData() {
    fetch('sportsNutritionData.json')
        .then(response => response.json())
        .then(sportsNutritionData => {
            fetch('brands.json')
                .then(response => response.json())
                .then(brandsData => {
                    const mergedData = sportsNutritionData.map(product => {
                        // Підтримка кількох brandId у вигляді масиву
                        const brandDetails = product.brandId.map(id =>
                            brandsData.find(brand => brand.id === id)
                        ).filter(Boolean); // Видалення будь-яких неіснуючих відповідностей
                        return {
                            ...product,
                            brandDetails
                        };
                    });
                    populateList('sports-nutrition-list', mergedData, 'sports-nutrition');
                });
        })
        .catch(error => console.error('Помилка завантаження даних:', error));
}

// Функція для завантаження даних з JSON файлу
function loadDataFromJson(filePath, listId, category) {
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            populateList(listId, data, category);
        })
        .catch(error => console.error('Помилка завантаження даних:', error));
}

// Виклик функції для кожного набору даних
// loadDataFromJson('sportsNutritionData.json', 'sports-nutrition-list', 'sports-nutrition');
loadDataFromJson('dietarySupplementsData.json', 'dietary-supplements-list', 'dietary-supplements');
loadDataFromJson('lossweightData.json', 'loss-weight-list', 'loss-weight');
loadDataFromJson('vitaminsData.json', 'vitamins-list', 'vitamins');
// Додайте виклики для інших категорій

// Function to populate the list dynamically
function populateList(listId, data, category) {
    const list = document.getElementById(listId);

    data.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item.name;
        listItem.addEventListener("click", () => displayProductInfo(item, category));
        list.appendChild(listItem);
    });
}

// Function to display product information and scroll to it
function displayProductInfo(product, category) {
    const productInfo = document.querySelector("#product-info");
    const container = document.querySelector(".container");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // Set product information content
    let productInfoHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;

    // Додавання інформації про бренд, якщо вона існує
    if (product.brandDetails && product.brandDetails.length > 0) {
        productInfoHTML += `<div class="brand-detail__container">`;
        product.brandDetails.forEach(brand => {
            productInfoHTML += `
            <div class="brand-detail">
                <p><strong>Назва бренду:</strong> ${brand.name}</p>
                <p><strong>Опис бренду:</strong> ${brand.description}</p>
                <p><strong>Склад:</strong> ${brand.percentage}</p>
            </div>`;
        });
        productInfoHTML += `</div>`;
    }


    // else {
    //     // Якщо інформація про бренд не знайдена
    //     productInfoHTML += `<p>Інформація про бренд недоступна.</p>`;
    // }

    // Додавання переваг, якщо вони існують
    for (let i = 1; i <= 10; i++) {
        const benefit = product[`benefits${i}`];
        if (benefit) {
            productInfoHTML += `<p>${benefit}</p>`;
        }
    }

    let dosageAdded = false;
    for (let i = 1; i <= 10; i++) {
        const dosage = product[`dosage${i}`];
        if (dosage) {
            if (!dosageAdded) {
                productInfoHTML += `<h4>Дозування:</h4><ul>`;
                dosageAdded = true;
            }
            productInfoHTML += `<li>${dosage}</li>`;
        }
    }
    if (dosageAdded) {
        productInfoHTML += `</ul>`; // Закриття списку, якщо були додані елементи дозування
    }

    // // Додавання інформації про дозування, якщо вона існує
    // if (product.dosage) {
    //     productInfoHTML += `<p><strong>Як приймати:</strong> ${product.dosage}</p>`;
    // }
    productInfo.innerHTML = productInfoHTML;


    // Add 'show' class to product information and overlay
    productInfo.classList.add("show");
    overlay.classList.add("show");

    // Close the product information when clicking on the overlay
    overlay.addEventListener("click", () => {
        productInfo.classList.remove("show");
        overlay.classList.remove("show");
    });

    // Append the overlay to the container
    container.appendChild(overlay);

    // Scroll to the product information
    productInfo.scrollIntoView({behavior: 'smooth'});
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadData();
});


