function attachEvents() {
    let chatMessages = document.querySelector('#messages');
    let submitButton = document.querySelector('#submit');
    let refreshButton = document.querySelector('#refresh');
    let author = document.querySelector("input[name='author']");
    let content = document.querySelector("input[name='content']");
    const url = 'http://localhost:3030/jsonstore/messenger';

    submitButton.addEventListener('click', () => {

        let authorValue = author.value;
        let contentValue = content.value;

        let body = {
            author: authorValue,
            content: contentValue
        }
        fetch(url, {
                method: 'post',
                body: JSON.stringify(body)
            })
            .then(res => res.json());
    })
    refreshButton.addEventListener('click', () => {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                chatMessages.value = '';
                Object.values(data).forEach(message => {
                    chatMessages.value += `${message.author}: ${message.content}\n`;
                })
            });
    })
}

attachEvents();