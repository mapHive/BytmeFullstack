// Global variable to store the image object
let storeImage = ""


//Add an 'onsubmit' event listener for productform to add a product
newProductForm.addEventListener('submit', (event) => {


  // Prevent default action of the Form submission
  event.preventDefault();


  // Select the inputs
  const productName = document.querySelector('#newProductName').value;
  const productPrice = document.querySelector('#newProductPrice').value;
  const productQuantity = document.querySelector('#newProductQuantity').value;
  const productCategory = document.querySelector('#newProductCategory').value;
  const productDescription = document.querySelector('#newProductDescription').value;
  const productOptions = document.querySelector('#newProductOptions').value;

  //Browser security will not be able to track/store the actual path of where you choose your image
  // C:/Users/Desktop/t-shirt_new.jpg
  //C:\fakepath\t-shirt_new.jpg
  //console.log(document.querySelector('#newItemImageFile').value + '\n' + "Hello world");

  const productImages = document.querySelector('#newProductImages').value.replace("C:\\fakepath\\", "");

  // Calls a function from the productController.js to access the API to add items to the database
  addProduct(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImages)   //arguments


});


// select file input
const input = document.querySelector('#newProductImages');
// add event listener
input.addEventListener('change', () => {
  storeImage = input.files[0]; // Array of files for us to access
});
