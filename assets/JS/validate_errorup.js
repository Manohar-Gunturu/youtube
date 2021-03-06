function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
var valid = true;


function tp_run_for(form){

  $(form).find(".checkbox, .radio").each(function() {
       if($(this).attr("data-validate") === 'true'){
         var attr = $(this).attr('data-min');
         if(typeof attr !== typeof undefined && attr !== false){

         }else if($(this).hasClass('radio')){
           attr = 1;
         }
         else{
           attr = 1;
         }
           if($(this).find('input:checked').length < parseInt(attr)){
              valid = false;
           	 $( this).find('.er_ep').text("Please select "+$(this).attr("data-desc")).fadeTo( "slow", 1 );
           }
        }
  });


}



function tp_input(form){
valid= true;
   $(form).children('.draggable').find('.er_ep').fadeTo('fast',0);
    tp_run_for(form);
$( form).find("input,textarea,select").each(function( index ) {

var fom = $(this).attr("data-validate");

if(typeof fom === typeof undefined){
  return true;
}

    if(fom == 'true' || fom == 'false'){
		if($(this).attr("type") === 'file'){

         	if(fom == 'true' && $(this).val() === ''){

			 $(this).closest('.draggable').find('.er_ep').text("Please upload "+$(this).attr("data-desc")).fadeTo( "slow", 1 );
			 valid= false;
             return ;
			}

		}

		if($(this).prop('tagName') === 'SELECT'){

			if(fom === 'true' && $(this).val() == '0'){

			 $(this).closest('.draggable').find('.er_ep').text("Please select a "+$(this).attr("data-desc")).fadeTo( "slow", 1 );
			 valid= false;
             return ;
			}

		}
		 return;

	}


    if(fom[0] === 'Y'){
        if($(this).val() === "" || $(this).val() === null){

		 $(this).closest('.draggable').find('.er_ep').text($(this).attr("placeholder")+" Cannot be Empty").fadeTo( "slow", 1 );
		  valid= false;
        return;
        }
    }
    if(fom[1] === 'Y'){
        if(!validateEmail($(this).val())){

		 $(this).closest('.draggable').find('.er_ep').text("Proper Email Please").fadeTo( "slow", 1 );
		  valid= false;
          return;
        }
    }
    if(fom[2] === 'Y'){
        if($(this).val().indexOf(' ')> -1){

		$(this).closest('.draggable').find('.er_ep').text("Spaces Not Allowed").fadeTo( "slow", 1 );
		valid= false;
        return;
        }
    }
    if(fom[3] === 'Y')
    { var range = fom.substring(fom.indexOf('[')+1,fom.indexOf(']'));
      var attr = range.split('-');
     if(!($(this).val()>= parseInt(attr[0]) && $(this).val() <= parseInt(attr[1]))){
		  $(this).closest('.draggable').find('.er_ep').text("Not In Range").fadeTo( "slow", 1 );
		  valid= false;
         return;
      }
    }
    if(fom.substring(fom.indexOf(']')+1,fom.lastIndexOf('[')) === 'Y'){
      var range = fom.substring(fom.lastIndexOf('[')+1,fom.lastIndexOf(']'));
       if(!eval($(this).val().length+range)){
		  $(this).closest('.draggable').find('.er_ep').text("Length should be "+range).fadeTo( "slow", 1 );
		  valid= false;
         return;
      }


    }
    if(fom.charAt(fom.length - 3) === 'Y' ){
        if(!(/\d/.test($(this).val()))){
			$(this).closest('.draggable').find('.er_ep').text("Should Have Numericals").fadeTo( "slow", 1 );
			valid= false;
         return;
        }

    }

    if(fom.charAt(fom.length - 2) === 'Y' ){
        if(!(/[A-Z]/.test($(this).val()))){
		   $(this).closest('.draggable').find('.er_ep').text("Should Have Capital Letters").fadeTo( "slow", 1 );
		   valid= false;
         return;
        }
    }
    if(fom.charAt(fom.length - 1) === 'Y' ){
        if(!(/[^a-zA-Z\d]/.test($(this).val()))){
		   $(this).closest('.draggable').find('.er_ep').text("Should Have Special Character").fadeTo( "slow", 1 );
		   valid= false;
         return;
        }
    }
	 if($(this).attr("data-regex") !== undefined){
         var patt = new RegExp($(this).attr("data-regex"));
        if(!patt.test($(this).val())){
		 $(this).closest('.draggable').find('.er_ep').text("Pattern ins Wrong").fadeTo( "slow", 1 );
		 valid= false;
         return;
        }
    }

});

 return valid;
}
