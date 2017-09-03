var express=require("express");
var morgan=require("morgan");
var bodyParser= require("body-parser");
var todo_db=require("./seed.js");
var app= express();
console.log("server running at 3000 port");
console.log(todo_db);
app.use("/",bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use("/",express.static(__dirname+"/public"));
app.get("/api/todos",function(req,res){
    res.json(todo_db.todos);
});
//app.get("")
app.delete("/api/todos/:id", function (req,res) {
    var del_id=req.params.id;
    //console.log(del_id);
    var todo=todo_db.todos[del_id];
    console.log(todo);
    if(!todo)
    {
        res.status(400).json({error: "todo does not exist"});
    }
    else
    {
        todo.status=todo_db.statusENUMS.DELETED;
        res.json(todo_db.todos);
    }

});
app.post("/api/todos",function (req,res) {
    var title=req.body.todo_title;
    console.log("hey"+title);
    if(!title || title=="" || title.trim()=="")
    {
        res.status(400).json({error: "todo title cant b empty"});
    }
    else
    {
        var new_todo_obj={
            title: req.body.todo_title,
            status: todo_db.statusENUMS.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id++]=new_todo_obj;
        res.json(todo_db.todos);
    }

});
app.put("/api/todos/:id",function (req,res) {
    var mod_id=req.params.id;
    var todo=todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"todo cant modify that does not exist"});
    }
    else
    {
        var todo_title=req.body.todo_title;
        if(todo_title && todo_title!="" && todo_title.trim()!="")
        {
            todo.title=todo_title;
        }
        var todo_status=req.body.todo_status;
        if(todo_status &&(todo_status==todo_db.statusENUMS.ACTIVE || todo_status==todo_db.statusENUMS.COMPLETE))
        {
            todo.status=todo_status;
        }
        res.json(todo_db.todos);
    }
});
app.listen(4000);