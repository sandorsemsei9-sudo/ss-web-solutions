gsap.registerPlugin(ScrollTrigger);


document.addEventListener("DOMContentLoaded", () => {

    // =============================
    // MOBILE MENU (CSAK GSAP - nincs class toggle)
    // =============================

    const menu = document.getElementById("nav-links");
    const menuButton = document.getElementById("menu-button");
    const closeMenu = document.getElementById("close-menu");    
    const lines = document.querySelectorAll(".hero-title span");
    gsap.set(menu, { x: "-100%" });

    menuButton.addEventListener("click", () => {
        gsap.to(menu, {
            x: 0,
            duration: 0.6,
            ease: "power4.out"
        });
    });

    closeMenu.addEventListener("click", () => {
        gsap.to(menu, {
            x: "-100%",
            duration: 0.6,
            ease: "power4.inOut"
        });
    });


    // =============================
    // HERO + NAVBAR TIMELINE
    // =============================


// HERO GOMBOK – load animáció
const heroButtons = document.querySelectorAll(".hero-btn");

// GSAP inicializálás: kezdő állapot
gsap.set(heroButtons, { opacity: 0, x: -50, rotation: -15 });

// Hero timeline
const heroTl = gsap.timeline({ delay: 0.2 });

heroTl
.from("nav", {
    y: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
})
.from(lines, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.6
}, "-=0.6")
.from("section:first-of-type p", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.6")
.to(heroButtons, {
    x: 0,
    opacity: 1,
    rotation: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power3.out"
}, "-=0.4");

    // =============================
    // FLOATING GLOW
    // =============================

    gsap.to(".blur-\\[180px\\]", {
        y: 30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });


    // =============================
    // SCROLL FADE-UP SECTIONS (BIZTONSÁGOS)
    // =============================

    gsap.utils.toArray("#about, #creations, #testimonials, #contact")
        .forEach((section) => {

            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    toggleActions: "play none none none"
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

        });
// Trusted Companies Section animation
gsap.utils.toArray("section.flex.items-center").forEach((section) => {
    const content = section.querySelector("div.flex-col"); // a szöveg/gomb container

    gsap.from(content, {
        scrollTrigger: {
            trigger: section,
            start: "top 50%", // mikor induljon
            toggleActions: "play none none none"
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2
    });

    // Ha a gombot külön szeretnéd animálni
    const btn = content.querySelector("button");
    if (btn) {
        gsap.from(btn, {
            scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.5)"
        });
    }
});

    // =============================
    // CARD ANIMATION
    // =============================

    gsap.utils.toArray(".group").forEach((card) => {

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });

    });


    // =============================
    // CONTACT FORM
    // =============================

    gsap.from("#contact form", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("section.flex.flex-col.items-center");
    if (!section) return;

    // Canvas létrehozása
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none"; // ne zavarja a gombokat
    canvas.style.zIndex = "-1";
    section.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Pöttyök konfigurációja
    const particles = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 4 + 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            alpha: Math.random() * 0.7 + 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            // Mozgatás
            p.x += p.speedX;
            p.y += p.speedY;

            // Falhoz ütközés
            if (p.x < 0 || p.x > width) p.speedX *= -1;
            if (p.y < 0 || p.y > height) p.speedY *= -1;

            // Rajzolás
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(147,112,255,${p.alpha})`; // lila pöttyök
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Resize kezelése
    window.addEventListener("resize", () => {
        width = canvas.clientWidth;
        height = canvas.clientHeight;
        canvas.width = width;
        canvas.height = height;
    });
});

document.addEventListener("DOMContentLoaded", () => {
  // Több szekció azonosítója
  const sections = ["about", "creations"];

  sections.forEach(id => {
    const section = document.getElementById(id);
    if (!section) return;

    // Canvas létrehozása
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "0"; // háttérbe tesszük

    // Gondoskodunk róla, hogy a section pozíciója legyen relative, hogy canvas hozzá igazodjon
    if (getComputedStyle(section).position === "static") {
      section.style.position = "relative";
    }

    section.prepend(canvas);

    const ctx = canvas.getContext("2d");

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Pöttyök konfigurációja
    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 6 + 3,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.15 + 0.05,
        glow: Math.random() * 10 + 10,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        // Mozgatás
        p.x += p.speedX;
        p.y += p.speedY;

        // Falhoz ütközés - loop
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Rajzolás fényes körrel
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius + p.glow);
        gradient.addColorStop(0, `rgba(147,112,255,${p.alpha})`); // lila szín (indigo)
        gradient.addColorStop(1, 'rgba(147,112,255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + p.glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(147,112,255,${p.alpha * 2})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize kezelése
    window.addEventListener("resize", () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    });
  });
});