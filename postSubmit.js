if (Meteor.isClient) {
    Template.postSubmit.rendered = function(){
        $('#jobDescription').wysihtml5();
        $('#perksDescription').wysihtml5();
    };
    Template.postSubmit.events({
        'click #submit': function(event){
            var job = {};
            job.jobtype = $('input[name="jobtype"]').val();
            job.category = $('input[name="category"]').val();
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
            console.log(job);
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
}
