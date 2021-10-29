// Main


function human_readable_bytes_size(bytes, decimals, sap) {
    decimals = "number" === typeof decimals ? decimals : 2;
    sap = "string" === typeof sap ? sap : "";
  
    var 
      size = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    , factor = Math.floor(  (String(bytes).length - 1) / 3  )
    ;
    
    bytes = bytes / Math.pow(1024, factor);  //calc
    bytes = Math.floor(bytes * Math.pow(10, decimals)) / Math.pow(10, decimals);  //round digits
    return String(bytes) + sap + size[factor];
}  

function InitData(){
    chrome.system.memory.getInfo(function(memory){
        var CapacityUsed = memory.capacity - memory.availableCapacity
        document.getElementById("Capacity").innerText = "Memory Capacity: " + human_readable_bytes_size(memory.capacity,2,"");
        document.getElementById("CapacityFree").innerText = "Capacity Free: " + human_readable_bytes_size(memory.availableCapacity,2,"");
        document.getElementById("CapacityUsed").innerText = "Capacity Used: " + human_readable_bytes_size(CapacityUsed,2,"");

        const labels = ['Capacity','Used'];
        const data = {labels: labels, datasets: [{label: 'RAM Usage', backgroundColor: ['#bdb2ff', '#ffc6ff'], borderColor: '#9bf6ff', data: [memory.capacity, CapacityUsed], } ] };
        const config = {type: 'doughnut', data: data, options: {}};
        const myChart = new Chart(document.getElementById('RamChart'),config);
        
       })
    
       chrome.system.cpu.getInfo(function(cpu){

        document.getElementById("ArchName").innerText = "CPU Arch: " + cpu.archName;
        document.getElementById("Features").innerText = "CPU Features: " + cpu.features.toString().replaceAll(",", "  ");
        document.getElementById("modelName").innerText = "CPU Model Name: " + cpu.modelName;
        document.getElementById("numOfProcessors").innerText = "Number of Processeors cores: " + cpu.numOfProcessors;

        // code does not seam to work // https://stackoverflow.com/questions/60732446/calculating-current-cpu-usage-using-chrome-system-cpu
        var sumOfUsed = 0;
        var sumOfAvailable = 0;
        for (var i = 0; i < cpu.numOfProcessors; i++)
        {
            var usage = cpu.processors[i].usage;
            sumOfUsed = sumOfUsed + usage.kernel + usage.user;
            sumOfAvailable += usage.total;
        }

        var currentCpuUsage = Math.floor(sumOfUsed / sumOfAvailable * 100);
        
    })
}

InitData()