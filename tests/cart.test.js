import Cart from '../src/Cart.js';

describe('Класс Cart', () => {
    let cart;
    let item1;
    let item2;
    let itemWithoutPrice;

    beforeEach(() => {
        cart = new Cart();
        
        item1 = {
            id: 1,
            title: 'Мстители',
            price: 500
        };
        
        item2 = {
            id: 2,
            title: 'Начало',
            price: 450
        };

        itemWithoutPrice = {
            id: 3,
            title: 'Бесплатный товар'
            // price отсутствует
        };
    });

    describe('addItem и getItems', () => {
        test('должен добавлять товар в корзину', () => {
            cart.addItem(item1);
            
            const items = cart.getItems();
            expect(items).toHaveLength(1);
            expect(items[0]).toEqual(item1);
        });

        test('должен добавлять несколько товаров', () => {
            cart.addItem(item1);
            cart.addItem(item2);
            
            expect(cart.getItems()).toHaveLength(2);
        });

        test('getItems должен возвращать копию массива', () => {
            cart.addItem(item1);
            
            const items = cart.getItems();
            items.pop();
            
            expect(cart.getItems()).toHaveLength(1);
        });
    });

    describe('getTotalWithoutDiscount', () => {
        test('должен возвращать 0 для пустой корзины', () => {
            expect(cart.getTotalWithoutDiscount()).toBe(0);
        });

        test('должен правильно считать сумму одного товара', () => {
            cart.addItem(item1);
            expect(cart.getTotalWithoutDiscount()).toBe(500);
        });

        test('должен правильно считать сумму нескольких товаров', () => {
            cart.addItem(item1);
            cart.addItem(item2);
            expect(cart.getTotalWithoutDiscount()).toBe(950);
        });

        test('должен игнорировать товары без цены', () => {
            cart.addItem(itemWithoutPrice);
            expect(cart.getTotalWithoutDiscount()).toBe(0);
        });

        test('должен работать со смешанными товарами', () => {
            cart.addItem(item1);           // 500
            cart.addItem(itemWithoutPrice); // 0
            cart.addItem(item2);            // 450
            expect(cart.getTotalWithoutDiscount()).toBe(950);
        });
    });

    describe('getTotalWithDiscount', () => {
        test('должен выбрасывать ошибку при скидке меньше 0', () => {
            expect(() => {
                cart.getTotalWithDiscount(-10);
            }).toThrow('Discount must be between 0 and 100');
        });

        test('должен выбрасывать ошибку при скидке больше 100', () => {
            expect(() => {
                cart.getTotalWithDiscount(110);
            }).toThrow('Discount must be between 0 and 100');
        });

        test('должен возвращать 0 для пустой корзины', () => {
            expect(cart.getTotalWithDiscount(50)).toBe(0);
        });

        test('должен правильно считать скидку 0%', () => {
            cart.addItem(item1);
            expect(cart.getTotalWithDiscount(0)).toBe(500);
        });

        test('должен правильно считать скидку 100%', () => {
            cart.addItem(item1);
            cart.addItem(item2);
            expect(cart.getTotalWithDiscount(100)).toBe(0);
        });

        test('должен правильно считать скидку 20%', () => {
            cart.addItem(item1); // 500
            cart.addItem(item2); // 450
            // Итого: 950, скидка 20% = 190, цена со скидкой = 760
            expect(cart.getTotalWithDiscount(20)).toBe(760);
        });

        test('должен работать с дробными значениями', () => {
            cart.addItem({ id: 4, price: 100 });
            expect(cart.getTotalWithDiscount(15)).toBe(85); // 100 - 15% = 85
        });

        test('должен игнорировать товары без цены при расчете скидки', () => {
            cart.addItem(item1);           // 500
            cart.addItem(itemWithoutPrice); // 0
            expect(cart.getTotalWithDiscount(10)).toBe(450); // 500 - 10% = 450
        });
    });

    describe('removeItem', () => {
        test('должен удалять товар по id', () => {
            cart.addItem(item1);
            cart.addItem(item2);
            
            cart.removeItem(1);
            
            expect(cart.getItems()).toHaveLength(1);
            expect(cart.getItems()[0].id).toBe(2);
        });

        test('ничего не делает, если товар с таким id не найден', () => {
            cart.addItem(item1);
            
            cart.removeItem(999);
            
            expect(cart.getItems()).toHaveLength(1);
        });

        test('должен корректно обновлять общую стоимость после удаления', () => {
            cart.addItem(item1); // 500
            cart.addItem(item2); // 450
            
            cart.removeItem(1);
            
            expect(cart.getTotalWithoutDiscount()).toBe(450);
        });

        test('должен работать с пустой корзиной', () => {
            expect(() => {
                cart.removeItem(1);
            }).not.toThrow();
            
            expect(cart.getItems()).toHaveLength(0);
        });
    });

    describe('clear', () => {
        test('должен очищать корзину', () => {
            cart.addItem(item1);
            cart.addItem(item2);
            
            cart.clear();
            
            expect(cart.getItems()).toHaveLength(0);
            expect(cart.getTotalWithoutDiscount()).toBe(0);
        });

        test('должен работать с пустой корзиной', () => {
            cart.clear();
            expect(cart.getItems()).toHaveLength(0);
        });
    });

    describe('Интеграционные тесты', () => {
        test('сложный сценарий работы с корзиной', () => {
            // Добавляем товары
            cart.addItem(item1);
            cart.addItem(item2);
            cart.addItem(itemWithoutPrice);
            
            expect(cart.getItems()).toHaveLength(3);
            expect(cart.getTotalWithoutDiscount()).toBe(950);
            expect(cart.getTotalWithDiscount(15)).toBe(807.5); // 950 - 15% = 807.5
            
            // Удаляем товар
            cart.removeItem(1);
            
            expect(cart.getItems()).toHaveLength(2);
            expect(cart.getTotalWithoutDiscount()).toBe(450);
            
            // Очищаем корзину
            cart.clear();
            
            expect(cart.getItems()).toHaveLength(0);
            expect(cart.getTotalWithoutDiscount()).toBe(0);
        });
    });
});