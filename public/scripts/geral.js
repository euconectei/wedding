const applicationServerPublicKey = 'BNSmrP0eU2j2B95hFLB1IMR3HdeSStOtH8gDtyKKNaRliKsAoe4mSyMuNpx2JEv7HlPzP5xdFQ1RU4T51ahBqZw';

// // scroll
// $(function() {
//   $('a[href*="#"]:not([href="#"])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target.length) {
//         $('html, body').animate({
//           scrollTop: target.offset().top
//         }, 300);
//         return false;
//       }
//     }
//   });
// });


// Countdown
// $("#countdown")
//   .countdown("2017/08/06 16:00:00", function(event) {
//     $(this).text(
//       event.strftime('%D dias %H:%M:%S')
//     );
//   });

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

// $(document).ready(function () {
  

  
//   var optionNotification = {
//     "body": "Está chegando o dia!",
//     "icon": "imgs/logo-192.png",
//     "vibrate": [200, 100, 200, 100, 200, 100, 400],
//     "tag": "request"
//   };
//   document.body.requestFullscreen();
//   serviceWorkerRegistration.showNotification('Teste', optionNotification);
// });