export default class FDObjectModel {
    constructor(arr) {
        this.categoryName = arr ? arr.categoryName : '';
        this.categoryId = arr ? arr.categoryId : '';
        this.productName = arr ? arr.productName : '';
        this.productId = arr ? arr.productId : '';
        this.productImage = arr ? arr.productImage : '';
        this.productAllImages = arr ? arr.productAllImages.split(',') : '';
        this.productUrl = arr ? arr.productUrl : '';
        this.originalPrice = arr ? arr.originalPrice : '';
        this.salePrice = arr ? arr.salePrice : '';
        this.commissionRate = arr ? arr.commissionRate : '';
        this.outOfStock = arr ? arr.outOfStock : '';
        this.discount = arr ? arr.discount : '';
        this.clickUrl = arr ? arr.clickUrl : '';
        this.selected = false;
        this.searchKeywords = arr ? arr.searchKeywords : [];
        this.quantity = 1;
    }
}