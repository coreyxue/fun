$(document).ready(function(){
  var video = $(".video");
  var mc = $(".video")[0];
  var plyBtn = $(".play");
  var muteBtn = $(".mute");
  var slider = $('.slider');
  var vol = $('.volume');
  var url = $('.url');
  var enBtn = $('.enter');

  plyBtn.on('click', function() {
    var state = plyBtn.text();
    console.log(state);
    if (state == 'Play' || state == 'Replay') {
      plyBtn.text('Pause');
      mc.play();
    } else {
      plyBtn.text('Play');
      mc.pause();
    }
  });

  muteBtn.on('click', function() {
    var state = mc.muted;
    if (mc.muted) {
      mc.muted = false;
      muteBtn.css('color', 'white');
    } else {
      mc.muted = true;
      muteBtn.css('color', 'red');
    }
  });

  vol.on('input', function() {
    mc.volume = vol[0].value;
    if (mc.volume == 0.0)
      muteBtn.css('color', 'red');
    else if (!mc.muted && mc.volume != 0.0)
      muteBtn.css('color', 'white');
  });

  slider.on('input', function() {
    var perc = slider[0].value / 100;
    var cur = mc.currentTime;
    if (perc != 0)
      cur = mc.duration * perc;
    mc.currentTime = cur;
    mc.play();
    plyBtn.text('Pause');
  });

  video.on('timeupdate', function() {
    var perc = mc.currentTime / mc.duration * 100;
    if (perc == 100)
      plyBtn.text('Replay');
    slider.val(perc);
  });
  enBtn.on('click', function() {
    addr = url[0].value;
    if (addr != '') {
      mc.src = addr;
      mc.load();
    }
  });
  video.on('dblclick', function() {
    mc.webkitEnterFullScreen();
  })
});