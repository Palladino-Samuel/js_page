var myJSON;
var n=0;
var Nome;
var Email;
var index =-1;

if(!localStorage.getItem("testJSON")){
  localStorage.setItem("testJSON","[]");
}
var Utenti = JSON.parse(localStorage.getItem("testJSON"));

//  btn display
document.getElementById("btn_boss").onclick = btnDisplay;
function btnDisplay(){
    btn= document.getElementById("btn_funzione");

    switch (n) {
      case 0:
          btn.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
          btn.style.borderColor = "rgba(255, 0, 0, 0.7)";
          n++;
        break;
      case 1:
          btn.style.backgroundColor = "rgba(0, 255, 0, 0.7)";
          btn.style.borderColor = "rgba(0, 255, 0, 0.7)";
          n++;
        break;
      case 2:
          btn.style.backgroundColor = "rgba(0, 0, 255, 0.7)";
          btn.style.borderColor = "rgba(0, 0, 255, 0.7)";
          n++;
        break;
      case 3:
          btn.style.backgroundColor = "rgba(255, 255, 255, 1)";
          btn.style.borderColor = "rgba(0, 0, 0, 1)";
          n++;
        break;
      case 4:
          btn.style = "none";
          n = n-4;
        break;
    }
}

//  stile text_color
document.getElementById('text_color').onclick = changeText;
function changeText(){
  text = document.getElementById("text_color");

  switch (n) {
    case 0:
      text.style.color ="red";
      text.style.fontSize = "medium";
      n++;
      break;
    case 1:
      text.style.color ="blue";
      text.style.fontSize = "large";
      n++;
      break;
    case 2:
      text.style.color ="green";
      text.style.fontSize = "x-large";
      n++;
      break;
    case 3:
      text.style = "none";
      n=n-3;
      break;
  }
}

//stampa l'oggetto persona aggiunto
function returnObject(event){
    event.preventDefault();
     persona = new Utente(Nome, Email);
     Utenti.push(persona);

     myJSON = JSON.stringify(Utenti);
     localStorage.setItem("testJSON", myJSON);

     var index = Utenti.lastIndexOf(persona);
     document.getElementById('checkReturn').innerHTML = Utenti[index].viewObject() ;

}
//  stampa l'intero array
document.getElementById('r1').onclick = stampaTodo;
function stampaTodo(){
  let text = document.getElementById("textArea")
  console.log("Utenti");
  console.log(Utenti);
    for (var i = 0; i < Utenti.length; i++) {
      text.innerHTML += i+") Ciao " + Utenti[i].nome + ", la tua email è: " + Utenti[i].email;
      text.innerHTML += "&#10";
      text.style.backgroundColor = "rgba(102, 255, 0, 0.3)";
    }
}

document.getElementById('src').onclick = searchElement;
function searchElement(){
  let srcValue = document.getElementById('nameSearch').value;
  let moreValue = document.getElementById('NameSearch1');
  let text = document.getElementById('textArea1');
  let U =Utenti;
  let c=0, s=0, u=0, id=0;

  for (var i = 0; i < U.length; i++) {
    U[i].nome==srcValue || U[i].email==srcValue? c++: s=0;
  }

  c>1? s=0:(c<1?s=1:s=2);

  moreValue.style.display = "none";
  switch (s) {
    case 0:   //s=0 più UTENTI
        moreValue.style.display = "inline";
        for (var i = 0; i < U.length; i++) {
            if ((U[i].nome==srcValue || U[i].email==srcValue) && (U[i].nome==moreValue.value || U[i].email==moreValue.value)) {
              text.innerHTML =  "TROVATO, Ciao " + U[i].nome + ", la tua email è: " + U[i].email ;
              u++;
              index=i;
              moreValue.style.display = "none";
            }}
            u<1?text.innerHTML = " ":s=null;
        break;

    case 1:   //s=1 no UTENTI
        text.innerHTML = "non trovato";
        break;

    case 2:   //s=2 un solo Utente
        for (var i = 0; i < Utenti.length; i++) {
             if (U[i].nome==srcValue || U[i].email==srcValue ) {
               text.innerHTML =  "TROVATO, Ciao " + U[i].nome + ", la tua email è: " + U[i].email ;
               index=i;
             }}
        break;
  }

}

document.getElementById('delete').onclick=objDelete;
function objDelete(){
  Utenti.splice(index, 1);
  myJSON = JSON.stringify(Utenti);
  localStorage.setItem("testJSON", myJSON);
}

//  funzione registrazione
function myFunction(){
    Nome = checkName();
    Email = checkEmail();
}

//  check name
function checkName(){
    var nome = document.forms["datiUtente"]["id_nome"].value;
    if (isNaN(nome)) {
      document.getElementById('id_nome').style.backgroundColor="rgba(102, 255, 0, 0.3)";
      return nome;
    }else {
      document.getElementById('id_nome').style.backgroundColor="rgba(255, 0, 0, 0.3)";
    }
}
//  check email
function checkEmail(){
    var email = document.forms["datiUtente"]["id_email"].value;
    if(validEmail(email)){
      document.getElementById('id_email').style.backgroundColor="rgba(102, 255, 0, 0.3)";
      return email;
    }else {
      document.getElementById('id_email').style.backgroundColor="rgba(255, 0, 0, 0.3)";
    }
}
function validEmail(email){
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

//  classe Utente
class Utente{
  constructor(num, eml){
    this.nome = num;
    this.email = eml;
  }
  viewObject(){
    return "Ciao <b>" + this.nome +"</b>, la tua email è: <b>" + this.email + "</b>, tutto è stato aggiunto correttamente";
  }
  viewObjectArea(){
    return "Ciao " + this.nome + ", la tua email è: " + this.email;
  }
}
