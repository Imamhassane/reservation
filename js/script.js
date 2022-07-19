/* Début Recupération */
    const ballon = document.getElementsByClassName("ballon")
    const afficheRowChaise = document.querySelectorAll("[afficheRowChaise]")
    const seat = document.getElementsByName("seat")
    const traitBlanc = document.getElementsByName("trait-blanc")
    const infoClient = document.getElementById  ("info-client")
    const removeModal = document.getElementById  ("removeModal")
    const placeRestante = document.getElementById  ("placeRestante")
    const successMessage = document.getElementById("success")


    /* Fin recupération */

    
    /* Appel de fonctions  */
    
    afficheChaise() 
    afficheNumChaise()
    ChoosePlace() 
    restor()

    removeModal.addEventListener("click", ()=>{infoClient.classList.remove("open")})
    
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

// affiche success message
if (localStorage.getItem("success")==1) {
    successMessage.classList.add("success")
}
if(successMessage){
    setInterval(() => {
        successMessage.classList.remove("success")
    }, 5000);
    localStorage.removeItem("success")
}