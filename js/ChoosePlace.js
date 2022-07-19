//Validation info personnelle


const form = document.getElementById('form');
const nom = document.getElementById('nom');
const prenom = document.getElementById('prenom');
const email = document.getElementById('email');
const tel = document.getElementById('tel');


let isVerify = []
//Functions-------------------------------------------------------------
function showError(input, message) {//Afficher les messages d'erreur
    const formControl = input.parentElement;
    formControl.classList.add("error");
    formControl.classList.remove("success");
    isVerify.push(false)
   
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.classList.add("success");
    formControl.classList.remove("error");
    isVerify.push(true)

}

// 

function checkLength(input, min, max) {//Tester la longueur de la valeur  d'un input
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} doit contenir au moins ${min} caractéres!`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} doit contenir au plus ${max} caractéres !`);
    }else{
        showSuccess(input);
    }
}
// 

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, "L'Enail n'est pas valide ");
    }
  }

//

function checkRequired(inputArray) {// Tester si les champs ne sont pas vides
    inputArray.forEach(input => {
        if (input.value.trim() === '') {
            showError(input,`${getFieldName(input)} est obligatoire`);
        }else{
            showSuccess(input);
        }
    });
}

//
function getFieldName(input) {//Retour le nom de chaque input en se basant sur son id
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//




// ================================ Choisir place =======================================

/* Cette fonction permet d'ajouter ou retirer un élément */
function addAndRemove(tab, element ) {
    // ajouter et retirer
    let index = tab.indexOf(element);
    if (index !== -1) {
        tab.splice(index, 1);
    }
   
    // D'abord on récupére le contenu du localStorage
    let result = JSON.parse(localStorage.getItem("placeChecked"));

    // on ajoute de nouveaux éléments dans le tableau
    tab.push(element);  
    localStorage.setItem("placeChecked", JSON.stringify(tab));

    // En cas de retrait de chaise
    let index2 = result.indexOf(element);
    
    if (index2 !== -1) {
        result.splice(index2, 1);
    }else{
        // on ajoute les nouveaux éléments dans le tableau contenant l'ancien contenu du localStorage
        result.push(element)
    }
    // Puis ici on le restock à nouveau dans le localStorage
    localStorage.setItem("placeChecked", JSON.stringify(result));    
}
function addAndRemoveAlt(tab, element ) {
    
    let index = tab.indexOf(element);
    if (index !== -1) {
        tab.splice(index, 1);
    }else{
        tab.push(element);
    }  

    localStorage.setItem("tab", JSON.stringify(tab));

    /* afficher le nombre de place et le boutton de validation si le tableau est rempli */
        if(tab.length > 0){
            document.getElementById("place-choisie").style.display="flex";
        }else{
            document.getElementById("place-choisie").style.display="none";
        }
    /*  */

}
/* Fin de la fonction qui permet d'ajouter ou retirer un élément */

const nbrePlace = document.getElementById("nbrePlace");
const prixTotal = document.getElementById("prixTotal");

/* Cette fonction permet de choisir une chaise  */
    function ChoosePlace() {
        let tab = [];
        let tab1 = [];
        let tab2 = [];
        seat.forEach(element => {

            /* afffichage card  pour le prix de la chaise at hover  */
                const parent = element.parentElement;
                const parentPrix = +parent.getAttribute("prix");
                let mydiv = document.createElement("div");

                mydiv.classList.add("card");
                mydiv.innerText = 'cette place coute ' + parentPrix + " F";
                element.appendChild(mydiv);
            /* fin toggle card pour le prix de la chais at hover */

            /* change color and update number of palace checked at click */
                element.addEventListener("click", () => {


                    /* réinitialisé le prix total à zéro à chaque click pour le calculer à la fin */
                        let prix = 0
                    /*  */

                    // Toggle info chaise
                    if (element.classList[0] == "seat") {
                        /* ajouter ou retirer la class checked pour indiquer que la chaise est cochée ou décochée */
                            element.classList.toggle("checked");
                        /* fin */    

                            // Nombre de place
                            addAndRemoveAlt(tab1, element.getAttribute("value"));                            
                            nbrePlace.innerText = "Nbre de place : " + tab1.length; 
                          
                            /* création et ajout d'objet chaise dans un tableau */
                                let machaise = new Object();
                                machaise.numero = element.getAttribute("value")
                                machaise.prix = element.getAttribute("prix")
                            
                                if(tab2.some(chaise => chaise.numero === machaise.numero)){
                                    const test = (element) => element.numero === machaise.numero;
                                    let index  = tab2.findIndex(test)
                                    tab2.splice(index, 1)
                                } else{
                                    tab2.push(machaise)
                                }
                            /* Fin */
                            
                            /*
                                *   Afficher le prix total 
                                *   .entries() => rend le tableau d'objet itérable
                                *   +iterator => transform la valeur en un int
                            */
                                for (const [i , iterateur] of tab2.entries()) {
                                    prix += +iterateur.prix
                                }
                                prixTotal.innerText = "Prix total : " + prix + " F CFA"
                            
                            /* Fin */


                        /* Validation de la reservation */
                        document.getElementById("valider").addEventListener("click" , ()=>{
                            // Open modal
                            infoClient.classList.add("open")

                            // Tableau de personne
                            let tabPersonne = []

                            // Validation formulaire
                                form.addEventListener('submit',(e)=>{

                                    isVerify = []
                                    let valid = false

                                    checkEmail(email); 
                                    checkLength(tel , 9 , 9)
                                    checkLength(nom , 2 , 12)
                                    checkLength(prenom , 3 , 20)

                                    for (let i = 0; i < isVerify.length; i++) {
                                        if (isVerify[i]==false) {
                                            e.preventDefault();//Bloquer la soumission du formulaire
                                        }else{
                                            valid = true
                                        }
                                    }
                                    // form isValid
                                    if(valid) {
                                        // 
                                        let result = JSON.parse(localStorage.getItem("tab"));
                                        let personne = new Object();
                                        personne.nom = nom.value
                                        personne.prenom = prenom.value
                                        personne.email = email.value
                                        personne.tel = tel.value
                                        personne.chaise = result
                                        personne.prix = parentPrix

                                        //  storage in localStorage
                                        let resultPers =  JSON.parse(localStorage.getItem("tabPersonne"));
                                        tabPersonne.push(personne);

                                        localStorage.setItem("tabPersonne", JSON.stringify(tabPersonne));
                                        if (resultPers != null){
                                            resultPers.push(personne)
                                            localStorage.setItem("tabPersonne" , JSON.stringify(resultPers))
                                        }
                                        addAndRemove(tab , element.getAttribute("value"))
                                        localStorage.setItem("success",1)                                                 
                                    }   
                                });
                            
                        })
                    }
                    /* Fin Validation de la reservation */
                });
                /* fin change color and update number of palace checked at click */
        });
    }
/* Fin de la fonction qui permet de choisir une chaise  */    


function restor(){
    placeRestante.innerHTML = "Nbre de place restante : " +seat.length
    let client = JSON.parse(localStorage.getItem("tabPersonne"));
    let checks = localStorage.getItem("placeChecked")
    

    if (checks == null) {
        console.log("aucune place choisie");
    }else{
        let mychecks = checks.replaceAll(',',' ').replaceAll('"','').replaceAll('[','').replaceAll(']','').split(' ')
        const seats = document.getElementsByName("seat")
        /* place restante*/
        let nbr = seat.length-mychecks.length
        if(nbr > 0){
            placeRestante.innerHTML = "Nbre de place restante : "+nbr 
        }else{
            placeRestante.innerHTML = "Stade plein!" 
        }
        /*  */
        seats.forEach(element => {
            for (let i = 0; i < mychecks.length; i++) {
                let elements = mychecks[i];
                if (element.getAttribute("value") == elements) {

                    element.classList.remove("seat")
                    element.classList.remove("checked")
                    element.classList.add("seatChecks")
                    element.classList.add("seatChecks"+elements)

                    // element.removeAttribute("name" )
                    element.removeAttribute("prix")
                }
                if (client != null) {
                    client.forEach(elementClient => {
                        let chaise = elementClient.chaise
                        for (let i = 0; i < chaise.length; i++) {
                            
                            let elementChaise = chaise[i];
                            if (elementChaise == element.getAttribute("value") ) {
                                element.innerHTML =
                                `
                                <span>${elementChaise}</span>
                                <div class="card cardName">
                                    <h3>Propriétaire</h3>
                                    <p>Nom complet : ${elementClient.prenom} ${elementClient.nom}</p>
                                    <p>Email : ${elementClient.email} </p>
                                    <p>Téléphone : ${elementClient.tel} </p>
                                    <p>Prix de la chaise : ${elementClient.prix} </p>
                                </div>

                                `
                            }
                        } 
                    });  
                }       
            }
        });
        
        //  Toggle client
        prixTotal.innerText = "Prix total : 0 F CFA"
        nbrePlace.innerText = "Nbre de place : 0";
    } 

}
