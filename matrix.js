const CANVAS = document.getElementById("canvas");
const CONTEXT = CANVAS.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

CANVAS.width = width;
CANVAS.height = height;

let max_letters = 500;
let falling = [];
let font_size = 15;
let max_columns = width / font_size;

let frames = 0;

window.addEventListener('resize', function(event) {
	width = window.innerWidth;
	height = window.innerHeight;
	CANVAS.width = width;
	CANVAS.height = height;
	max_columns = width / font_size;

}, true);

let letters = ["a","b","c","d","e","f","g","h","i",
	"j","k","l","m","n","o","p","q","r","s","t","u",
	"v","w","x","y","z","1","2","3","4","5","6","7",
	"8","9","0","A","B","C","D","E","F","G","H","I",
	"J","K","L","M","N","O","P","Q","R","S","T","U",
	"V","W","X","Y","Z","!","@","#","$","%","^","&",
	"*","(",")","[","]","{","}","?","|","<",">"
];

class FallingLetters {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw(ctx) {
		this.value = letters[Math.floor(Math.random() * (letters.length - 1))];
		this.speed = (Math.random() * font_size * 3) / 4 + (font_size * 3) / 4;

		ctx.fillStyle = "rgba(0, 255, 0)";
		ctx.font = font_size + "px sans-serif";
		ctx.fillText(this.value, this.x, this.y);
		this.y += this.speed;

		if(this.y > height) {
			this.y = (Math.random() * height) / 2 - 50;
			this.x = Math.floor(Math.random() * max_columns) * font_size;
			this.speed = (-Math.random() * font_size * 3) / 4 + (font_size * 3) / 4;
		}
	}
}

let update = () => {
	if(falling.length < max_letters) {
		let falling_letter = new FallingLetters(
			Math.floor(Math.random() * max_columns) * font_size,
			(Math.random() * height) / 2 - 50
		);

		falling.push(falling_letter);
	}

	CONTEXT.fillStyle = "rgba(0, 0, 0, 0.05)";
	CONTEXT.fillRect(0, 0, width, height);

	for(let i=0; i<falling.length && frames % 2 == 0; i++) {
		falling[i].draw(CONTEXT);
	}

	requestAnimationFrame(update);
	frames++;
}

update();
