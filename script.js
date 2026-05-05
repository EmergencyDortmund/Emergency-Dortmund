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


// SMOOTH NAVIGATION

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


// NAVBAR EFFECT

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


// MOUSE GLOW EFFECT

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


// COOKIE SYSTEM

const cookiePopup =
document.getElementById(
  "cookiePopup"
);

const acceptCookies =
document.getElementById(
  "acceptCookies"
);


// CHECK IF ALREADY ACCEPTED

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