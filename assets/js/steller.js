


// smooth scroll
$(document).ready(function(){
	$(".nav-link").on('click', function(event) {

    	if (this.hash !== "") {

			event.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 700, function(){
				window.location.hash = hash;
			});
      	} 
    });
});

var API_ENDPOINT = "your-api-gateway-endpoint";

// AJAX POST request to save Employee data
document.getElementById("submit").onclick = function(event){
	event.preventDefault();
    var inputData = {
        "contact": $('#contact-info').val(),
        "message": $('#message-box').val()
    };
    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data:  JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function (response) {
            document.getElementById("MessageSent").innerHTML = "Message sent sucessfully";
        },
        error: function () {
            alert("Error sending message. Try again or check internet access.");
        }
    });
}



document.querySelectorAll('.download-resume').forEach(button => {
	button.addEventListener('click',function () {
		const resumeURL = this.getAttribute('data-url')
		const a = document.createElement('a');
		a.href = resumeURL;
		a.download = 'AreParameswarudu_resume.pdf';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		})

})
