/**
 * Quick Cart Debug Helper
 * 
 * Open browser console and run:
 * - checkCart() to see current cart state
 * - clearCart() to reset cart
 */

window.checkCart = function() {
  const enCart = localStorage.getItem('ma-pricing-cart-EN')
  const cnCart = localStorage.getItem('ma-pricing-cart-CN')
  
  console.log('=== CART DEBUG ===')
  console.log('EN Cart:', enCart ? JSON.parse(enCart) : 'empty')
  console.log('CN Cart:', cnCart ? JSON.parse(cnCart) : 'empty')
  console.log('Current locale:', window.location.pathname.includes('/CN/') ? 'CN' : 'EN')
  
  return {
    en: enCart ? JSON.parse(enCart) : [],
    cn: cnCart ? JSON.parse(cnCart) : []
  }
}

window.clearCart = function() {
  localStorage.removeItem('ma-pricing-cart-EN')
  localStorage.removeItem('ma-pricing-cart-CN')
  console.log('✅ Cart cleared!')
  window.location.reload()
}

console.log('💡 Cart debug helpers loaded! Use:')
console.log('  checkCart() - View current cart')
console.log('  clearCart() - Reset cart')
