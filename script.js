let dragged;

let addTicket = document.getElementById("addTicket");
let draggableBegginer = document.getElementById("draggableBegginer");
let draggableInProgress = document.getElementById("draggableInProgress");
let draggableComplete = document.getElementById("draggableComplete");
let inputHeader = document.getElementById("inputHeader");
let inputText = document.getElementById("inputText");
let list = document.getElementById("list");

//for adding in localstorage
let temp={};
let targetsArray=[];
let idNumber= targetsArray.length;
let presentIdNumber;

function loadLists(){
    if (localStorage.length===1){
        targetsArray = JSON.parse(localStorage.getItem("targetsArray"));
        for (let i=0;i<targetsArray.length;i++){

            let div = document.createElement("div");
            let p1 = document.createElement("p");
            let p2 = document.createElement("p");

            p1.appendChild(document.createTextNode(targetsArray[i].title));
            p1.className ='headerList'
            p2.appendChild(document.createTextNode(targetsArray[i].description));
            p2.className = 'textList';
            div.appendChild(p1);
            div.appendChild(p2);
            div.className = 'messageBox';
            div.id=i;//id number for that div
            div.draggable = true;
            if (targetsArray[i].currentList==="Targets"){
                draggableBegginer.appendChild(div);
            }
            else if(targetsArray[i].currentList==="InProgress"){
                draggableInProgress.appendChild(div);
            }
            else if(targetsArray[i].currentList==="Complete"){
                draggableComplete.appendChild(div);
            }
            
        }

    }
}
window.addEventListener("load", loadLists);

function addItem(){

    let div = document.createElement("div");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
	p1.appendChild(document.createTextNode(inputHeader.value));
    p1.className ='headerList'
	p2.appendChild(document.createTextNode(inputText.value));
    p2.className = 'textList';
    div.appendChild(p1);
    div.appendChild(p2);
    div.className = 'messageBox';

    targetsArray = JSON.parse(localStorage.getItem("targetsArray"));
    idNumber= targetsArray.length;
    div.id=idNumber;
    div.draggable = true;

	draggableBegginer.appendChild(div);

    temp.title=inputHeader.value;
    temp.description = inputText.value;
    temp.currentList = "Targets";

    

    targetsArray[idNumber]= temp;
   
    
    localStorage.clear();
    localStorage.setItem("targetsArray", JSON.stringify(targetsArray));


	inputHeader.value = "";
    inputText.value="";
    idNumber= idNumber+1;
    // temp.title="";
    // temp.description = "";
    // temp.currentList = "";
}

addTicket.addEventListener("click", addItem);

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  presentIdNumber= event.target.id;
  // make it half transparent
  
  event.target.style.opacity = .5;

  
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
  
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
  // highlight potential drop target when the draggable element enters it
  if (event.target.className == "dropzone") {
    event.target.style.background = "purple";
   // event.target.style.opacity = .5;
  }

}, false);

document.addEventListener("dragleave", function(event) {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
  }

}, false);

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged elem to the selected drop target
  targetsArray = JSON.parse(localStorage.getItem("targetsArray"));

  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
    
    if(event.target.id==="Targets"){
        targetsArray[presentIdNumber].currentList = "Targets";
        
    }
    else if(event.target.id==="InProgress"){
        targetsArray[presentIdNumber].currentList = "InProgress";
        
    }
    else{
        targetsArray[presentIdNumber].currentList = "Complete";
        
    }
    localStorage.setItem("targetsArray", JSON.stringify(targetsArray));
  }
}, false);