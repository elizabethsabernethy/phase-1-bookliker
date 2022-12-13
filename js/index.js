document.addEventListener("DOMContentLoaded", function(){
    fetchBooks();
});

function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => loadBooks(books))
}

let displayBookInfo = document.getElementById('show-panel');

function loadBooks(books){
    let bookList = document.getElementById('list');
    
    books.forEach(book => {
        let bookItem = document.createElement('li');
        bookItem.innerHTML = book.title;

        bookItem.addEventListener('click', ()=>{
            displayBookInfo.textContent='';
           setTimeout(displayBooks(title, subtitle, author, thumbnail, description, userLikes, likeButton),1000);
        })
        
        let title = document.createElement('h1');
        title.innerHTML = book.title;

        let subtitle = document.createElement('h2');
            if(book.subtitle){
            subtitle.innerHTML = book.subtitle;
            }

        let author = document.createElement('h3');
        author.innerHTML = book.author;

        let thumbnail = document.createElement('img');
        thumbnail.src = book.img_url;

        let description = document.createElement('p');
        description.innerHTML = book.description;

        let likeButton = document.createElement('button');
        likeButton.innerHTML = 'LIKE BOOK';
        likeButton.addEventListener('click', ()=>{
            displayUsers(book, userLikes);
            likeButton.disabled = true;
            likeButton.innerHTML = "LIKED!"
        })

        let userLikes = document.createElement('ul');

        bookList.append(bookItem);
    });
}

function displayBooks(title, subtitle, author, thumbnail, description, userLikes, likeButton){
    displayBookInfo.append(title, subtitle, author, thumbnail, description, userLikes, likeButton);
}

function displayUsers(book, userLikes){

    const newUser = {
        id: 100, 
        username: "meeeeeeee"
    }
    const users = book.users;
    users.push(newUser);
    
    fetch(`http://localhost:3000/books/${book.id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify(book)
    })
    .then(resp => resp.json())
    .then(book => {
        const listOfUsers = book.users;
        listOfUsers.forEach(user =>{
            let liker = document.createElement('li');
            liker.innerHTML = user.username;
            userLikes.append(liker);
        })
    })
}