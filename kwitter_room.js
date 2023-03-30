var firebaseConfig = {
    apiKey: "AIzaSyBBE1OA0cbSKQ9sWFO6GCQb6Aj-HG-N-O0",
    authDomain: "cls93-5e2d5.firebaseapp.com",
    databaseURL: "https://cls93-5e2d5-default-rtdb.firebaseio.com",
    projectId: "cls93-5e2d5",
    storageBucket: "cls93-5e2d5.appspot.com",
    messagingSenderId: "56921355387",
    appId: "1:56921355387:web:44672e584c40a906cf5ede"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//- Actualizar el elemento HTML con el nombre de usuario y nombre de sala . 
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

//Actualizamos el elemento HTML que tiene el id=’user_name’, con “Hola ” +username= “!”. 
document.getElementById("user_name").innerHTML = "¡Hola " + user_name + "!";

//función add Room 
function addRoom() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({ purpose: "agregamos sala" });
    localStorage.setItem("room_name", room_name);
    window.location.replace("kwitter_page.html");
}

//viene de la documentación de firebase
//cambiar getData por GetRoom para evitar tomar otra variable 
// Recorrer los usuarios en orden con el método forEach(). la devolución de llamada 
// proporcionado a forEach() se llamará sincrónicamente con un DataSnapshot 
// para cada sala:

function getRoom() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Ahora añade filas para cada nombre de sala: 
            //Inicio del código
            console.log("Room Name - " + Room_names);
            row = "<div class= 'room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //Final del código
        });
    });
}
getRoom();
//Redirecciona a RoomName():
function redirectToRoomName(Room_names) {
    console.log(Room_names);
    localStorage.setItem("room_name", Room_names);
    window.location = "kwitter_page.html";
}
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}