document.documentElement.style.setProperty('--height', window.innerHeight);

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

document.querySelector("#catering form").addEventListener('submit', async (e)=> {
  e.preventDefault();
	let res = await fetch(e.target.action,
	  {
	    method: e.target.method,
			body: new FormData(e.target),
		}
	);
})
