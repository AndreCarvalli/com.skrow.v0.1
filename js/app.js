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
const milestone_select = document.getElementById('milestone-select');
let projectsData = [];


//Simulate User Log In
form.addEventListener(`submit`,(event)=>{
    event.preventDefault()
     const credentials = {
        username:event.target.username.value,
        password: event.target.password.value
     }
    
     if(!credentials.username == ""){
        project_card.style.display = "flex"
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
const API3 = `https://raw.githubusercontent.com/AndreCarvalli/com.skrow.v0.1/refs/heads/main/db.json`

//Fetch data from db.json endpoint
fetch(API3)
    .then(res => {
        if(!res.ok){
            throw new Error(`Request failed: ${res.status} ${res.statusText}`)
        }
        return res.json()
    })
    .then(data => {
            console.log(`json data: ${data}`);
            projectsData = data;
            populateMilestones(data);
            displayInfo(data);
    })
    .catch(error => console.log(error))   


// Display Data in HTML .... projects> milestones > tasks []

const projects_container = document.querySelector('#projects-container');

function displayInfo(data) {

    // Clear existing project cards
    projects_container.innerHTML = ''

    data.projects.forEach(project => {
        // Create project card
        projects_container.innerHTML += `
            <div class="single-card">

                <div class="title-section">
                    <h3>Project: ${project.title}</h3>
                    <p>Client: ${project.clientId}</p>
                    <p> Project Amount: ${project.currency} ${project.totalAmount}</p>
                    <p>Status: ${project.status}</p>
                </div>

                <div class="milestones" id="milestones-${project.id}"></div>
                <button class="btn-add-tasks" data-project-id="${project.id}"> Add Tasks </button>
            </div>
        `;

        // Get the milestone container for this project
        const project_card = projects_container.lastElementChild.querySelector('.milestones');
       
        // Loop through milestones
        project.milestones.forEach(milestone => {

            project_card.innerHTML += `
                <div class="milestone-item"  data-milestone-id="${milestone.id}">

                    <h5 class="milestone-name">${milestone.title}</h5>
                    <p> Milestone Amount: ${project.currency} ${milestone.amount}</p>

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
            `;

            // Get the task table belonging to this milestone
            const table_body = project_card.lastElementChild.querySelector('.tasks');

            // Loop through tasks
            milestone.tasks.forEach(task => {

                table_body.innerHTML += `
                    <tr>
                        <td>${task.title}</td>
                        <td>${task.developerName}</td>
                        <td>${project.currency} ${task.amount}</td>
                        <td>${task.status}</td>
                    </tr>
                `;
            });

        });

    });
}


const btn_add_tasks = document.querySelector('.btn-add-tasks')
const task_input_dialog = document.querySelector('#task-input-dialog')

btn_add_tasks.addEventListener(`click`,(event)=>{
    task_input_dialog.showModal()
})


// Populate Milestone options
function populateMilestones(data) {

    milestone_select.innerHTML = `
        <option value="">Select a milestone</option>
    `;

    data.projects.forEach(project => {
        project.milestones.forEach(milestone => {

            milestone_select.innerHTML += `
                <option value="${milestone.id}">
                    ${milestone.title}
                </option>
            `;
        });
    });
}


//POSTING TO A DB in a nested json file is a bit complex for me now

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