let form = document.querySelector('form');


let table = document.querySelector('table tbody');
let loadBtn = document.querySelector('#loadBooks');
const url = 'http://localhost:3030/jsonstore/collections/books';
const urlBookId = 'http://localhost:3030/jsonstore/collections/books/:id'


const deleteBook = async(event) => {
    let bookId = event.target.value;
    let res = await fetch(urlBookId.replace(':id', bookId), {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!res.ok) {
        console.log(re);
    }
    let data = await res.json();
    console.log(data);
}
const editBook = (event) => {
    let rowData = Array.from(event.target.parentElement.parentElement.querySelectorAll('td'));
    let title = rowData[1].innerHTML;
    let author = rowData[0].innerHTML;
    let formData = new FormData(form);
    formData.set('author', author);
    formData.set('title', title);
    form.querySelector('button').setAttribute('bookId', event.target.value);

}
const createRowData = (author, title, id) => {
    let tr = document.createElement('tr');
    let tdTitle = document.createElement('td');
    tdTitle.textContent = title;
    tr.appendChild(tdTitle);

    let tdAuthor = document.createElement('td');
    tdAuthor.textContent = author;
    tr.appendChild(tdAuthor);

    let tdButtons = document.createElement('td');
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.value = id;
    editBtn.addEventListener('click', editBook);

    let deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', deleteBook);
    deleteBtn.textContent = 'Delete';
    deleteBtn.value = id;

    tdButtons.appendChild(editBtn);
    tdButtons.appendChild(deleteBtn);
    tr.appendChild(tdButtons);
    return tr;

}
const loadBooks = async(event) => {
    try {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(err);
        }
        let data = await res.json();
        table.innerHTML = '';
        for (const [key, value] of Object.entries(data)) {
            table.appendChild(createRowData(value.title, value.author, key));
        }
    } catch (err) {
        console.log(err);
    }

}
const createBook = async(event) => {
    event.preventDefault();
    method = 'post';
    currentUrl = url;
    if (form.querySelector('button').hasAttribute('bookId')) {
        let bookId = form.querySelector('button').getAttribute('bookId');
        currentUrl = urlBookId.replace(':id', bookId);
        form.querySelector('button').removeAttribute('bookId');
        method = 'put';
    }
    let formData = new FormData(form);
    let title = formData.get('title');
    let author = formData.get('author');
    formData.append('title', '');
    formData.append('author', '');

    if (title.trim() === '' || author.trim() === '') {
        return;
    }
    let book = {
        author: author,
        title: title
    }
    try {
        let res = await fetch(currentUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!res.ok) {
            throw new Error(res);
        }
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }


}
loadBtn.addEventListener('click', loadBooks);
form.addEventListener('submit', createBook);