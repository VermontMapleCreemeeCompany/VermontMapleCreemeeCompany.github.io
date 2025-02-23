document.documentElement.style.setProperty('--height', window.innerHeight);
document.documentElement.style.setProperty('--scroll', document.documentElement.scrollTop);

window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', document.documentElement.scrollTop);
}, false);


document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.bar nav').classList.toggle("active");
})

document.querySelectorAll('nav a').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelector('.bar nav').classList.remove("active");
  })
})


document.querySelectorAll('.carousel button').forEach((b) => {
  b.addEventListener('click', () => {
    let ul = b.parentElement.parentElement.querySelector('ul');
    if (b.classList.contains('next')) {
      ul.scrollBy({left: ul.offsetWidth, behavior: 'smooth'});
    } else {
      ul.scrollBy({left: -ul.offsetWidth, behavior: 'smooth'});
    }
  })
})

document.querySelector('input[type=tel]').addEventListener('input', (e) => {
	let value = e.target.value;
	let phoneNumber = value.replace(/\D/g, '');

	if (phoneNumber.length < 4) {
		return (e.target.value = phoneNumber);
	} else if (phoneNumber.length < 7) {
		return (e.target.value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`);
	} else {
		return (e.target.value = `(${phoneNumber.slice(0,3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`);
	}
});

document.querySelector("#catering form").addEventListener('submit', async (e)=> {
  e.preventDefault();

  let submitButton = e.submitter;
  submitButton.disabled = true;
  
  let formData = new FormData(e.target);
  let jsonData = Object.fromEntries(formData.entries())
  
	let res = await fetch("api/mailer",
	  {
	    method: "post",
      headers: {
        "Content-Type": "application/json",
      },
			body: JSON.stringify(jsonData),
		}
	);

	if (res.status == 200) {
	    e.target.reset() // reset form fields
	    alert("Thanks for reaching out. We will get back to you via email as soon as possible.");
  } else {
      alert("Uh Oh! Something went wrong on our end. Please send your inquiry to our email. info@vtmaplecreemee.com");
  }

  submitButton.disabled = false;
})


