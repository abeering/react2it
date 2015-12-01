chrome.app.runtime.onLaunched.addListener(function() {
  openReactigif();
});

chrome.commands.onCommand.addListener(function(command) {
  if(command == 'take-reactigif'){
    openReactigif();
  }
});

function openReactigif(){
  chrome.app.window.create('capture.html', {
    'outerBounds': {
      'width': 300,
      'height': 330
    }
  });
}
