
// Development APIs
const addAPI= 'http://localhost:8080/product/add';
const displayAPI = 'http://localhost:8080/product/all';
let featuredItems = [];

function displayFeaturedItems ()
{
//fetch data from database using the REST API endpoint from Spring Boot
       fetch(displayAPI)
           .then((resp) => resp.json())
           .then(function(data) {
               console.log("2. receive data")
               console.log(data);
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
                   featuredItems.push(productObj);
             });

            // Display all the objects from the productController array
             renderFeaturedItems();

           })
           .catch(function(error) {
               console.log(error);
           });
}

function renderFeaturedItems() {

    let display = "";
    const maxItems= 8;
    const itemCount = Math.min(featuredItems.length, maxItems);

    // Shuffle the featuredItems array to randomize the order
        featuredItems = shuffleArray(featuredItems);

    for (let i = 0; i < itemCount; i++) {

        display += `
           <div class="col my-5">
                <a href="/product" class="view-product-card" data-product-id="${featuredItems[i].productId}">
                  <div class="card">
                   <img src=${featuredItems[i].productImage1} class="card-img-top py-3" alt="...">
                  <div class="card-body">
                   <h5 class="card-title">${featuredItems[i].productName}</h5>
                   <h5 class="price">$${featuredItems[i].productPrice}</h5>
                </div>
              </div>
              </a>
              </div>
            `
    }

    document.querySelector("#row").innerHTML = display;

    // Add event listeners for 'Featured Item Card' buttons
              const viewProductCards = document.querySelectorAll('.view-product-card');

              viewProductCards.forEach((card) => {
                card.addEventListener('click', (event) => {
                  event.preventDefault();
                  const productId = event.currentTarget.getAttribute('data-product-id');
                  window.location.href = `/product?productId=${productId}`;
                });
              });
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    const newArray = array.slice();
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

displayFeaturedItems();