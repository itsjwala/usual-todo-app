import "./body.html";
import "./body.css"
import { Template } from "meteor/templating";
import { Todos } from "../api/db";
const inputTodo = $("input[type='text']");

Template.heading.events({
    'click div > h1 > i.fa-plus':function(e){
        $("input[type='text']").slideToggle(300)
    }
})
Template.AddTodo.helpers({
    add(todo){
    Todos.insert({todo})           
    }
}) 
Template.AddTodo.events({

    'keypress input[type="text"]':function(e){
        console.log(e)
        "till the key pressed is enter"
        if (event.which === 13) {
            var todoText = inputTodo.val();
            inputTodo.val("");
            add(todoText);
        }
    }
})
Template.ListTodos.helpers({

    read() {
        return Todos.find({});
    }

})
Template.ListTodos.onCreated(function(){
    console.log(this)
})
Template.ListTodos.events({

'click ul > li':function(e){
$(e.target).toggleClass("completed")

},
'click ul span':function(e){
    $(e.target).parent().fadeOut(500, function () {
        $(this).remove();
    });
    e.stopPropagation();
}
})


