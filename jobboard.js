Jobs = new Meteor.Collection('jobs');
Userdata=new Meteor.Collection('userdata');
Preview_Coll=new Meteor.Collection('preview');

Router.map(function(){

    this.route('jobboard',{path:'/'})
    this.route('postSubmit', {path: '/submit' });
    this.route('sample', {path:'/click/'});
    this.route('previewPage',
        {path:'/previewPage/:_id',
        data: function()
            {
                return Preview_Coll.findOne({_id: this.params._id});
            }
        });
});


if (Meteor.isClient) {
      
   /* Meteor.Router.add({
    '/submit': 'postSubmit',
    '/click':'sample',
    //'/display':'postDisplay'
    });*/

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
    
     Meteor.startup(function()
    {
        Deps.autorun(function() 
        {
            Meteor.subscribe('Jobs');
        });
    });
    
    
    Template.postSubmit.events({
        'click .formsubmit': function(event){
                var u_id=Meteor.userId();
                jobHeadline = $('input[name ="jobHeadline"]').val();
                
                jobtype = $('input[name ="jobtype"]:checked').val();
                
                category = $('input[name="category"]:checked').val();
                
                joblocation = $('input[name="location"]').val();
                
                relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
                
                jobdescription = $('#jobDescription').val();
                
                jobPerks = $('#jobPerks')[0].checked;
                if (jobPerks) {
                    perksDescription = $('#perksDescription').val();
                } else {
                    perksDescription = null;
                }
                requiredDetails = $('textarea[name="requiredDetails"]').val();
                companyName = $('input[name="companyName"]').val();
                companyURL = $('input[name="companyURL"]').val();
                companyEmail = $('input[name="companyEmail"]').val();
                jobCollaborators = $('input[name="jobCollaborators"]').val();
                recruiterOk = $('input[name="recruiterOk"]:checked').val();
                
                if(jobHeadline==="" || jobtype==="" || category==="" || joblocation==="" || relocationAssistanceAvailable=== "" || jobdescription=== "" || jobPerks==="" || requiredDetails==="" || companyURL==="" || companyName==="" || companyEmail==="")
                {
                    alert("you need to fill all the details")
                }
                else
                {
                //saving date
                var dat=new Date();
                var c_time=dat.getFullYear()+""+dat.getMonth()+""+dat.getDate()+""+dat.getHours()+""+dat.getMinutes()+""+dat.getSeconds()+""+dat.getMilliseconds(); 

                var ee=Jobs.insert({J_Headline:jobHeadline,J_Jobtype:jobtype,J_Category:category,
                             J_Location:joblocation,J_RelAssAvail:relocationAssistanceAvailable,
                             J_Description:jobdescription,J_Perksdesc:perksDescription,J_Reqdetails:requiredDetails,
                             J_Companyname : companyName, J_CompanyURL:companyURL, J_RecruiterOk:recruiterOk,createdAt:c_time,owner:u_id,version:1});  
                  alert(ee) ;
              }
            },
            'click .formpreview': function(event){
                var u_id=Meteor.userId();
                jobHeadline = $('input[name ="jobHeadline"]').val();
                
                jobtype = $('input[name ="jobtype"]:checked').val();
                
                category = $('input[name="category"]:checked').val();
                
                joblocation = $('input[name="location"]').val();
                
                relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
                
                jobdescription = $('#jobDescription').val();
                
                jobPerks = $('#jobPerks')[0].checked;
                if (jobPerks) {
                    perksDescription = $('#perksDescription').val();
                } else {
                    perksDescription = null;
                }
                requiredDetails = $('textarea[name="requiredDetails"]').val();
                companyName = $('input[name="companyName"]').val();
                companyURL = $('input[name="companyURL"]').val();
                companyEmail = $('input[name="companyEmail"]').val();
                jobCollaborators = $('input[name="jobCollaborators"]').val();
                recruiterOk = $('input[name="recruiterOk"]:checked').val();

                /*if(jobHeadline==="" || jobtype==="" || category==="" || joblocation==="" || relocationAssistanceAvailable=== "" || jobdescription=== "" || jobPerks==="" || requiredDetails==="" || companyURL==="" || companyName==="" || companyEmail==="")
                {
                    alert("you need to fill all the details")
                }
                else
                {*/
                //saving date
                var dat=new Date();
                var c_time=dat.getFullYear()+""+dat.getMonth()+""+dat.getDate()+""+dat.getHours()+""+dat.getMinutes()+""+dat.getSeconds()+""+dat.getMilliseconds(); 

                var ee=Preview_Coll.insert({J_Headline:jobHeadline,J_Jobtype:jobtype,J_Category:category,
                             J_Location:joblocation,J_RelAssAvail:relocationAssistanceAvailable,
                             J_Description:jobdescription,J_Perksdesc:perksDescription,J_Reqdetails:requiredDetails,
                             J_Companyname : companyName, J_CompanyURL:companyURL, J_RecruiterOk:recruiterOk,createdAt:c_time,owner:u_id,version:1});  
                  alert(ee);
                  Router.go('previewPage', {_id: ee});
                // }
            },
           
            'change #jobPerks': function(event){
                //$('#perksDescription').show();
                if($('#jobPerks')[0].checked){
                    $('#perksDescription').parent().show('slow');
                } else {
                    $('#perksDescription').parent().hide('slow');
                }
            }
        
        //Meteor.Router.to('postDisplay', display);
    });
    
    function preview(obj)
    {
        alert(obj.companyName);
    }

    Template.postSubmit.rendered = function(){
        $('#jobDescription').wysihtml5();
        $('#perksDescription').wysihtml5();
    };
    
    Template.postDisplay.posts = function(){

        return Jobs.find({});
    }

    Template.postDisplay.helpers({
        Job:function(){
            return Jobs.find({});
        }

    })
    
    
    
      ;    
}


if (Meteor.isServer) {
   
     Meteor.publish("Jobs", function (){
        return Jobs.find({});
    });
     Jobs.allow
     ({
        insert: function(UserId, Jobs)
        {
               return true;
        }
            
     });
      Preview_Coll.allow
     ({
        insert: function(UserId, Jobs)
        {
               return true;
        }
            
     });
}
