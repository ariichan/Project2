// fishy.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.fishy = {
// CONSTANT properties
    	
		// variable properties
		renderer: undefined,
		scene: undefined,
		camera: undefined,
		light: undefined,
		paused: false,
		dt: 1/60,
		
		//tank stuff
		tank: undefined,
		//insideTank: undfined,
		
		//creates bubbles
		nextBubble: app.utilities.getRandom(50, 100),
		bubbles: [],
		
    	init : function() {
			console.log('init called');
			this.setupThreeJS();
			this.setupWorld();
			this.update();
    	},
    	
    	
    update: function(){
    	// schedule next animation frame
    	app.animationID = requestAnimationFrame(this.update.bind(this));
    	
		// PAUSED?
		if (app.paused){
			this.drawPauseScreen();
			return;
		 }
	
		// UPDATE
		this.controls.update(this.dt);
		this.nextBubble --;
		
		if (this.nextBubble <= 0)
		{
			this.bubbles.push (new app.Bubbles());
			this.nextBubble = app.utilities.getRandom(50, 100);
		}
		
		for(var i = 0; i < this.bubbles.length; i++)
		{
			var b = this.bubbles[i];
			
			b.update();
					
			if(b.lifeTime <= 0)
			{
				this.scene.remove(b.bubble);
				this.bubbles.splice(i,1);
			}
		}
		
		// DRAW	
		this.renderer.render(this.scene, this.camera);
		
	},
	
	setupThreeJS: function() 
	{
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog(0x0066FF, 100, 200);

		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.y = 150;
		this.camera.position.z = 300;
		this.camera.rotation.x = -25 * Math.PI / 180;

		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.shadowMapEnabled = true;
		document.body.appendChild(this.renderer.domElement );

		this.controls = new THREE.FirstPersonControls(this.camera);
		this.controls.movementSpeed = 100;
		this.controls.lookSpeed = 0.1;
		this.controls.autoForward = false;
	},
			
	setupWorld: function() 
	{
	
		//add the tank
		this.tank = new app.Tank();
		//this.insideTank = new app.Tank();
		
				
		// add directional light and enable shadows
		//the sun
		this.light = new THREE.DirectionalLight(0xF0F8FF,5);
		this.light.position.set(100, 1000, 100);
		this.light.castShadow = true;
		this.light.shadowMapWidth = 2048;
		this.light.shadowMapHeight = 2048;
				
		var d = 1000; // d = distance
		//near and far of shadows and camera
		this.light.shadowCameraLeft = d;
		this.light.shadowCameraRight = -d;
		this.light.shadowCameraTop = d;
		this.light.shadowCameraBottom = -d;
		this.light.shadowCameraFar = 2500;
		this.scene.add(this.light);
		
		/*var gui = new dat.GUI();
        gui.addColor(this.controls, 'LightColor').onChange(function (e) {
        this.light.color = new THREE.Color(e);
		});

		gui.addColor(this.controls, 'FogColor').onChange(function (e) {
			scene.fog.color = new THREE.Color(e);
		});
		*/
	},
	
	drawPauseScreen: function(){
		// do something pause-like if you want
	}
	
};