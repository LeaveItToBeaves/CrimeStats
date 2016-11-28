(function() {
  'use strict';
  const trackerURL = 'http://meowthtracker.mwisely.xyz';
  const meowthImageURL = 'css/images/meowth.png';
  const rollaCenter = [37.948889, -91.763056];
  const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib = [
    'Map data ©',
    '<a bhref="http://openstreetmap.org">OpenStreetMap</a>',
    'contributors'
  ].join(' ');

  const zoom = 16; //This matches the zoom on the sample for "Zoom to"
  const defaultZoom = 10; //Default zoom that map starts at
  //element constants from map.ejs
  const transportName = document.getElementById('transportName');
  const pBar = document.getElementById('pBar');
  const zoomMeowth = document.getElementById('zoomMeowth');
  const zoomTarget = document.getElementById('zoomTarget');
  const zoomOut = document.getElementById('zoomOut');
  const follow = document.getElementById('follow');
  //Create map
  var map = L.map('map').setView(rollaCenter, defaultZoom);
  L.tileLayer(osmUrl, {
    attribution: osmAttrib,
    maxZoom: 20 //Max zoom specified at 20
  }).addTo(map);

  var meowthIcon = L.icon({
    iconUrl: meowthImageURL,
    iconSize: [50, 50], //Meowth's icon specified at 50, 50
    iconAnchor: [25, 50] //Meowth's icon specified anchored at 25, 50
  });

  var progress = 0; //initializes variable to track what progress was previously
  var target = L.marker(rollaCenter); //Location of meowth's target
  initTarget(); //Initialize the target marker
  var meowthMarker = L.marker(rollaCenter, {icon: meowthIcon}); //Meowth
  initMeowth(); //Initialize meowth
  updateMeowth(); //Start recursive timeouts

  function updateMeowth() {
    /**
     * Creates a timeout roughly every 500ms to update the map
     */
    setTimeout(function getMeowthLoc() {
      $.getJSON(trackerURL + '/position.json', function(data) {
        let loc = [data.Lat, data.Long]; //This is the location of meowth
        if (progress > data.Progress) {
          //If the last progress was greater than the current one than the
          //location needs to be updated
          updateTarget();
        }
        //Update progress to be the new progress
        progress = data.Progress;
        updateProgress(progress); //Update the progress bar
        updateTransport(data.Transport); //Update meowth's transportation
        L.marker(loc).addTo(map);
        meowthMarker.setLatLng(loc); //Change meowth's location on the map
        if (follow.checked) {
          //If we are supposed to be following map then pan to meowth's location
          map.panTo(loc);
        }
        //Recursive call to the setTimeout to keep up approximately every 500ms
        updateMeowth();
      });
    }, 500);
  }

  function initTarget() {
    /**
     * Sets the target to the proper location and adds the marker
     * to the map
     */
    $.getJSON(trackerURL + '/target.json', function(data) {
      let targetLoc = [data.Lat, data.Long];
      target.setLatLng(targetLoc).addTo(map);
    });
  }

  function initMeowth() {
    /**
     * Changes meowth's marker to his current location and adds him to the map
     */
    $.getJSON(trackerURL + '/position.json', function(data) {
      meowthMarker.setLatLng([data.Lat, data.Long]);
      meowthMarker.addTo(map);
    });
  }

  function updateTarget() {
    /**
     * Updates the location of the target when it has changed
     */
    $.getJSON(trackerURL + '/target.json', function(data) {
      let targetLoc = [data.Lat, data.Long];
      target.setLatLng(targetLoc);
    });
  }

  function updateProgress(progress) {
    /**
     * Updates the progress in the progress bar by changin the width and number
     * printed on the bar
     * @type {number} the progress as a float [0, 1]
     */
    let percentage = progress * 100;
    pBar.style = 'width: ' + percentage + '%';
    pBar.innerHTML = percentage.toFixed(2) + '%';
  }

  function updateTransport(name) {
    /**
     * Updates the transport name
     */
    transportName.innerHTML = name;
  }

  function zoomToMeowth(e) {
    /**
     * Callback function to fly the map to Meowth's current location
     */
    if (e) {e.preventDefault();}
    follow.checked = false;
    map.flyTo(meowthMarker.getLatLng(), zoom);
  }

  function zoomToTarget(e) {
    /**
     * Callback function to fly the map to the target's current location
     */
    if (e) {e.preventDefault();}
    follow.checked = false;
    map.flyTo(target.getLatLng(), zoom);
  }

  function zoomOutfunc(e) {
    /**
     * Callback function to move the map to its original position
     */
    if (e) {e.preventDefault();}
    follow.checked = false;
    map.flyTo(rollaCenter, defaultZoom);
  }

  //Event listeners for the buttons on the page
  zoomMeowth.addEventListener('click', zoomToMeowth);
  zoomTarget.addEventListener('click', zoomToTarget);
  zoomOut.addEventListener('click', zoomOutfunc);
})();
