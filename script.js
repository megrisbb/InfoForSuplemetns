// Sample data for sports nutrition and dietary supplements
const sportsNutritionData = {
    "Протеїн": {
        description: "Protein is essential for muscle building and repair.",
        brand: "Sample Brand 1",
        table: "Sample Table 1"
    },
    "Гейнер": {
        description: "Gainers help in gaining weight and muscle mass.",
        brand: "Sample Brand 2",
        table: "Sample Table 2"
    },
    "sadasd": {
        description: "Gainers help in gaining weight and muscle mass.",
        brand: "Sample Brand 2",
        table: "Sample Table 2"
    },
    "sdad": {
        description: "Gainers help in gaining weight and muscle mass.",
        brand: "Sample Brand 2",
        table: "Sample Table 2"
    },
    "asdasda": {
        description: "Gainers help in gaining weight and muscle mass.",
        brand: "Sample Brand 2",
        table: "Sample Table 2"
    },
    "Гsaейнер": {
        description: "Gainers help in gaining weight and muscle mass.",
        brand: "Sample Brand 2",
        table: "Sample Table 2"
    },
    "dsdsa": {
        description: "Gainers help in gaining weight and muscle mass.",
        brand: "Sample Brand 2",
        table: "Sample Table 2"
    },

    "БЦА": {
        description: "BCAAs (Branched-Chain Amino Acids) support muscle recovery.",
        brand: "Sample Brand 3",
        table: "Sample Table 3"
    }
};

const dietarySupplementsData = {
    "Л-Карнітин": {
        description: "Л-карнітин - це амінокислотоподібна речовина, яка відіграє важливу роль у метаболізмі жирів і вуглеводів. Вона виробляється в організмі з лізину та метіоніну",
        whatDo: 'Транспортує жирові клітини в мітохондрії там їх спалює і перетворює на енергії. Тако він корисний' +
            ' для зміцнення серцево-судинної системи та покращення стану сперматозоїдів у чоловіків',
        dosage: "Чоловікам потрібно приймати по 3-4 г на день перед фізичною активністю"
    }
};
const vitaminsData = {
    "Вітамін А": {
        description: "Вітамін А - жирророз",
        whatDo: 'Транспортує жирові клітини в мітохондрії там їх спалює і перетворює на енергії. Тако він корисний' +
            ' для зміцнення серцево-судинної системи та покращення стану сперматозоїдів у чоловіків',
        dosage: "Чоловікам потрібно приймати по 3-4 г на день перед фізичною активністю"
    }
};



// Function to populate the list dynamically
function populateList(listId, data, category) {
    const list = document.getElementById(listId);

    Object.keys(data).forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        listItem.addEventListener("click", () => displayProductInfo(item, data[item], category));
        list.appendChild(listItem);
    });
}

// Function to display product information
function displayProductInfo(product, info, category) {
    const productInfo = document.querySelector("#product-info");
    productInfo.innerHTML = `
        <h3>${product}</h3>
        <p>${info.description}</p>
        <p><strong>Що робить:</strong> ${info.whatDo}</p>
        <p><strong>Як приймати:</strong> ${info.dosage}</p>
    `;
    productInfo.style.display = "block";
}

// Initialize the page
populateList("sports-nutrition-list", sportsNutritionData, "sports-nutrition");
populateList("dietary-supplements-list", dietarySupplementsData, "dietary-supplements");
populateList("vitamins-list", vitaminsData, "vitamins");
