/*
Product controller will perform action to the products to be displayed

(1) Display all products to be retrieved from the back-end.
(2) Add product to the product list (send the new product to the back-end)
---edit an existing product details
---remove an existing products
*/

// Development APIs
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';

let productController = [];

let originalData = []; // Store the original data obtained from the backend

function displayProduct()
{
//fetch data from database using the REST API endpoint from Spring Boot
       fetch(displayAPI)
           .then((resp) => resp.json())
           .then(function(data) {
               console.log("2. receive data")
               console.log(data);

               originalData = data; // Store the original data

               data.forEach(function (product) {

                   const productObj = {
                       productId: product.productId,
                       productName: product.productName,
                       productPrice: product.productPrice,
                       productQuantity: product.productQuantity,
                       productCategory: product.productCategory,
                       productDescription: product.productDescription,
                       productOptions: product.productOptions,
                       productImages: product.productImages
                  };

                  // This array consists of 12 objects
                   productController.push(productObj);
             });

            // Display all the objects from the productController array
             renderProductPage();

           })
           .catch(function(error) {
               console.log(error);
           });
}

function renderProductPage() {

    let display = "";

    for (let i = 0; i < productController.length; i++) {

        display += `
            <div class="col-lg-3">
                  <div class="card">
                      <img src=${productController[i].productImages} class="card-img-top py-3"
                          alt="image" >
                      <div class="card-body">
                          <h5 class="card-title">${productController[i].productName}</h5>
                          <h5 class="price">$${productController[i].productPrice}</h5>
                          <p class="card-text py-3">${productController[i].productDescription}</p>
                          <a href="/product" data-product-id="${productController[i].productId}" class="btn btn-primary view-product-btn">View Product</a>
                      </div>
                  </div>
            </div>
            `
    }

    document.querySelector("#row").innerHTML = display;

      // Add event listeners for 'View Product' buttons
      const viewProductButtons = document.querySelectorAll('.view-product-btn');

      viewProductButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          const productId = event.currentTarget.getAttribute('data-product-id');
          window.location.href = `/product?productId=${productId}`;
        });
      });
    }

//addProduct(name, description, imageUrl, style, price, storeImage);
function addProduct(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImages, imageObject)
{
   const formData = new FormData();
   formData.append('productName', productName);
   formData.append('productPrice', productPrice);
   formData.append('productQuantity', productQuantity);
   formData.append('productCategory', productCategory);
   formData.append('productDescription', productDescription);
   formData.append('productOptions',productOptions);
   formData.append('productImages',productImages);
   formData.append('imagefile',imageObject);

  fetch(addAPI, {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status - 200 ok, 500, 404
            if (response.ok) {
                alert("Successfully Added Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to Product")
        });
}

displayProduct();

// To filter categories

function filterProductsByCategory(category) {
    // Filter productController array by product category
    let filteredProducts = originalData.filter(product => product.productCategory === category);

    // Update the productController with filtered products
    productController = filteredProducts;

    // Rerender the products on the page
    renderProductPage();
}


// Event listener to start filtering based on category

document.addEventListener("DOMContentLoaded", function() {
    // Get all category items
    let categoryItems = document.querySelectorAll('.list-group-item');

    // Attach click event listener to each category item
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Get category from data-text attribute
            let category = e.currentTarget.id;

            // Filter products by category
            filterProductsByCategory(category);
        });
    });
});
