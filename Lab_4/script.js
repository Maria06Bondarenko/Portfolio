// --- ЗАВДАННЯ 1: ЗМІННІ ТА ТИПИ ДАНИХ ---
console.log("--- Завдання 1: Змінні та типи даних ---");

// 1. Оголошення примітивів
const stringVar = "Привіт, JavaScript!";
const numberVar = 2026;
const booleanVar = true;
const nullVar = null;
const undefinedVar = undefined;
const symbolVar = Symbol("id");
const bigIntVar = 9007199254740991n;

console.log(`String: ${stringVar}, type: ${typeof stringVar}`);
console.log(`Number: ${numberVar}, type: ${typeof numberVar}`);
console.log(`Boolean: ${booleanVar}, type: ${typeof booleanVar}`);
console.log(`Null: ${nullVar}, type: ${typeof nullVar}`); 
console.log(`Undefined: ${undefinedVar}, type: ${typeof undefinedVar}`);
console.log(`Symbol: ${symbolVar.toString()}, type: ${typeof symbolVar}`);
console.log(`BigInt: ${bigIntVar}, type: ${typeof bigIntVar}`);

// 2. Явне перетворення типів
console.log("Перетворення у String:", String(100), String(false));
console.log("Перетворення у Number:", Number("123"), Number(""), Number(true), Number(null), Number(undefined));
console.log("Falsy values:", Boolean(0), Boolean(""), Boolean(null), Boolean(undefined), Boolean(NaN));

// 4. Різниця між == та ===
console.log("5 == '5':", 5 == '5');     // true (приведення типів)
console.log("5 === '5':", 5 === '5');   // false (різні типи)
console.log("null == undefined:", null == undefined); // true
console.log("null === undefined:", null === undefined); // false


// --- ЗАВДАННЯ 2: УМОВИ ТА ЛОГІКА ---
console.log("\n--- Завдання 2: Умови та логіка ---");

const getGrade = (score) => {
    if (typeof score !== 'number' || score < 0 || score > 100) return "невалідний бал";
    if (score >= 90) return "відмінно";
    if (score >= 74) return "добре";
    if (score >= 60) return "задовільно";
    return "незадовільно";
};

const getSeasonUA = (month) => {
    switch (month) {
        case 12: case 1: case 2: return "Зима";
        case 3: case 4: case 5: return "Весна";
        case 6: case 7: case 8: return "Літо";
        case 9: case 10: case 11: return "Осінь";
        default: return "невалідний номер місяця";
    }
};

const age = 19;
const status = age >= 18 ? "повнолітній" : "неповнолітній";

console.log(`Бал 85: ${getGrade(85)}`);
console.log(`Місяць 4: ${getSeasonUA(4)}`);
console.log(`Статус студента (вік 19): ${status}`);


// --- ЗАВДАННЯ 3: МАСИВИ ---
console.log("\n--- Завдання 3: Масиви ---");

let students = [
    { name: "Олена Петрова", grade: 88, courses: ["JavaScript", "HTML"] },
    { name: "Ігор Ковалевський", grade: 94, courses: ["JavaScript", "CSS"] },
    { name: "Марія Бондаренко", grade: 55, courses: ["HTML"] },
    { name: "Михайло Бондар", grade: 78, courses: ["JavaScript", "React"] },
    { name: "Марія Оскорбіна", grade: 95, courses: ["CSS", "HTML"] },
    { name: "Дмитро Хмурий", grade: 62, courses: ["JavaScript"] }
];

// Модифікація
students.push({ name: "Андрій Мирний", grade: 80, courses: ["Node.js"] }); // Додати в кінець
students.pop(); // Видалити останнього
students.splice(2, 1); // Видалити Марію (індекс 2)
students.splice(1, 0, { name: "Світлана Чимковська", grade: 93, courses: ["UI/UX"] }); // Додати на позицію 1

// Методи пошуку та фільтрації
const topStudent = students.find(s => s.grade > 90);
const jsStudents = students.filter(s => s.courses.includes("JavaScript"));
const averageGrade = students.reduce((acc, s) => acc + s.grade, 0) / students.length;

console.log("Перший відмінник:", topStudent);
console.log("Студенти JS:", jsStudents);
console.log("Середній бал групи:", averageGrade.toFixed(2));


// --- ЗАВДАННЯ 4: ФУНКЦІЇ ---
console.log("\n--- Завдання 4: Функції ---");

// 1. Три способи оголошення
function areaDecl(a, b) { return a * b; }
const areaExpr = function(a, b) { return a * b; };
const areaArrow = (a, b) => a * b;

// 2. Замикання
const createCounter = () => {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count
    };
};
const counter = createCounter();
counter.increment();
console.log("Counter value:", counter.getValue());

// 3. Параметри за замовчуванням
const createUser = (name, role = "student", isActive = true) => ({ name, role, isActive });
console.log(createUser("Олексій"));

// 4. Rest-параметри
const sum = (...numbers) => numbers.reduce((a, b) => a + b, 0);
console.log("Сума 1,2,3,4:", sum(1, 2, 3, 4));

// 5. Деструктуризація в параметрах
const printStudentInfo = ({ name, grade, courses }) => {
    console.log(`${name} має оцінку ${grade}. Курси: ${courses.join(", ")}`);
};
printStudentInfo(students[0]);


// --- ЗАВДАННЯ 5: ОБ'ЄКТИ ---
console.log("\n--- Завдання 5: Об'єкти ---");

const studentProfile = {
    firstName: "Максим",
    lastName: "Шевченко",
    age: 21,
    university: "КПІ",
    grades: { math: 85, physics: 92, history: 78 },
    isActive: true,
    getFullName() { return `${this.firstName} ${this.lastName}`; },
    getAverageGrade() {
        const vals = Object.values(this.grades);
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }
};

// Доступ до властивостей
const key = "university";
console.log(studentProfile.firstName); // крапкова
console.log(studentProfile[key]);       // квадратні дужки 

// Ітерація
console.log("Keys:", Object.keys(studentProfile));
console.log("Entries:", Object.entries(studentProfile.grades));

// Копіювання
const profileCopy = { ...studentProfile, age: 22 };
console.log("Оригінал вік:", studentProfile.age, "Копія вік:", profileCopy.age);

// Optional chaining
console.log("Lab score:", studentProfile.grades?.lab ?? "Немає оцінки");


// --- ЗАВДАННЯ 6: ЛАНЦЮЖКИ МЕТОДІВ ---
console.log("\n--- Завдання 6: Ланцюжки методів ---");

const products = [
    { name: "Ноутбук", price: 30000, category: "electronics", inStock: true, quantity: 2 },
    { name: "Мишка", price: 500, category: "electronics", inStock: true, quantity: 10 },
    { name: "Клавіатура", price: 1200, category: "electronics", inStock: false, quantity: 0 },
    { name: "Стіл", price: 4500, category: "furniture", inStock: true, quantity: 1 },
    { name: "Лампа", price: 890, category: "electronics", inStock: true, quantity: 5 },
    { name: "Крісло", price: 7000, category: "furniture", inStock: true, quantity: 2 },
    { name: "Монітор", price: 6200, category: "electronics", inStock: true, quantity: 3 },
    { name: "Кабель", price: 150, category: "electronics", inStock: false, quantity: 0 }
];

// Вартість товарів в наявності
const totalStockValue = products
    .filter(p => p.inStock)
    .map(p => p.price * p.quantity)
    .reduce((acc, val) => acc + val, 0);
console.log("Загальна вартість в наявності:", totalStockValue);

// Електроніка за ціною
const sortedElectronics = products
    .filter(p => p.category === "electronics")
    .sort((a, b) => a.price - b.price)
    .map(p => p.name);
console.log("Електроніка (від дешевих):", sortedElectronics);

// Групування за категоріями
const categoryCounts = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
}, {});
console.log("Кількість за категоріями:", categoryCounts);

// Сортування студентів
const byGrade = [...students].sort((a, b) => b.grade - a.grade);
const byName = [...students].sort((a, b) => a.name.localeCompare(b.name));
console.log("Студенти за оцінкою:", byGrade);
console.log("Студенти за алфавітом:", byName);


// --- ЗАВДАННЯ 7: РЯДКИ ---
console.log("\n--- Завдання 7: Рядки ---");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

const countWords = (str) => str.trim().split(/\s+/).length;

const truncate = (str, maxLength) => 
    str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

const isValidEmail = (email) => {
    const atIdx = email.indexOf('@');
    const lastDotIdx = email.lastIndexOf('.');
    
    return atIdx > 0 &&                       
           email.indexOf('@', atIdx + 1) === -1 && 
           lastDotIdx > atIdx + 1 &&          
           email.length - lastDotIdx > 2;      
};

console.log(capitalize("javaScript"));
console.log("Кількість слів:", countWords(" JavaScript це  круто "));
console.log(truncate("Це дуже довгий рядок для тесту", 10));
console.log("Email user@test.com valid:", isValidEmail("user@test.com"));
console.log("Email @test.com valid:", isValidEmail("@test.com"));