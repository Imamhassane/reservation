/* Début Recupération */
    const ballon = document.getElementsByClassName("ballon")
    const afficheRowChaise = document.querySelectorAll("[afficheRowChaise]")
    const seat = document.getElementsByName("seat")
    const traitBlanc = document.getElementsByName("trait-blanc")
    /* Fin recupération */
   
    
    /* Appel de fonctions  */
    
    afficheChaise() 
    afficheNumChaise()
    ChoosePlace() 
    document.getElementById("valider").addEventListener("click", restor)
    
/* Fin appel de fonctions  */

/*  */
    traitBlanc.forEach(element => {
        let value = element.getAttribute("value")
        for (let i = 0; i < value; i++) {
            let span = document.createElement("span")
            element.appendChild(span)
        }
    });
/*  */

/* script for ball  */
    function scaleImg(){
        for (let i = 0; i < ballon.length; i++) {
            ballon[i].classList.remove('active')
        }
    }

    let awanssNiouDem = 0
    setInterval(() => {
        scaleImg()
        awanssNiouDem++

            if(awanssNiouDem >= ballon.length){
                awanssNiouDem = 0
            }
        ballon[awanssNiouDem].classList.add("active")
    }, 500);

/* Fin script for ball */
