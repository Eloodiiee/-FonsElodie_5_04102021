//----Permet de raccourcir le lien au test de la page----
const currentUrl = window.location.pathname ;
let cutUrl = currentUrl.slice(12)
//----Test pour savoir si on est sur la bonne page, pour qu'il s'exécute sinon il est ignoré----
if(cutUrl == "cart.html"){
let cart  = JSON.parse(localStorage.getItem("cartItems"))||[];
const cartContent = document.querySelector("#cart__items");
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
for (let l = 0; l < deleteItem.length; l++) {
    deleteItem[l].addEventListener("click", (event) => {
    event.preventDefault();
//---- L'id du produit va être supprimé en cliquant sur le bouton 
let id_cart__item__content__settings__delete = cart[l].idDeletion;
//avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le bouton supprimer a été cliqué----
cart = cart.filter(el => el.idDeletion !== id_cart__item__content__settings__delete
);
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
  
const btnSendFormular = document.getElementById("order")


//--------------Au clic du bouton "commander", enregistre les informations du formulaire, tout en testant si les données sont correctes--------------
  btnSendFormular.addEventListener("click", (eventSecure) =>{
    eventSecure.preventDefault();
    //----Formulaire client----
  
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
   
  //----Test de validité du Prénom avec la methode regex------
  function firstNameCheck() {

    const firstNameT = order.contact.firstName;
   
  
    if (/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/.test(firstNameT)) {

      return true;

      } else{

        let firstNameErrorMess = document.getElementById('firstNameErrorMsg'); 
        firstNameErrorMess.textContent = ("Le champs Prénom renseigné n'est pas correct !");
        return false;

    };
  };  

  //----Test de validité du Nom avec la methode regex----
  function lastNameCheck() {

    const lastNameT = order.contact.lastName;
  
    if(/^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$/.test(lastNameT)) {

      return true;

      } else{        

        let lastNameErrorMess = document.getElementById('lastNameErrorMsg'); 
        lastNameErrorMess.textContent = ("Le champs Nom renseigné n'est pas correct !");
        return false;
        
    };
  };

  //  //----Test de validité de l'adresse avec la methode regex----
  function addressCheck(){

    const addressT = order.contact.address;
  
    if(/^[a-zA-Z0-9-,\s]{5,50}$/.test(addressT)) {
      return true;

      } else{
        let adressNameErrorMess = document.getElementById('addressErrorMsg'); 
        adressNameErrorMess.textContent = ("Le champs Adresse renseigné n'est pas correct !"); 
  
        return false;
               
    };
  };

  //  //----Test de validité de la ville avec la methode regex----
  function cityCheck(){

    const cityT = order.contact.city;
  
    if(/^[a-zA-Z- ]{3,20}$/.test(cityT)) {
      return true;

      } else{
        let cityNameErrorMess = document.getElementById('cityErrorMsg'); 
        cityNameErrorMess.textContent = ("Le champs Ville renseigné n'est pas correct !"); 

        return false;
            
    };
  };

  //----Test de validité de l'email avec la methode regex----
  function emailCheck(){

    const emailT = order.contact.email;
  
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailT)) {
      return true;

      } else{
        let emailNameErrorMess = document.getElementById('emailErrorMsg'); 
        emailNameErrorMess.textContent = ("Le champs Email renseigné n'est pas correct !"); 

        return false;   

      };
  };
//--------Vérifie que toutes les données du formulaire sont correctes et si oui confirme la commande------
 if (firstNameCheck() && lastNameCheck() && addressCheck() && emailCheck() && cityCheck() ){
  fetch("http://localhost:3000/api/products/order",{method:"POST",body:JSON.stringify(order), headers: { "Content-Type": "application/json" }})
  .then(response=>response.json())
  .then(data=>{
    localStorage.clear();
    localStorage.setItem("orderId",data.orderId)
    window.location.href = "confirmation.html";
 
  })
  .catch(error=>console.log(error))
    return true;
  //-------Sinon demande de vérifier le formulaire pour y corriger les fautes------ 
  }else {
    alert("Merci de vérifier le formulaire");
    return false;

  };

  })}
  //------Vérifie qu'on est sur la bonne page pour exécuter le code , sinon il est ignoré----
  //------Affiche l'ID de commande sur la page de confirmation------
  if(cutUrl == "confirmation.html"){
    const spanId  = document.getElementById("orderId");
    let confirmationId = localStorage.getItem("orderId");
    spanId.innerHTML = confirmationId;
}

