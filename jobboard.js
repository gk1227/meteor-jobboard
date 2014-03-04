Jobs = new Meteor.Collection('jobs');
Userdata=new Meteor.Collection('userdata');
Job_Data=new Meteor.Collection('jobdata');




Router.map(function(){

    this.route('jobboard',{path:'/'})
    this.route('postSubmit', {path: '/submit' });
    this.route('editPosts', {path:'/editPosts/'});
    this.route('editJob',{path:'/editJob/:_id',
            data:  function(){
                
                return Jobs.findOne({_id:this.params._id});
    }
    })
    this.route('jobPage',
        {path:'/jobPage/:_id',
        data:  function(){
                
                return Jobs.findOne({_id:this.params._id});
    }
        });
});


if (Meteor.isClient) {
      
    Meteor.startup(function()
    {
        Session.set("start",0);
        Session.set("end",20);
        Deps.autorun(function() 
        {
            Meteor.subscribe('Jobs');
        });
    });
    
    
    Template.postSubmit.events({
        'click .formsubmit': function(event){
            if(Meteor.user())
            {
                var u_id=Meteor.userId();
                jobHeadline = $('input[name ="jobHeadline"]').val();
                
                jobtype = $('input[name ="jobtype"]:checked').val();
                
                category = $('input[name="category"]:checked').val();
                
                joblocation = $('input[name="location"]').val();
                
                relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
                
                jobdescription = $('#Description').val();
                console.log(jobdescription);
                
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
                Jobs.insert({J_Headline:jobHeadline,J_Jobtype:jobtype,J_Category:category,
                             J_Location:joblocation,J_RelAssAvail:relocationAssistanceAvailable,
                             J_Description:jobdescription,J_Perksdesc:perksDescription,J_Reqdetails:requiredDetails,
                             J_Companyname: companyName, J_CompanyURL:companyURL,J_CompanyEmail:companyEmail, 
                             J_Collaborators:jobCollaborators,J_RecruiterOk:recruiterOk,createdAt:dat,owner:u_id,version:1},function(e,r)
                             {
                                alert(r);
                                Router.go('jobPage', {_id: r});
                             });  
                  
              }
          }
          else
          {
            alert("login to post the Job")
          }
        },
        'click .formpreview': function(event){
                    console.log("before plugin");
                    $('#myform').previewForm();
                    
        },
           
        'change #jobPerks': function(event){
            //$('#perksDescription').show();
            if($('#jobPerks')[0].checked){
                $('#perksDescription').parent().show('slow');
            } else {
                $('#perksDescription').parent().hide('slow');
                    }
            }
        
        
    });
    
    Template.editPosts.helpers({
        'posts':function(){
            return Jobs.find({owner:Meteor.userId()},{sort: {createdAt: -1}})
        }
    });


    Template.postSubmit.rendered = function(){
        $('#jobDescription').wysihtml5();
        $('#perksDescription').wysihtml5();
    };
   
   

   Template.postDisplay.events({
    'click #nextButton':function(){
        var start=Session.get("start")+20;
        var end=Session.get("end");
        var len=Session.get("length");
        if(end>=len)
        {
            alert("This is the last page");
        }
        else
        {
            end=end+20;
            Session.set("start",start);
            Session.set("end",end); 
        }
    },
    'click #prevButton':function(){
        var start=Session.get("start");
        if(start<20)
        {
            alert("This is the First Page")
        }
        else
        {
            start=start-20;
            var end=Session.get("end")-20;
            Session.set("start",start);
            Session.set("end",end);
        }
         
    }
   });

    
    Template.postDisplay.helpers({
        Job:function(){
           var jobs= Jobs.find({},{sort: {createdAt: -1}}).fetch();
           Session.set("length",jobs.length);
            var start=Session.get("start");
            var end=Session.get("end");
           return jobs.slice(start,end);
        }

    });  
    Template.editJob.events({
        'click .formsubmit': function(event){
            if(Meteor.user())
            {
                console.log(this._id);
                var u_id=Meteor.userId();
                jobHeadline = $('input[name ="jobHeadline"]').val();
                
                jobtype = $('input[name ="jobtype"]:checked').val();
                
                category = $('input[name="category"]:checked').val();
                
                joblocation = $('input[name="location"]').val();
                
                relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
                
                jobdescription = $('#Description').val();
                console.log(jobdescription);
                
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
                Jobs.update({_id:this._id},{$set:{J_Headline:jobHeadline,J_Jobtype:jobtype,J_Category:category,
                             J_Location:joblocation,J_RelAssAvail:relocationAssistanceAvailable,
                             J_Description:jobdescription,J_Perksdesc:perksDescription,J_Reqdetails:requiredDetails,
                             J_Companyname: companyName, J_CompanyURL:companyURL,J_CompanyEmail:companyEmail, 
                             J_Collaborators:jobCollaborators,J_RecruiterOk:recruiterOk}},function(e,r)
                             {
                                alert("Updated Successfully");
                             });
                            Router.go("jobPage",{_id:this._id})
                
                
                }
         }
          else
          {
            alert("login to post the Job")
          }
        },
        'click .formpreview': function(event){
                    console.log("before plugin");
                    $('#myform').previewForm();
                    
        },
           
        'change #jobPerks': function(event){
            if($('#jobPerks')[0].checked){
                $('#perksDescription').parent().show('slow');
            } else {
                $('#perksDescription').parent().hide('slow');
                    }
            }
        
        });  
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
        },
        update: function()
        {
               return true;
        }
            
     });
      
}
