console.log('Loaded!');
// change the index text
var element = document.getElementById('main-text');
element.innerHTML = 'let\'s make our blog';

// move the image
var img = document.getElementById('sri');

var marginLeft = 0;

function moveRight() {
   marginLeft = marginLeft + 5 ;
   img.style.marginLeft = marginLeft + 'px' ;
}
img.onclick = function () {
	var interval  = setInterval(moveRight, 50);
}