var statusENUMS={
    ACTIVE: "ACTIVE",
    COMPLETE: "COMPLETE",
    DELETED: "DELETED"
}
var todos={
    1: {title: "learn javascript", status: statusENUMS.ACTIVE},
    2: {title: "gittutorial", status: statusENUMS.ACTIVE},
    3: {title: "Interactive git", status: statusENUMS.ACTIVE}
}

var next_todo_id=1;
module.exports={
    statusENUMS: statusENUMS,
    todos :todos,
    next_todo_id: next_todo_id
}