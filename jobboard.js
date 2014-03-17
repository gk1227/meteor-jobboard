Jobs = new Meteor.Collection('jobs');
Userdata=new Meteor.Collection('userdata');
Job_Data=new Meteor.Collection('jobdata');

var _deps = new Deps.Dependency;
var searchCriteria = {};


Router.map(function(){

    this.route('jobboard',{path:'/'});
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

        /*EasySearch.createSearchIndex('jobs', {
            'collection'    : Jobs,         // instanceof Meteor.Collection
            'field'         : 'J_Headline',  // can also be an array of fields
            'limit'         : 20,           // default: 10
            });
        });*/
    });
            
    function serachJob(){

        var search_text=document.getElementById('serachText').value;
        console.log(search_text);
        var search = new RegExp(search_text, 'i');
        console.log(search);
        searchCriteria = {'J_Headline': search};
        _deps.changed();
    }
    
    Template.header.events({
        'click #searchboxClick':function(){
            Router.go("jobboard");
            console.log("click event triggered")
            serachJob();

        },
        'keypress input.enterEve':function(evt){
            if(evt.which===13)
            {
                Router.go("jobboard");
                console.log("Enter event triggered")
                serachJob();
            }
        },
        'keyup #serachText':function(){

                var s_txt=document.getElementById('serachText').value;
                //console.log("focus event");
                console.log(s_txt);
                    /*if(s_txt==="")
                    {
                        searchCriteria={};
                        _deps.changed();
                    }
                    else{
                        searchJob();
                    }*/
        }

    });
    Template.postSubmit.events({
        'click .formsubmit': function(event){
            if(Meteor.user())
            {
                if(Meteor.user().emails[0].verified)
                {
                var u_id=Meteor.userId();
                jobHeadline = $('input[name ="jobHeadline"]').val();
                
                jobtype = $('input[name ="jobtype"]:checked').val();
                
                category = $('input[name="category"]:checked').val();

                jobexperience = $('input[name="Experience"]').val();
                
                joblocation = $('input[name="location"]').val();
                
                relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
                
                jobdescription = $('#jobDescription').val();
                //console.log(jobdescription);
                
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

                    /*jQuery.validator.setDefaults({
                    debug: true,
                    success: "valid"        
                    });
                    var form = $( "#myform" );
                    form.validate();
                    $( "button" ).click(function() {
                      alert( "Valid: " + form.valid() );
                    });*/
                    var formx = $( "#myform input:blank" );
                    //formxlen = formx.length;
                    /*for(var i=0; i< formx.length;i++){
                        $( "formx input:blank" ).css( "border", "3px solid red" );
                    }*/
                    function valfunction(){
                    if(jobHeadline==="")
                        $( "#Headline" ).css( "border", "1px solid red" );                    
                    if(jobexperience==="")
                        $( "#Experience" ).css( "border", "1px solid red" );
                    if(joblocation==="")
                        $( "#Location" ).css( "border", "1px solid red" );
                    if(jobdescription==="")
                        $( "#jobDescription" ).css( "border", "1px solid red" );
                    if(companyName==="")
                        $( "#Name" ).css( "border", "1px solid red" );
                    if(companyURL==="")
                        $( "#URL" ).css( "border", "1px solid red" );
                    if(companyEmail==="")
                        $( "#inputEmail3" ).css( "border", "1px solid red" );
                    }
                    valfunction.call()
                    

                if(companyURL.indexOf("http") != -1)
                {
                
                if(jobHeadline==="" || jobtype==="" || category==="" || joblocation==="" || relocationAssistanceAvailable=== "" || jobdescription=== "" || jobPerks==="" || requiredDetails==="" || companyURL==="" || companyName==="" || companyEmail==="")
                {

                    alert("you need to fill all the details")
                }
                else
                {
                //saving date
                var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May","June","July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
                var dat=new Date(); 
                var date=dat.getDate()              ;
                var month=monthNames[dat.getMonth()];
                var year=dat.getFullYear();               
                Jobs.insert({J_Headline:jobHeadline,J_Jobtype:jobtype,J_Category:category,J_Experience:jobexperience,
                             J_Location:joblocation,J_RelAssAvail:relocationAssistanceAvailable,
                             J_Description:jobdescription,J_Perksdesc:perksDescription,J_Reqdetails:requiredDetails,
                             J_Companyname: companyName, J_CompanyURL:companyURL,J_CompanyEmail:companyEmail, 
                             J_Collaborators:jobCollaborators,J_RecruiterOk:recruiterOk,createdAt:dat,J_Date:date,J_Month:month,J_Year:year,owner:u_id,version:1},function(e,r)
                             {
                                
                                Router.go('jobPage', {_id: r});
                             });  
                  
              }
          }
          else
          {
            alert("URL must contain http:// or https://");
          }
          }
          else{
            var uid=Meteor.userId;
            Meteor.call('sendEmail',uid); 
            console.log(Meteor.userId());
            
           
            alert("Your accounts is not verified Yet");
          }
          }
          else
          {
            alert("login to post the Job")
          }
        },

        'change #jobPerks': function(event){
            //$('#perksDescription').show();
        if($('#jobPerks')[0].checked){
            $('#perksDescription').parent().show('slow');
        } else {
            $('#perksDescription').parent().hide('slow');
                }
        },
        'click .formpreview': function(event){
                    console.log("before plugin");
                    $('#myform').previewForm();
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
        //$("#myfrom").validate();
    };
   
   Template.jobPage.helpers({
       'fbshare': function () {
    console.log("Click event triggered");
    var shared_url = encodeURIComponent(window.location.toString() + "?_escaped_fragment_=");
    var service_url="https://www.facebook.com/sharer/sharer.php?u=";
    var string =  service_url + shared_url ;
    console.log(string);
    // window.location=string;
    return string;
   }
   });
   

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

             _deps.depend();            

           var jobs= Jobs.find(searchCriteria,{sort: {createdAt: -1}}).fetch();
          
           Session.set("length",jobs.length);
            var start=Session.get("start");
            var end=Session.get("end");
            for (var i = 0; i <Session.get("length"); i++)
             {
               var headline=jobs[i].J_Headline;
               var edithead=headline.slice(0,30);
                jobs[i].J_Headline=edithead;

                var compname=jobs[i].J_Companyname;
               var editcname=compname.slice(0,30);
                jobs[i].J_Companyname=editcname;
            }
            
            return jobs.slice(start,end);
        },
    
        panelColor:function(){
            var clasPanel=['panel-success','panel-info','panel-danger','panel-primary','panel-warning','panel-pink'];
            var rand = clasPanel[Math.floor(Math.random() * clasPanel.length)];
            return rand;
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

                jobexperience = $('input[name="Experience"]').val();
                
                joblocation = $('input[name="location"]').val();
                
                relocationAssistanceAvailable = $('input[name="relocationAssistanceAvailable"]')[0].checked;
                
                jobdescription = $('#jobDescription').val();
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

                jQuery.validator.setDefaults({
                    debug: true,
                    success: "valid"
                });
                $( "input:blank" ).css( "background-color", "#bbbbff" );

                    if(companyURL.indexOf("http") != -1)
                    {
                    
                        if(jobHeadline==="" || jobtype==="" || category==="" || joblocation==="" || relocationAssistanceAvailable=== "" || jobdescription=== "" || jobPerks==="" || requiredDetails==="" || companyURL==="" || companyName==="" || companyEmail==="")
                        {
                            alert("you need to fill all the details")
                        }
                        else
                        {
                        Jobs.update({_id:this._id},{$set:{J_Headline:jobHeadline,J_Jobtype:jobtype,J_Category:category,J_Experience:jobexperience,
                                     J_Location:joblocation,J_RelAssAvail:relocationAssistanceAvailable,
                                     J_Description:jobdescription,J_Perksdesc:perksDescription,J_Reqdetails:requiredDetails,
                                     J_Companyname: companyName, J_CompanyURL:companyURL,J_CompanyEmail:companyEmail, 
                                     J_Collaborators:jobCollaborators,J_RecruiterOk:recruiterOk}},function(e,r)
                                     {
                                        alert("Updated Successfully");
                                     });
                                    Router.go("jobPage",{_id:this._id})
                        }
                    }//if*****
                    else
                    {
                        alert("Email must contain http:// or https://")
                    }
            }//***Meteor if User
        else
            {
                alert("login to post the Job");
            }
        },
            'change #jobPerks': function(event){
                if($('#jobPerks')[0].checked){
                    $('#perksDescription').parent().show('slow');
                } else {
                    $('#perksDescription').parent().hide('slow');
                        }
                },//**
            'click .formpreview': function(event){
                        console.log("before plugin");
                        $('#myform').previewForm();
                }//**   
    });  

    Template.editJob.helpers({
        setValues:function(){
            var aa=this.J_Jobtype;
                console.log(this.J_Jobtype);
            }
    });
}

/************************Client Ends***********************************************************/

if (Meteor.isServer) {

    Meteor.startup(function(){
        
       process.env.MAIL_URL = 'smtp://postmaster%40sandbox22840.mailgun.org:redesygnsystems@smtp.mailgun.org:587';
       Accounts.emailTemplates.from = "Redesygn Systems <info@redesygn.com>";

      /* EasySearch.createSearchIndex('jobs', {
        'collection'    : Jobs,         // instanceof Meteor.Collection
        'field'         : 'J_Headline', // can also be an array of fields
        'limit'         : 20,           // default: 10
        });*/
    
    });

    Accounts.config({
       sendVerificationEmail:true

    });

    Meteor.methods({
        sendEmail: function (to) {
                 
        Accounts.sendVerificationEmail(to);
        }
    });
   
    
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
