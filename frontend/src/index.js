document.addEventListener("DOMContentLoaded", function(event) {


  Note.prototype.template = function() {
    let template = document.createElement("ul")
    template.innerHTML = `<li class="preview">${this.body.slice(0, 40)}...</li>`
    return template;
  }

  let preview = document.getElementById('preview')

  function showNotes(note) {
    let noteP = note.template()
    preview.append(noteP)
    noteP.addEventListener('click', function(){showFullView(note)})
  }

  Note.prototype.full_template = function() {
    return `<h2>Title: "${this.title}"</h2><p><strong>Body:</strong> ${this.body}</p>`
  }

  let fullView = document.getElementById('full_view')
  function showFullView(note) {
    fullView.innerHTML = note.full_template()
    let editButton = document.createElement("button");
    editButton.id = `edit-button-${note.id}`
    editButton.innerText = "Rewrite!"
    fullView.append(editButton)
    let deleteButton = document.createElement("button");
    deleteButton.id = `delete-button-${note.id}`
    deleteButton.innerText = "Disappear!"
    fullView.append(deleteButton)

    fullView.addEventListener('click', function(event){
      if(event.target.id === `delete-button-${note.id}` ){
        deleteNote(note)
      } else if (event.target.id === `edit-button-${note.id}`) {
        editNoteForm(note, fullView)
      }
    })
  }

  let form = document.getElementById("form")
  let inputTitle = document.getElementById("title")
  let inputBody = document.getElementById("body")
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputData = { title: inputTitle.value, body: inputBody.value }
    createNotes(inputData);
  })

  function createNotes(inputData) {
    fetch("http://localhost:3000/api/v1/notes", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
  }).then(response => response.json())
  .then(data => showNotes(new Note(data)))
  }

  function editNoteForm(note, div){
    div.innerHTML = `
    <h2>Title:</h2>
    <input type="text" id="edit-title" value="${note.title}">
    <p>Body:</p>
    <input type="text" id="edit-body" value="${note.body}">
    `
    let editButton = document.createElement("button");
    editButton.id = `submit-edit-button-${note.id}`
    editButton.innerText = "Submit!"

    div.appendChild(editButton)

    editButton.addEventListener('click', function(){
      note.title = document.getElementById('edit-title').value
      note.body = document.getElementById('edit-body').value
      editNote(note)
    })
  }

  function editNote(inputData) {
    fetch(`http://localhost:3000/api/v1/notes/${inputData.id}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
  }).then(response => response.json())
  .then(data => location.reload())
  }

  function deleteNote(inputData){
    console.log(inputData)
    return fetch(`http://localhost:3000/api/v1/notes/${inputData.id}`,{
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })
  .then(response => location.reload())
  }

  fetch("http://localhost:3000/api/v1/notes")
  .then(response => response.json())
  .then(data => {
    for (let i of data) {
      showNotes(new Note(i));
    }
  })

});
