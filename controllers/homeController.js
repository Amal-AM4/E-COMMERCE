async function pageProduct (req, res){
    res.render('products');
}

async function pageProductDetails (req, res){
    res.render('product_details');
}

async function pageCart (req, res){
    res.render('cart');
}

module.exports = {
    pageProduct, pageProductDetails, pageCart
}