
/* Cette fonction permet d'ajouter ou retirer un élément */
    function addAndRemove(tab, element) {
        let index = tab.indexOf(element);
        if (index !== -1) {
            tab.splice(index, 1);
        } else {
            tab.push(element);
        }
    }
/* Fin de la fonction qui permet d'ajouter ou retirer un élément */

const nbrePlace = document.getElementById("nbrePlace");
const prixTotal = document.getElementById("prixTotal");

/* Cette fonction permet de choisir une chaise  */
    function ChoosePlace() {
        let tab = [];
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

                    if (element.classList[0] == "seat") {

                    /* ajouter ou retirer la class checked pour indiquer que la chaise est cochée ou décochée */
                        element.classList.toggle("checked");
                    /*  */                   

                    /* ajouter les chaises dans un tableau */
                            addAndRemove(tab, element.getAttribute("value"));
                            localStorage.setItem("tab", tab)
                            nbrePlace.innerText = "Nbre de place : " + tab.length;
                            /* fin ajouter les chaises dans un tableau */
                    }
                
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
                    /* Fin création et ajout d'objet chaise dans un tableau */
                    
                    /*
                        *   Afficher le prix total 
                        *   .entries() => rend le tableau d'objet itérable
                        *   +iterator => transform la valeur en un int
                    */
                        for (const [i , iterator] of tab2.entries()) {
                            prix += +iterator.prix
                        }
                        prixTotal.innerText = "Prix total : " + prix + " F CFA"
                    /* Fin Affichage le prix total  */

                });
                /* fin change color and update number of palace checked at click */
                
        });
    }
/* Fin de la fonction qui permet de choisir une chaise  */    



function restor() {

    const checks = localStorage.getItem("tab")
    if (checks == null) {
        console.log(checks);
    }else{
        let mychecks = checks.replaceAll(',',' ').split(' ')
        const seats = document.getElementsByName("seat")
        seats.forEach(element => {
            for (let i = 0; i < mychecks.length; i++) {
                const elements = mychecks[i];
                if (element.getAttribute("value") == elements) {
                    element.classList.remove("seat")
                    element.classList.remove("checked")
                    element.classList.add("seatChecks")
                    element.removeAttribute("name" )
                    element.removeAttribute("prix")

                }
            }
        });
        prixTotal.innerText = "Prix total : 0 F CFA"
        nbrePlace.innerText = "Nbre de place : 0";
    }

}



