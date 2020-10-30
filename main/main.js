module.exports = function main(inputs) {
  const byBarcode = ref => _ => _.Barcode === ref.Barcode
  const consolidate = _ => _.reduce((acc, cur) => {
    const found = acc.find(byBarcode(cur))
    if (found) found.count++
    else acc.push({...cur, count: 1})
    return acc
  }, [])

  const renderItem = _ => `Name: ${_.Name}, Quantity: ${_.count} ${_.Unit+(_.count>1?'s':'')}, Unit price: ${_.Price.toFixed(2)} (yuan), Subtotal: ${(_.Price * _.count).toFixed(2)} (yuan)`
  const renderItems = items => items.map(renderItem).join('\n')
  const renderTotal = items => items.map(_ => _.Price * _.count).reduce((a, b)=>a+b, 0).toFixed(2)
  const renderReceipt = items => '***<store earning no money>Receipt ***\n' +
      renderItems(items) +
      '\n----------------------\n' +
      'Total: '+ renderTotal(items) +' (yuan)\n' +
      '**********************\n'

  return renderReceipt(consolidate(inputs))
};
