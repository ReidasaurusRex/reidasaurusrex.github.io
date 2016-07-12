(function() {
  SC.initialize({
    client_id: '78329df5c12ce4478aaebe59c073f498'
  });
  window.playTrack = playTrackByID;
  window.songPause = songPause;
  window.songPlay = songPlay;

  function playTrackByID(num) {
    SC.stream('/tracks/' + num).then(function(player) {
      console.log(player);
      window.player = player;
      player.play();
    });
  }
  function songPause() {
    if (window.player) {
      window.player.pause();
    } else {
      console.log("Nothing playing");
    }
  }
  function songPlay(){
    if (window.player) {
      window.player.play();
    } else {
      console.log("No song selected yet");
    }
  }
})();