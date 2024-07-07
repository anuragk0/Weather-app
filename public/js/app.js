console.log('Client side javascript is on')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value
    const address = '/3000/weather?address=' + location

    message1.textContent = "Loading..."
    message2.textContent = ''
    fetch(address).then((response) =>{
        response.json().then((data) =>{
            if (data.Error){
                message1.textContent = data.Error
            }
            else{
                message1.textContent = data.City
                message2.textContent = data.forecast
            }
        })
    })
})
