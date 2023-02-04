/* eslint-disable no-unused-vars */
var database = firebase.database();
let data = {
   users: {
       userid: {
           email: "",
           password : "",
           isAdmin: true
       }
   },
   ratings: {
       userid: {
           menuid: {
               rating: 0
           }
       }
   },
   menu: {
       menuid: {
           menuName: "",
           ingredient: "",
           type: "",
           isDrink: true,
           isSpecial: true,
           avgRating: 0
       }
   },
   history: {
       menuid: {
           date : ""
       }
   },
}
JSON.parse(JSON.tringify(database))
class Menu {
   constructor(menuid, ingredient, isDrink, cuisine) {
       this._menuid = menuid;
       this._ingredient = ingredient;
       this._isDrink = isDrink;
       this._cuisine = cuisine
   }
   get menuName(){
       return this.menuName;
   }
   get menuid() {
       return this._menuid;
   }
   get ingredient() {
       return this._ingredient;
   }
   get isDrink() {
       return this._insDrink;
   }
   get cuisine() {
       return this._cuisine;
   }
   set menuid(value) {
       this._menuid = value;
   }
   set ingredient(value) {
       this._ingredient = value;
   }
   set cuisine(value) {
       this._cuisine = value;
   }
   set menuName(value) {
       this._menuName = value;
   }
}
class User {
   constructor(userid, email) {
       this._userid = userid;
       this._email = email
   }
   get userid() {
       return this._userid;
   }
   get email() {
       return this._email;
   }
   set userid(value) {
       this._userid = value;
   }
   set email(value) {
       this._email = value;
   }
}
class History {
   constructor(menuid, date, people) {
       this.menuid = menuid;
       this.date = date;
       this.people = people
   }
   get menuid() {
       return this._menuid
   }
   get date() {
       return this._date
   }
   get people() {
       return this._people
   }
   set menuid(value) {
       this._menuid = value;
   }
   set date(value) {
       this._date = value;
   }
}
// writing data functions
function writeUser(userid, email, isAdmin, password) {
   database.ref('users/' + userid).set({
       userid: userid,
       email: email,
       password: password,
       isAdmin: isAdmin,
   });
   console.log("Added user " + userid)
}
function writeMenu(menuName, ingredient, isDrink, cuisine) {
   database.ref('menu/' + menuName).set({
       menuid:menuName,
       menuName: menuName,
       ingredient: ingredient,
       isDrink: isDrink,
       cuisine: cuisine,
   });
   console.log("Added menu " + menuName)
}
function writeRating(userid, menuid, rating) {
   database.ref('rating/' + userid + "/" + menuid).set({
       rating: rating
   });
   console.log("write rating " + userid + menuid + rating)
}


function writeHistory(menuid, date, people) {
   database.ref('history/' + menuid).set({
       menuid: menuid,
       date: date,
       presentM: people,
   });
   console.log("Added history " + date)
}
// reading data functions 


function readUser() {
   database.ref("Users/").once('value').then((snapshot) => {
       console.log("> readUser(");
       let arr = snapshotToArray(snapshot);
   })
}
function readMenuById(id) {
   database.ref("menu/" + id).once('value').then((snapshot) => {
       console.log("> readmenubyID(" + id + ")");
       console.log(snapshot.val().menuid);
       console.log(snapshot.val().ingredient);
       console.log(snapshot.val().isDrink);
       console.log(snapshot.val().cuisine);
   })
}
function readMenu() {
   console.log("hello!!!")
   database.ref("menu/").once('value').then((snapshot) => {
       console.log("> readMenu");
       let arr = snapshotToArray(snapshot);
       for (let i = 0; i < arr.length; i++) {
           console.log(arr[i].menuid);
           console.log(arr[i].menuName);
           console.log(arr[i].ingredient);
           console.log(arr[i].isDrink);
           console.log(arr[i].cuisine);       }
   })
}
function readRating() {
   database.ref("ratings/").once('value').then((snapshot) => {
       console.log("> readrating(");
       let arr = snapshotToArray(snapshot);
       for (let i = 0; i < arr.length; i++) {
           console.log(arr[i].userid);
           console.log(arr[i].rating);
       }
   })
}
// additional functions
function snapshotToArray(snapshot) {
   let arr = [];
   snapshot.forEach(function (childSnapshot) {
       let item = childSnapshot.val();
       item.key = childSnapshot.key;
       arr.push(item);
   });
   return arr;
}


async function getArray(path) {
   const snapshot = await database.ref(path).once('value')
   return snapshotToArray(snapshot)
}
// selection sort algorithm 
function selectionSort(arr) {


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
// Binary search functions
let searchBinary = (arr, key, value, start, end) => {
   if (start > end) return -1
   let mid = Math.floor((start + end) / 2)
   if (arr[mid][key] === value) return arr[mid]
   if (arr[mid][key] > value)
       return searchBinary(arr, key, value, start, mid - 1)
   else
       return searchBinary(arr, key, value, mid + 1, end)
}


function deletePath(path) {
   database.ref(path).remove();
   console.log("deleted:" + path);
}
// to delete all data in database
function resetDatabase() {
   database.ref().remove();
   console.log("reset database: success");

}

