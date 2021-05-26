// define variables
const date = document.querySelector('#date');
const day = document.querySelector('#day');
const time = document.querySelector('#time');
const form = document.querySelector('#task-form'); 
const taskInput = document.querySelector('#task');
const search = document.querySelector('#search');
const collection = document.querySelector('#collection');
const collectionDone = document.querySelector('#collection-done');
const clearAllBtn = document.querySelector('#clearall');

setInterval(clockFunction,1000);
loadEventListeners();


// Date , day and Time

function clockFunction(){
const clock = new Date();
let hour;
let minute;
let second;
 (clock.getHours() < 10) ? hour = '0' + clock.getHours() : hour = clock.getHours();
 (clock.getMinutes() < 10) ? minute = '0' + clock.getMinutes() : minute = clock.getMinutes();
 (clock.getSeconds() < 10) ? second = '0' + clock.getSeconds() : second = clock.getSeconds();

time.textContent = `${hour} : ${minute} : ${second}`;

 let week;
    switch (clock.getDay()) {
        case 0:
            week = 'Sunday'
            break;
        case 1:
            week = 'Monday'
            break;
        case 2:
            week = 'Tuesday'
            break;
        case 3:
            week = 'Wednesday'
            break;
        case 4:
            week = 'Thursday'
            break;
        case 5:
            week = 'Friday'
            break;
        case 6:
            week = 'Saturday'
            break;
    
    }

day.textContent = week;

let month;
switch (clock.getMonth()) {
    case 0:
        month = 'January'
        break;
    case 1:
        month = 'February'
        break;
    case 2:
        month = 'March'
        break;
    case 3:
        month = 'April'
        break;
    case 4:
        month = 'May'
        break;
    case 5:
        month = 'June'
        break;
    case 6:
        month = 'July'
        break;
    case 7:
        month = 'August'
        break;
    case 8:
        month = 'September'
        break;
    case 9:
        month = 'October'
        break;
    case 10:
        month = 'November'
        break;
    case 11:
        month = 'December'
        break;  
}
date.textContent = `${clock.getDate()} - ${month} - ${clock.getFullYear()}`

}


function loadEventListeners(){
    //Dom Load Event

    document.addEventListener('DOMContentLoaded', getTask)

    // Add To List 
    form.addEventListener('submit', addItem);
   
    // Remove Item
    collection.addEventListener('click', removeItem);

    // Clear Item

    clearAllBtn.addEventListener('click', clearAll)
    
    // Search Item

    search.addEventListener('keyup', searchItem);

}

// get tasks from local stroge 

function getTask(){
    let taskArr;
    if(localStorage.getItem('tasks') === null){
        taskArr = [];
    }else{
        taskArr = JSON.parse(localStorage.getItem('tasks'));
    }

    taskArr.forEach(function(item){
        const list = document.createElement('li');
    list.className = 'list-group-item d-flex justify-content-between align-items-center task-list-item';
    const spanItem = document.createElement('span');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'me-3 delete';
    spanItem.appendChild(box);
    spanItem.appendChild(document.createTextNode(item));

    const link = document.createElement('a');
    link.className = 'item-link';
    link.innerHTML = '<i class="fas fa-times delete"></i>';

    list.appendChild(spanItem);
    list.appendChild(link);
    collection.appendChild(list);
    })
}

function addItem(e){
    
    let Text = taskInput.value;
    if(Text === ''){
        alert('Please add SOMETHING!!');
    }else{
    
    // create elemnet
    const list = document.createElement('li');
    list.className = 'list-group-item d-flex justify-content-between align-items-center task-list-item';
    const spanItem = document.createElement('span');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'me-3 delete';
    spanItem.appendChild(box);
    spanItem.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'item-link';
    link.innerHTML = '<i class="fas fa-times delete"></i>';

    list.appendChild(spanItem);
    list.appendChild(link);
    collection.appendChild(list); 

    // store to local storage

    let taskArr;
    if(localStorage.getItem('tasks') === null){
        taskArr = [];
    }else{
        taskArr = JSON.parse(localStorage.getItem('tasks'));
    }
    taskArr.push(taskInput.value);
    localStorage.setItem('tasks', JSON.stringify(taskArr));

    e.preventDefault();
    taskInput.value = '';

}
}
// Remove Item

function removeItem(e){
    if(e.target.classList.contains('delete')){
       
        e.target.parentElement.parentElement.remove();

        // create elemnet
    const list = document.createElement('li');
    list.className = 'list-group-item d-flex justify-content-between align-items-center text-muted';
    const spanItem = document.createElement('strike');
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.className = 'me-3 delete';
    box.checked = true;
    spanItem.appendChild(box);
    spanItem.appendChild(document.createTextNode(e.target.parentElement.parentElement.textContent));


    list.appendChild(spanItem);
    collectionDone.appendChild(list);
    
    // remove from local storage 
    let taskArr;
    if(localStorage.getItem('tasks') === null){
        taskArr = [];
    }else{
        taskArr = JSON.parse(localStorage.getItem('tasks'));
    }

    taskArr.forEach(function(item,index){
        if(item === e.target.parentElement.parentElement.textContent){
            taskArr.splice(index,1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(taskArr));    
    }

}

// Clear All

function clearAll(e){
    if(confirm('This Action Will Clear Your All Records!!')){
   while(collectionDone.firstChild){
     collectionDone.removeChild(collectionDone.firstChild);
   }
   while(collection.firstChild){
     collection.removeChild(collection.firstChild);
   }
    }
    localStorage.clear();
    e.preventDefault();
}

// search

function searchItem(e){
    const Text = e.target.value.toLowerCase();
    document.querySelectorAll('.task-list-item').forEach(function(task){
        const itemContent = task.firstChild.textContent.toLowerCase();
       
        if(itemContent.indexOf(Text) != -1){
          task.classList.replace('d-none','d-flex');
        }else{
            task.classList.replace('d-flex','d-none');
        }
    })


}

