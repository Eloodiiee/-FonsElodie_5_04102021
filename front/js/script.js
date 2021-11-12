const itemsInDocument = document.getElementById('items')
let arrayOfItems = [];
const fetchProducts = async() =>{
fetch("http://localhost:3000/api/products")
.then(response =>{return response.json()})
.then(products=>{
  for (let a =0; a < products.length; a++){
     arrayOfItems+=`
    <a href="product.html?id=${products[a]._id}">
    <article>
      <img src=${products[a].imageUrl} alt=${products[a].altTxt}>
      <h3 class="productName">${products[a].name}</h3>
      <p class="productDescription">${products[a].description}</p>
    </article>  
  </a>
    `
    itemsInDocument.innerHTML = arrayOfItems;
  }  
          
})

}


fetchProducts()

 
 
 