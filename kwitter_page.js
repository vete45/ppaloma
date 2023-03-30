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
function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({ name: user_name, message: msg, like: 0 });
    document.getElementById("msg").value = "";
}
function regresar() { window.location.replace("kwitter_room.html"); }
function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                console.log(firebase_message_id);
                console.log(message_data);
                nombre = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4> " + nombre + "<img class='user_tick' src='tick.png'>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();
function updateLike(message_id) {
    console.log("Haz clic Me gusta - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({ like: updated_likes });
}
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location.replace("index.html");
}