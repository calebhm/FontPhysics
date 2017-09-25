var font;
var dots = [];

function preload() {
    font = loadFont('kingsmen/Kingsmen_D.otf');
}

function setup() {
    createCanvas(640, 300);
    textSize(186);
    
    var points = font.textToPoints('Hello', 120, 210);
    
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var dot = new Dot(pt.x, pt.y);
        dots.push(dot);
    }
}

function draw() {
  background(0);
    for (var i = 0; i < dots.length; i++) {
        var v = dots[i];
        v.behaviors();
        v.update();
        v.show();
    }
}