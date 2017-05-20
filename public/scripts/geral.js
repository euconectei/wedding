const applicationServerPublicKey = 'BNSmrP0eU2j2B95hFLB1IMR3HdeSStOtH8gDtyKKNaRliKsAoe4mSyMuNpx2JEv7HlPzP5xdFQ1RU4T51ahBqZw';

(function scroll() {
  var links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      event.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      console.log(target);
      scrollTo(document.body, target.offsetTop, 300);
    }, false);
  }
}());

// countdown
countdown('#countdown', "2017/08/06 16:00:00");

// Mapa
function initMap() {
  var salao = {lat: -22.9306345, lng: -43.5676232};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: salao
  });
  var marker = new google.maps.Marker({
    position: salao,
    map: map
  });
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

// Oculta antes do evento
(function () {
  var now = performance.now();
  var evento = Date.parse('2017/08/06 16:00:00');

  if (evento > now) {
    console.log('ainda vem');
    var elemDepois = document.getElementsByClassName('depois');
    for (var i = 0; i < elemDepois.length; i++) {
      elemDepois[i].style.display = 'none';
    }
    // elemDepois.style.display = 'none';
  } else {
    console.log('passou');
  }
}());

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
var invites = db.ref('invite');

document.querySelector('#form-confirm')
  .addEventListener('submit', function () {
    event.preventDefault();
    if (verifyGuest()) {

    }
    var name = document.querySelector('#nome').value;
    var email = document.querySelector('#email').value;
    updateInvite(name, email, tel, code);
  }, false);

function verifyGuest(name, code) {
  invites.orderByChild('code').equalTo(code)
}