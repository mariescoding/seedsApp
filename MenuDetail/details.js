let menuName = document.getElementById("menuName")
let cuisineDetail = document.getElementById("cuisineDetail")
let drinkDetail = document.getElementById("drinkDetail")
let historyOne = document.getElementById("historyOne")
let historyTwo = document.getElementById("historyTwo")
let editRating = document.getElementById("editRating")
let editRatingCheck = document.getElementById("editRatingCheck")
let averageRate = document.getElementById("averageRate")
let personRate = document.getElementById("personRate")
let menuN = ""
let cuisineN = ""
let drinkB = ""
let dateHistory = ""
let newRate = 0;
var database = firebase.database()
// allows user to rewrite their rating of menu 
function writeRating(userid, menuid, rating) {
   database.ref('rating/' + userid + "/" + menuid).set({
       rating: rating
   });
}
// retrieve rating of menu 
function readRatingById(id, menuid) {
   database.ref("ratings/" + id + "/" + menuid).once('value').then((snapshot) => {
       averageRate.innerHTML += ""
   })
}
function snapshotToArray(snapshot) {
   let arr = [];
   snapshot.forEach(function (childSnapshot) {
       let item = childSnapshot.val();
       item.key = childSnapshot.key;
       arr.push(item);
   });
   return arr;
}
let menuid = localStorage.getItem("menubutton")
//error and input handling of editting rate
editRatingCheck.addEventListener("click", () => {
   let x = document.getElementById("editRating").value;
   let message;
   if (isNaN(x)) {
       message = "please enter a number";
   } else if (x < 1 || x > 5) {
       message = "please enter from 1 to 5";
   } else {
       message = "Input OK";
       writeRating("Mizuho", menuid, x)
       console.log(x)
       personRate.innerHTML = "yours : " + x
   }
   document.getElementById("message").innerHTML = message;
})
//retrieving & displaying drink data
function readMenuById(id) {
   database.ref("menu/" + id).once('value').then((snapshot) => {    
       menuN = snapshot.val().menuid
       cuisineN = snapshot.val().cuisine
       if (snapshot.val().isDrink) {
           drinkB = "drink"
       } else {
           drinkB = "not drink"
       }
       menuName.innerHTML = menuN
       cuisineDetail.innerHTML = cuisineN
       drinkDetail.innerHTML = drinkB
   })
}
readMenuById(menuid)
readHistoryById(localStorage.getItem("menubutton"))
console.log(localStorage.getItem("menubutton"))
readRatingById("Marie", localStorage.getItem("menubutton"))
