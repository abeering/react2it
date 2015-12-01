chrome.app.runtime.onLaunched.addListener(function() {
  openReact2it();
});

chrome.commands.onCommand.addListener(function(command) {
  if(command == 'take-react2it'){
    openReact2it();
  }
});

function openReact2it(){
  chrome.app.window.create('capture.html', {
    'outerBounds': {
      'width': 300,
      'height': 330
    }
  });
}
