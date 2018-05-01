document.addEventListener("DOMContentLoaded", function(event) {


  Note.prototype.template = function() {
    let template = document.createElement("div")
    template.innerHTML = `<h3>Title: "${this.title}"</h3><p>Body:<br/> ${this.body.slice(0, 40)}</p>`
    return template;
  }
  let preview = document.getElementById('preview')

  function showNotes(note) {
    preview.append(note.template())
  }

  Note.prototype.full_template = function() {
    let full_template = `<p>Title: "${this.title}"</p><p>Body: ${this.body}</p>`
    return full_template;
  }
  let full_view = document.getElementById('full_view')

  function showFullView(note) {
    full_view.append(note.full_template())
    let editButton = document.createElement("button");
    editButton.innerText = "Rewrite!"
    full_view.append(editButton)
    deleteButton.innerText = "Dissapear!"
    full_view.append(deleteButton)
  }

  function getNotes(data) {
    fetch("http://localhost:3000/api/v1/notes")
    .then(data => {
      for (let i = 0; i > data.length; i++){
        showNotes(new Note(data[i]));
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

  function editNotes(inputData) {
    fetch("http://localhost:3000/api/v1/notes/:id",{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData)
  }).then(response => response.json())
  .then(data => getNotes())
  }
  
  fetch("http://localhost:3000/api/v1/notes")
  .then(response => response.json())
  .then(data => {
    for (let i of data) {
      showNotes(new Note(i));
    }
  })



});
