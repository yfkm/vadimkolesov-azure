var G = {
	W: 500,
	H: 500,
	FPS: 60,
	animRequest:undefined,
	isRunning:false,
	canvas:undefined,
	context:undefined,
	random: function(min,max){
		return Math.random()*(max-min)+min;
	},
	randomColor: function(){
		return 'rgb('+Math.round(this.random(0,255))+','+Math.round(this.random(0,255))+','+Math.round(this.random(0,255))+')';
	},
	getColor: function(r,g,b){
		return 'rgb('+r+','+g+','+b+')';
	},
	fillColor: function(c){
		this.context.fillStyle=c;
	},
	strokeColor: function(c){
		this.context.strokeStyle=c;
	},
	strokeWidth(w){
		this.context.lineWidth=w;
	},
	init: function(){
		this.canvas = document.getElementById('cnv');
		this.context = this.canvas.getContext('2d');
		this.W=this.canvas.width;
		this.H=this.canvas.height;
	},
	clear: function(c){
		this.context.fillStyle = c?c:'rgb(0, 0, 0)';
		this.context.fillRect(0,0,this.W,this.H);
	},
	rectangle: function(x1,y1,x2,y2,fill){
		if(fill)
			this.context.fillRect(x1,y1,x2-x1,y2-y1);
		else
			this.context.strokeRect(x1,y1,x2-x1,y2-y1);
	},
	line: function(x1,y1,x2,y2){
		this.context.beginPath();
		this.context.moveTo(x1,y1);
		this.context.lineTo(x2,y2);
		
		this.context.stroke();
	},
	circle(x,y,r,fill){
		this.context.beginPath();
		this.context.arc(x,y,r,0,Math.PI*2,false);
		this.context.closePath();
		if (fill)
			this.context.fill();
		else
			this.context.stroke();
	}
	
}