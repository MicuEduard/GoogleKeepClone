//vars
var isPinned;
var setRemind;
var isArchived;
var colorToChange;
var lastColor;
var imgPath = null;

//DOM
const centerContainer = document.getElementById("center");

//When page loads I want to display all notes
window.addEventListener("load", showAllNotes());

//When click on center container expand it or collapse it
document.addEventListener("click", function(e) {

    //e.preventDefault();

    const textarea = document.getElementById("textarea");
    const noteActions = document.getElementById("note-actions");
    const button = document.getElementById("button");
    const pinIcon = document.getElementById("pin-icon");
    const archiveIcon = document.getElementById("note-actions-item-folder");
    const bellIcon = document.getElementById("note-actions-item-bell");
    const image = document.getElementById("upload");
    //const color = document.getElementsByClassName("color");

    //console.log(e.target);

    if (e.target.getAttribute("class") == "center-wrap" || e.target.getAttribute("placeholder") == "Title" || e.target.getAttribute("id") == "form") {
        centerContainer.classList.remove("height-30");
        textarea.classList.remove("display-none");
        noteActions.classList.remove("display-none");
        button.classList.remove("display-none");
        pinIcon.classList.remove("display-none");

        isPinned = false;
        setRemind = false;
        isArchived = false;
        
        pinIcon.setAttribute("data-isPinned", "false");

        //Change image file state
        image.addEventListener("change", function() {
            readURL(image);
        });

        //If pin checked, make pinned note
        pinIcon.addEventListener("click", function() {

            if (pinIcon.getAttribute("data-isPinned") == "false") {
                isPinned = true;
                pinIcon.setAttribute("data-isPinned", "true");
                console.log(isPinned);
            } else {
                isPinned = false;
                pinIcon.setAttribute("data-isPinned", "false");
                console.log(isPinned);
            }

        });

        //If archived
        archiveIcon.addEventListener("click", function() {

            if(archiveIcon.getAttribute("data-isArchived") == "false") {
                isArchived = true;
                archiveIcon.setAttribute("data-isArchived", "true");
                console.log(isArchived);
            } else {
                isArchived = false;
                archiveIcon.setAttribute("data-isArchived", "false");
                console.log(isArchived);
            }

        });

        //Set remind
        bellIcon.addEventListener("click", function() {

            if(bellIcon.getAttribute("data-setRemind") == "false") {
                setRemind = true;
                bellIcon.setAttribute("data-setRemind", "true");
                console.log(setRemind);
            } else {
                setRemind = false;
                bellIcon.setAttribute("data-setRemind", "false");
                console.log(setRemind);
            }

        });

        //When I click on color item change the background
        document.addEventListener("click", function(e) {

            if (e.target.getAttribute("data-color") != "") {

                colorToChange = e.target.getAttribute("data-color");

                const centerWrap = document.getElementById("center-wrap");
                const title = document.getElementById("title");
                const moreActons = document.getElementById("more-actions");
                const noteActionsItemBell = document.getElementById("note-actions-item-bell");
                const noteActionsItemPalette = document.getElementById("note-actions-item-palette");
                const noteActionsItemImage = document.getElementById("note-actions-item-image");
                const noteActionsItemFolder = document.getElementById("note-actions-item-folder");
                const noteActionsItem1 = document.getElementById("note-actions-item-1");
                const noteActionsItem2 = document.getElementById("note-actions-item-2");
                const noteActionsItem3 = document.getElementById("note-actions-item-3");
                const noteActionsItem4 = document.getElementById("note-actions-item-4");
                const form = document.getElementById("form");
                const middleWrap = document.getElementById("middle-wrap");
                const enableWrap = document.getElementById("enable");
                const label = document.getElementById("label");

                centerWrap.classList.remove(lastColor);
                textarea.classList.remove(lastColor);
                noteActions.classList.remove(lastColor);
                button.classList.remove(lastColor);
                pinIcon.classList.remove(lastColor);
                title.classList.remove(lastColor);
                moreActons.classList.remove(lastColor);
                noteActionsItemBell.classList.remove(lastColor);
                noteActionsItemPalette.classList.remove(lastColor);
                noteActionsItemImage.classList.remove(lastColor);
                noteActionsItemFolder.classList.remove(lastColor);
                noteActionsItem1.classList.remove(lastColor);
                noteActionsItem2.classList.remove(lastColor);
                noteActionsItem3.classList.remove(lastColor);
                noteActionsItem4.classList.remove(lastColor);
                form.classList.remove(lastColor);
                middleWrap.classList.remove(lastColor);
                enableWrap.classList.remove(lastColor);
                label.classList.remove(lastColor);

                centerWrap.classList.add(colorToChange);
                textarea.classList.add(colorToChange);
                noteActions.classList.add(colorToChange);
                button.classList.add(colorToChange);
                pinIcon.classList.add(colorToChange);
                title.classList.add(colorToChange);
                moreActons.classList.add(colorToChange);
                noteActionsItemBell.classList.add(colorToChange);
                noteActionsItemPalette.classList.add(colorToChange);
                noteActionsItemImage.classList.add(colorToChange);
                noteActionsItemFolder.classList.add(colorToChange);
                noteActionsItem1.classList.add(colorToChange);
                noteActionsItem2.classList.add(colorToChange);
                noteActionsItem3.classList.add(colorToChange);
                noteActionsItem4.classList.add(colorToChange);
                form.classList.add(colorToChange);
                middleWrap.classList.add(colorToChange);
                enableWrap.classList.add(colorToChange);
                label.classList.add(colorToChange);

                lastColor = colorToChange;

            } else {
                
            }

        });

    }
    
    else if (e.target.getAttribute("type") == "file" || e.target.getAttribute("for") == "image" || e.target.classList.contains("far") || e.target.classList.contains("color") || e.target.getAttribute("name") == "note-content" || e.target.getAttribute("name") == "action-icon"  || e.target.getAttribute("id") == "button" || e.target.getAttribute("id") == "note-actions" || e.target.getAttribute("class") == "more-actions") {

        //If I press something that's inside the center wrap
        //I don't want anything to happen

    } 

    else  {
        centerContainer.classList.add("height-30");
        textarea.classList.add("display-none");
        noteActions.classList.add("display-none");
        button.classList.add("display-none");
        pinIcon.classList.add("display-none");

        addNote();

    }

});

function readURL(image) {

    const header = document.getElementById("header");
    const img = document.getElementById("img");

    header.classList.remove("display-none");
    img.src = URL.createObjectURL(image.files[0]);
    imgPath = URL.createObjectURL(image.files[0]);

}


//After clicking outside the container
//Add input to db.json and display on screen
function addNote() {

    const inputTitle = document.getElementById("title").value;
    const inputText = document.getElementById("textarea").value;
    const pinIcon = document.getElementById("pin-icon");
    const date = new Date();
    const when = date.getUTCDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();

    //console.log(colorToChange)
    //console.log(inputText + " " + inputTitle);
    //console.log(isArchived);
    if (inputText != "" && inputTitle != "") {

        fetch('http://localhost:3000/notes', {
            method: 'POST',
            body: JSON.stringify({
                'title': inputTitle, 
                'text': inputText,
                'isPinned': isPinned,
                'when': when,
                'color': colorToChange,
                'isArchived': isArchived,
                'setRemind': setRemind,
                'image': imgPath
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
          .then(() => showAllNotes());

          isPinned = false;
          isArchived = false;
          setRemind = false;
          imgPath = null;

    }

}

//Show all notes
async function showAllNotes() {

    const allNotes = await getAllNotes();
    const otherNotes = document.getElementById("others");
    const pinnedNotes = document.getElementById("pinned");
    const notes = createNotes(allNotes);

    console.log(notes);

    otherNotes.appendChild(notes[0]);
    pinnedNotes.appendChild(notes[1]);

}

function getAllNotes() {

    return fetch('http://localhost:3000/notes', 
    {
        method: 'GET'
    })
      .then(Response => Response.json());

}

function createNotes(allNotes) {

    let otherNotesFragment = document.createDocumentFragment();
    let pinnedNotesFragment = document.createDocumentFragment();
    let fragments = [];

    allNotes.forEach(note => {

        if (note.isArchived == false) {
            //Elements
            const noteTitle = document.createElement("p");
            const noteText = document.createElement("p");
            const pinIcon = document.createElement("i");
            const reminderIcon = document.createElement("i");
            const colorIcon = document.createElement("i");
            const imageIcon = document.createElement("i");
            const archiveIcon = document.createElement("i");
            const b = document.createElement("b");
            const img = document.createElement("img");
            const inputFile = document.createElement("input");
            const label = document.createElement("label");

            //Containers for elements
            const noteCon = document.createElement("div");
            const noteTop = document.createElement("div");
            const noteHeader = document.createElement("div");
            const noteMain = document.createElement("div");
            const noteTitleCon = document.createElement("div");
            const noteTextCon = document.createElement("div");
            const noteBottom = document.createElement("div");
            const ul = document.createElement("ul");
            const li1 = document.createElement("li");
            const li2 = document.createElement("li");
            const li3 = document.createElement("li");
            const li4 = document.createElement("li");
            const li = document.createElement("li");

            //Container for colors
            const ulColor = document.createElement("ul");
            const liWhite = document.createElement("li");
            const liRed = document.createElement("li");
            const liOrange = document.createElement("li");
            const liYellow = document.createElement("li");
            const liGreen = document.createElement("li");
            const liTeal = document.createElement("li");
            const liBlue = document.createElement("li");
            const liDarkBlue = document.createElement("li");
            const liPurple = document.createElement("li");
            const liPink = document.createElement("li");
            const liBrown = document.createElement("li");
            const liGray = document.createElement("li");

            //Assign classes to colors
            liRed.classList.add("red");
            liWhite.classList.add("white");
            liOrange.classList.add("orange");
            liYellow.classList.add("yellow");
            liGreen.classList.add("green");
            liTeal.classList.add("teal");
            liBlue.classList.add("blue");
            liDarkBlue.classList.add("dark-blue");
            liPurple.classList.add("purple");
            liPink.classList.add("pink");
            liBrown.classList.add("brown");
            liGray.classList.add("gray");
            li2.classList.add("submenu");

            liRed.setAttribute("data-noteColor","red");
            liWhite.setAttribute("data-noteColor","white");
            liOrange.setAttribute("data-noteColor","orange");
            liYellow.setAttribute("data-noteColor","yellow");
            liGreen.setAttribute("data-noteColor","green");
            liTeal.setAttribute("data-noteColor","teal");
            liBlue.setAttribute("data-noteColor","blue");
            liDarkBlue.setAttribute("data-noteColor","dark-blue");
            liPurple.setAttribute("data-noteColor","purple");
            liPink.setAttribute("data-noteColor","pink");
            liBrown.setAttribute("data-noteColor","brown");
            liGray.setAttribute("data-noteColor","gray");

            liRed.setAttribute("data-isColor","yes");
            liWhite.setAttribute("data-isColor","yes");
            liOrange.setAttribute("data-isColor","yes");
            liYellow.setAttribute("data-isColor","yes");
            liGreen.setAttribute("data-isColor","yes");
            liTeal.setAttribute("data-isColor","yes");
            liBlue.setAttribute("data-isColor","yes");
            liDarkBlue.setAttribute("data-isColor","yes");
            liPurple.setAttribute("data-isColor","yes");
            liPink.setAttribute("data-isColor","yes");
            liBrown.setAttribute("data-isColor","yes");
            liGray.setAttribute("data-isColor","yes");

            //Add class to containers
            noteCon.classList.add("note");
            noteCon.classList.add(note.color);
            noteTop.classList.add("note-top");
            noteTop.classList.add(note.color);
            noteMain.classList.add("note-main");
            noteMain.classList.add(note.color);
            noteHeader.classList.add("note-header");
            noteTitleCon.classList.add("note-title");
            noteTitleCon.classList.add(note.color);
            noteTextCon.classList.add("note-text");
            noteTextCon.classList.add(note.color);
            noteBottom.classList.add("note-bottom");
            noteBottom.classList.add(note.color);
            label.classList.add(note.color);
            ul.classList.add(note.color);
            noteText.classList.add(note.color);
            noteTitle.classList.add(note.color);
            b.classList.add(note.color);
            li1.classList.add(note.color);
            li2.classList.add(note.color);
            li3.classList.add(note.color);
            li4.classList.add(note.color);
            inputFile.setAttribute("type", "file");
            inputFile.setAttribute("id", "uploadImage");
            inputFile.setAttribute("name", "uploadImage");
            inputFile.setAttribute("class", "display-none");
            label.setAttribute("for", "uploadImage");

            //If i have an image display it in note header 
            if (note.image) {
                
                img.src = note.image;
                console.log(note.image);
                noteHeader.appendChild(img);
            } else {
                noteHeader.classList.add("display-none");
            }

            //Asign data to elemens
            b.innerHTML = note.title;
            noteTitle.appendChild(b);
            noteText.innerHTML = note.text;

            //Assign class to icons
            pinIcon.classList.add("fas");
            pinIcon.classList.add("fa-thumbtack");
            pinIcon.setAttribute("id", "note-pin");
            pinIcon.classList.add(note.color);

            reminderIcon.classList.add("far");
            reminderIcon.classList.add("fa-bell");
            reminderIcon.setAttribute("id", "note-reminder");
            reminderIcon.classList.add(note.color);

            colorIcon.classList.add("fas");
            colorIcon.classList.add("fa-palette");
            colorIcon.setAttribute("id", "note-color");
            colorIcon.classList.add("submenu");
            colorIcon.classList.add(note.color);

            imageIcon.classList.add("far");
            imageIcon.classList.add("fa-image");
            imageIcon.setAttribute("id", "note-image");
            imageIcon.classList.add(note.color);

            archiveIcon.classList.add("far");
            archiveIcon.classList.add("fa-folder-open");
            archiveIcon.setAttribute("id", "note-archive");
            archiveIcon.classList.add(note.color);

            //Move data to containers
            noteTitleCon.appendChild(noteTitle);
            noteTextCon.appendChild(noteText);
            noteMain.appendChild(noteTitleCon);
            noteMain.appendChild(noteTextCon);
            noteTop.appendChild(noteMain);
            noteTop.appendChild(pinIcon);
            //noteHeader.appendChild(img);
            ulColor.appendChild(liWhite);
            ulColor.appendChild(liRed);
            ulColor.appendChild(liOrange);
            ulColor.appendChild(liYellow);
            ulColor.appendChild(liGreen);
            ulColor.appendChild(liTeal);
            ulColor.appendChild(liBlue);
            ulColor.appendChild(liDarkBlue);
            ulColor.appendChild(liPurple);
            ulColor.appendChild(liPink);
            ulColor.appendChild(liBrown);
            ulColor.appendChild(liGray);
            label.appendChild(imageIcon);
            li1.appendChild(reminderIcon);
            li2.appendChild(colorIcon);
            li2.appendChild(ulColor);
            li3.appendChild(label);
            li3.appendChild(inputFile);
            li4.appendChild(archiveIcon);
            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(li3);
            ul.appendChild(li4);
            noteBottom.appendChild(ul);
            noteCon.appendChild(noteHeader);
            noteCon.appendChild(noteTop);
            noteCon.appendChild(noteBottom);

            //Add id as attribute on every note after creating
            noteCon.setAttribute("data-id", note.id);

            //console.log(note.isPinned);
            //Append note to note fragment
            if (note.isPinned == false) {
                otherNotesFragment.appendChild(noteCon);
                //console.log("false");
            } else {
                pinnedNotesFragment.appendChild(noteCon);
                //console.log("true");
            }
        }

        

    });

    return [otherNotesFragment, pinnedNotesFragment];

}

//When I click on existing note I want to open the edit note mode
document.addEventListener("click", async function(e) {

    //console.log(e.target);

    //If I directly click on color
    if (e.target.getAttribute("data-isColor") == "yes") {

        id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");

        const note = await fetch("http://localhost:3000/notes/" + id, {
        method: "GET"
        })
        .then(Response => Response.json());

        colorToChange = e.target.getAttribute("data-noteColor");

        fetch("http://localhost:3000/notes/" + id, {
            method: "PATCH",
            body: JSON.stringify({
                color: colorToChange
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(() => showAllNotes());

    }
    
    //If I choose image directly on image icon
    if (e.target.getAttribute("id") == "note-image") {
        
        id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
        
        const note = await fetch("http://localhost:3000/notes/" + id, {
        method: "GET"
        })
        .then(Response => Response.json());

        //console.log(image);
        const image = document.getElementById("uploadImage");

        image.addEventListener("change", function(e) {
            
            const header = e.target.parentElement.parentElement.parentElement.parentElement.firstChild;
            //console.log(header);
            const img = header.firstChild;
            //console.log(img);

            header.classList.remove("display-none");
            img.src = URL.createObjectURL(image.files[0]);
            console.log(URL.createObjectURL(image.files[0]));
            imgPath = URL.createObjectURL(image.files[0]);
            //console.log(URL.createObjectURL(image.files[0]));

            fetch('http://localhost:3000/notes/' + id, {
                method: 'PATCH',
                body: JSON.stringify({
                    'image': URL.createObjectURL(image.files[0])
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => showAllNotes());

            imgPath = null;

        });

    }

    //If i click directly on pin icon
    if (e.target.getAttribute("id") == "note-pin") {
            
        id = e.target.parentElement.parentElement.getAttribute("data-id");

        const note = await fetch("http://localhost:3000/notes/" + id, {
        method: "GET"
        })
        .then(Response => Response.json());
        
        isPinned = note.isPinned;

        if (isPinned == false) {
            isPinned = true;
        } else {
            isPinned = false;
        }

        fetch("http://localhost:3000/notes/" + id, {
            method: "PATCH",
            body: JSON.stringify({
                'isPinned': isPinned
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(() => showAllNotes());

        isPinned = false;

    }
    
    //If I click directly on reminder icon 
    if (e.target.getAttribute("id") == "note-reminder") {

        id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
        
        const note = await fetch("http://localhost:3000/notes/" + id, {
        method: "GET"
        })
        .then(Response => Response.json());

        setRemind = note.setRemind;

        if (setRemind == false) {
            setRemind = true;
        } else {
            setRemind = false;
        }

        fetch("http://localhost:3000/notes/" + id, {
            method: "PATCH",
            body: JSON.stringify({
                'setRemind': setRemind
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(() => showAllNotes());

        setRemind = false;

    }

    //If I click directly on archive icon
    if (e.target.getAttribute("id") == "note-archive") {

        id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");
        
        const note = await fetch("http://localhost:3000/notes/" + id, {
        method: "GET"
        })
        .then(Response => Response.json());

        isArchived = note.isArchived;

        if (isArchived == false) {
            isArchived = true;
        } else {
            isArchived = false;
        }

        fetch("http://localhost:3000/notes/" + id, {
            method: "PATCH",
            body: JSON.stringify({
                'isArchived': isArchived
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(() => showAllNotes());

        isArchived = false;

    }

    //First check if I clicked a note
    if (e.target.getAttribute("class") == "note" || e.target.tagName == "B" || e.target.tagName == "P") {

        let id;

        if (e.target.tagName == "B") {

            //console.log(e.target.parentElement);
            id = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");

        } else if(e.target.tagName == "P") {

            //console.log(e.target.parentElement.parentElement.parentElement.parentElement);
            id = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute("data-id");

        } else {

            id = e.target.getAttribute("data-id");

        }

        //console.log(id);

        const note = await fetch("http://localhost:3000/notes/" + id, {
            method: "GET"
        })
            .then(Response => Response.json());

        //console.log(note);

        const overlay = document.getElementById("overlay");
        const editNote = document.getElementById("edit-note");
        const editNoteTop = document.getElementById("edit-note-top");
        const editNoteTitle = document.getElementById("edit-note-title");
        const editNoteText = document.getElementById("edit-note-text");
        const editNoteWhen = document.getElementById("edit-note-when");
        const editNoteBottom = document.getElementById("edit-note-bottom");
        const editBtnClose = document.getElementById("edit-btn-close");
        const editPinIcon = document.getElementById("edit-pin-icon");
        const editArchiveIcon = document.getElementById("note-actions-item-open");
        const editNoteActions = document.getElementById("edit-note-actions");
        const when = document.getElementById("when");
        const noteActionsItemBell = document.getElementById("note-actions-item-bell");
        const noteActionsItemPalette = document.getElementById("note-actions-item-palette");
        const noteActionsItemImage = document.getElementById("note-actions-item-image");
        const noteActionsItemFolder = document.getElementById("note-actions-item-folder");
        const editForm = document.getElementById("edit-form");
        const editItem1 = document.getElementById("edit-item-1");
        const editItem2 = document.getElementById("edit-item-2");
        const editItem3 = document.getElementById("edit-item-3");
        const editItem4 = document.getElementById("edit-item-4");
        actualNoteColor = note.color;

        when.innerHTML = "Edit " + note.when;
        isPinned = note.isPinned;
        console.log(isPinned + "" + note.isPinned);
        overlay.classList.remove("display-none");
        editNote.classList.remove("display-none");

        editNoteTitle.value = note.title;
        editNoteText.value = note.text;
        editPinIcon.setAttribute("data-isPinned", note.isPinned);
        editArchiveIcon.setAttribute("data-isArchived", note.isArchived);
        noteActionsItemBell.setAttribute("data-setRemind", note.setRemind);

        //Set pinned or not
        editPinIcon.addEventListener("click", function() {

            if (editPinIcon.getAttribute("data-isPinned") == "false") {
                isPinned = true;
                editPinIcon.setAttribute("data-isPinned", "true");
            } else {
                isPinned = false;
                editPinIcon.setAttribute("data-isPinned", "false");
            }

        });

        //Archive or not
        editArchiveIcon.addEventListener("click", function() {

            if (editArchiveIcon.getAttribute("data-isArchived") == "false") {
                isArchived = true;
                editArchiveIcon.setAttribute("data-isArchived", "true");
            } else {
                isArchived = false;
                editArchiveIcon.setAttribute("data-isArchived", "false");
            }

        });

        //Remind or not
        noteActionsItemBell.addEventListener("click", function() {

            if (noteActionsItemBell.getAttribute("data-setRemind") == "false") {
                setRemind = true;
                noteActionsItemBell.setAttribute("data-setRemind", "true");
            } else {
                setRemind = false;
                noteActionsItemBell.setAttribute("data-setRemind", "false");
            }

        });

        //If i click on color change the note's color
        document.addEventListener("click", function(e) {

            if (e.target.getAttribute("data-color") != "") {

                colorToChange = e.target.getAttribute("data-color");
                actualNoteColor = colorToChange;

                editNote.classList.remove(lastColor);
                editNoteTitle.classList.remove(lastColor);
                editNoteText.classList.remove(lastColor);
                editNoteTop.classList.remove(lastColor);
                editNoteWhen.classList.remove(lastColor);
                editNoteBottom.classList.remove(lastColor);
                when.classList.remove(lastColor);
                editNoteActions.classList.remove(lastColor);
                editPinIcon.classList.remove(lastColor);
                editBtnClose.classList.remove(lastColor);
                noteActionsItemBell.classList.remove(lastColor);
                noteActionsItemPalette.classList.remove(lastColor);
                noteActionsItemImage.classList.remove(lastColor);
                noteActionsItemFolder.classList.remove(lastColor);
                editForm.classList.remove(lastColor);
                editItem1.classList.remove(lastColor);
                editItem2.classList.remove(lastColor);
                editItem3.classList.remove(lastColor);
                editItem4.classList.remove(lastColor);
                
                editNote.classList.add(colorToChange);
                editNoteTitle.classList.add(colorToChange);
                editNoteText.classList.add(colorToChange);
                editNoteTop.classList.add(colorToChange);
                editNoteWhen.classList.add(colorToChange);
                editNoteBottom.classList.add(colorToChange);
                when.classList.add(colorToChange);
                editNoteActions.classList.add(colorToChange);
                editPinIcon.classList.add(colorToChange);
                editBtnClose.classList.add(colorToChange);
                noteActionsItemBell.classList.add(colorToChange);
                noteActionsItemPalette.classList.add(colorToChange);
                noteActionsItemImage.classList.add(colorToChange);
                noteActionsItemFolder.classList.add(colorToChange);
                editForm.classList.add(colorToChange);
                editItem1.classList.add(colorToChange);
                editItem2.classList.add(colorToChange);
                editItem3.classList.add(colorToChange);
                editItem4.classList.add(colorToChange);

                lastColor = colorToChange;

            }

        });

        //If I click on overlay hide edit note mode
        overlay.addEventListener("click", function() {

            //Not good not bad
            closeEditMode(id);

        });

        //Same on edit btn close
        editBtnClose.addEventListener("click", function() {

            //Not good not bad
            closeEditMode(id);

        });

    }

});

function closeEditMode(id) {

    const overlay = document.getElementById("overlay");
    const editNote = document.getElementById("edit-note");
    const editNoteTitle = document.getElementById("edit-note-title");
    const editNoteText = document.getElementById("edit-note-text");
    const editPinIcon = document.getElementById("edit-pin-icon");
    const date = new Date();
    const when = date.getUTCDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    
    editNote.classList.add("display-none");
    overlay.classList.add("display-none");

    fetch("http://localhost:3000/notes/" + id, {
        method: "PATCH",
        body: JSON.stringify({
          title: editNoteTitle.value,
          text: editNoteText.value,
          'isPinned': isPinned,
          'when': when,
          'color': actualNoteColor,
          'isArchived': isArchived
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(() => showAllNotes());

    isPinned = false;

}

function search() {

    const input = document.getElementById("search");
    let title, text;
    const notes = document.getElementsByClassName("note");
    const filter = input.value.toLowerCase();

    for (let i = 0 ; i < notes.length; i++) {

        title = notes[i].getElementsByClassName("note-top")[0].getElementsByClassName("note-title")[0].getElementsByTagName("p")[0].getElementsByTagName("b")[0].innerHTML;
        text = notes[i].getElementsByClassName("note-top")[0].getElementsByClassName("note-text")[0].getElementsByTagName("p")[0].innerHTML;
        
        if (title.toLowerCase().indexOf(filter) > - 1 || text.toLowerCase().indexOf(filter) > - 1) {
            notes[i].style.display = "";
        } else {
            notes[i].style.display = "none";
        }

    }

}