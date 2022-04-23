let newField = document.getElementById('newField');
let popupBox = document.getElementById('popup-box');
let addTxt = document.getElementById('addTxt');
let addBtn = document.getElementById('addBtn');
let main = document.getElementById('main');
let exit = document.getElementById('exit');
let headerTitle = document.getElementById('headerTitle');



const notes = JSON.parse(localStorage.getItem("notes") || "[]");


let isUpdate = false, updateID;

newField.addEventListener('click', ()=>{
    popupBox.style.display = 'block';
    addBtn.innerHTML = 'Add Note';
    headerTitle.innerHTML = 'ADD NEW NOTE';
})

exit.addEventListener('click', ()=>{
    isUpdate = false;
    addTxt.value = "";
    popupBox.style.display = 'none';
})


function showNote(){
    document.querySelectorAll(".noting").forEach(note => note.remove());
    notes.forEach((note, index)=>{
        
        let liTag = `<li class="noting">
                        <div class="box">
                        <p>${note.Txt}</p>
                        <div>
                        <i class="fa-regular fa-edit" onclick="updateNote(${index}, '${note.Txt}')" id="edit"></i>
                        <i class="fa-regular fa-trash-can" onclick="deleteNote(${index})" id="delet"></i>
                        </div>
                        </div>
                     </li>`;
        newField.insertAdjacentHTML("afterend", liTag);
    });
}
showNote();

addBtn.addEventListener('click', e =>{
    e.preventDefault();

    if(addTxt.value){
        let noteInfo = {
            Txt: addTxt.value
        }
        if(!isUpdate){
            notes.push(noteInfo);
        }
        else{
            isUpdate = false;
            notes[updateID] = noteInfo;
        }
        
        localStorage.setItem("notes", JSON.stringify(notes));
        exit.click();
        showNote();
        addTxt.value = "";
        
    }
})


function deleteNote(noteID){
    notes.splice(noteID, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNote();
}

function updateNote(noteID, material){
    isUpdate = true;
    updateID = noteID;
    newField.click();
    addTxt.value = material;
    addBtn.innerHTML = 'Update';
    headerTitle.innerHTML = 'Update Note';
}