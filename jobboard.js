Userdata = new Meteor.Collection('Userdata');


if (Meteor.isClient) {
/*Template.dataPage.helpers({
    data: function() {
    return data.find({}, {sort: {submitted: -1}});
    }
});*/
      
Meteor.Router.add({
'/submit': 'postSubmit',
'/click':'sample',
'data':'dataPage'
});

Template.sample.events({
    "click button.clickeve": function (){
    console.log("event fired");
   var e_value=document.getElementById("exampleInputEmail1").value;
   var pwd = document.getElementByID("exampleInputPassword1").value
    Userdata.insert({
        email : e_value,
        password : pwd              
          //password: template.find(".password").val()
    });
  } 
    /*Meteor.Router.to('dataPage', data);
    }*/
});

/*Template.postItem.helpers({
    headline: function(){
        var a = this.heading;
        return a;
    }
});*/
/*Template.postSubmit.events({
    'submit form': function(event){
        event.preventDefault();
        
            var post = {
                Headline: $(event.target).find('[name = Headline]').val(),
                Type: $(event.target).find('[name = Type]').val(),
                Category: $(event.target).find('[name = Category]').val(),
                Location: $(event.target).find('[name = Location]').val(),
                Description: $(event.target).find('[name = Description]').val(),
                
            }
        
            Meteor.Router.to('/',post);    
        }
    });*/
    
/*Template.postSubmit.helpers({
    currentPost: function() {
    return Posts.findOne(Session.get('currentPostId'));
    }   
});  

Template.postsList.helpers({
    posts: function() {
    return Posts.find();
    }
}); */ 
    
Meteor.subscribe('Userdata');    
}




if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
Meteor.publish('Userdata', function() {
    return Userdata.find();
}); 
 
}
