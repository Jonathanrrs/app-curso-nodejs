const miFormulario = document.querySelector('form');

const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://restserver-node-jonathan.herokuapp.com/api/auth/'

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    /* obtenr campos de forms */
    for(let el of miFormulario.elements) {
        if(el.name.length > 0) {
            formData[el.name] = el.value;
        }
    }
   
    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(({msg, token}) => {
        if(msg) {
            return console.error(msg);
        }
        localStorage.setItem('token', token);
    })
    .catch(err => {
        console.log(err);
    }) 
    
});

function handleCredentialResponse(response) {

    /* no funciona con arrow function  */
    /* Google token : ID_TOKEN*/
    // console.log('id_token', response.credential);

    const body = { id_token: response.credential }

    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(({ token }) => {
            console.log(token);
            localStorage.setItem('token', token)
            location.reload();
        })
        .catch(console.warn)
}

/* Sign out de google */
const button = document.getElementById('google_signout');
button.onclick = () => {
    // console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('token'), done => {
        localStorage.clear();
        location.reload();
    })
}