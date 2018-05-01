// application should support:
// Listing all of a user's notes on a sidebar --> For now, only create one user. There will be no log in.
// When a user clicks on a note "preview" in the sidebar, the full note body and any other details of the currently selected note should show on the page.
// Allow users to create, edit and delete notes.
// Feel free to add on your own features if you have built all of the above! Some ideas: You could add filter or search functionality, multiple users, or support for rich format (bold, italic, etc) when creating a note.


// Listing all of a user's notes on a sidebar --> For now, only create one user. There will be no log in.
fetch('http://localhost:3000/api/v1/notes')
  .then((res) => res.json())
  .then((json) => {
    debugger
    // json
    let noteTitles = json.map((note)=>note.title)
    let sideBarDiv = document.getElementById('side-bar')
    let mainDiv = document.getElementById('main')


    json.forEach((note)=>{
      let titleWrapperDiv = document.createElement('div')
      titleWrapperDiv.innerHTML = note.title
      titleWrapperDiv.className = 'noteTitle'

      sideBarDiv.appendChild(titleWrapperDiv)


      titleWrapperDiv.addEventListener('click',function(e){
        // let notes = document.querySelectorAll('.noteWrapperP')
        // debugger;

        // if (notes.find(el => (el.style.display === 'block'))) {
        //   let displayed = notes.find(el => (el.style.display === 'block'))
        //   displayed.style.display = 'none'
        // }
        // noteWrapperP.parentNode.firstChild.style.display = "none"

        // debugger
        if(document.getElementsByClassName('noteWrapperP').length>0){
          document.querySelector('.noteWrapperP').remove()
        }

        let noteWrapperP = document.createElement('p')
        noteWrapperP.innerHTML = note.body
        noteWrapperP.className = 'noteWrapperP'
        noteWrapperP.id = note.title
        noteWrapperP.style.display = 'none'
        noteWrapperP.style.display = "block"


        mainDiv.appendChild(noteWrapperP)


      })

      // debugger


    })





    // debugger
  })




// debugger
// fetch('https://api.github.com/repos/jquery/jquery/commits')
//   .then(res => res.json())
//   .then(json => console.log(json));
