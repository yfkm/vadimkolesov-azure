var ball=[],
	n=1000,
	max_dist=100,
	colors=[],
	scale=4;
function init(){
	G.init();
	matrix =[[-1,-10,-10,-10,-10],
			   [-10,-1,-10,-10,-10],
			   [-10,-10,-1,-10,-10],
			   [-10,-10,-10,-1,-10],
			   [-10,-10,-10,-10,-1],];
	colors=[G.randomColor(),G.randomColor(),G.randomColor(),G.randomColor(),G.randomColor()];

	for(var i=0;i<n;i++){
		ball[i]={
			x: G.random(10,G.W-10),
			y: G.random(10,G.H-10),
			vx: 0*G.random(-1,1),
			vy: 0*G.random(-1,1),
			ax: 0*G.random(-1,1),
			ay: 0*G.random(-1,1),
			t: Math.round(G.random(0,4)),
			r: G.random(1,4),
			draw:function(){			
				//ctx.beginPath();
				//ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
				//ctx.closePath();
				G.fillColor(colors[this.t]);
				//ctx.fillRect(this.x,this.y,this.r,this.r);
				//ctx.fill();
				G.circle(this.x,this.y,this.r,true);
			},
			move:function(){
				
				if(this.x<0||this.x>G.W)this.vx*=-1;
				if(this.y<0||this.y>G.H)this.vy*=-1;
				this.x+=this.vx;
				this.y+=this.vy;
				this.vx+=this.ax;
				this.vy+=this.ay;
				var m=this.vx**2+this.vy**2;
				if (m>1){
					this.vx/=m;
					this.vy/=m;
				}
				this.vx*=0.95;
				this.vy*=0.95;
			}
		};
	}
};
function draw(){
	G.clear();
	for(var i=0;i<n;i++){
		ball[i].draw();
	}
	
};
function dist(a,b){
	return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2);
};
function applyforce(j){
	var d,fx=0,fy=0,a=ball[j];
	for(var i=0;i<n;i++){
		var b=ball[i];
		d=dist(a,b);
		if (d<max_dist){
			if	(d>a.r+b.r){
				fx+=matrix[a.t][b.t]*(b.x-a.x)/(d**3);
				fy+=matrix[a.t][b.t]*(b.y-a.y)/(d**3);
			}
			else {
				fx-=(b.x-a.x)/max_dist;
				fy-=(b.y-a.y)/max_dist;
			}	
		}		
	}
	if (Math.min(a.x, G.W-a.x)>a.r/2)
		fx+=25/(a.x**2)-25/((G.W-a.x)**2);
	if (Math.min(a.y, G.H-a.y)>a.r/2)
		fy+=25/(a.y**2)-25/((G.H-a.y)**2);
	a.ax=fx;
	a.ay=fy;
	var m=Math.sqrt(a.ax**2+a.ay**2);
	if (m>1){
		this.ax/=m;
		this.ay/=m;
	}
	
};
function update(){
	for (var j=0;j<n;j++){	
		applyforce(j);		
	}
	
	for(var i=0;i<n;i++){
		ball[i].move();
	}
	draw();
	if (G.isRunning){
		setTimeout(function() {
				G.animRequest=window.requestAnimationFrame(update);
	 
	    }, 1000/G.FPS );
	}
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
		
		G.clear();
		G.animRequest=window.requestAnimationFrame(update);
		G.isRunning=true;
	}
};

function restart(){	
	stop();
	setTimeout(function(){start();}, 100 );
};