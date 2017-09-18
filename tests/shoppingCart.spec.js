const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const ShoppingCart = require('../src/shoppingCart');

chai.should();

describe('shoppingCart', () => {
    const vipDataset = [{
            products: [{
                unitPrice: 499,
                quantity: 1
            }],
            expected: 499
        },
        {
            products: [{
                unitPrice: 500,
                quantity: 1
            }],
            expected: 400
        },
        {
            products: [{
                unitPrice: 200,
                quantity: 1
            }, {
                unitPrice: 100,
                quantity: 1
            }, {
                unitPrice: 100,
                quantity: 1
            }],
            expected: 400
        }
    ];
    const normalDataset = [{
            products: [{
                unitPrice: 999,
                quantity: 1
            }],
            expected: 999
        },
        {
            products: [{
                unitPrice: 300,
                quantity: 1
            }, {
                unitPrice: 300,
                quantity: 1
            }, {
                unitPrice: 300,
                quantity: 1
            }, {
                unitPrice: 99,
                quantity: 1
            }],
            expected: 999
        },
        {
            products: [{
                unitPrice: 300,
                quantity: 1
            }, {
                unitPrice: 300,
                quantity: 1
            }, {
                unitPrice: 300,
                quantity: 1
            }, {
                unitPrice: 100,
                quantity: 1
            }],
            expected: 850
        }, ,
        {
            products: [{
                unitPrice: 500,
                quantity: 1
            }, {
                unitPrice: 400,
                quantity: 1
            }, {
                unitPrice: 100,
                quantity: 1
            }],
            expected: 1000
        }
    ];

    vipDataset.forEach(function (element) {

        const productsTotalPrice = () => {
            let result = 0;
            if (element && Array.isArray(element.products)) {
                element.products.forEach(function (item) {
                    result += item.unitPrice * item.quantity;
                });
            }
            return result;
        };
        it(` VIP 會員，購物 ${element.products.length} 項共 ${productsTotalPrice()} 元，折扣後應為 ${element.expected} 元`, () => {
            // Arrange
            let shoppingCart = new ShoppingCart();
            shoppingCart.getMemberType = sinon.stub().returns('VIP');

            // Act
            let actual = shoppingCart.getTotalPrice(element.products);

            // Assert
            actual.should.equal(element.expected);

        });
    });

    normalDataset.forEach(function (element) {

        const productsTotalPrice = () => {
            let result = 0;
            if (element && Array.isArray(element.products)) {
                element.products.forEach(function (item) {
                    result += item.unitPrice * item.quantity;
                });
            }
            return result;
        };
        it(`一般會員，購物 ${element.products.length} 項共 ${productsTotalPrice()} 元，折扣後應為 ${element.expected} 元`, () => {
            // Arrange
            let shoppingCart = new ShoppingCart();
            shoppingCart.getMemberType = sinon.stub().returns('Normal');

            // Act
            let actual = shoppingCart.getTotalPrice(element.products);

            // Assert
            actual.should.equal(element.expected);

        });
    });
});