function init(){
	canvas = document.getElementById('cnv');
	ctx = canvas.getContext('2d');
	W=canvas.width, H=canvas.height;
};
function clear() {
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fillRect(0,0,W,H);
};
function line(x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
};
function draw(){	
	clear();	
	
};
function dist(a,b){
	return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);
};	
function update(){
	draw();
	if (isRunning){		
		setTimeout(function() {
			animReqest=window.requestAnimationFrame(update); 
		}, 1000/FPS);
	}
};
function restart(){	
	stop();
	start();
};
function stop(){	
	if (isRunning)
		window.cancelAnimationFrame(animReqest);	
	isRunning=false;
};
function start(){
	if (!isRunning){
		init();		
		clear();
		animReqest=window.requestAnimationFrame(update);
		isRunning=true;
	}
};