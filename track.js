const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

let tasks=JSON.parse(localStorage.getItem("tasks"))||[]
let data=JSON.parse(localStorage.getItem("data"))||{}
let streak=JSON.parse(localStorage.getItem("streak"))||0

const tableHead=document.querySelector("thead tr")
const body=document.getElementById("tableBody")
const taskScoreRow=document.getElementById("taskScoreRow")

function buildTable(){

tableHead.innerHTML="<th>Day</th>"
taskScoreRow.innerHTML="<th>Task %</th>"
body.innerHTML=""

tasks.forEach((task,i)=>{

let th=document.createElement("th")
th.textContent=task
tableHead.appendChild(th)

let td=document.createElement("td")
td.id="score"+i
taskScoreRow.appendChild(td)

})

days.forEach(day=>{

let tr=document.createElement("tr")
let th=document.createElement("th")
th.textContent=day
tr.appendChild(th)

tasks.forEach((task,i)=>{

let td=document.createElement("td")

let box=document.createElement("input")
box.type="checkbox"

let key=day+i

box.checked=data[key]||false

box.addEventListener("change",()=>{
data[key]=box.checked
save()
updateScores()
})

td.appendChild(box)
tr.appendChild(td)

})

body.appendChild(tr)

})

updateScores()

}

function addTask(){

let input=document.getElementById("taskInput")
let task=input.value.trim()

if(!task) return

tasks.push(task)
input.value=""

save()
buildTable()

}

function updateScores(){

let total=days.length*tasks.length
let done=0

tasks.forEach((t,i)=>{

let count=0

days.forEach(d=>{
if(data[d+i]) count++
})

done+=count

let percent=Math.round((count/7)*100)
document.getElementById("score"+i).textContent=percent+"%"

})

let weekly=total?Math.round((done/total)*100):0

document.getElementById("weeklyScore").textContent=weekly+"%"
document.getElementById("progressFill").style.width=weekly+"%"

if(weekly==100){
streak++
}

document.getElementById("streak").textContent=streak+" Day Streak"

save()

}

function aiInsight(){

let score=parseInt(document.getElementById("weeklyScore").textContent)

let text=""

if(score<30)
text="Your productivity is low. Focus on completing 3 key tasks daily."

else if(score<60)
text="Moderate productivity. Try time-blocking tasks."

else if(score<90)
text="Good performance. Maintain consistency."

else
text="Excellent productivity. Keep the streak going!"

document.getElementById("aiInsight").textContent=text

}

function resetWeek(){

if(confirm("Reset week?")){
data={}
save()
buildTable()
}

}

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks))
localStorage.setItem("data",JSON.stringify(data))
localStorage.setItem("streak",JSON.stringify(streak))
}

document.getElementById("themeBtn").onclick=()=>{
document.body.classList.toggle("light")
}

buildTable()