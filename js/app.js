const login_dialog = document.querySelector("#login")
const btn_login =document.querySelector("#login-btn")

// Element fetch
const project_name = document.querySelector('#project-name')
const client_name = document.querySelector('#client-name')
const project_amount = document.querySelector('#project-amount')
const milestone_name = document.querySelector('.milestone-name')
const project_card = document.querySelector('.project-card')
const project_login_prompt = document.querySelector('.project-login-prompt ')

const milestones_container = document.querySelector('.milestones')
const form = document.querySelector('#login-form')


//Simulate User Log In
form.addEventListener(`submit`,(event)=>{
    event.preventDefault()
     const credentials = {
        username:event.target.username.value,
        password: event.target.password.value
     }
    
     if(!credentials.username == ""){
        console.log(credentials);
        project_card.style.display = "block"
        project_login_prompt.style.display ="none"
        login_dialog.close()
     }
})

function closeDialog(){
    login_dialog.close()
}

btn_login.addEventListener(`click`, ()=> {
    login_dialog.showModal()    
})



const API = `http://localhost:4000/projects`
const API2 = `https://andrecarvalli.github.io/com.skrow.v0.1/db.json`
const API3 = 'https://raw.githubusercontent.com/AndreCarvalli/com.skrow.v0.1/refs/heads/main/db.json'

//Fetch data from db.json endpoint
document.addEventListener(`DOMContentLoaded`, (e) => {
    fetch('https://andrecarvalli.github.io/com.skrow.v0.1/db.json')
    .then(res => {
        if(!res.ok){
            throw new Error(`Request failed: ${res.status} ${res.statusText}`)
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        displayInfo(data)
    })
    .catch(error => console.log(error))    
})

// Display Data in HTML .... projects> milestones > tasks []
function displayInfo(data){
    
    data.forEach(element => {
            project_name.textContent = `Project : ${element.title}`
            client_name.textContent = `Client : ${element.clientId}`
            project_amount.textContent = `Project Amount : ${element.currency} ${element.totalAmount}`

            console.log(element.milestones);
            
            //Iterating through milestones
            element.milestones.forEach(item => { 
                milestones_container.innerHTML += `
                    <div>
                        <h5 class="milestone-name">${item.title}</h5>
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Task title</th>
                                    <th>Developer Name</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody class="tasks"></tbody>
                        </table>
                    </div>
                `

                const table_body = milestones_container.lastElementChild.querySelector('.tasks')
                item.tasks.forEach(task => {
                
                    table_body.innerHTML += `
                         <tr>
                            <td>${task.title}</td>
                            <td>${task.developerName}</td>
                            <td>${task.amount}</td>
                            <td>${task.status}</td>
                        </tr>
                `
                }) 
            })
    });
}

//Adding a project to our code 
// document.addEventListener(`DOMContentLoaded`,(e)=>{
//     e.preventDefault()
//     fetch('http://localhost:4000/projects', {
//         method: 'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
        
//         })
//     })
//     .then(res=> res.json())
//     .then(data => console.log(data))
// })