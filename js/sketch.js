//number of particles for each types
let  num = 3000;
// three types of particles a, b and c
var particles_a = [];
var particles_b = [];
var particles_c = [];
var fade = 50; // the length of the particle tail
var radius = 2; // radius of the particles

//scale of curviness of the noise 
let noiseScale = 300;

//how often the direction of the noise change
let noiseStrength = 1.5;


function setup() {
  createCanvas(1000, 1000);
  noStroke();
  for (let i=0; i<num; i++) {
    let loc_a = createVector(random(width*1.2), random(height), 2);
    let angle_a = random(TWO_PI);
    let dir_a = createVector(cos(angle_a), sin(angle_a));
		let loc_b = createVector(random(width*1.2), random(height), 2);
    let angle_b = random(TWO_PI);
    let dir_b = createVector(cos(angle_b), sin(angle_b));
		let loc_c = createVector(random(width*1.2), random(height), 2);
    let angle_c = random(TWO_PI);
    let dir_c = createVector(cos(angle_c), sin(angle_c));

    //particles[i]= new Particle(loc, dir, speed); slower particles will looks shorter 
		particles_a[i] = new Particle(loc_a, dir_a, 0.5);
		particles_b[i] = new Particle(loc_b, dir_b, 0.5);
		particles_c[i] = new Particle(loc_c, dir_c, 0.75);
		
  }
}

function draw() {
	
    smooth();
    // Overlay a semi-transparent red rectangle instead of filling the background completely
    fill(0, 0, 144, 10); // Adjust the alpha value (fourth parameter) to control transparency
    noStroke();
    rect(0, 0, width, height);
    
    for (let i=0; i<num; i++) {
        fill(255, 26, 236); //pink
        particles_a[i].move();
        particles_a[i].update(radius);
        particles_a[i].checkEdges();

        fill(156, 64, 251); //purple
        particles_b[i].move();
        particles_b[i].update(radius);
        particles_b[i].checkEdges();

        fill(121, 69, 255); // blue
        particles_c[i].move();
        particles_c[i].update(radius);
        particles_c[i].checkEdges();
    }
}


let Particle = function(loc_, dir_, speed_) {
  this.loc = loc_;
	this.dir = dir_;
	this.speed = speed_;
	this.d = 0.8;
};

Particle.prototype.run = function() {
	  this.move();
    this.checkEdges();
    this.update();
};

// Method to move position
Particle.prototype.move = function(){
	  this.angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount/noiseScale)*TWO_PI*noiseStrength;
    this.dir.x = cos(this.angle)+sin(this.angle)-sin(this.angle);
    this.dir.y = sin(this.angle)-cos(this.angle)*sin(this.angle);
    this.vel = this.dir.copy();
    this.vel.mult(this.speed*this.d);
    this.loc.add(this.vel);
};

// Method to chech edges 
Particle.prototype.checkEdges = function(){
 if (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height) {    
      this.loc.x = random(width*1.2);
      this.loc.y = random(height);
    }
};


// Method to update position
Particle.prototype.update = function(r){
    ellipse(this.loc.x, this.loc.y, r);
};