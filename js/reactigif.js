var imgur_client_id = '7ef4d927d69a2e8';

window.onload = function(){
  document.getElementById('redo-button').addEventListener('click', restartCapture);
  document.getElementById('close-button').addEventListener('click', function(){
    window.close();
  });
  startCountdown();
}

function restartCapture(){
  toggleElement('timer');
  toggleElement('finished');
  startCountdown();
}

function startCountdown(){
  setTimeout(function(){
    setTimer(3);
  }, 1000);
  setTimeout(function(){
    setTimer(2);
  }, 2000);
  setTimeout(function(){
    setTimer(1);
  }, 3000);
  setTimeout(function(){
    setTimer('');
    toggleElement('timer');
    toggleElement('recording');
    takeVideo();
  }, 4000);
}

function setTimer(val) {
  var timer = document.getElementById('timer')
  if(timer.firstChild){
    timer.removeChild(timer.firstChild);
  }
  timer.appendChild( document.createTextNode(val));
}

function setImageUrl(image_url) {
  var url_input = document.getElementById('image-url');
  url_input.value = image_url;

}

function setImage(image) {
  var image_container = document.getElementById('video-image')
  if(image_container.firstChild){
    image_container.removeChild(image_container.firstChild);
  }
  image_container.appendChild(image);
}

function processUpload(){
  var image_url = imageUrlFromImgurResponse(this.responseText);
  setImageUrl(image_url);
  toggleElement('loading');
  toggleElement('finished');
  document.getElementById('image-url').select();
  bool = document.execCommand('copy');
}

function takeVideo(){
  gifshot.createGIF({numFrames: 15}, function(obj) {
      if(!obj.error) {
          var base64_image = obj.image;
          image = document.createElement('img');
          image.src = base64_image;
          setImage(image);
          uploadImage(base64_image);
          toggleElement('recording');
          toggleElement('loading');
      } else {
        alert(obj.errorMsg);
      }
  });
}

function toggleElement(el_id){
  var el = document.getElementById(el_id);
  if(el.style.display == 'none'){
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function imageUrlFromImgurResponse(response){
  var data = JSON.parse(response);
  return data['data']['link'];
}

function uploadImage(base64_image){
  var upload_request = new XMLHttpRequest();
  upload_request.open('POST', 'https://api.imgur.com/3/upload');
  upload_request.setRequestHeader('Authorization','Client-ID ' + imgur_client_id);
  upload_request.setRequestHeader('Accept', 'application/json');
  upload_request.addEventListener('load', processUpload);

  var fd = new FormData();
  fd.append("image", base64_image.split(',')[1]);
  fd.append("type", "base64");
  upload_request.send(fd);
}
