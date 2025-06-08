'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-date]"); // Nueva variable para la fecha

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // Capturar la fecha y el enlace de LinkedIn del testimonio seleccionado
    const dateElement = this.querySelector("[data-testimonials-date]");
    const dateText = dateElement.textContent;
    const linkedInURL = dateElement.getAttribute("data-testimonials-link");

    // Actualizar el contenido del <time> en el modal
    if (linkedInURL) {
      modalDate.innerHTML = `<a href="${linkedInURL}" target="_blank">${dateText}</a>`;
    } else {
      modalDate.textContent = dateText;
    }

    modalDate.setAttribute("datetime", dateElement.getAttribute("datetime"));

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}




//emailjs.init("Waphoap0mTwheekS9");


const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");


for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {


    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullname = form.fullname.value;
  const email = form.email.value;
  const message = form.message.value;

  fetch("https://portfolio-wc51.onrender.com/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: fullname,
      email: email,
      message: message
    })
  })
    .then((res) => {
      if (res.ok) {
        alert("¡Mensaje enviado con éxito!");
        form.reset();
        formBtn.setAttribute("disabled", "");
      } else {
        alert("Hubo un error al enviar el mensaje.");
      }
    })
    .catch((err) => {
      console.error("Error al enviar:", err);
      alert("Error al enviar el mensaje. Intenta más tarde.");
    });
});




const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');


navigationLinks.forEach(link => {
  link.addEventListener('click', function () {
    const targetPage = this.getAttribute('data-page');


    pages.forEach(page => {
      const pageName = page.dataset.page.trim().toLowerCase();


      if (targetPage === pageName) {

        page.classList.add('active');
      } else {

        page.classList.remove('active');
      }
    });


    navigationLinks.forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
  });
});

function getNestedValue(obj, key) {
  return key.split('.').reduce((o, i) => (o ? o[i] : undefined), obj);
}

async function setLanguage(lang) {
  try {
    const response = await fetch(`./assets/i18n/${lang}.json`);
    const translations = await response.json();

    // Texto plano
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedValue(translations, key);
      if (value) {
        el.textContent = value;
      }
    });

    // HTML
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const value = getNestedValue(translations, key);
      if (value) {
        el.innerHTML = value;
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(input => {
      const key = input.getAttribute('data-i18n-placeholder');
      const value = getNestedValue(translations, key);
      if (value) {
        input.placeholder = value;
      }
    });

  } catch (error) {
    console.error(`Error loading language file: ${lang}`, error);
  }
}



// Idioma inicial
setLanguage('es');


const btn = document.querySelector('[data-sidebar-btn]');
const moreInfo = document.querySelector('.sidebar-info_more');

btn.addEventListener('click', () => {
  if (moreInfo.style.height && moreInfo.style.height !== '0px') {
    // cerrar
    moreInfo.style.height = '0';
  } else {
    // abrir
    moreInfo.style.height = moreInfo.scrollHeight + 'px';
  }
});





