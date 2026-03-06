import { Cart } from '../src/ts/Cart';
import { Movie } from '../src/ts/Movie';

describe('Корзина (Cart)', () => {
  let cart: Cart;
  let movie1: Movie;
  let movie2: Movie;

  beforeEach(() => {
    cart = new Cart();
    movie1 = new Movie('id1', 'Аватар', 300);
    movie2 = new Movie('id2', 'Интерстеллар', 250);
  });

  test('должен рассчитать общую стоимость без скидки', () => {
    cart.addItem(movie1);
    cart.addItem(movie2);
    expect(cart.getTotalPrice()).toBe(550);
  });

  test('должен рассчитать общую стоимость с учётом скидки', () => {
    cart.addItem(movie1);
    cart.addItem(movie2);
    expect(cart.getTotalPriceWithDiscount(0.1)).toBe(495);
    expect(cart.getTotalPriceWithDiscount(0.5)).toBe(275);
  });

  test('должен удалить товар из корзины по ID', () => {
    cart.addItem(movie1);
    cart.addItem(movie2);

    cart.removeItemById('id1');
    expect(cart.getItems().length).toBe(1);
    expect(cart.getItems()[0].id).toBe('id2');

    cart.removeItemById('id2');
    expect(cart.getItems().length).toBe(0);
  });

  test('должен корректно обрабатывать удаление несуществующего ID', () => {
    cart.addItem(movie1);
    cart.removeItemById('non-existent-id');
    expect(cart.getItems().length).toBe(1);
  });

  test('должен очистить корзину от всех товаров', () => {
    cart.addItem(movie1);
    cart.addItem(movie2);
    expect(cart.getTotalItems()).toBe(2);

    cart.clear();
    expect(cart.getTotalItems()).toBe(0);
    expect(cart.getItems().length).toBe(0);
  });

  test('должен возвращать корректную строку с информацией о фильме', () => {
    const movie = new Movie('id3', 'Титаник', 200);
    const info = movie.getInfo();
    expect(info).toBe('Фильм: "Титаник", цена: 200 руб.');
  });
});