const reveals =
document.querySelectorAll(".reveal");

function revealElements(){

  const windowHeight =
  window.innerHeight;

  reveals.forEach((element)=>{

    const top =
    element.getBoundingClientRect().top;

    if(top < windowHeight - 100){

      element.classList.add("active");

    }

  });

}

window.addEventListener(
  "scroll",
  revealElements
);

revealElements();


// =========================
// SMOOTH NAVIGATION
// =========================

const navLinks =
document.querySelectorAll(
'a[href^="#"]'
);

navLinks.forEach((link)=>{

  link.addEventListener(
    "click",
    function(e){

      e.preventDefault();

      const target =
      document.querySelector(
        this.getAttribute("href")
      );

      if(target){

        target.scrollIntoView({
          behavior:"smooth"
        });

      }

    }
  );

});


// =========================
// NAVBAR EFFECT
// =========================

const header =
document.querySelector("header");

window.addEventListener(
  "scroll",
  ()=>{

    if(window.scrollY > 50){

      header.style.background =
      "rgba(0,0,0,0.65)";

      header.style.backdropFilter =
      "blur(14px)";

    }else{

      header.style.background =
      "rgba(0,0,0,0.35)";

    }

  }
);


// =========================
// MOUSE GLOW EFFECT
// =========================

document.addEventListener(
  "mousemove",
  (e)=>{

    const glow =
    document.querySelector(
      ".mouse-glow"
    );

    if(glow){

      glow.style.left =
      e.clientX + "px";

      glow.style.top =
      e.clientY + "px";

    }

  }
);


// =========================
// HERO IMAGE ANIMATION
// =========================

const heroImage =
document.querySelector(".hero-image");

document.addEventListener(
  "mousemove",
  (e)=>{

    if(heroImage){

      let x =
      (window.innerWidth / 2 - e.pageX) / 35;

      let y =
      (window.innerHeight / 2 - e.pageY) / 35;

      heroImage.style.transform =
      `rotateY(${x}deg)
       rotateX(${-y}deg)
       scale(1.03)`;

    }

  }
);


// =========================
// GALLERY IMAGE HOVER
// =========================

const galleryImages =
document.querySelectorAll(
  ".gallery-grid img"
);

galleryImages.forEach((img)=>{

  img.addEventListener(
    "mouseenter",
    ()=>{

      img.style.transform =
      "scale(1.06) rotate(1deg)";

      img.style.boxShadow =
      "0 0 35px rgba(255,157,47,0.4)";

    }
  );

  img.addEventListener(
    "mouseleave",
    ()=>{

      img.style.transform =
      "scale(1) rotate(0deg)";

      img.style.boxShadow =
      "none";

    }
  );

});


// =========================
// COOKIE SYSTEM
// =========================

const cookiePopup =
document.getElementById(
  "cookiePopup"
);

const acceptCookies =
document.getElementById(
  "acceptCookies"
);


// CHECK IF ACCEPTED

if(localStorage.getItem(
  "cookiesAccepted"
)){

  if(cookiePopup){

    cookiePopup.style.display =
    "none";

  }

}


// ACCEPT BUTTON

if(acceptCookies){

  acceptCookies.addEventListener(
    "click",
    ()=>{

      localStorage.setItem(
        "cookiesAccepted",
        "true"
      );

      if(cookiePopup){

        cookiePopup.style.display =
        "none";

      }

    }
  );

}


// =========================
// DISCORD WEBHOOK
// =========================

// WEBHOOK HIER EINSETZEN

const webhookURL =
"https://discord.com/api/webhooks/1501296229420761148/8C8_YEWJeNf6MYMtdw9AVTaZsCiA-fbIT76MByjdMhmE8XbdTt29x49jL7SSUmZCP8vB";


// =========================
// POPUP SYSTEM
// =========================

const popup =
document.getElementById(
  "popupForm"
);

const openButtons =
document.querySelectorAll(
  ".open-form-btn"
);

const closePopup =
document.getElementById(
  "closePopup"
);


// OPEN

openButtons.forEach((button)=>{

  if(
    !button.classList.contains(
      "closed-btn"
    )
  ){

    button.addEventListener(
      "click",
      ()=>{

        popup.classList.add(
          "active"
        );

      }
    );

  }

});


// CLOSE

if(closePopup){

  closePopup.addEventListener(
    "click",
    ()=>{

      popup.classList.remove(
        "active"
      );

    }
  );

}


// OUTSIDE CLICK

window.addEventListener(
  "click",
  (e)=>{

    if(e.target === popup){

      popup.classList.remove(
        "active"
      );

    }

  }
);


// =========================
// FORM SEND
// =========================

const form =
document.querySelector(
  ".popup-box form"
);

if(form){

  form.addEventListener(
    "submit",
    async (e)=>{

      e.preventDefault();

      const inputs =
      form.querySelectorAll(
        "input, textarea"
      );

      const discordName =
      inputs[0].value;

      const age =
      inputs[1].value;

      const reason =
      inputs[2].value;

      const file =
      inputs[3].files[0];

      const sendButton =
      form.querySelector(
        "button"
      );

      sendButton.innerHTML =
      "⏳ Wird gesendet...";


      const payload = {

        embeds:[

          {

            title:
            "📨 Neue Bewerbung",

            color:16753920,

            fields:[

              {

                name:
                "👤 Discord",

                value:
                discordName,

                inline:true

              },

              {

                name:
                "🎂 Alter",

                value:
                age,

                inline:true

              },

              {

                name:
                "📝 Bewerbung",

                value:
                reason

              },

              {

                name:
                "📎 Datei",

                value:
                file
                ? file.name
                : "Keine Datei"

              }

            ],

            footer:{

              text:
              "Emergency Dortmund"

            },

            timestamp:
            new Date()

          }

        ]

      };


      try{

        await fetch(
          webhookURL,
          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body:
            JSON.stringify(
              payload
            )

          }
        );

        sendButton.innerHTML =
        "✅ Erfolgreich Gesendet";

        sendButton.style.background =
        "#00c853";

        setTimeout(()=>{

          popup.classList.remove(
            "active"
          );

          form.reset();

          sendButton.innerHTML =
          "Bewerbung Senden";

          sendButton.style.background =
          "";

        },2000);

      }catch(error){

        sendButton.innerHTML =
        "❌ Fehler";

        console.log(error);

      }

    }
  );

}
