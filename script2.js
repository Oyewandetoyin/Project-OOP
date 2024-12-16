const totalPriceElement = document.querySelector('.total');

function updateTotalPrice() {
  const quantities = document.querySelectorAll('.quantity');
  const unitPrices = document.querySelectorAll('.unit-price');
  let totalPrice = 0;
  quantities.forEach((quantity, index) => {
    totalPrice += parseInt(quantity.innerText) * parseFloat(unitPrices[index].innerText);
  });
  totalPriceElement.innerText = `Total: $${totalPrice.toFixed(2)}`;
}

function handleQuantityAdjustment(event) {
  const target = event.target;
  const quantityElement = target.parentNode.querySelector('.quantity');
  const quantity = parseInt(quantityElement.innerText);
  if (target.classList.contains('fa-plus-circle')) {
    quantityElement.innerText = quantity + 1;
  } else if (target.classList.contains('fa-minus-circle')) {
    quantityElement.innerText = quantity - 1;
  }
  updateTotalPrice();
}

function handleItemDeletion(event) {
  const target = event.target;
  const item = target.parentNode.parentNode.parentNode;
  item.remove();
  updateTotalPrice();
}

updateTotalPrice();

function handleItemLiking(event) {
    const target = event.target;
    target.classList.toggle('liked');
  }
  
  document.querySelectorAll('.fa-plus-circle, .fa-minus-circle').forEach((button) => {
    button.addEventListener('click', handleQuantityAdjustment);
  });
  
  document.querySelectorAll('.fa-trash-alt').forEach((button) => {
    button.addEventListener('click', handleItemDeletion);
  });
  
  document.querySelectorAll('.fa-heart').forEach((button) => {
    button.addEventListener('click', handleItemLiking);
  });
  
  document.querySelectorAll('.fa-heart').forEach((heart) => {
    heart.classList.add('heart-button');
  });