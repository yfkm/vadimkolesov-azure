var	N=3, iter=0,
	points=[],
	sqrt3=Math.sqrt(3);

function init(){
	G.init();
	iter=0;
	points=[];
	points.push({x:0,y:G.H/2});
	points.push({x:G.W*3/4,y:G.H*(0.5-sqrt3/4)});
	points.push({x:G.W*3/4,y:G.H*(0.5+sqrt3/4)});
	points.push({x:0,y:G.H/2});
};
function draw(){
	G.clear();
	G.strokeColor(G.getColor(255,255,255));
	G.strokeWidth(1);
	
	for (var i=0;i<points.length-1;i++){		
		G.line(points[i].x,points[i].y,points[i+1].x,points[i+1].y);
	}
};

function update(){
	draw();
	var newPoints=[];
	var i;
	for (i=0;i<points.length-1;i++){
		newPoints.push(points[i]);
		newPoints.push({x:(points[i].x+(points[i+1].x-points[i].x)/3),y:(points[i].y+(points[i+1].y-points[i].y)/3)});		
		newPoints.push({x:((points[i+1].y-points[i].y)/3*sqrt3/2+(points[i+1].x+points[i].x)/2),y:((points[i].x-points[i+1].x)/3*sqrt3/2+(points[i+1].y+points[i].y)/2)});		
		newPoints.push({x:(points[i].x+2*(points[i+1].x-points[i].x)/3),y:(points[i].y+2*(points[i+1].y-points[i].y)/3)});
	}	
	newPoints.push(points[i]);
	points=newPoints.slice();
	newPoints=[];
	if (G.isRunning){		
		setTimeout(function() {
				G.animRequest=window.requestAnimationFrame(update); 
			}, 1000);	
	}
	if (iter>N){
			stop();
		}
		iter++;
};
function stop(){
	
	if (G.isRunning){
		window.cancelAnimationFrame(G.animRequest);
		G.animRequest=undefined;		
		G.isRunning=false;
	}
}
function start(){
	if (!G.isRunning){
		init();
		G.animRequest=window.requestAnimationFrame(update);
		G.isRunning=true;
	}
};

function restart(){	
	stop();
	setTimeout(function(){start();}, 100 );
};