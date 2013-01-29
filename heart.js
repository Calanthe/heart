var Heart = (function() { 
    //PRIVATE
	var _body, _canvas, _context, _canvasBg, _contextBg;
	
	function drawSmallHearts(element) {
		var cursorPositionX = getCursorPositionX(element);
		var cursorPositionY = getCursorPositionY(element);
		var inter = -1, counter=0;
		var t=5;
		var color = getColor(cursorPositionX,cursorPositionY);
		
		inter = setInterval(function(){							
			if (counter<4) 
			{
				t++;
				counter++;
				drawSingleHeart(cursorPositionX,cursorPositionY,t,color,_context);			
			}
			else{
				clearInterval(inter);
				inter=-1;
			}			
		},25,0);		  
	}
	
	function drawSingleHeart(x,y,r,color,context){	
		var P=Math.PI;
			b=[1,x,y,color];
			b[0]*=r;
			context.fillStyle=b[3];
			context.lineWidth=.001;
			context.beginPath();
			context.arc(b[1]-b[0],c=b[2]-b[0],b[0],P*.8,P*2);
			context.arc(b[1]+b[0],c,b[0],P,P*2.2);
			context.lineTo(b[1],b[2]+b[0]*2);
			context.closePath();
			context.fill();
			context.stroke();
	}
	
	function getCursorPositionX(e) {

		var x;
		if (e.pageX != undefined) {
			x = e.pageX;
		}
		else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		}
		x -= _canvas.offsetLeft;

		return x+Math.random()*50;
	}
	
	function getCursorPositionY(e) {

		var y;
		if (e.pageY != undefined) {
			y = e.pageY;
		}
		else {
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		y -= _canvas.offsetTop;

		return y+Math.random()*50;
	}
	
	function getColor(x,y) {
		if (_contextBg.isPointInPath(x,y)) return "rgb("+(Math.random()*55+200|0)+",0,0)";
		else return "rgb(0,"+(Math.random()*55+200|0)+",0)";
	}
	
	function calculateHeartX(){
		var width = innerWidth;
		return width/2;
	}
	
	function calculateHeartY(){
		var height = innerHeight;
		return height/2;
	}
	
	function calculateHeartRadius(){
		var height = innerHeight;
		var width = innerWidth;
		return width/8;
	}

	//PUBLIC
	return {
        init : function() {
          _body = document.body;
		  _canvasBg = document.getElementById('myCanvasBg');
		  _contextBg = _canvasBg.getContext('2d');
		  
		  _canvas = document.getElementById('myCanvas');
		  _context = _canvas.getContext('2d');
		  	  
          _canvas.width = _canvasBg.width = innerWidth;
          _canvas.height = _canvasBg.height = innerHeight;	  
          
		  //lets draw one big heart in the background
		  drawSingleHeart(calculateHeartX(),calculateHeartY(),calculateHeartRadius(),"#242424",_contextBg);
		 	 
         _canvas.addEventListener('mousemove', drawSmallHearts, false);
		 
        }
    }
})();