let store = []
let nextId = 0;

document.addEventListener("DOMContentLoaded", function(){

  const sideBar = document.getElementById('sidenav')
  const mainDiv = document.getElementById('main')
  const createButton = document.getElementById('create')


  fetch('http://localhost:3000/api/v1/notes').then(response => {
      return response.json()
    }).then(function(notes) {
      notes.forEach(note => {
        createNewNote(note)
        //   notes = new Note(note.title, note.body)
        //   const noteLine = document.createElement('p')
        // noteLine.addEventListener('click', function() {
        //   const bodyLine = document.createElement('p')
        //   bodyLine.innerText = note.body
        //   mainDiv.innerHTML = ''
        //   mainDiv.append(bodyLine)
        // })
        // noteLine.innerText = note.title
        // sideBar.append(noteLine)
      })
    })

    createButton.addEventListener('click', function() {
      mainDiv.innerHTML = handleForm()
      // const newPost = document.getElementById('newPost')
      //     newPost.addEventListener('submit', function(e) {
      //       e.preventDefault()
      //       let note = new Note(e.target.children[0].value, e.target.children[1].value )
      //       createNewNote(note)
      //    })
      handleEdit(false)

    })

function createNewNote(note){
  notes = new Note(note.id, note.title, note.body)
  const noteLine = document.createElement('p')
  sideBarHandler(noteLine, note)

  // noteLine.addEventListener('click', function() {
  //   const bodyLine = document.createElement('p')
  //   bodyLine.innerText = note.body
  //   mainDiv.innerHTML = `<button id="editButton">Edit Note</button> <button id="deleteButton">Delete Note</button>`
  //   mainDiv.append(bodyLine)
  //   const editButton = document.getElementById('editButton')
  //
  //   editButton.addEventListener('click', function() {
  //     mainDiv.innerHTML = handleForm(note)
  //     handleEdit(true)
  //   })
  //
  // })
  noteLine.setAttribute('id', note.id)
  noteLine.innerText = note.title
  sideBar.append(noteLine)
}

function handleForm(notes = '') {
  return `<form id="newPost" method="post"> Title: <input type="text" name="title" data-value="${notes === '' ? '' : notes.title}" value= "${notes==='' ? '' : notes.title}">
                       Body: <textarea name="body" data-value="${notes==='' ? '' : notes.body}">${notes==='' ? '' : notes.body}</textarea>
                       <input type="submit" value="Submit"></form>`
}

function sideBarHandler(noteLine, note) {
  noteLine.addEventListener('click', function() {
    const bodyLine = document.createElement('p')
    bodyLine.innerText = note.body
    mainDiv.innerHTML = `<button id="editButton">Edit Note</button> <button id="deleteButton">Delete Note</button>`
    mainDiv.append(bodyLine)
    const editButton = document.getElementById('editButton')
    const deleteButton = document.getElementById('deleteButton')
    editButton.addEventListener('click', function() {
      mainDiv.innerHTML = handleForm(note)
      handleEdit(true)
    })
    deleteButton.addEventListener('click', function() {
    noteLine.remove()
    mainDiv.innerHTML = " "
    })
  })
}

function handleEdit(edit) {

  const newPost = document.getElementById('newPost')
      newPost.addEventListener('submit', function(e) {
        e.preventDefault()

        if (edit) {
          let note = store.filter(n => n.title === e.target.children[0].getAttribute('data-value'))[0]
          let pTag = document.getElementById(note.id)
          note.title = e.target.children[0].value
          note.body = e.target.children[1].value
          pTag.innerText = note.title
          sideBarHandler(pTag, note)
          // debugger

        } else {
           let note = new Note(nextId, e.target.children[0].value, e.target.children[1].value )
            createNewNote(note)
        }

    })
  }
})

class Note {
  constructor(id, title, body) {
    nextId = id + 1
    this.id = id
    this.title = title
    this.body = body
    store.push(this)
  }
}
