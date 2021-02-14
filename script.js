let dragged;

let addTicket = document.getElementById("addTicket");
let draggableBegginer = document.getElementById("draggableBegginer");
let inputHeader = document.getElementById("inputHeader");
let inputText = document.getElementById("inputText");
let list = document.getElementById("list");

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
    div.draggable = true;

	draggableBegginer.appendChild(div);

	inputHeader.value = "";
    inputText.value="";
}

addTicket.addEventListener("click", addItem);

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
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
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild( dragged );
    event.target.appendChild( dragged );
  }
}, false);