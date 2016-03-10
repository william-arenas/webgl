var renderer, scene, camera, controls;

initializeScene(); 
animateScene(); 

function initializeScene(){ 
	scene = new THREE.Scene();
	
	if (Detector.webgl) 
		renderer = new THREE.WebGLRenderer({antialias:true});
	else
		renderer = new THREE.CanvasRenderer(); 

	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight); 
	
	document.body.appendChild(renderer.domElement); 
	
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 3000000); 
	camera.position.set(200, 100, 0);
	camera.lookAt(new THREE.Vector3(0, 0, 0)); 
	
	scene.add(camera); 

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.25;

	var cubeMap = new THREE.CubeTexture( [] );
	cubeMap.format = THREE.RGBFormat;

	var loader = new THREE.JSONLoader();
	loader.load(
		"models/laptop.js",
		jsonLoaderCallback
	);
	
	var ambientLight = new THREE.AmbientLight(0x666666, 2); 
	scene.add(ambientLight);
	
	var directionalLight = new THREE.DirectionalLight(0xdfebff, 1.75);
	directionalLight.position.set(50, 200, 100);
	directionalLight.position.multiplyScalar(1.3);
	
	scene.add(directionalLight);

	window.addEventListener("resize", function (){
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}, false);	
} 

function jsonLoaderCallback(geometry, materials){
	var material = new THREE.MultiMaterial(materials);
	
	var object = new THREE.Mesh(geometry, material);
	scene.add(object);
}

function animateScene(){ 
	requestAnimationFrame(animateScene); 
	controls.update();
	renderScene(); 
} 

function renderScene(){ 
	renderer.render(scene, camera); 
}