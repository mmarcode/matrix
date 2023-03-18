const CANVAS = document.getElementById('canvas'),
	CONTEXT = CANVAS.getContext('2d'),
	MAX_LETTERS = 300,
	FONT_SIZE = 15,
	LETTERS = ['a','b','c','d','e','f','g','h','i',
		'j','k','l','m','n','o','p','q','r','s','t','u',
		'v','w','x','y','z','1','2','3','4','5','6','7',
		'8','9','0','A','B','C','D','E','F','G','H','I',
		'J','K','L','M','N','O','P','Q','R','S','T','U',
		'V','W','X','Y','Z','!','@','#','$','%','^','&',
		'*','(',')','[',']','{','}','?','|','<','>'
	];

let width = window.innerWidth,
	height = window.innerHeight,
	falling = [],
	max_columns = width / FONT_SIZE,
	frames = 0;

CANVAS.width = width;
CANVAS.height = height;

window.addEventListener('resize', function(e) {
	width = window.innerWidth;
	height = window.innerHeight;
	CANVAS.width = width;
	CANVAS.height = height;
	max_columns = width / FONT_SIZE;
}, true);

class FallingLetters {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw(ctx) {
		this.value = LETTERS[Math.floor(Math.random() * (LETTERS.length - 1))];
		this.speed = (Math.random() * FONT_SIZE * 3) / 4 + (FONT_SIZE * 3) / 4;

		ctx.fillStyle = 'rgba(0, 255, 0)';
		ctx.font = FONT_SIZE + 'px sans-serif';
		ctx.fillText(this.value, this.x, this.y);
		this.y += this.speed;

		if(this.y > height) {
			this.y = (Math.random() * height) / 48;
			this.x = Math.floor(Math.random() * max_columns) * FONT_SIZE;
			this.speed = (-Math.random() * FONT_SIZE * 3) / 4 + (FONT_SIZE * 3) / 4;
		}
	}
}

let update = () => {
	if(falling.length < MAX_LETTERS) {
		let falling_letter = new FallingLetters(
			Math.floor(Math.random() * max_columns) * FONT_SIZE,
			(Math.random() * height) / 48
		);

		falling.push(falling_letter);
	}

	CONTEXT.fillStyle = 'rgba(0, 0, 0, 0.05)';
	CONTEXT.fillRect(0, 0, width, height);

	for(let i = 0; i < falling.length && frames % 2 == 0; i++) {
		falling[i].draw(CONTEXT);
	}

	requestAnimationFrame(update);
	frames++;
}

update();
