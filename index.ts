import { Movie } from './src/ts/Movie';
import { Cart } from './src/ts/Cart';

const cart = new Cart();
const movie1 = new Movie('id1', 'Аватар', 300);
const movie2 = new Movie('id2', 'Интерстеллар', 250);

cart.addItem(movie1);
cart.addItem(movie2);

console.log(`Общая стоимость без скидки: ${cart.getTotalPrice()} руб.`);
console.log(`Стоимость со скидкой 10%: ${cart.getTotalPriceWithDiscount(0.1)} руб.`);

cart.removeItemById('id1');
console.log(`После удаления "Аватар": ${cart.getTotalPrice()} руб.`);