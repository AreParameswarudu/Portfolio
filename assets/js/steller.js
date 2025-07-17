/*!
=========================================================
* Steller Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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