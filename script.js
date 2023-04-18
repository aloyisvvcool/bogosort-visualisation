const canvas = document.getElementById("visualization");
const ctx = canvas.getContext("2d");
const iterationCountEl = document.getElementById("iteration-count");
let cancelSorting = false;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

async function bogosort(arr) {
  let iterationCount = 0;
  cancelSorting = false;

  while (!isSorted(arr)) {
    if (cancelSorting) {
      cancelSorting = false;
      break;
    }
    
    shuffle(arr);
    iterationCount++;
    iterationCountEl.textContent = iterationCount;
    await drawArray(arr);
    await sleep(200);
  }
}

function drawArray(arr) {
    const barWidth = canvas.width / arr.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < arr.length; i++) {
      const barHeight = (arr[i] / Math.max(...arr)) * canvas.height;
      ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth, barHeight);
      
      // Set the font size and style for the numbers on the bars.
      ctx.font = "25px Arial";
      
      // Change the fillStyle to display the number on the bar with a contrasting color.
      ctx.fillStyle = "#FFF";
      ctx.textAlign = "center";
      ctx.fillText(arr[i], i * barWidth + barWidth / 2, canvas.height - barHeight + 20);
      
      // Reset the fillStyle to the default color for the bars.
      ctx.fillStyle = "#000";
    }
  }
  
  

async function startSorting() {
  cancelSorting = true;
  await sleep(200);

  const input = document.getElementById("integer-list").value;
  const arr = input.split(",").map((num) => parseInt(num.trim()));
  
  canvas.width = 800;
  canvas.height = 400;
  
  await bogosort(arr);
}
