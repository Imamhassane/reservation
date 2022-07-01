/* Début Afficher le numéro de chaque chaise  */
function afficheNumChaise() {
    for (let i = 0; i < seat.length; i++) {

        let span = document.createElement("span");
        span.innerHTML = i + 1;

        seat[i].appendChild(span);
        seat[i].setAttribute("value", i + 1);
    }
}
/* Fin Afficher le numéro de chaque chaise  */