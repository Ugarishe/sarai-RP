// Функция для отслеживания наведения на кнопку
function handleHover(event) {
    console.log("Hovered over button with id:", event.target.id);
}

// Функция для отслеживания нажатия на кнопку
function handleClick(event) {
    console.log("Clicked button with id:", event.target.id);
}

// Получаем все кнопки по их id
var buttons = document.querySelectorAll('.button');

// Проходимся по каждой кнопке и добавляем обработчики событий
buttons.forEach(function(button) {
    button.addEventListener('mouseover', handleHover);
    button.addEventListener('click', handleClick);
});
