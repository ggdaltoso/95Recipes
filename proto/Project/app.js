// Defaults

var margin = 10;
var width = 93;
var height = 93;

var protoWidth = 320,
    protoHeight = 480;

// Colors
var black = "#000000";
var gray = "#F5F5F5";
var green = "#99CC10";
var darkGreen = "#669900";
var yellow = "#FFBB33";
var orange = "#FF8800";
var blue = "#84FFFF";
var darkBlue = "#80D8FF";
var deepBlue = "#0099CC";
var purple = "#AA66CC";
var lightPurple = "#8C9EFF";
var lightRed = "#FFCCCC";
var red = "#FF4444";
var pink = "#AA66CC";
var transparent = "transparent";

Framer.Defaults.Animation = {
    curve: "cubic-bezier(0.465, 0.183, 0.153, 0.946)",
    time: 0.45
}

var Container = new Layer({
    width: protoWidth,
	height: protoHeight * 2
});

var containerSpacer = new Layer({
    width: protoWidth,
	height: protoHeight,
    backgroundColor: transparent
});

containerSpacer.style["outline"] = "1px solid red";

containerSpacer.centerFrame();

Container.draggable.enabled = true;
Container.draggable.speedY = 0.5;
Container.draggable.speedX = 0;

Container.superLayer = containerSpacer;
containerSpacer.scrollVertical = false;

var ImageA = new Layer({
    x: margin,
    y: margin,
	width: width * 2 + margin,
	height: height * 2 + margin,
    backgroundColor: deepBlue
});

var ImageB = new Layer({
    x: ImageA.maxX + margin,
    y: margin,
    width: width,
    height: height,    
    backgroundColor: green
});
var ImageC = new Layer({
    x: ImageA.maxX + margin,
    y: ImageB.maxY + margin,
    width: width,
    height: height,
    backgroundColor: yellow
});

var ImageD = new Layer({
    x: ImageA.x,
    y: ImageA.maxY + margin,
    width: width * 3 + margin * 2,
    height: height,
    backgroundColor: purple
});

var ImageE = new Layer({
    x: ImageD.x,
    y: ImageD.maxY + margin,
    width: width + margin,
    height: height,
    backgroundColor: red
});

var ImageF = new Layer({
    x: ImageE.maxX + margin,
    y: ImageE.y,
    width: width * 2,
    height: height * 2 + margin,
    backgroundColor: darkGreen
});

var ImageG = new Layer({
    x: ImageE.x,
    y: ImageE.maxY + margin,
    width: width + margin,
    height: height,
    backgroundColor: orange
});


Container.backgroundColor = transparent;

var bg = new BackgroundLayer({
    backgroundColor: lightRed
})

// Armazena o estado inicial de cada quadrado

ImageA.states.add("original", ImageA.frame);
ImageB.states.add("original", ImageB.frame);
ImageC.states.add("original", ImageC.frame);
ImageD.states.add("original", ImageD.frame);
ImageE.states.add("original", ImageE.frame);
ImageF.states.add("original", ImageF.frame);
ImageG.states.add("original", ImageG.frame);

// Guarda info se está maximizado ou não

var maximized = false;


// Animação

function animateImage(image) {

	var maximize = new Animation({
		layer: image,
		properties: {
			x: 0,
			y: containerSpacer.y + (Container.y * -1),
			width: protoWidth,
			height: protoHeight
		}
	});
    
    console.log(maximize.options.properties);

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
function addClickAnimation(){
    ImageA.on(Events.Click, function() {
	   animateImage(this);
    });
    ImageB.on(Events.Click, function() {
        animateImage(this);
    });
    ImageC.on(Events.Click, function() {
        animateImage(this);
    });
    ImageD.on(Events.Click, function() {
        animateImage(this);
    });
    ImageE.on(Events.Click, function() {
        animateImage(this);
    });
    ImageF.on(Events.Click, function() {
        animateImage(this);
    });
    ImageG.on(Events.Click, function() {
        animateImage(this);        
    });   
};

addClickAnimation();

Container.on(Events.DragEnd, function(){
    if(Container.y > 0 ){
        this.animate({
            properties: { y: 0 }
        });   
    }
});


Container.addSubLayer(ImageA);
Container.addSubLayer(ImageB);
Container.addSubLayer(ImageC);
Container.addSubLayer(ImageD);
Container.addSubLayer(ImageE);
Container.addSubLayer(ImageF);
Container.addSubLayer(ImageG);

