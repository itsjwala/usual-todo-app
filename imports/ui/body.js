import "./body.html";
import "./body.css"
import { Template } from "meteor/templating";
import { Todos } from "../api/db";

Template.heading.events({
    'click div > h1 > i.fa-plus':function(e){
        $("#todoText").slideToggle(200)
    }
})

Template.AddTodo.events({

    'keypress #todoText':function(e){
        // "till the key pressed is enter"
        if (event.which === 13) {            
            var todoText = $(e.target).val();
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

    'click li span.content':function(e){
        var spanContent =$(e.target);
        spanContent.toggleClass("completed")
        var li=spanContent.parent()[0];
        var todo=Todos.findOne({_id:li.id})
        if(todo !== undefined)
        Todos.update({_id:li.id},{$set:{done:!todo.done}});
    }
})

Template.Todos.events({
    'click span.delete': function (e) {
        var li = $(e.target).parent();
        _id=li[0].id;
        li.fadeOut(500, function () {
            li.remove();
            Todos.remove({_id});
        });
        
        e.stopPropagation();
    },
    'click span.delete i': function (e) {
        var li = $(e.target).parent().parent();
        _id=li[0].id;
        li.fadeOut(500, function () {
            li.remove();
            Todos.remove({_id});
        });
        e.stopPropagation();
    }
})
