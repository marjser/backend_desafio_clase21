

const form = document.getElementById('logOutForm')

form.addEventListener('submit', e=> {
    e.preventDefault()

    const fetchParams = {
        url: '/products',
        headers: {
            'Content-type': 'application/json',
        },
        method: 'POST',
    }
    
    
    fetch(fetchParams.url, {
        headers: fetchParams.headers,
        method: fetchParams.method,
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.url) {
            window.location.href = data.url;
        }
    })
    .catch(error => console.log(error))
})