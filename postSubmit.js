Jobs = new Meteor.Collection("Jobs");
if (Meteor.isClient) {
    
    
    Meteor.startup(function()
    {
	    Deps.autorun(function() 
	    {
        	Meteor.subscribe('Jobs');
		});
	});
    
    Template.postSubmit.rendered = function(){
        $('#jobDescription').wysihtml5();
        $('#perksDescription').wysihtml5();
    };
    Template.postSubmit.events({
        'click #submit': function(event){
            var job = {};
            job.jobHeadline = $('input[name ="jobHeadline"]').val();
            job.jobtype = $('input[name ="jobtype"]:checked').val();
            job.category = $('input[name="category"]:checked').val();
            job.location = $('input[name="location"]').val();
            job.relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
            job.description = $('#jobDescription').val();
            job.jobPerks = $('#jobPerks')[0].checked;
            if (job.jobPerks) {
                job.perksDescription = $('#perksDescription').val();
            } else {
                job.perksDescription = null;
            }
            job.requiredDetails = $('textarea[name="requiredDetails"]').val();
            job.companyName = $('input[name="companyName"]').val();
            job.companyURL = $('input[name="companyURL"]').val();
            job.companyEmail = $('input[name="companyEmail"]').val();
            job.jobCollaborators = $('input[name="jobCollaborators"]').val();
            job.recruiterOk = $('input[name="recruiterOk"]:checked').val();
    
            var ee=Jobs.insert({J_Headline:job.jobHeadline,J_Jobtype:job.jobtype,J_Category:job.category,
                         J_Location:job.location,J_RelAssAvail:job.relocationAssistanceAvailble,
                         J_Description:job.description,J_Perksdesc:job.perksDescription,J_Reqdetails:job.requiredDetails,
                         J_Companyname : job.companyName, J_CompanyURL:job.companyURL, J_RecruiterOk:job.recruiterOk});  
              console.log(ee) ;
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

    
    Template.postDisplay.posts = function(){
        return Jobs.find();
    }
    //console.log('hi');
}
    
if(Meteor.isServer){
    Meteor.publish("Jobs", function (){
        return Jobs.find();
    });
     Jobs.allow
     ({
        insert: function(UserId, Jobs)
        {
               return Jobs.find({});
        }
            
     });
}
    

    
