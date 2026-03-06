import { Movie } from './Movie';

export class Cart {
  private items: Movie[] = [];

  //Добавляет фильм в корзину
  addItem(movie: Movie): void {
    this.items.push(movie);
  }

  //Возвращает все фильмы в корзине
  getItems(): Movie[] {
    return this.items;
  }

  //очищает корзину
  clear(): void {
    this.items = [];
  }

  //Возвращает количество фильмов в корзине
  getTotalItems(): number {
    return this.items.length;
  }

  // Суммарная стоимость без скидки
  getTotalPrice(): number {
    return this.items.reduce((total, movie) => total + movie.price, 0);
  }

  // Суммарная стоимость с учётом скидки
  getTotalPriceWithDiscount(discount: number): number {
    const totalPrice = this.getTotalPrice();
    return totalPrice * (1 - discount);
  }

  // Удаление по ID
  removeItemById(id: string): void {
    this.items = this.items.filter(movie => movie.id !== id);
  }
}