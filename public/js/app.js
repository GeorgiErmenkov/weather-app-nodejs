const weatherForm = document.querySelector('form')
const search = document.querySelector('form input')
const successMessage = document.querySelector('#success')
const weatherMessage = document.querySelector('#weather')
const errorMessage = document.querySelector('#error')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value
    const url = `/weather?address=${location}`

    weatherMessage.textContent = 'Loading...'
    errorMessage.textContent = null
    successMessage.textContent = null

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error
                weatherMessage.textContent = null
            } else {
                successMessage.textContent = data.location
                weatherMessage.textContent = data.forecast
            }
        })
    })
})
