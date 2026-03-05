//Класс, представляющий корзину покупок

export default class Cart {
    constructor() {
        this.items = [];
    }

    //Добавляет товар в корзину
    addItem(item) {
        this.items.push(item);
    }

    //Возвращает копию массива товаров
    getItems() {
        return [...this.items];
    }

    //Считает суммарную стоимость всех товаров без скидки
    getTotalWithoutDiscount() {
        return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
    }


    //Считает суммарную стоимость всех товаров с применением скидки
    getTotalWithDiscount(discount) {
        if (discount < 0 || discount > 100) {
            throw new Error('Discount must be between 0 and 100');
        }
        
        const total = this.getTotalWithoutDiscount();
        const discountAmount = total * (discount / 100);
        return total - discountAmount;
    }

    //Удаляет товар из корзины по его id
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
    }

    //Очищает корзину
    clear() {
        this.items = [];
    }
}