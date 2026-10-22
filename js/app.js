const login_btn = document.querySelector("#login-btn")
const login_dialog = document.querySelector("#login")

login_btn.addEventListener(`click`, (event) => {
    event.preventDefault()
    login_dialog.showModal() // Call the modal on button click
})

document.addEventListener(`DOMContentLoaded`,(e)=>{
    fetch('http://localhost:4000/projects')
    .then(res => res.json())
    .then(data => console.log(data))    
})

