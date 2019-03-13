var W, H;
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
	ball=[],
	matrix=null,
	colors=null,
	n=1500,
	max_dist=100,
	scale=4,
	canvas,
	ctx;
function init(){
	canvas = document.getElementById('cnv');
	ctx = canvas.getContext('2d');
	W=canvas.width, H=canvas.height;
	var inf = document.getElementById('inf').getContext('2d');
	matrix=[[-1,-10,-10,-10,-10],
			[-10,-1,-10,-10,-10],
			[-10,-10,-1,-10,-10],
			[-10,-10,-10,-1,-10],
			[-10,-10,-10,-10,-1],];
	colors=[randColor(),randColor(),randColor(),randColor(),randColor()];
	for(var i=0;i<colors.length;i++){
		inf.fillStyle = colors[i];
		inf.fillRect(5+50*i,5,40,40);
	}	
	for(var i=0;i<n;i++){
		ball[i]={
			x: rand(10,W-10),
			y: rand(10,H-10),
			vx: 0*rand(-1,1),
			vy: 0*rand(-1,1),
			ax: 0*rand(-1,1),
			ay: 0*rand(-1,1),
			t: Math.round(rand(0,4)),
			r: rand(1,5),
			draw:function(){			
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fillStyle = colors[this.t];
				//ctx.fillRect(this.x,this.y,this.r,this.r);
				ctx.fill();
			},
			move:function(){
				
				if(this.x<0||this.x>W)this.vx*=-1;
				if(this.y<0||this.y>H)this.vy*=-1;
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
function clear() {
	ctx.fillStyle = 'rgba(0, 0, 0,0.3)';
	ctx.fillRect(0,0,W,H);
};
function draw(){
	clear();
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
	if (Math.min(a.x, W-a.x)>a.r/2)
		fx+=25/(a.x**2)-25/((W-a.x)**2);
	if (Math.min(a.y, H-a.y)>a.r/2)
		fy+=25/(a.y**2)-25/((H-a.y)**2);
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
	window.requestAnimationFrame(update);
};
function main(){
	if (!isRunning){
		init();
		window.requestAnimationFrame(update);
		isRunning=true;
	}
};