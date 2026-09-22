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
      ul.scrollBy({ left: ul.offsetWidth, behavior: 'smooth' });
    } else {
      ul.scrollBy({ left: -ul.offsetWidth, behavior: 'smooth' });
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
    return (e.target.value = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`);
  }
});

document.querySelector("#catering form").addEventListener('submit', async (e) => {
  e.preventDefault();

  let submitButton = e.submitter;
  submitButton.disabled = true;

  let formData = new FormData(e.target);
  formData.append("access_key", "8dc155be-f764-4eb9-a560-2665e3143ed5");

  // Format date/times
  let date = document.querySelector("input[name=date]").valueAsDate.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  let start = document.querySelector("input[name=start]").valueAsDate.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit"
  });
  let end = document.querySelector("input[name=end]").valueAsDate.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit"
  });

  formData.set("date", date);
  formData.set("start", start);
  formData.set("end", end);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Thank you for your interest! We will get back to you via email as soon as possible.");
      e.target.reset()
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Uh Oh! Something went wrong on our end. Please send your inquiry to our email. info@vtmaplecreemee.com");
  } finally {
    submitButton.disabled = false;
  }
})


