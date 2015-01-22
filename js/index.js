var values=new Array();
var labels=new Array();
var colors=new Array();
var context;
var total = 0;

document.addEventListener("DOMContentLoaded", initFunc);

function initFunc() {

	DATA();

	function DATA() {
		$.ajax({
			url: "./cheese.json",
			type: "get",
			dataType: "json",
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			}
		}).done(gotData).fail(whoops);
	}


	function gotData(data) {
		console.log("success");
		for (i = 0; i < data.segments.length; i++) {
			
			values.push(data.segments[i].value);
			labels.push(data.segments[i].label);
			colors.push(data.segments[i].color);
			
		}
		for(var i=0; i<values.length; i++){
		  total += values[i];
		}
		
		showPie();
        showBars();

	}



	function whoops(jqXHR, textStatus, errorThrown) {
		console.log("fail", textStatus);
		console.log("fail", errorThrown.message);
		console.log(jqXHR.responseText);
	}

	
	
}



function setDefaultStyles() {
	context.strokeStyle = "#333";
	context.lineWidth = 5;
	context.font = "bold 14pt Arial";
	context.fillStyle = "black";
	context.textAlign = "left";
}


function showPie() {

	var canvas = document.querySelector("#Pie");
	    context = canvas.getContext("2d");
	
	//clear the canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	//set the styles in case others have been set
	setDefaultStyles();
	var cx = canvas.width / 2;
	var cy = canvas.height / 2;
	var radius;
	var MaxArr = Math.max.apply(Math,values);
	var MaxArrIndex = values.indexOf(MaxArr);
	var MinArr = Math.min.apply(Math,values);
	var MinArrIndex = values.indexOf(MinArr);
	var currentAngle = 0;
	
	
	for (var i = 0; i < values.length; i++) {
		var pct = values[i] / total;
		var endAngle = currentAngle + (pct * (Math.PI * 2));
		//draw the arc
		context.moveTo(cx, cy);
		context.beginPath();
		context.fillStyle = colors[i];
		if(i==MaxArrIndex)
		{
		  radius = 90;
		}
		else if(i==MinArrIndex)
		{
		  radius = 110;
		}
		else
		{
		  radius = 100;
		}
		context.arc(cx, cy, radius, currentAngle, endAngle, false);
		context.lineTo(cx, cy);
		context.fill();


		context.save();
		context.translate(cx, cy); 
		context.strokeStyle = "black";
		context.lineWidth = 0.7;
		context.beginPath();
		
		var midAngle = (currentAngle + endAngle) / 2; 
		context.moveTo(0, 0); 
		var dx = Math.cos(midAngle) * (0.8 * radius);
		var dy = Math.sin(midAngle) * (0.8 * radius);
		context.moveTo(dx, dy);
		
		var dx = Math.cos(midAngle) * (radius + 30); 
		var dy = Math.sin(midAngle) * (radius + 30);
		
		context.fillStyle = "black";
		context.font = "8pt Arial";
		context.fillText(labels[i],dx,dy);
		
		
		context.lineTo(dx, dy);
		context.stroke();
		context.restore();
		
		currentAngle = endAngle;
	}
}

function showBars(){
  
  var canvas = document.querySelector("#Bars");
  context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
 
  setDefaultStyles();
  
  var graphHeight = 300;    
  var offsetX = 30;	
  var barWidth = 30;	
  var spaceBetweenPoints = 20; 
  
  var x = offsetX + 20;	
  

  for(var i=0; i<values.length; i++){
    var pct = values[i] / total;
    var barHeight = (graphHeight * pct);
    
    context.moveTo(x, 0);
    context.beginPath();
   
    context.rect(x, graphHeight-1, barWidth, -1 * barHeight);
   
    var lbl = Math.round(pct * 100).toString();
    context.font = "8pt Arial";
    context.fillStyle ="black";
    context.fillText(lbl, x, graphHeight - barHeight - 30-1);
    context.fillText(labels[i], x, graphHeight - barHeight - 60-1);
    
    context.fillStyle = colors[i];
    context.fill(); 	
	  
    context.strokeStyle = colors[i];
    context.stroke();	
      x = x + barWidth + spaceBetweenPoints;
      		
  }

  
  
  context.strokeStyle = "#999";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(offsetX, canvas.height-graphHeight);
  context.lineTo(offsetX, graphHeight);
  context.lineTo(canvas.width-offsetX, graphHeight);
  context.stroke();  
}