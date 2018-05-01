// application should support:
// Listing all of a user's notes on a sidebar --> For now, only create one user. There will be no log in.
// When a user clicks on a note "preview" in the sidebar, the full note body and any other details of the currently selected note should show on the page.
// Allow users to create, edit and delete notes.
// Feel free to add on your own features if you have built all of the above! Some ideas: You could add filter or search functionality, multiple users, or support for rich format (bold, italic, etc) when creating a note.

let sideBarDiv = document.getElementById('side-bar')
let mainDiv = document.getElementById('main')
let newNoteButton = document.getElementById('newNoteButton')
let newNoteForm = document.getElementById('newForm')


// Listing all of a user's notes on a sidebar --> For now, only create one user. There will be no log in.
fetch('http://localhost:3000/api/v1/notes')
  .then((res) => res.json())
  .then((json) => {
    let noteTitles = json.map((note)=>note.title)

    json.forEach((note)=>{
      handleNote(note)
    })

  })

newNoteButton.addEventListener('click',(e)=>{
  if(document.getElementsByClassName('noteWrapperP').length>0){
    document.querySelector('.noteWrapperP').remove()
    document.querySelector('#deleteButton').remove()
  }
  newNoteButton.disabled = true

  createForm()

  let newForm = document.getElementById('newForm')

  newForm.addEventListener('submit',(e)=>{
    newNoteButton.disabled = false
    e.preventDefault()


    let titleInput = document.getElementById('titleInput')
    let noteBodyInput = document.getElementById('noteBodyInput')

    // debugger


    let postData = {
      title: titleInput.value,
      body: noteBodyInput.value
    }

    fetch('http://localhost:3000/api/v1/notes', {
        method: 'POST',
          body: JSON.stringify(postData),
          headers: {
            'Content-Type': 'application/json'
          }
      }).then(res => {
        handleNote(postData)
        newForm.remove()
      })




  })

})


function handleNote(note){
  // debugger

  let titleWrapperDiv = document.createElement('div')
  titleWrapperDiv.innerHTML = note.title
  titleWrapperDiv.className = 'noteTitle'
  titleWrapperDiv.id = note.id

  sideBarDiv.appendChild(titleWrapperDiv)

  titleWrapperDiv.addEventListener('click',function(e){
    if(document.getElementsByClassName('noteWrapperP').length>0){

      document.querySelector('.noteWrapperP').remove()
      document.querySelector('#deleteButton').remove()
      document.querySelector('#editButton').remove()
    }

    if(document.querySelector('#newForm')){
      document.querySelector('#newForm').remove()
      document.querySelector('#newNoteButton').disabled = false

    }

    let noteWrapperP = document.createElement('p')
    noteWrapperP.innerHTML = note.body
    noteWrapperP.className = 'noteWrapperP'
    noteWrapperP.id = note.title
    noteWrapperP.style.display = 'none'
    noteWrapperP.style.display = "block"

    let deleteButton = document.createElement('button')
    deleteButton.id = "deleteButton"
    deleteButton.innerHTML = "Delete"
    deleteButton.addEventListener('click', ()=> {
      deleteNote(titleWrapperDiv, noteWrapperP, deleteButton, editButton, note.id)
    })

    let editButton = document.createElement('button')
    editButton.id = "editButton"
    editButton.innerHTML = "Edit"
    editButton.addEventListener('click', ()=> {
      // console.log("in EDIT")

      editNote(note.id)
    })






    mainDiv.appendChild(noteWrapperP)
    mainDiv.appendChild(editButton)
    mainDiv.appendChild(deleteButton)
  })

}


function deleteNote(title, body,
  deleteButton, editButton, id) {
  // debugger
  fetch('http://localhost:3000/api/v1/notes/' + id, {
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(res => {
      body.remove()
      title.remove()
      deleteButton.remove()
      editButton.remove()


    })
}



function editNote(id){
  let editButton = document.getElementById('editButton')
  let deleteButton = document.getElementById('deleteButton')
  editButton.style.display = 'none'
  deleteButton.style.display = 'none'

  createForm()



  let newForm = document.getElementById('newForm')
  newForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let titleInput = document.getElementById('titleInput')
    let noteBodyInput = document.getElementById('noteBodyInput')
    let postData = {
      title: titleInput.value,
      body: noteBodyInput.value
    }

    let previousTitle = document.getElementById(id)
    let previousBody = document.getElementById(previousTitle.innerHTML)
    previousTitle.remove()
    previousBody.remove()


    fetch('http://localhost:3000/api/v1/notes/' + id, {
        method: 'PATCH',
          body: JSON.stringify(postData),
          headers: {
            'Content-Type': 'application/json'
          }
      }).then(res => {



        handleNote(postData)
        newForm.remove()
      })




  })

}

function createForm(){

    let newForm = document.createElement('form')
    newForm.id = 'newForm'

    let titleLabel = document.createElement('label')
    let titleInput = document.createElement('input')
    let noteBodyLabel = document.createElement('label')
    let noteBodyInput = document.createElement('textarea')
    let submitButton = document.createElement('button')

    titleInput.setAttribute('id', 'titleInput')
    noteBodyInput.setAttribute('id', 'noteBodyInput')

    titleLabel.setAttribute('for', 'titleInput')
    titleLabel.innerHTML = "title"
    noteBodyLabel.setAttribute('for', 'noteInput')
    noteBodyLabel.innerHTML = "body"

    submitButton.setAttribute('type','submit')
    // submitButton.setAttribute('value', 'Create Note')
    submitButton.innerHTML = 'Submit'


    newForm.appendChild(titleLabel)
    newForm.innerHTML += '<br>'
    newForm.appendChild(titleInput)
    newForm.innerHTML += '<br>'
    newForm.appendChild(noteBodyLabel)
    newForm.innerHTML += '<br>'
    newForm.appendChild(noteBodyInput)
    newForm.innerHTML += '<br>'
    newForm.appendChild(submitButton)
    mainDiv.appendChild(newForm)

}
