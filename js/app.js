const login_btn = document.querySelector("#login-btn")
const login_dialog = document.querySelector("#login")

// Element fetch
const project_name = document.querySelector('#project-name')
const client_name = document.querySelector('#client-name')
const project_amount = document.querySelector('#project-amount')
const milestone_name = document.querySelector('.milestone-name')

const milestones_container = document.querySelector('.milestones')


login_btn.addEventListener(`click`, (event) => {
    event.preventDefault()
    login_dialog.showModal() // Call the modal on button click
})

//Fetch data from db.json endpoint
document.addEventListener(`DOMContentLoaded`,(e)=>{
    fetch('http://localhost:4000/projects')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        displayInfo(data)
    })
    .catch(error => console.log(error))    
})

// Display data in html .... projects> milestones > tasks []
function displayInfo(data){
    // console.log(data[0].milestones[0].tasks);
    
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