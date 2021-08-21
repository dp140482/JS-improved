let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.countGoods += req.body.quantity;
    cart.amount += req.body.quantity * req.body.price;
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id === +req.params.id);
    find.quantity += req.body.quantity;
    cart.countGoods += req.body.quantity;
    cart.amount += req.body.quantity * find.price;
    return JSON.stringify(cart, null, 4);
};
let remove = (cart, req) => {
    let find = cart.contents.find(el => el.id === +req.params.id);
    cart.amount -= find.price;
    cart.contents.splice(cart.contents.indexOf(find), 1);
    cart.countGoods--;
    return JSON.stringify(cart, null, 4);
};


module.exports = {
    add,
    change,
    remove
};