
const form = document.getElementById('loginForm')

form.addEventListener('submit', e=> {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => obj[key] = value)

    console.log(obj)

    const fetchParams = {
        url: '/auth/login',
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj),
    }
    
    
    fetch(fetchParams.url, {
        headers: fetchParams.headers,
        method: fetchParams.method,
        body: fetchParams.body,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.url) {
            window.location.href = data.url;
        }
        if (data.status === 'error') {
            alert('El usuario o la contraseña son incorrectos')
        }
    })
    .catch(error => console.log(error))
})
