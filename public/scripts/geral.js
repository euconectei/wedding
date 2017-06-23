const applicationServerPublicKey = 'BNSmrP0eU2j2B95hFLB1IMR3HdeSStOtH8gDtyKKNaRliKsAoe4mSyMuNpx2JEv7HlPzP5xdFQ1RU4T51ahBqZw';
var ux = document.querySelector('#ux');

(function scroll() {
  var links = document.querySelectorAll('a[href*="#"]:not([href="#"])');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function () {
      event.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
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
var invites = db.ref('invites');

document.querySelector('#search')
  .addEventListener('click', function () {
    var confirmed = false;
    // event.preventDefault();
    console.log('entrou em envio de confirmacao');
    var code = document.querySelector('#code').value;
    searchInvites(code);
  }, false);

document.querySelector('#confirm')
  .addEventListener('click', function () {
    var ids = document.querySelectorAll('#group tr');
    console.log(ids);
    console.log(typeof(ids));
    for (var i=0; i < ids.length; i++) {
      console.log(ids[i]);
      var id = ids[i].id;
      console.log(id);
      var confirm = document.querySelector('#'+id+' input[type=checkbox]').checked;
      console.log(confirm);
      confirmInvite(id, confirm)
    }
  });

function searchInvites(code) {
  
  document.querySelector('#result').removeAttribute('style');
  var elemResult = document.querySelector('#result #group');
  elemResult.innerHTML = '';
  //buscando convidados com o codigo
  invites.orderByChild('code').equalTo(code).once(
    "value",
    function(snapshot) {
      var data = snapshot.val();
      var group = document.querySelector('#group');
      for (var key in data) {
        console.log(data[key]);
        
        var individual = document.createElement('tr');
        individual.setAttribute('id', key);
        group.appendChild(individual);
        
        var tdCheck = document.createElement('td');
        var individualConfirm = document.createElement('input');
        individualConfirm.setAttribute('type', 'checkbox');
        if (data[key]['confirmed'] === true) {
          individualConfirm.setAttribute('checked', 'checked');
        }
        tdCheck.appendChild(individualConfirm);
        individual.appendChild(tdCheck);
        
        var tdName = document.createElement('td');
        tdName.innerText = data[key]['name'];
        individual.appendChild(tdName);

      }
    });
  //exibindo convidados com o codigo
}

function confirmInvite(id, confirm) {
  var updates = {};
  updates[ id + '/' + 'confirmed'] = confirm;
  invites.update(updates, function(error) {
    if (error) {
      // ux.classList.add('alert-danger');
      // ux.innerText = 'Confira se o nome está como o do convite individual.';
    } else {
      ux.classList.add('alert-success');
      ux.innerText = 'Dados atualizados com sucesso.';
    }
  });
}




function updateInvite(name) {
  console.log('verificando se visitante "' + name + '" é convidado');
  invites.orderByChild('name').equalTo(name).once(
    "value",
    function(snapshot) {
      var data = snapshot.val();
      console.log(data);
      
      if (data !== null) {
        for (var key in data) {
          console.log(key);
          var invite = db.ref('invites/' + key);
          console.log(invite);
          invite.once('value').then(
            function (snap) {
              var s = snap.val();
              console.log(s);
              console.log('verificando se o convidado já confirmou!');
              if (s.confirmed) {
                ux.classList.add('alert-info');
                ux.innerText = 'Este nome já foi confirmado.';
              } else {
                var updates = {};
                updates[ key + '/' + 'confirmed'] = true;
                invites.update(updates, function(error) {
                  if (error) {
                    // ux.classList.add('alert-danger');
                    // ux.innerText = 'Confira se o nome está como o do convite individual.';
                  } else {
                    ux.classList.add('alert-success');
                    ux.innerText = 'Confirmado com sucesso.';
                  }
                });
              }
            },
            function (er) {
              console.log(er);
            }
          );
        }
        
      } else {
        console.log('não existe');
        ux.classList.add('alert-danger');
        ux.innerText = 'Confira se o nome está como o do convite individual.';
      }

      

    },
    function (err) {
      console.log('Sem permissão para acessar os dados');
      console.log(err);
    }
  );
}