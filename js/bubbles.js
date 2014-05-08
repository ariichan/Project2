// bubbles.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.Bubbles = function()
{
	
	function Bubbles ()
	{
		this.size = app.utilities.getRandom(3, 13);
		this.lifeTime = app.utilities.getRandom(100, 200);
		
		this.x = app.utilities.getRandom(-87, 87);
		this.fixedX = this.x;
		this.z = app.utilities.getRandom(-137, 137);
		this.fixedZ= this.z;
		this.y = 0;
	
		//make geometry for all of the bubble
		this.geometry = new THREE.SphereGeometry(this.size);
							
		this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
		// make the bubble semi-transparent
		this.material.transparent = true;
		this.material.opacity = 0.3;
		this.material.reflectionRatio = 0.8;
				
		this.bubble = new THREE.Mesh(this.geometry, this.material);
		this.bubble.castShadow = true;
		this.bubble.receiveShadow = true;
		app.fishy.scene.add(this.bubble);
		
		//decide which way the bubble will osculate
		this.ran = app.utilities.getRandom(1, 2);
		
		
	};
	
	var p = Bubbles.prototype;
	
	p.update = function()
	{
		this.y += 1;
		
		var time = new Date().getTime() * 0.002;
		
		if(this.ran == 1)
		{
			//osculate in the x direction;
			this.x = 10 * Math.sin(time) + this.fixedX;
		}
		else
		{
			//osculate in the x direction;
			this.z = 10 * Math.sin(time) + this.fixedZ;
		}
		
		
		
		this.lifeTime -= 1;
		
		this.bubble.position.x = this.x;
		this.bubble.position.y = this.y;
		this.bubble.position.z = this.z;
		
	}
	
	return Bubbles;

}();