let confirmB = document.getElementById("confirmButton")
let err = document.getElementById("3Error")
let chosen=false;
function hi(){
   chosen= true;
}
//saving user selection in local storage
function selectFunc() {
   if(chosen===false){
       err.innerHTML= "please choose one"
   }else{
       window.location.href = "file:///Users/mariemuramatsu/Desktop/IA/CS%20ai-%20seeds/firebase/mainMenu.html";
   }
   localStorage.setItem("menuChoose")
}
