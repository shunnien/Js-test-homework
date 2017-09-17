const mocha = require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const ShoppingCart = require('../src/shoppingCart');

chai.should();

describe('shoppingCart', () => {
    describe('#getTotalPrice', () => {
        it(' VIP 會員，購物 499 元，沒有優惠', () => {
            // Arrange
            const dataset = [{
                productName: 'AAA',
                unitPrice: 499,
                quantity: 1
            }];
            const expected = 499;
            let actual = 0;
            let shoppinCart = new ShoppingCart();

            shoppinCart.getMemberType = sinon.stub().returns('VIP');

            // Act
            actual = shoppinCart.getTotalPrice(dataset);

            // Assert
            actual.should.equal(expected);
        });

    });
});