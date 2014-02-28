Jobs = new Meteor.Collection("jobs");
Userdata = new Meteor.Collection("Userdata");

if (Meteor.isClient) {
      
    Meteor.Router.add({
    '/submit': 'postSubmit',
    '/click':'sample',
    //'/display':'postDisplay'
    });

    Template.sample.events({
        "click button.clickeve": function (){
       var e_value = $('input[name = "exampleInputEmail1"]').val();
       var e_name = $('input[name = "exampleInputName"]').val();
        Userdata.insert({
            email : e_value,
            name : e_name  
            });

       } 

    });
    

    /*Template.sample.events({'click button.clickeve' : function(){
        'click button.clickeve'();
        event.preventDefault();
    }
    });*/
    Template.temp.list_item = function(){
        return Userdata.find();
    }
    
        Meteor.subscribe("Userdata");
        return Userdata.find().fetch();
     console.log("hi");    
}
if (Meteor.isServer) {
    Meteor.publish("Userdata", function() {
        return Userdata.find();/*({admin: this.userId}, {fields: {email: 1}});*/
    });
}
