// Initialize Firebase
var config = {
apiKey: "AIzaSyDQff0khc_zt4keBDkV4YAR-OsbpH_Bbgk",
authDomain: "silken-alloy-164902.firebaseapp.com",
databaseURL: "https://silken-alloy-164902.firebaseio.com",
projectId: "silken-alloy-164902",
storageBucket: "silken-alloy-164902.appspot.com",
messagingSenderId: "575718761506"
};
firebase.initializeApp(config);

var db = firebase.database();

/*
 *
 *  Function createInvite
 * 
 */

function createInvite(name, email, tel) {
  var ivtData = {
    name: name,
    email: email,
    tel: tel
  };
  var ivtKey = db.ref().child('invite').push().key;
  db.ref('invite/' + ivtKey).set(ivtData);
}

var name = document.querySelector('#nome').value;
// var name = 'Rafael França Marques da Silva';
var email = document.querySelector('#email').value;
// var email = 'rafaelfms@gmail.com';
var tel = document.querySelector('#tel').value;
// var tel = '21981067464';

// document.querySelector('#bt_createInvite').addEventListener('click', function () {createInvite(name, email, tel);}, false);



/*
 *
 *  Function readInvite
 * 
 */

var invites = db.ref('invite');
function updateInvites(elem, value) {
  var tr = document.createElement('tr');
  tr.setAttribute('id', value.key);
  val = value.val()
  var tdName = document.createElement('td');
  tdName.innerText = val.name;
  var tdEmail = document.createElement('td');
  tdEmail.innerText = val.email;
  var tdTel = document.createElement('td')
  tdTel.innerText = val.tel;
  var tdAction = document.createElement('td');
  tdAction.innerHTML = `<div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Ações <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <li><a href="#">Confirmar</a></li>
      <li><a href="#">Apagar</a></li>
    </ul>
  </div>`;

  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(tdTel);
  tr.appendChild(tdAction);
  document.querySelector(elem).appendChild(tr);
}
invites.on('child_added', function (snapshot) {
  updateInvites('#tb_invites', snapshot);
});


// Instanciando provedor do Google

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
    // No user is signed in.
  }
});