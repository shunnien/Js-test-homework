function ShoppingCart() {}

ShoppingCart.prototype.getMemberType = function () {
    return "";
};

ShoppingCart.prototype.getTotalPrice = function (products) {
    let totalPrice = 0;
    products.forEach(function (element) {
        if (element.unitPrice && element.quantity) {
            totalPrice += element.unitPrice * element.quantity;
        }
    }, this);
    console.log("test");

    switch (this.getMemberType()) {
        case "VIP":
            return totalPrice >= 500 ? totalPrice * 0.8 : totalPrice;
        default:
            return totalPrice >= 1000 && products.length > 3 ? totalPrice * 0.85 : totalPrice;
    }

};

module.exports = ShoppingCart;