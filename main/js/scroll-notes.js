<script src="path/to/smooth-scroll.polyfills.min.js"></script>


<!-- Always get the latest version -->
<!-- Not recommended for production sites! -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll/dist/smooth-scroll.polyfills.min.js"></script>

<!-- Get minor updates and patch fixes within a major version -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js"></script>

<!-- Get patch fixes within a minor version -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0/dist/smooth-scroll.polyfills.min.js"></script>

<!-- Get a specific version -->
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js"></script>



npm install smooth-scroll



<a data-scroll href="#bazinga">Anchor Link</a>
...
<div id="bazinga">Bazinga!</div>




<script>
	var scroll = new SmoothScroll('a[href*="#"]');
</script>





var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 300
});



// All animations will take exactly 500ms
var scroll = new SmoothScroll('a[href*="#"]', {
	speed: 500,
	speedAsDuration: true
});



var scroll = new SmoothScroll('a[href*="#"]', {
	// Function. Custom easing pattern
	// If this is set to anything other than null, will override the easing option above
	customEasing: function (time) {

		// return <your formulate with time as a multiplier>

		// Example: easeInOut Quad
		return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

	}
});



var scroll = new SmoothScroll('a[href*="#"]', {

	// Selectors
	ignore: '[data-scroll-ignore]', // Selector for links to ignore (must be a valid CSS selector)
	header: null, // Selector for fixed headers (must be a valid CSS selector)
	topOnEmptyHash: true, // Scroll to the top of the page for links with href="#"

	// Speed & Duration
	speed: 500, // Integer. Amount of time in milliseconds it should take to scroll 1000px
	speedAsDuration: false, // If true, use speed as the total duration of the scroll animation
	durationMax: null, // Integer. The maximum amount of time the scroll animation should take
	durationMin: null, // Integer. The minimum amount of time the scroll animation should take
	clip: true, // If true, adjust scroll distance to prevent abrupt stops near the bottom of the page
	offset: function (anchor, toggle) {

		// Integer or Function returning an integer. How far to offset the scrolling anchor location in pixels
		// This example is a function, but you could do something as simple as `offset: 25`

		// An example returning different values based on whether the clicked link was in the header nav or not
		if (toggle.classList.closest('.my-header-nav')) {
			return 25;
		} else {
			return 50;
		}

	},

	// Easing
	easing: 'easeInOutCubic', // Easing pattern to use
	customEasing: function (time) {

		// Function. Custom easing pattern
		// If this is set to anything other than null, will override the easing option above

		// return <your formulate with time as a multiplier>

		// Example: easeInOut Quad
		return time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

	},

	// History
	updateURL: true, // Update the URL on scroll
	popstate: true, // Animate scrolling with the forward/backward browser buttons (requires updateURL to be true)

	// Custom Events
	emitEvents: true // Emit custom events

});



// Log scroll events
var logScrollEvent = function (event) {

	// The event type
	console.log('type:', event.type);

	// The anchor element being scrolled to
	console.log('anchor:', event.detail.anchor);

	// The anchor link that triggered the scroll
	console.log('toggle:', event.detail.toggle);

};

// Listen for scroll events
document.addEventListener('scrollStart', logScrollEvent, false);
document.addEventListener('scrollStop', logScrollEvent, false);
document.addEventListener('scrollCancel', logScrollEvent, false);




var scroll = new SmoothScroll();
scroll.animateScroll(
	anchor, // Node to scroll to. ex. document.querySelector('#bazinga')
	toggle, // Node that toggles the animation, OR an integer. ex. document.querySelector('#toggle')
	options // Classes and callbacks. Same options as those passed into the init() function.
);




var scroll = new SmoothScroll();
var anchor = document.querySelector('#bazinga');
scroll.animateScroll(anchor);




// You can optionally pass in a y-position to scroll to as an integer
var scroll = new SmoothScroll();
scroll.animateScroll(750);



var scroll = new SmoothScroll();
scroll.cancelScroll();



var scroll = new SmoothScroll();
scroll.destroy();



<nav data-scroll-header>
	...
</nav>
...
<script>
	var scroll = new SmoothScroll('.some-selector',{
		header: '[data-scroll-header]'
	});
</script>



