### Project Description

We will be making an Evernote clone!  Fork this repo, and follow the requirements below to get started.  

### Requirements
1. You will be developing the HTML/CSS/JS
>index.js; index.html; main.css

front-end to support a pre-defined Rails API backend. (This repo provides you with a starter back end to work with.) The domain model consists of Users and Notes.
>class Users: constructors, methods
>Class Notes: constructors, methods

>User has many notes. Has Many, belongs

2. The Frontend and Backend will live in two separate repositories.
>Fetch()

All interactions between the client and the server should be handled asynchronously (Ajax / fetch).

3. The application should support:
    1. Listing all of a user's notes on a sidebar
    >div on the side- like tasks

    >For now, only create one user.
    The user the data is seeded in, no need for userId  There will be no log in.
    thank heavens
    2. When a user clicks
    sidebar shows the note
    listened for an event
    on a note "preview" in the sidebar,
    we'll take a snippet(.slice(0, 40))
    the full note body and any other details of the currently selected note should show on the page.

    3. Allow users to create, edit and delete notes.

    >CRUD!
    >create: new Notes (schema)
    edit: google? (fetch? patch)
    when the click event, expands the note
    add button, name it edit, other is delete
    editButton.addEventListener()
    deleteButton.addEventListener()
    convert to textfield??
    delete: .remove on the edit

    4. Feel free to add on your own features if you have built all of the above!  Some ideas:  You could add filter or search functionality, multiple users, or support for rich format (bold, italic, etc) when creating a note.

    >convert to textfield??

4. **You may not use authentication or authorization. This means no user log in**. We'll look at patterns for dealing with client-side auth later in the semester, so you'll have plenty of time to deal with this case.
