let menuSearch = document.getElementById("menuSearch")
let menuInput = document.getElementById("menuInput")
let menuGallery = document.getElementById("menuGallery")
let menuList = ""
let message = document.getElementById("message")
let alph = document.getElementById("alph")
let highRate = document.getElementById("highRate")
let lowRate = document.getElementById("lowRate")
let menuArray = []
let ingredientList = document.getElementById("ingredientList")
let ingChoice = ""
var database = firebase.database()
// to copy data from database to array 
function snapshotToArray(snapshot) {
   let arr = [];
   snapshot.forEach(function (childSnapshot) {
       let item = childSnapshot.val();
       item.key = childSnapshot.key;
       arr.push(item);
   });
   return arr;
}
//retrieving data
function readMenu() {
   database.ref("menu/").once('value').then((snapshot) => {
       let arr = snapshotToArray(snapshot);
       for (let i = 0; i < arr.length; i++) {
           menuList += " " + " " + arr[i].menuName;
       }      
   })
   return menuList
}
//to create buttons on screen from database
function createButton(arr) {
   let html = ""
   for (let i = 0; i < arr.length; i++) {
       html += "<button class='w3-button' id='button" + i + "'>" + arr[i] + "</button>"
   }
   menuGallery.innerHTML = html;
   for (let i = 0; i < arr.length; i++) {
       let button = document.getElementById('button' + i)
       button.addEventListener('click', () => {
           console.log("button" + i + "clicked")
           localStorage.setItem("menubutton", arr[i])
           window.location.href = "file:///Users/mariemuramatsu/Desktop/IA/CS%20ai-%20seeds/firebase/menuDetail.html";
       })
   }
}
function selectionSortA(arr) {
   for (let i = 0; i < arr.length - 1; i++) {
       let min_index = i;
       for (let j = i + 1; j < arr.length; j++) {
           if (arr[j] < arr[min_index]) {
               min_index = j;
           }
       }
       if (min_index !== i) {
           let temp = arr[i];
           arr[i] = arr[min_index];
           arr[min_index] = temp;
       }
   }
   return arr;
}
// to calculate average rating of each menu 
async function calculateRating() {
   let rating = []
   let avgRate = []
   let people = ["Marie", "Yurie", "Mizuho", "Ryu"]
   for (let menuid = 0; menuid < menuArray.length; menuid++) {
       for (let id = 0; id < 4; id++) {
           database.ref("ratings/" + people[id] + "/" + menuArray[menuid])
               .once('value')
               .then((snapshot) => {
                   rating.push([menuid, snapshot.val()])
               })
       }
   }
   await sleep(2000);
   for (let i = 0; i < rating.length; i++) {
       for (let j = 0; j < rating[i].length; j++) {
           console.log(rating[j][1])
           let sum;
           sum = sum + rating[i][1]
       }
       sum = 0;
   }
   return avgRate;
}
function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
//filtering menu display by options
function createMenu() { 
   database.ref("menu/").once('value').then((snapshot) => {
       menuArray = []
       let arr = snapshotToArray(snapshot);
       let value1 = document.getElementById("menuInput").value
       let value2 = ingredientList.options[ingredientList.selectedIndex].text;
       let value3 = cuisineList.options[cuisineList.selectedIndex].text;
       for (let i = 0; i < arr.length; i++) {
           const filter1 = arr[i].menuName
           const filter2 = arr[i].ingredient
           const filter3 = arr[i].cuisine
           if (value1 === "" && value2 === "" && value3 === "") {
               menuArray.push(arr[i].menuName)
           } else if (value1 === "" && value2 === "") {
               if (filter3.includes(value3)) {
                   menuArray.push(arr[i].menuName)
               }
           } else if (value1 === "" && value3 === "") {
               if (filter2.includes(value2)) {
                   menuArray.push(arr[i].menuName)
               }
           } else if (value2 === "" && value3 === "") {
               if (filter1.includes(value1)) {
                   menuArray.push(arr[i].menuName)
               }
           } else if (value1 === "") {
               if (filter2.includes(value2) && filter3.includes(value3)) {
                   menuArray.push(arr[i].menuName)
               }
           } else if (value2 === "") {
               if (filter1.includes(value1) && filter3.includes(value3)) {
                   menuArray.push(arr[i].menuName)
               }
           } else if (value3 === "") {
               if (filter1.includes(value1) && filter2.includes(value2)) {
                   menuArray.push(arr[i].menuName)
               }
           } else {
               if (filter1.includes(value1) && filter2.includes(value2) && filter3.includes(value3)) {
                   menuArray.push(arr[i].menuName)
               }
           }
       }
       const message1 = "that menu is not there"
       if (menuArray.length == 0) {
           message.innerHTML = message1;
       }else{
           message.innerHTML = ""
       }
       calculateRating()
       alph.addEventListener("click", () => {
           menuArray = selectionSort(menuArray)
       })
       highRate.addEventListener("click", () => {
           menuArray = selectionSortD(rating)
       })
       lowRate.addEventListener("click", () => {
           menuArray = selectionSortA(rating)
       })
       createButton(menuArray)
   })
}
//generating menu display by user input
menuInput.addEventListener("change", () => {
   createMenu(menuInput.value)
})


menuSearch.addEventListener("click", () => {
   createMenu(ingChoice)
})
createMenu("");
ingredientList.addEventListener("change", () => {
   ingChoice = ingredientList.options[ingredientList.selectedIndex].text;
})
