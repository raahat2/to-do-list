
let tasks=[];
let activeFilter='all';
let updatedIndex;

function storeTask(){
    if(document.getElementById("add").innerText=="UPDATE"){
        updatingTask();
    }
    else{
    let newTaskElement = document.getElementById("task");
    if(!newTaskElement.value){
        document.getElementById("inputError").innerHTML="can't be blank";
    }
    else{
    let task = {task: newTaskElement.value, status: 'active' ,id:tasks.length+1};
    tasks.push(task);
    localStorage.setItem("task", JSON.stringify(tasks));
    newTaskElement.value=''; 
    updateTasksInView();}
    }  
}

document.getElementById("task").addEventListener("input",function(){document.getElementById("inputError").innerHTML="";})

function deleteTask(id){
    localStorage.setItem("task", JSON.stringify(tasks.filter(i=>i.id!=id)));
    updateTasksInView();
}

function editTask(id){
    document.getElementById("ret").style.display="block";
    document.getElementById("add").innerText ="UPDATE";
    let newTaskElement = document.getElementById("task");
    const index= tasks.findIndex(x=>x.id===id);
    newTaskElement.value=tasks[index].task;
    updatedIndex=index;
 }

function updatingTask(){
     let newTaskElement = document.getElementById("task");
    let newValue=newTaskElement.value;
    tasks[updatedIndex].task=newValue;
    localStorage.setItem("task",JSON.stringify(tasks));
    newTaskElement.value='';
    
    document.getElementById("ret").style.display="none";
    document.getElementById("add").innerText ="ADD";
    updateTasksInView();
}

function updateTasksInView(){
    let oldTasks=localStorage.getItem("task");
    if(oldTasks){
        tasks=JSON.parse(oldTasks);
    }
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML="";
    const filteredTask=tasks.filter((i)=>{
        if(activeFilter=='all'){
            return true;
        }
        return activeFilter== i.status;
    })
    filteredTask.forEach(task=>{
        let taskNode = `
        <div class="newTask" id="task_${task.id}">
        <div class="div">
        <input type="checkbox" id="checkbox${task.id}" class="checkbox"  onclick="completed(${task.id})" ${task.status==='completed' ? 'checked' : ''}/>
        <label id="taskLabel${task.id}" class="label">${task.task}</label></div>
        <div class="buttons">
        <button class="edit" id="edit" onclick="editTask(${task.id})">EDIT</button>
        <button class="delete" id="delete" onclick="deleteTask(${task.id})">DELETE</button>
        </div>
    </div>
    `
    taskContainer.innerHTML=taskNode+taskContainer.innerHTML;

    })
    
}

function completed(id){
  
    let checkbox=document.getElementById("checkbox"+id);
   
    if(checkbox.checked){
        newStatus='completed';
        const index= tasks.findIndex(x=>x.id===id);
        tasks[index].status=newStatus;
        localStorage.setItem("task",JSON.stringify(tasks));
       type='completed'; 
       checkbox.checked=="true";
    }else{
            newStatus='active';
            const index= tasks.findIndex(x=>x.id===id);
        tasks[index].status=newStatus;
        localStorage.setItem("task",JSON.stringify(tasks));
        type='active';
      }
}

function setActive(type){
activeFilter=type;  
let btnContainer = document.getElementById("status");
let btns = btnContainer.getElementsByClassName("link");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}
updateTasksInView();
}


function ret(){
    let newTaskElement = document.getElementById("task");
    newTaskElement.value="";
    document.getElementById("ret").style.display="none";
    document.getElementById("add").innerText ="ADD";
}

updateTasksInView();