if(self!==top)
{
//
}

document.documentElement.style.cursor = 'none';

const pathToImages = "/images/cursor/";
const delay = ms => new Promise(res => setTimeout(res, ms));

let cursor = document.querySelector(".footer_cursor");
const hand = document.getElementById("footer_cursor_image");
const shadow = document.getElementById("footer_cursor_shadow");

const hover = "hover";
const inactive = "inactive";

setTimeout(function() {
	document.querySelector(".footer_cursor_image").classList.add('flip_image');
	document.querySelector(".footer_cursor_shadow").classList.add('flip_shadow');
}, 400);	



function moveMouse(e) {
  const x = e.clientX;
  const y = e.clientY;
  cursor.style.left = x;
  cursor.style.top = y;
  
}

// this function turn on/off the animation
function cursorToggle(status) {
	if (status == "on")
	{
		hand.src = pathToImages + "hover_between.png";
		shadow.src = pathToImages + "hover_between.png";		
		const showCursorHover = async () => {
			await delay(60);
			hand.src = pathToImages + "hover.png";
			shadow.src = pathToImages + "hover.png";					
		};
		showCursorHover();
	}
	else
	{
		hand.src = pathToImages + "hover_between.png";
		shadow.src = pathToImages + "hover_between.png";		
		const showCursorHover = async () => {
			await delay(80);
			hand.src = pathToImages + "normal.png";
			shadow.src = pathToImages + "normal.png";					
		};
		showCursorHover();
	}
}
document.addEventListener("mousemove", moveMouse);
[].forEach.call(document.querySelectorAll('a, #footer_close_button, -webkit-scrollbar-thumb'), function(link) {
	link.addEventListener('mouseenter', function(event) {
		cursorToggle("on");
	});
	link.addEventListener('mouseleave', function(event) {
		cursorToggle("off");
	});
	link.addEventListener('click', function (evebt) {
		hand.src = pathToImages + "click.png";
		shadow.src = pathToImages + "click.png";		
		setTimeout(function()
		{
			hand.src = pathToImages + "normal.png";
			shadow.src = pathToImages + "normal.png";						
		}, 80);		
	});
link.addEventListener('mousedown', function (evebt) {
	hand.src = pathToImages + "grab.png";
	shadow.src = pathToImages + "grab.png";		
});
	
});		



document.querySelector('#footer_close_button').addEventListener('click', function () {
	// window.parent.unloadFrame();
	closeFrame();
});	

const closeButton = document.querySelector(".icon_close_tr");
document.querySelector('.icon_close_tr').addEventListener('mouseenter', function () {
	closeButton.classList.add("close_hover");
});

document.querySelector('.icon_close_tr').addEventListener('mouseleave', function () {
	closeButton.classList.remove("close_hover");
});	



window.onload = function() {
	setTimeout(function() {
		const revealPage = document.querySelector(".footer_page_reveal");
		revealPage.classList.add("reveal");

		const unrollPaper = document.querySelector(".paper_roll_unroll");
		unrollPaper.classList.add("unroll");
		
	}, 500);	
}

function closeFrame()
{
	const hidePage = document.querySelector(".footer_page_reveal");
	hidePage.classList.add("hide");
	
	const rollUp = document.querySelector(".paper_roll_rollUp");
	rollUp.classList.add("rollUp");
	
	rollUp.addEventListener("transitionend",
    () => {
		window.parent.frameContentClosed();
		cursor.style.visibility = "hidden";
    })		
}

if(('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
	cursor.style.visibility = "hidden";
}
