var W, H, animReqest;
var N=5, iter=0;
var points=[]
function rand(min,max){
	return Math.random()*(max-min)+min;
};
function randColor(){
	return 'rgb('+Math.round(rand(0,255))+','+Math.round(rand(0,255))+','+Math.round(rand(0,255))+')';
};
function getColor(r,g,b){
	return 'rgb('+r+','+g+','+b+')';
}
 var isRunning=false,
	
	canvas,
	ctx;
function init(){
	canvas = document.getElementById('cnv');
	ctx = canvas.getContext('2d');
	W=canvas.width, H=canvas.height;
	var inf = document.getElementById('inf').getContext('2d');
	iter=0;
	points=[];
	points.push({x:0,y:H/2});
	points.push({x:W,y:H/2});
};
function clear() {
	ctx.fillStyle = 'rgba(0, 0, 0,)';
	ctx.fillRect(0,0,W,H);
};
function line(x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}
function draw(){
	clear();
	ctx.strokeStyle=getColor(255,255,255);
	ctx.lineWidth=1;
	
	ctx.beginPath();
	ctx.moveTo(points[0].x,points[0].y);
	for (var i=0;i<points.length-1;i++){
		
	ctx.lineTo(points[i+1].x,points[i+1].y);
	}
	
	ctx.stroke();
	
	
};
function dist(a,b){
	return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);
};
	
function update(){

	
	draw();
	var newPoints=[];
	var i;
	for (i=0;i<points.length-1;i++){
		newPoints.push(points[i]);
		newPoints.push({x:(points[i].x+(points[i+1].x-points[i].x)/3),y:(points[i].y+(points[i+1].y-points[i].y)/3)});		
		newPoints.push({x:((points[i+1].y-points[i].y)/3+(points[i+1].x+points[i].x)/2),y:((points[i].x-points[i+1].x)/3+(points[i+1].y+points[i].y)/2)});		
		newPoints.push({x:(points[i].x+2*(points[i+1].x-points[i].x)/3),y:(points[i].y+2*(points[i+1].y-points[i].y)/3)});
	}	
	newPoints.push(points[i]);
	points=newPoints.slice();
	newPoints=[];
	if (isRunning){
		
		setTimeout(function() {
			animReqest=window.requestAnimationFrame(update);
 
    }, 1000 );
		if (iter>N){
			stop();
		}
		iter++;
	}
};
function restart(){
	
	isRunning=false;
	main();
};
function stop(){
	
	if (isRunning)
		window.cancelAnimationFrame(animReqest);
	
	isRunning=false;
}
function main(){
	if (!isRunning){
		init();
		
		clear();
		animReqest=window.requestAnimationFrame(update);
		isRunning=true;
	}
};