function Dot(x, y) {
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.r = 5;
    this.maxSpeed = 10;
    this.maxForce = 0.5;
}

Dot.prototype.behaviors = function() {
    var arrive = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);
    
    arrive.mult(1);
    flee.mult(10);

    this.applyForce(arrive);
    this.applyForce(flee);
}

Dot.prototype.applyForce = function(f) {
    this.acc.add(f);
}

Dot.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
}

Dot.prototype.show = function() {
    this.red = (map(this.pos.x, 0, width, 0, 255));
    this.green = (map(this.pos.y, 0, height, 0, 255));
    stroke(this.red, this.green, 255);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
}

Dot.prototype.arrive = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    var speed = this.maxSpeed;
    if (d < 100) {
        speed = map(d, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
}

Dot.prototype.flee = function(target) {
    var desired = p5.Vector.sub(target, this.pos);
    var d = desired.mag();
    if (d < 50) {
        desired.setMag(this.maxSpeed);
        desired.mult(-1);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    } else {
        return createVector(0, 0);
    }
}