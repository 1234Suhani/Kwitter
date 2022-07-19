//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyBorPJZ7UAzOvGsZkO7glZrTU6vVknp3ME",
      authDomain: "kwitter-24b00.firebaseapp.com",
      databaseURL: "https://kwitter-24b00-default-rtdb.firebaseio.com",
      projectId: "kwitter-24b00",
      storageBucket: "kwitter-24b00.appspot.com",
      messagingSenderId: "1080356455006",
      appId: "1:1080356455006:web:0c60550c2d04b7cbceaacf"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
     username= localStorage.getItem("user");
     roomname= localStorage.getItem("room_name");
function getData() { firebase.database().ref("/"+roomname).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         console.log(firebase_message_id);
         console.log(message_data);
          message = message_data['message'] ;
          messageName = message_data['name'];
          messageLike= message_data['like'];
         name_with_tag= "<h4> "+messageName+" <img class='user_tick' src='tick.png'></h4>";
          message_with_tag="<h4> <img class='message_h4'>" + message + "</h4>";
          like_button= "<button class='btn btn-warning' id="+firebase_message_id+" value="+messageLike+" onclick='UpdateLike(this.id)' >";
          span_with_tag= "<span class= 'glyphicon glyphicon-thumps-up'>Like: "+messageLike+"</span> </button> </hr> ";
          
          document.getElementById("output").innerHTML+= name_with_tag+message_with_tag+like_button+span_with_tag;
         
//Start code


//End code
      } });  }); }
getData();

function logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("room_name");
          window.location = "index.html";
      }

      function Send() {
            message= document.getElementById("text-input").value;
            firebase.database().ref(roomname).push({
                  name: username, 
                  message: message,
                  like : 0
            });

      }
      function UpdateLike(message_id){
            console.log("Click on the like button " + message_id);
            button_id= message_id;
            likes= document.getElementById(button_id).value;
            updated_likes= Number(likes) + 1;
            firebase.database().ref(roomname).child(message_id).update({
                  like:updated_likes
            })

      }