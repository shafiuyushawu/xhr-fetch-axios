const getBtn = document.getElementById('get-btn')
const postBtn = document.getElementById('post-btn')

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? { 'Content-Type': 'application/json' } : {}
    })
        .then(response => {
            if (response.status >= 400) {
                return response.json()
                    .then(errResData => {
                        const error = new Error('Something went wrong!')
                        error.data = errResData;
                        throw error;
                    })
            }
            return response.json()
        })
}

const getData = () => {
    sendHttpRequest('GET', 'https://reqres.in/api/users')
        .then(responseData => {
            console.log(responseData)
        })

};

const postData = () => {
    sendHttpRequest('POST', 'https://reqres.in/api/register', {
        email: 'eve.hollt@reqres.in',
        password: 'pistol'
    })
        .then(response => console.log(response))
        .catch(err => {
            console.log(err)
        })
}


getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)