module.exports = function main(inputs) {
    var receipt = '***<store earning no money>Receipt ***\n'
    const barcodes = groupBy(inputs, input => input.Barcode);
    var count = 0;
    for (let [key, value] of barcodes.entries()) {
        receipt += `Name: ${value[0].Name}, Quantity: ${value.length} ${value[0].Unit}${ value.length != 1? 's' : '' }, Unit price: ${(value[0].Price).toFixed(2)} (yuan), Subtotal: ${(value.length*value[0].Price).toFixed(2)} (yuan)\n`;

        count += value.length*value[0].Price;
    }
    receipt += `----------------------\nTotal: ${count.toFixed(2)} (yuan)\n**********************\n`;
    
    return receipt;
};

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}