window.addEventListener('load', solution);

function createStudentRow() {
    let tr = document.createElement('tr');
    for (let i = 0; i < arguments.length; ++i) {
        let td = document.createElement('td');
        td.textContent = arguments[i];
        tr.appendChild(td);
    }
    return tr;
}

function solution() {
    const url = 'http://localhost:3030/jsonstore/collections/students';
    let form = document.querySelector('#form');
    let tableBody = document.querySelector('#results tbody');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let formData = new FormData(form);
        let firstName = formData.get('firstName');
        let lastName = formData.get('lastName');
        let number = formData.get('facultyNumber');
        let grade = formData.get('grade');
        if (firstName.trim != '' && lastName.trim() != '' && number.trim != '' && !isNaN(grade)) {
            let person = {
                firstName: firstName,
                lastName: lastName,
                facultyNumber: number,
                grade: Number(grade)
            };
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(person)
            })
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    tableBody.innerHTML = '';
                    for (const student of Object.values(data)) {
                        tableBody.appendChild(createStudentRow(student.firstName, student.lastName, student.facultyNumber, student.grade));
                    }
                })
        }
    })
}