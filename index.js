const fs = require('fs');
const readTasks = ()=>{
    if (fs.existsSync('tasks.json')) {
        const data = fs.readFileSync('tasks.json', "utf8");
        if(data.length!==0) return JSON.parse(data);
    }
    return [];
}
const writeTask = (tasks)=>{
    fs.writeFileSync('tasks.json', JSON.stringify(tasks, null,2), "utf-8");
}
const addTask = (description)=>{
    const tasks = readTasks();
    const newTask = {
        id:tasks.length,
        description:description,
        status:"todo",
        createdAt:new Date().toUTCString(),
        updatedAt:new Date().toUTCString()
    }
    tasks.push(newTask);
    writeTask(tasks);
}
const updateTask = (id, description)=>{
    const tasks = readTasks();
    tasks.forEach((task)=>{
        if(task.id==id){
            task.description=description;
            task.updatedAt=new Date().toUTCString();
        }
    })
    writeTask(tasks);
}
const deleteTask = (id)=>{
    const tasks = readTasks();
    const newTasks = tasks.filter((task)=>{
        return task.id!=id
    })
    writeTask(newTasks);
}
const markInProgress = (id)=>{
    const tasks = readTasks();
    tasks.forEach((task)=>{
        if(task.id==id) task.status = "In progress"
    })
    writeTask(tasks);
}
const done = (id)=>{
    const tasks = readTasks();
    tasks.forEach((task)=>{
        if(task.id==id) task.status = "Done"
    })
    writeTask(tasks);
}
const args = process.argv.slice(2);
if(args.includes("add")){
    addTask(args[args.length-1])
}
else if(args.includes("list")){
    console.log(readTasks())
}
else if(args.includes("update")){
    updateTask(args[1], args[args.length-1])
}
else if(args.includes("delete")){
    deleteTask(args[1])
}
else if(args.includes("mark-in-progress")){
    markInProgress(args[1]);
}
else if(args.includes("done")){
    done(args[1]);
}
else if(args.includes("list-done")){
    tasks = readTasks();
    doneTasks = tasks.filter((task)=>{
        return task.status==='Done'
    })
    console.log(doneTasks)
}
else if(args.includes("list-inProgress")){
    tasks = readTasks();
    inProgress = tasks.filter((task)=>{
        return task.status==='In progress'
    })
    console.log(inProgress)
}


