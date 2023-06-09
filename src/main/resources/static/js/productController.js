    /*
    Product controller will perform action to the products to be displayed

    (1) Display all products to be retrieved from the back-end.
    (2) Add product to the product list (send the new product to the back-end)
    ---edit an existing product details
    ---remove an existing products
    */

    // Development APIs
    const addAPI= 'https://bytemefullstack.azurewebsites.net/product/add';
    const displayAPI = 'https://bytemefullstack.azurewebsites.net/product/all';

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
                           productImage1: product.productImage1
                      };

                      // This array consists of 12 objects
                       productController.push(productObj);
                 });

                // Display all the objects from the productController array
                 renderProductPage();

                 // After products are rendered, get the category from the URL and filter the products -
                 // If getCategoryFromUrlAndDisplayProducts is called before fetch has completed,
                 // filterProductsByCategory won't have the correct data to work with.
                 // That's why it's suggested to call getCategoryFromUrlAndDisplayProducts inside the .then of fetch
                 // to ensure it happens after the data is completely fetched.
                             getCategoryFromUrlAndDisplayProducts();

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
                          <img src=${productController[i].productImage1} class="card-img-top py-3"
                             alt="image" >
                          <div class="card-body">
                              <h5 class="card-title">${productController[i].productName}</h5>
                              <h5 class="price">$${productController[i].productPrice}</h5>
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
    function addProduct(productName, productPrice, productQuantity, productCategory, productDescription, productImage1, productImage2, productImage3, imageObject1, imageObject2, imageObject3)
    {
       const formData = new FormData();
       formData.append('productName', productName);
       formData.append('productPrice', productPrice);
       formData.append('productQuantity', productQuantity);
       formData.append('productCategory', productCategory);
       formData.append('productDescription', productDescription);
       formData.append('productImage1',productImage1);
       formData.append('productImage2',productImage2);
       formData.append('productImage3',productImage3);
       formData.append('imagefile1',imageObject1);
       formData.append('imagefile2',imageObject2);
       formData.append('imagefile3',imageObject3);

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

                // If 'all' category is selected, reset productController array to originalData
                            if (category === 'all') {
                                productController = [...originalData]; // spread operator to create a new array
                            } else {
                                // Filter products by category
                                productController = originalData.filter(product => product.productCategory === category);
                            }

                // Rerender the products on the page
                            renderProductPage();

                // Update the URL
                            history.pushState(null, null, `?category=${category}`);
            });
        });
    });

    displayProduct();

    // Filter by category based on what is inputted from category.html

    function getCategoryFromUrlAndDisplayProducts() {
        let url = new URL(window.location.href);
        let category = url.searchParams.get("category");

        if (category) {
                if (category === 'all') {
                    displayAllProducts();
                } else {
                    filterProductsByCategory(category);
                }
            }
    }
