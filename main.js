
var capacity = document.querySelector("#capacity");
var capacityAvailable = document.querySelector("#capacityAvailable");
var numberOfPro = document.querySelector("#numberOfPro");
var archName = document.querySelector("#archName");
var capacityUsed = document.querySelector("#capacityUsed");

var memory_capacity = null;
var capacity_Available = null;
var pieData;
var pieOptions;
var used;

var Game = {};
Game.fps = 60;


function bytesToMegaBytes(number) {
  return Math.round(number / 1024 / 1024);
}


Game.draw = function(){
  //RAM  
    capacity.innerText = "Total system ram "+
    memory_capacity + " MB";  
  
    capacityAvailable.innerText = "Current available free system ram "+
    capacity_Available + " MB";
  
    used = memory_capacity - capacity_Available;
    
    capacityUsed.innerText = "Current used system ram " + used + " MB";
  
		var ctx = document.getElementById("canvas").getContext("2d");
		myPie = new Chart(ctx).Doughnut(pieData,{
	    animateRotate: false,
      animateScale : false,
      percentageInnerCutout : 50}
		);
    
};

Game.update = function(){
    chrome.system.memory.getInfo(function(memory){
     memory_capacity = bytesToMegaBytes(memory.capacity);
    })
    
    chrome.system.memory.getInfo(function(memory){
      capacity_Available = bytesToMegaBytes(memory.availableCapacity);
     })
     
     		pieData = [
				{
					value: used,
					color:"#F7464A",
					label: "Used"
				},
				{
					value: capacity_Available,
					color: "#46BFBD",
					label: "Free"
				}

			];
    
};

// start of the "game loop"
Game.run = function(){
  Game.draw();
  Game.update();
  
}


Game._intervaiId = setInterval(Game.run, 1000/Game.fps)

