let array =[];
let PlusTodo = document.getElementById("plus-button"); 
let taskInput = document.getElementById("task-input");
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterArray = [];
let finishArray = [];
console.log(tabs);
let count = 0;
let count1 = 0;

PlusTodo.addEventListener("click", addTask);

for(let i = 1; i < tabs.length; i++){
  tabs[i].addEventListener("click", function (event) {filter(event)});
}

function addTask () {
  let task = {
    id : random_id(),
    taskContent : taskInput.value ,
    isComplete : false ,
  };
  console.log(task);
  array.push(task);
  console.log(array);
  render();
}

function render () {
  let list = [];
  if(mode == "all"){
    list = array;
  } else if(mode == "notDone"){
    list = filterArray;
  } else if(mode == "done"){
    list = finishArray;
  }


  resultHTML = '';
  let changeArray;
  for(let i = 0; i < list.length; i++){
    if(list[i].isComplete == true){
      resultHTML += `<div class="task task-color">
      <div class = "task-done">${list[i].taskContent}</div>
      <div>
      <button class = "checkButton" onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left"></i></button>
      <button class = "trash-button" onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`;
    } else{
      resultHTML += `<div class="task">
  <div>${list[i].taskContent}</div>
    <div>
      <button class = "checkButton" onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button class = "trash-button" onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
    </div>
  </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function random_id() {
  return '_' + Math.random().toString(36).substr(2,9);
}

function filter(event) {
mode = event.target.id
if(mode == "all"){
} else if(mode == "notDone"){
  console.log(mode);
  for(let i = 0; i < array.length; i++){
    if(array[i].isComplete == false){
      filterArray.push(array[i]);
      }
  }
} else if(mode == "done"){
  console.log(mode);
  for(let i = 0; i < array.length; i++){
    if(array[i].isComplete == true){
      finishArray.push(array[i]);
    }
  }
}
render();

}

function toggleComplete(id) {
  console.log("id : ", id); 
  console.log(array[0].id);
  for(let i = 0; i < array.length; i++){
    if(array[i].id == id){
      array[i].isComplete = !array[i].isComplete;
      console.log(array[i].id);
      console.log(id);
      break;
    }
  }
  render();
}

function deleteTask(id){
  console.log("id : ", id);
  for(i = 0; i < array.length; i++){
    if(id == array[i].id){
      array.splice(i, 1);
      console.log(array);
    }
  }
  render();
}


