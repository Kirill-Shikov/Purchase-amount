export class Movie {
  constructor(public id: string, public title: string, public price: number) {}

  getInfo(): string {
    return `Фильм: "${this.title}", цена: ${this.price} руб.`;
  }
}