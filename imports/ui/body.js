import "./body.html";
import "./body.css"
import { Template } from "meteor/templating";
import { Todos } from "../api/db";

Template.heading.events({
    'click div > h1 > i.fa-plus':function(e){
        $("#todoText").slideToggle(300)
    }
})
Template.AddTodo.helpers({

}) 
Template.AddTodo.events({

    'keypress #todoText':function(e){
        // "till the key pressed is enter"
        if (event.which === 13) {
            
            var todoText = $(e.target).val();
            console.log(todoText)
            $(e.target).val("");
            
            Todos.insert({task:todoText,done:false,createdOn:Date()})
        }
    }
})
Template.ListTodos.helpers({

    read() {
        return Todos.find({},{sort:{createdOn:-1}})
    }

})

Template.ListTodos.events({

'click ul > li':function(e){

$(e.target).toggleClass("completed")

},
'click ul li span':function(e){
    $(e.target).parent().fadeOut(500, function () {
        $(this).remove();
    });
    e.stopPropagation();
}
})

Template.Todos.onCreated(function(){
    console.log("ef")
})

