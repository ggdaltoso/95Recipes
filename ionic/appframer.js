// Defaults

var screen = {
	width: window.innerWidth,
	height: window.innerHeight
};

Framer.Defaults.Animation = {
    curve: "cubic-bezier(0.465, 0.183, 0.153, 0.946)",
    time: 0.45
}


// Cria objeto

var ImageA = new Layer(),
	ImageB,
	ImageC,
	ImageD;

ImageA.frame = {
	width: 150,
	height: 150
}


// Copia 3x o objeto, depois configura sua cor e posição

ImageB = ImageA.copy();
ImageC = ImageA.copy();
ImageD = ImageA.copy();


ImageA.backgroundColor = 'yellow';
ImageB.backgroundColor = 'indigo';
ImageC.backgroundColor = 'blue';
ImageD.backgroundColor = 'violet';


ImageA.x = 5;
ImageA.y = 100;

ImageC.x = 5;
ImageC.y = 255;

ImageB.x = 160;
ImageB.y = 100;

ImageD.x = 160;
ImageD.y = 255;


// Armazena o estado inicial de cada quadrado

ImageA.states.add("original", ImageA.frame);
ImageB.states.add("original", ImageB.frame);
ImageC.states.add("original", ImageC.frame);
ImageD.states.add("original", ImageD.frame);


// Guarda info se está maximizado ou não

var maximized = false;

ImageA = document.getElementById("img1");

// Animação

function animateImage(image) {

	var maximize = new Animation({
		layer: image,
		properties: {
			x: 0,
			y: 0,
			width: screen.width,
			height: screen.height
		}
	});

	var minimize = maximize.reverse();
	
	if (maximized) {
		image.states.switch('original');
		maximized = false;
		console.log(maximized);
	} else {
		image.bringToFront();
		maximize.start();
		maximized = true;
		console.log(maximized);
	}
}


// Configuração dos eventos

ImageA.on(Events.Click, function() {
	animateImage(this);
})

ImageB.on(Events.Click, function() {
	animateImage(this);
})

ImageC.on(Events.Click, function() {
	animateImage(this);
})

ImageD.on(Events.Click, function() {
	animateImage(this);
})