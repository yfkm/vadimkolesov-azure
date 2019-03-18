var	N=5, iter=0,
	lines=[],
	sqrt3=Math.sqrt(3);

function init(){
	G.init();
	iter=0;
	points=[];
	lines=[];
	lines.push({b:{x:0,y:G.H/2},a:{x:G.W*3/4,y:G.H*(0.5-sqrt3/4)}});
	lines.push({b:{x:G.W*3/4,y:G.H*(0.5-sqrt3/4)},a:{x:G.W*3/4,y:G.H*(0.5+sqrt3/4)}});
	lines.push({b:{x:G.W*3/4,y:G.H*(0.5+sqrt3/4)},a:{x:0,y:G.H/2}});
};
function draw(){
	G.clear();
	G.strokeColor(G.getColor(255,255,255));
	G.strokeWidth(1);
	
	for (var i=0;i<lines.length;i++){		
		G.line(lines[i].a.x,lines[i].a.y,lines[i].b.x,lines[i].b.y);
	}
};

function update(){
	draw();
	var newLines=[];
	var i;
	for (i=0;i<lines.length;i++){
		newLines.push({a:lines[i].a,b:{x:(lines[i].a.x+lines[i].b.x)/2,y:(lines[i].a.y+lines[i].b.y)/2}});
		newLines.push({a:{x:(lines[i].a.x+lines[i].b.x)/2,y:(lines[i].a.y+lines[i].b.y)/2},b:lines[i].b});
		newLines.push({a:{x:(lines[i].a.x+lines[i].b.x)/2,y:(lines[i].a.y+lines[i].b.y)/2},b:{
			x:((lines[i].a.x+(lines[i].b.x-lines[i].a.x)/4+(lines[i].b.y-lines[i].a.y)*sqrt3/4)),
			y:((lines[i].a.y+(lines[i].b.y-lines[i].a.y)/4+(lines[i].a.x-lines[i].b.x)*sqrt3/4))
		}});
	}	
	
	lines=newLines.slice();
	newLines=[];
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