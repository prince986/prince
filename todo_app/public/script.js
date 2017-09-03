const RESPONSE_DONE=4;
const STATUS_OK=200;
const TODOS_LIST_ID="todos_list_div";
const COMPLETE_LIST_ID="complete_list";
const DELETED_LIST_ID="deleted_list";
const NEW_TODO_INPUT_ID="new_todo_input";
Window.onload=gettodoajax();
function add_todo_elements(id,complete_id,deleted_id,todos_data_jason) {
    //console.log(id);
    //console.log(COMPLETE_LIST_ID);
        //console.log("bc");
        var parent=document.getElementById(id);
        parent.innerHTML="";

        var parent_complete=document.getElementById(complete_id);
        parent_complete.innerHTML="";

        var parent_deleted=document.getElementById(deleted_id);
        parent_deleted.innerHTML="";
    var todos=JSON.parse(todos_data_jason);

    if(parent || parent_complete || parent_deleted)
    {

        Object.keys(todos).forEach(
            function (key) {
                  if(todos[key].status=="ACTIVE" ) {
                      //var todo_element = createTodoElement(key, todos[key]);
                      //console.log(todo_element);
                      var todo_element=document.createElement("div");
                      //todo_element.innerText=todo_object.title;
                      var label=document.createTextNode(todos[key].title);
                      //var label=document.createElement("div");
                      //label.innerText=todos[key].title;
                      var check = document.createElement("INPUT");
                      check.setAttribute("type","checkbox");
                      //check.setAttribute("id","completecb");


                      todo_element.setAttribute("data-id",key);
                      todo_element.setAttribute("class","todoStatus"+todos[key].status);
                      //todo_element.createStyleSheet("./public/styles.css");
                      check.setAttribute("onchange","completeTodoAJAX("+key+")");
                      var delete_button=document.createElement("button");
                      delete_button.innerText="x";
                      delete_button.setAttribute("class","breathHorizontal");
                      //delete_button.backgroundColor="red";
                      delete_button.setAttribute("onclick","deleteTodoAJAX("+key+")");
                      todo_element.appendChild(check);
                      todo_element.appendChild(label);
                      todo_element.appendChild(delete_button);
                      parent.appendChild(todo_element);
                  }
                   if(todos[key].status=="COMPLETE" ) {
                      //var todo_element = createTodoElement(key, todos[key]);
                      //console.log(todo_element);
                      var todo_element=document.createElement("div");
                      //todo_element.innerText=todos[key].title;
                      //var node=document.createTextNode(todo_object.title);
                      //var label=document.createElement("div");
                      //label.innerText=todos[key].title;
                       var label=document.createTextNode(todos[key].title);
                       var check = document.createElement("INPUT");
                       check.setAttribute("type","checkbox");
                       todo_element.setAttribute("data-id",key);
                       todo_element.setAttribute("class","todoStatus"+todos[key].status);
                       //todo_element.createStyleSheet("./public/styles.css");
                       check.setAttribute("onchange","ActiveTodoAJAX("+key+")");
                      var delete_button=document.createElement("button");
                      delete_button.innerText="x";
                       todo_element.setAttribute("class","todoStatus"+todos[key].status);
                      //delete_button.backgroundColor="red";
                      delete_button.setAttribute("onclick","deleteTodoAJAX("+key+")");
                      delete_button.setAttribute("class","breathHorizontal");
                       todo_element.appendChild(check);
                      todo_element.appendChild(label);
                      todo_element.appendChild(delete_button);
                      parent_complete.appendChild(todo_element);
                  }
                  if(todos[key].status=="DELETED")
                  {
                      var todo_element=document.createElement("div");
                      var label=document.createElement("div");
                      label.innerText=todos[key].title;
                      todo_element.setAttribute("class","todoStatus"+todos[key].status);
                      //delete_button.setAttribute("onclick","deleteTodoAJAX("+key+")");
                      todo_element.appendChild(label);
                      parent_deleted.appendChild(todo_element);

                  }
                //parent.innerHTML="";
            }
        )

    }
    //parent.innerText = todos_data_jason;
}

function gettodoajax() {

    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function () {
        if(xhr.readyState==RESPONSE_DONE){
            //status code==200
            if(xhr.status==STATUS_OK){
                //console.log("hello prince");
                console.log(xhr.responseText);
                add_todo_elements(TODOS_LIST_ID,COMPLETE_LIST_ID,DELETED_LIST_ID,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    console.log(title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //read format of x-w-f-u-e
    //lookup encode url
    var data = "todo_title=" + encodeURI(title);
    console.log(data);

    //xhr.send(data = params);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            //status code==200
            if (xhr.status == STATUS_OK) {
                document.getElementById('new_todo_input').value='';
                add_todo_elements(TODOS_LIST_ID,COMPLETE_LIST_ID,DELETED_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function completeTodoAJAX(id){
    // make a ajax request to update todo with abov id
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    data="todo_status=COMPLETE";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            //status code==200
            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID,COMPLETE_LIST_ID,DELETED_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function ActiveTodoAJAX(id){
    // make a ajax request to update todo with abov id
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    data="todo_status=ACTIVE";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE){
            //status code==200
            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID,COMPLETE_LIST_ID,DELETED_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function deleteTodoAJAX(id) {
    var xhr=new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    data="todo_status=DELETED";
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            //status code==200
            if (xhr.status == STATUS_OK) {
                add_todo_elements(TODOS_LIST_ID,COMPLETE_LIST_ID,DELETED_LIST_ID, xhr.responseText);
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function hidedata(id) {
    //console.log("hide ho ja yrr");
    //console.log(typeof id);
    //parent.
    if(id=="A")
    {
        var hide=document.getElementById("todos_list_div");
        if (hide.style.display === 'none') {
            hide.style.display = 'block';
            document.getElementById("A").value="HideActive";
        } else {
            hide.style.display = 'none';
            document.getElementById("A").value="UnHideActive";
        }
       /* var elem = document.getElementById("id");
        if (elem.value=="HideActive") elem.value = "UnhideActive";
        else elem.value = "HideActive";*/

    }
    if(id=="C")
    {
        var hide=document.getElementById("complete_list");
        if (hide.style.display === 'none') {
            hide.style.display = 'block';
            //document.getElementById("id")
            document.getElementById("C").value="HideComplete";
        } else {
            hide.style.display = 'none';
            document.getElementById("C").value="UnHideComplete";
        }

    }
    if(id=="D")
    {
        var hide=document.getElementById("deleted_list");
        if (hide.style.display === 'none') {
            hide.style.display = 'block';
            //document.getElementById("id")
            document.getElementById("D").value="HideDeleted";
        } else {
            hide.style.display = 'none';
            document.getElementById("D").value="UnHideDeleted";
        }

    }


    
}