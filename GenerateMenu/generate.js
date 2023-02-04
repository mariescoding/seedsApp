/* eslint-disable no-unused-vars */
let mizuhoB = document.getElementById("mizuhoB")
let marieB = document.getElementById("marieB")
let yurieB = document.getElementById("yurieB")
let ryuB = document.getElementById("ryuB")
let menuOptions = document.getElementById("menuOptions")
let menuSearch = document.getElementById("menuSearch")
let salmonB = document.getElementById("salmonB")
let chickenB = document.getElementById("chickenB")
let porkB = document.getElementById("porkB")
let beefB = document.getElementById("beefB")
let shrimpB = document.getElementById("shrimpB")
let chooseButton = document.getElementById("chooseButton")
let drinkingBox = document.getElementById("drinkingBox")
let specialBox = document.getElementById("specialBox")
let ingError = document.getElementById("ingError")
let peopleError = document.getElementById("peopleError")
let isDrinking = false;
let isSpecial = false;
let inputIng = [];
let inputPeople = [];
let menuArray = []
let drinkArray = []
let ingArray = []
let cuisineArray = []
var database = firebase.database();


function snapshotToArray(snapshot) {
   let arr = [];
   snapshot.forEach(function (childSnapshot) {
       let item = childSnapshot.val();
       item.key = childSnapshot.key;
       arr.push(item);
   });
   return arr;
}
function readMenu() {
   database.ref("menu/").once('value').then((snapshot) => {
       let arr = snapshotToArray(snapshot);
       for (let i = 0; i < arr.length; i++) {
           menuArray.push(arr[i].menuName)
           drinkArray.push(arr[i].isDrink)
           ingArray.push(arr[i].ingredient)
           cuisineArray.push(arr[i].cuisine)
       }
   })
}
readMenu();
//generates menu from inputs
function generateMenu() {
   let options = []
   let optionsIng = []
   let finalOptions = []
   const today = new Date();
   const day = today.getDay();
   let isMatch = false;
   if (day == 0) {
       for (let i = 0; i < menuArray.length; i++) {
           if (cuisineArray[i] == "don") {
               options.push(menuArray[i])
           }
       }
   } else {
       for (let i = 0; i < menuArray.length; i++) {
           if (drinkArray[i] == isDrinking) {
               options.push(menuArray[i])
               optionsIng.push(ingArray[i])
           }}}
   for (let i = 0; i < options.length; i++) {
       let j = 0;
       while (!isMatch && j < inputIng.length) {
           if (optionsIng[i] == inputIng[j]) {
               isMatch = true;
               finalOptions.push(options[i])
           }
           j++
       }
   }
//error handling
function chooseFunc() {
   if(inputPeople.length===0){
       peopleError.innerHTML= "people field cannot be empty"
   }else{
       peopleError.innerHTML= " "
   } 
   if(inputIng.length===0){
       ingError.innerHTML= "ingredient field cannot be empty"
   }else{
       ingError.innerHTML= " "
   }
   if(inputPeople.length!==0 && inputIng.length!==0){
       window.location.href = "file:///Users/mariemuramatsu/Desktop/IA/CS%20ai-%20seeds/firebase/top3.html";
   }
}}