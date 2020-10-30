module.exports = function main(inputs) {
  const byBarcode = ref => _ => _.Barcode === ref.Barcode
  const consolidate = _ => _.reduce((acc, cur) => {
    const found = acc.find(byBarcode(cur))
    if (found) found.count++
    else acc.push({...cur, count: 1})
    return acc
  }, [])

  const renderFloat = _ => _.toFixed(2)
  const renderItem = _ => `Name: ${_.Name}, Quantity: ${_.count} ${_.Unit+(_.count>1?'s':'')}, Unit price: ${renderFloat(_.Price)} (yuan), Subtotal: ${renderFloat(_.Price * _.count)} (yuan)`
  const renderItems = items => items.map(renderItem).join('\n')
  const total = items => items.map(_ => _.Price * _.count).reduce((a, b)=>a+b, 0)
  const renderReceipt = items => '***<store earning no money>Receipt ***\n' +
      renderItems(items) +
      '\n----------------------\n' +
      'Total: '+ renderFloat(total(items)) +' (yuan)\n' +
      '**********************\n'

  return renderReceipt(consolidate(inputs))
};
