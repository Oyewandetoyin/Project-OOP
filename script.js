// Product class
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  // ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    calculateTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    displayCartItems() {
      console.log("Cart Items:");
      this.items.forEach((item) => {
        console.log(`${item.product.name} x ${item.quantity} = $${item.calculateTotalPrice().toFixed(2)}`);
      });
    }
  }
  
  // Initialize products
  const products = [
    new Product(1, "Baskets", 100),
    new Product(2, "Socks", 20),
    new Product(3, "Bag", 50),
  ];
  
  // Initialize shopping cart
  const shoppingCart = new ShoppingCart();
  
  // Add event listeners
  document.querySelectorAll(".fa-plus-circle, .fa-minus-circle").forEach((button) => {
    button.addEventListener("click", handleQuantityAdjustment);
  });
  
  document.querySelectorAll(".fa-trash-alt").forEach((button) => {
    button.addEventListener("click", handleItemDeletion);
  });
  
  document.querySelectorAll(".fa-heart").forEach((button) => {
    button.addEventListener("click", handleItemLiking);
  });
  
  // Event handlers
  function handleQuantityAdjustment(event) {
    const target = event.target;
    const quantityElement = target.parentNode.querySelector(".quantity");
    const quantity = parseInt(quantityElement.innerText);
    const productIndex = parseInt(target.dataset.productIndex);
    const product = products[productIndex];
  
    if (target.classList.contains("fa-plus-circle")) {
      quantityElement.innerText = quantity + 1;
    } else if (target.classList.contains("fa-minus-circle")) {
      quantityElement.innerText = quantity - 1;
    }
  
    const shoppingCartItem = shoppingCart.items.find((item) => item.product.id === product.id);
    if (shoppingCartItem) {
      shoppingCartItem.quantity = quantity;
    } else {
      shoppingCart.addItem(new ShoppingCartItem(product, quantity));
    }
  
    updateTotalPrice();
  }
  
  function handleItemDeletion(event) {
    const target = event.target;
    const productIndex = parseInt(target.dataset.productIndex);
    const product = products[productIndex];
  
    shoppingCart.removeItem(shoppingCart.items.find((item) => item.product.id === product.id));
  
    target.parentNode.parentNode.parentNode.remove();
    updateTotalPrice();
  }
  
  function handleItemLiking(event) {
    const target = event.target;
    target.classList.toggle("liked");
  }
  
  function updateTotalPrice() {
    const totalPrice = shoppingCart.getTotalPrice();
    document.querySelector(".total").innerText = `Total: $${totalPrice.toFixed(2)}`;
  }
  
  // Initialize total price
  updateTotalPrice();