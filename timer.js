var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas);

var c = canvas.getContext('2d');
var arr = [];
var id=0;

var collorarr = ['#7B2A3B','#E57661','#F8C58C','#F8E7A2','#86DDB2'];

var mouse = {
	x: undefined,
	y: undefined
}


function Circle(x,y,r)
{

	this.id = id +=1;
	this.r = r;
	this.primr = this.r;	
	this.x = x;
	this.y = y;
	this.dx = (Math.random()-0.5)*6;
	this.dy = (Math.random()-0.5)*6;
	this.primdx=this.dx;
	this.primdy=this.dy;
	this.n = Math.random() * 15;
	this.color = collorarr[Math.floor(Math.random() * collorarr.length)];
	this.helper = 0;
	this.seconder=0;
	this.life = Math.floor(Math.random()*500);

	this.draw = function()
	{
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		//c.strokeStyle = 'blue';
		c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function()
	{
		if(arr.length>100){
			this.life -= 1;
		}

		if(this.x>window.innerWidth-this.r || this.x<0+this.r)
		{
			this.dx = -this.dx;
			this.primdx =-this.primdx;
		}

		if(this.y>window.innerHeight-this.r || this.y<0+this.r)
		{
			this.dy = -this.dy;
			this.primdy = -this.primdy;
		}
		this.x += this.dx;
		this.y += this.dy;

		
		if(mouse.x-this.x<50 && mouse.x-this.x>-50 && mouse.y-this.y<50 && mouse.y-this.y>-50)
		{
			if(this.r<80){
			this.r += 1;
			this.life +=1;
			}
		}
		else if(this.r>this.primr && this.r>1)
		{
			this.r-=1;
		}
		
		if(this.r>60 && this.r<=100){
			this.dx += this.dx*0.03;
			this.dy += this.dy*0.03;
			this.seconder +=1;
			//console.log(this.seconder);

			if(this.seconder == 50)
			{
				var index = arr.indexOf(this);
				for(var i = 0; i<this.n; i++)
				{
					//console.log("TWP");
					var rad = Math.floor(Math.random()*40);	
					arr.push(new Circle(this.x,this.y,rad));
					arr[i].draw();
									
				}
				arr.splice(index,1);
				console.log(arr.length);
			}
			if(this.helper==0)
			{
				//this.x +=8;
				//this.y +=8;
				this.dx = -this.dx;		
				this.dy = -this.dy;				
				this.helper+=1;
			}
			else //if(this.helper==1)
			{
				//this.x -=8;
				//this.y -=8;
				this.dx = -this.dx;
				this.dy = -this.dy;
				this.helper-=1;
			}

		}
		else{
			this.dx = this.primdx;
			this.dy = this.primdy;	
			this.seconder =0;
		}


		this.draw();
	}

}




window.addEventListener('mousemove',function(event){
	//console.log(event.x,event.y);
	mouse.x = event.x;
	mouse.y = event.y;

	/*for(var i = 0; i<arr.length; i++)
	{
		if(mouse.x-arr[i].x<arr[i].r && mouse.x-arr[i].x>-arr[i].r)
		{
			arr[i].r += 1;
		}
	}*/

	
})


window.addEventListener('resize',function(event){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

for(var i = 0; i<10; i++){

	var r = Math.floor(Math.random()*15);	
	var x = (Math.random()*(window.innerWidth - r * 2)) + r;
	var y = (Math.random()*(window.innerHeight - r * 2 )) + r;
	arr.push(new Circle(x,y,r));

	arr[i].draw();
}

var zaDuzo = ["Za duzo ziomus","Spalisz komputer...","Łap moje kulki łap :)","Kup Unlimited","Dobra musisz od nowa","OCZOPLASY","ehhhhh....","no wez....","szukam pieniedzy :("]
function anime()
{
	requestAnimationFrame(anime);
	c.clearRect(0,0,window.innerWidth,window.innerHeight);

	if(arr.length>1300){
		alert(zaDuzo[Math.floor(Math.random()*zaDuzo.length)]);
		for(i=0;i<1100;i++)
		{
			arr.pop();
		}
	}
	for(var i = 0; i<arr.length; i++)
	{
		arr[i].update();

		if(arr[i].life==0 && arr.length>100)
		{
			arr.splice(i,1);
		}
		//console.log("sssssss");
	}
	
}

console.log(arr.length);
anime();