
const featuredItems = [];

function displayProduct() {

  let display = "";

  for (let i = 0; i < featuredItems.length; i++) {

    display += `
        <div class="col my-5">
        <a href="product.html">
          <div class="card" style="width: 18rem;">
           <img class="py-3" src=${featuredItems[i].imageURL} class="card-img-top" alt="...">
          <div class="card-body">
           <h5 class="card-title">${featuredItems[i].name}</h5>
           <p class="card-text py-3">${featuredItems[i].style}</p>
        </div>
      </div>
      </a>
      </div>
    `
  }

  document.querySelector("#row").innerHTML = display;


}

function addProduct(n, d, i, s, p) {

  const featureditems = {
    name: n,
    description: d,
    imageURL: i,
    style: s,
    price: p
  }

  featuredItems.push(featureditems);

}
