// tank.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.Tank = function()
{
	
	function Tank ()
	{
	
		//make geometry for all of the tank
		this.geometry = new THREE.CubeGeometry(200,200,300);
		this.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 100, 0));
							
		this.material = new THREE.MeshPhongMaterial({color: 0xffffff});
		// make the tank semi-transparent
		this.material.transparent = true;
		this.material.opacity = 0.5;
		this.material.reflectionRatio = 0.8;
		
		this.material.side = THREE.BackSide;
				
		this.tank = new THREE.Mesh(this.geometry, this.material);
		this.tank.castShadow = true;
		this.tank.receiveShadow = true;
		app.fishy.scene.add(this.tank);
		
		//make geometry for all of the tank
		this.bottom = new THREE.CubeGeometry(195,5,295);
							
		this.sandMaterial = new THREE.MeshPhongMaterial({color: 0xFE9A2E});
				
		this.sand = new THREE.Mesh(this.bottom,this.sandMaterial);
		this.sand.castShadow = true;
		this.sand.receiveShadow = true;
		app.fishy.scene.add(this.sand);
	};
	
	var p = Tank.prototype;
	
	return Tank;

}();