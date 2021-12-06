const blackFridaysales = 0.5; //------ soldes -----**
//----Permet de raccourcir le lien au test de la page----
const currentUrl = window.location.pathname ; //-- pathname garde que le chemin de dossier de la page, alors que href garde une adresse plus longue avec l'ip locale.
let cutUrl = currentUrl.slice(12)    //------ on recupere la donnée d'avant qu'on converti en coupant le texte avant le 12ème caractères.
//----Test pour savoir si on est sur la bonne page, pour qu'il s'exécute sinon il est ignoré----
if(cutUrl == "cart.html"){
let cart  = JSON.parse(localStorage.getItem("cartItems"))||[];
const cartContent = document.querySelector("#cart__items");
//--------------Si le panier est vide afficher "le panier est vide"--------
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
  if(blackFridaysales < 1 && blackFridaysales > 0.1 ){//---**** detecte s'il y a des soldes et les applique----
    cart[i].price = cart[i].price*blackFridaysales;
  }
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
    totalPriceCart += cart[o].quantityProduct*cart[o].price;
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
      totalPriceCart += cart[u].price*cart[u].quantityProduct;
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

//----Déclaration des variables et constantes regex--------
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");
//--------------------------------------------------
let firstNameErrorMess = document.getElementById('firstNameErrorMsg');
let lastNameErrorMess = document.getElementById('lastNameErrorMsg');
let addressErrorMess = document.getElementById('addressErrorMsg');
let cityErrorMess = document.getElementById('cityErrorMsg');
let emailErrorMess = document.getElementById('emailErrorMsg');
//----Test de validité du Prénom avec la methode regex------
  function firstNameCheck()   {
    const firstNameT = firstNameInput.value;
  if (/^[A-Za-zÀ-ÖØ-öø-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÖØ-öø-ÿ])+))*$/.test(firstNameT)) {
    firstNameErrorMess.textContent = ("");
    return true;
    } else{
      firstNameErrorMess.textContent = (`Le champs "Prénom" renseigné n'est pas correct !`);
      return false;
  };
};  
//----Test de validité du Nom avec la methode regex------
function lastNameCheck()   {
  const lastNameT = lastNameInput.value;
  if (/^[A-Za-zÀ-ÖØ-öø-ÿ]+((\s)?((\'|\-|\.)?([A-Za-zÀ-ÖØ-öø-ÿ])+))*$/.test(lastNameT)) {
    lastNameErrorMess.textContent = ("");
    return true;
    } else{
      lastNameErrorMess.textContent = (`Le champs "Nom" renseigné n'est pas correct !`);
      return false;
  };
};  
//----Test de validité du Adresse avec la methode regex------
function addressCheck()   {
  const addressT = addressInput.value;
  if(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9-,\s]{5,50}$/.test(addressT)) {
     addressErrorMess.textContent = ("");
    return true;
  } else{
      addressErrorMess.textContent = (`Le champs "Adresse" renseigné n'est pas correct !`);
      return false;
  };
}; 
//----Test de validité du Ville avec la methode regex------
 function cityCheck()   {
  const cityT = cityInput.value;
  if(/^[A-Za-zÀ-ÖØ-öø-ÿ- ]{3,20}$/.test(cityT)) { 
   cityErrorMess.textContent = ("");
    return true;
    } else{
      cityErrorMess.textContent = (`Le champs "Ville" renseigné n'est pas correct !`);
      return false;
  };
}; 
//----Test de validité de l'email avec la methode regex------
function emailCheck()   {
  const emailT = emailInput.value;
  if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailT)) { 
    emailErrorMess.textContent = ("");
    return true;

    } else{
      emailErrorMess.textContent = (`Le champs "Email" renseigné n'est pas correct !`);
      return false;
  };
}; 
//----Déclenchement des test regex lors de la saisie des informations------------------
//----Déclenchement des test regex du prénom------------------
firstNameInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  firstNameCheck();
})
//----Déclenchement des test regex du nom------------------
lastNameInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  lastNameCheck();
})
//----Déclenchement des test regex de l'adresse------------------
addressInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  addressCheck();
})
//----Déclenchement des test regex de la ville------------------
cityInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  cityCheck();
})
//----Déclenchement des test regex de l'email------------------
emailInput.addEventListener("input", (eventSecure) =>{
  eventSecure.preventDefault();
  emailCheck();
})
//--------------Au clic du bouton "commander", enregistre les informations du formulaire, tout en testant si les données sont correctes--------------
  btnSendFormular.addEventListener("click", (eventSecure) =>{
    eventSecure.preventDefault();
    //----Formulaire client----
  
  const order = {
  contact: {
  
  firstName: firstNameInput.value,
  lastName: lastNameInput.value,
  address: addressInput.value,
  city: cityInput.value,
  email: emailInput.value

},
products: cart.map(item=>item.productId)

  }
   
//--------Vérifie que toutes les données du formulaire sont correctes et si oui confirme la commande------
 if (firstNameCheck() && lastNameCheck() && addressCheck() && emailCheck() && cityCheck() ){
  fetch("http://localhost:3000/api/products/order",{method:"POST",body:JSON.stringify(order), headers: { "Content-Type": "application/json" }})
  .then(response=>response.json())
  .then(data=>{
    localStorage.removeItem("cartItems");
    //localStorage.setItem("orderId",data.orderId)
    window.location.href = `confirmation.html?id=${data.orderId}`;
 
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
    const spanId  = document.getElementById("orderId")
    const currentUrl = (new URL(document.location)).searchParams ;
    const ID = currentUrl.get('id');
    spanId.innerHTML = ID;
  }