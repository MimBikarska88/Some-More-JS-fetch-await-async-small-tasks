function attachEvents() {
    let ul = document.querySelector('#phonebook');
    let loadBtn = document.querySelector('#btnLoad');
    let person = document.querySelector('#person');
    let phone = document.querySelector('#phone');
    let createBtn = document.querySelector('#btnCreate');

    createBtn.addEventListener('click', () => {
        let personName = person.value;
        let personPhone = phone.value;

        let info = {
            person: personName,
            phone: personPhone
        };
        const url = 'http://localhost:3030/jsonstore/phonebook';
        fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            })
            .then(response => response.json())
    })
    loadBtn.addEventListener('click', () => {
        ul.innerHTML = '';
        const url = 'http://localhost:3030/jsonstore/phonebook';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                Object.values(data).forEach((contact) => {
                    let li = document.createElement('li');
                    let text = document.createTextNode(`${contact.person}:${contact.phone}`);
                    li.appendChild(text);
                    let button = document.createElement('button');
                    button.textContent = 'Delete';
                    button.addEventListener('click', () => {
                        const delUrl = `http://localhost:3030/jsonstore/phonebook/${contact._id}`;
                        fetch(delUrl, {
                                method: 'delete'
                            })
                            .then(res => res.json())
                            .then(data => console.log(data));
                    })
                    li.appendChild(button);
                    ul.appendChild(li);
                });
            });
    })

}

attachEvents();