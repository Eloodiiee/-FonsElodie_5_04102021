if(window.location.href == "http://127.0.0.1:5500/front/html/cart.html"){
let cart  = JSON.parse(localStorage.getItem("cartItems"))||[];
const cartContent = document.querySelector("#cart__items");
//------Tentative de detection de doublon dans le panier------
for(let k = 0;k<cart.length;k++){
for(let article of cart){
  console.log(article);
  console.log(article.productId);
  if(article.productId == cart[k].productId && article.color == cart[k].color){
    let newQuantity = 0;
    newQuantity = parseInt(article.quantityProduct)+parseInt(cart[k].quantityProduct);
    console.log("article :"+ article.quantityProduct);
    console.log("cart :"+ cart[k].quantityProduct);
    console.log(newQuantity);
  }
}
}
//------Si le panier est vide afficher "le panier est vide"------
if(cart === null || cart == 0 ){
  const emptyCart = `
  <style type="text/css">
.emptyCart {
  border-top: 1px solid white;
  font-size: 1.5em;
  text-align:center;
  padding:5rem 0rem;
}
</style>
    <div class="emptyCart">Le panier est vide</div>
  `;
  cartContent.innerHTML = emptyCart;
  document.getElementById('totalQuantity').innerHTML = 0;
  document.getElementById('totalPrice').innerHTML = 0;
}
//------Sinon remplir le panier------
else{
let fullCart = [];
for (let i = 0; i < cart.length; i++) {
    fullCart += ` 
    <article class="cart__item" data-id="${cart[i].productId}">
    <div class="cart__item__img">
    <img src=${cart[i].imageUrl} alt=${cart[i].altTxt}">
  </div>
  <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${cart[i].name}</h2>
                    <p>${cart[i].color}</p>
                    <p>${cart[i].price}€</p>
                    
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantityProduct}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
  </article>
  `
  let totalItems = 0;
  let totalPriceCart = 0;
  for (let o = 0; o < cart.length; o++) {
    totalItems += parseInt(cart[o].quantityProduct)
    totalPriceCart += cart[o].totalPrice
  }
  cartContent.innerHTML = fullCart;
  document.getElementById('totalQuantity').innerHTML =  totalItems;
  document.getElementById('totalPrice').innerHTML = totalPriceCart;
  }
}
//----------------------------Gestion du changement de quantité des articles et mise à jour du prix--------------------------------------------

let quantityField = document.querySelectorAll(".itemQuantity"); //------Je sélectionne l'input de quantité ----
for (let q = 0; q < quantityField.length; q++){ //------Pour chaque input de quantité on vérifie s'il y a un changement de valeur----
  quantityField[q].addEventListener("input", (event) =>{
    event.preventDefault();
    let quantityArticles = quantityField[q].value; //-------Attibution de la valeur de l'input dans "quantityArticles"----
    cart[q].quantityProduct = quantityArticles;//------Mise à jour de la quantité dans le cart.quantityProduct----
    cart[q].totalPrice = cart[q].price * cart[q].quantityProduct;//------Recalcul du prix total d'un des objet de l'array cartItems----
    localStorage.setItem( //------Réenregistrement du panier --
      "cartItems",
      JSON.stringify(cart)
    );
    console.log(cart);
    if(cart[q].quantityProduct.length === 0){ //----Vérifie s'il n'y a aucuns caractères dans l'input et le met a zéro si c'est le cas----
      cart[q].quantityProduct=0;
    }
    let totalItems = 0;   //----Boucle qui recalcule le nombres d'items total ainsi que le prix total du panier--
    let totalPriceCart = 0;
    for (let u = 0; u < cart.length; u++) {
      totalItems += parseInt(cart[u].quantityProduct)
      totalPriceCart += cart[u].totalPrice
    }
  document.getElementById('totalQuantity').innerHTML =  totalItems;   //----Affichage des nouvelles valeurs----
  document.getElementById('totalPrice').innerHTML = totalPriceCart;
  });
}
//----------------------------Gestion du boutton supprimer de l'article--------------------------------------------
//---------------Sélection des références de tous les boutons suprimer------------------
let deleteItem = document.querySelectorAll(".deleteItem");  
console.log(deleteItem);
for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", (event) => {
    event.preventDefault();
//---- L'id du produit va être supprimé en cliquant sur le bouton 
let id_cart__item__content__settings__delete = cart[l].idDeletion;
console.log("cart__item__content__settings__delete");
console.log(id_cart__item__content__settings__delete);
//avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le bouton supprimer a été cliqué----
cart = cart.filter(el => el.idDeletion !== id_cart__item__content__settings__delete
);
console.log(cart);
//--------On envoie la variable dans le localstorage
//--------La transformation en format JSON et l'envoyer dans la key "cartItems" du localstorage
localStorage.setItem(
    "cartItems",
    JSON.stringify(cart)
);
//alert pour avertir que le produit a été supprimé et rechargement de la page
alert("Ce produit à bien été supprimé du panier");
window.location.href = "cart.html";
});
}
////////////////////////////////////////////////////////////////
  // Form elements
  ////////////////////////////////////////////////////////////////
  
  //// REGEXs (no regex for address form nor first name, last name or city)
  // email
  const emailErrorMsg = document.getElementById("emailErrorMsg");
  function validateEmail(email) {
    const regexMail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexMail.test(email) == false) {
      emailErrorMsg.innerHTML = "Entrez une adresse e-mail valide.";
    } else {
      emailErrorMsg.innerHTML = null;
    }
  }
  // simple RegEx for names : caratères acceptés par la RegEx
  const regexName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  // first name
  const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
  function validateFirstName(firstName) {
    if (regexName.test(firstName) == false) {
      firstNameErrorMsg.innerHTML = "Entrez un prénom valide sans chiffre.";
    } else {
      firstNameErrorMsg.innerHTML = null;
    }
  }
  
  // last name
  const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
  function validateLastName(lastName) {
    if (regexName.test(lastName) == false) {
      lastNameErrorMsg.innerHTML = "Entrez un nom valide sans chiffre.";
    } else {
      lastNameErrorMsg.innerHTML = null;
    }
  }
  
  // city
  const cityErrorMsg = document.getElementById("cityErrorMsg");
  function validateCity(city) {
    if (regexName.test(city) == false) {
      cityErrorMsg.innerHTML = "Entrez une commune valide sans chiffre.";
    } else {
      cityErrorMsg.innerHTML = null;
    }
  }
  validateEmail();
  validateFirstName();
  validateLastName();
  validateCity();
  
const btnSendFormular = document.getElementById("order")
//let btnSendFormular = document.getElementsByClassName("cart__order__form__submit");
console.log(btnSendFormular);

//-------------- The btn with all the instructions for formular send --------------
  btnSendFormular.addEventListener("click", (eventSecure) =>{
    eventSecure.preventDefault();
    
  console.log("coucou");
    //Formulaire client
  
  const order = {
  contact: {
  
  firstName: document.getElementById("firstName").value,
  lastName: document.getElementById("lastName").value,
  address: document.getElementById("address").value,
  city: document.getElementById("city").value,
  email: document.getElementById("email").value

},
products: cart.map(item=>item.productId)

  }
    


  fetch("http://localhost:3000/api/products/order",{method:"POST",body:JSON.stringify(order), headers: { "Content-Type": "application/json" }})
  .then(response=>response.json())
  .then(data=>{
    localStorage.clear();
    localStorage.setItem("orderId",data.orderId)
    window.location.href = "confirmation.html";
 
  })
  .catch(error=>console.log(error))

      //Create an object item JSON to stock all the datas in the local storage
    //localStorage.clear();

  
  })}
  if(window.location.href == "http://127.0.0.1:5500/front/html/confirmation.html"){
    const spanId  = document.getElementById("orderId");
    console.log(spanId);
    let confirmationId = localStorage.getItem("orderId");
    console.log(confirmationId);
    spanId.innerHTML = confirmationId;
}

