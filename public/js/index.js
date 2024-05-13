window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', document.documentElement.scrollTop);
}, false);

document.querySelectorAll('.carousel button').forEach((b) => {
  b.addEventListener('click', () => {
    let ul = b.parentElement.querySelector('ul');
    if (b.classList.contains('next')) {
      ul.scrollBy({left: ul.offsetWidth, behavior: 'smooth'});
    } else {
      ul.scrollBy({left: -ul.offsetWidth, behavior: 'smooth'});
    }
  })
})

document.querySelector("#catering form").addEventListener('submit', async (e)=> {
  e.preventDefault();
	let res = await fetch(e.target.action,
	  {
	    method: e.target.method,
			body: new FormData(e.target),
		}
	);
})
