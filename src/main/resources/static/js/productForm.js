// Global variables to store the image objects
let storeImage1 = "";
let storeImage2 = "";
let storeImage3 = "";


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

  const productImage1 = document.querySelector('#newProductImage1').files[0];
  const productImage2 = document.querySelector('#newProductImage2').files[0];
  const productImage3 = document.querySelector('#newProductImage3').files[0];
//  const productImages = document.querySelector('#newProductImages').value.replace("C:\\fakepath\\", "");

  // Calls a function from the productController.js to access the API to add items to the database
  addProduct(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImage1, productImage2, productImage3, storeImage1, storeImage2, storeImage3)   //arguments
  });   //arguments


// select file inputs
const input1 = document.querySelector('#newProductImage1');
const input2 = document.querySelector('#newProductImage2');
const input3 = document.querySelector('#newProductImage3');

// add event listener for each input
input1.addEventListener('change', () => {
  storeImage1 = input1.files[0]; // Array of files for us to access
});

input2.addEventListener('change', () => {
  storeImage2 = input2.files[0]; // Array of files for us to access
});

input3.addEventListener('change', () => {
  storeImage3 = input3.files[0]; // Array of files for us to access
});
