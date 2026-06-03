const root = document.documentElement;
const header = document.querySelector("#site-header");
const menuToggle = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const themeToggle = document.querySelector("#theme-toggle");
const typedRole = document.querySelector("#typed-role");
const themeColor = document.querySelector('meta[name="theme-color"]');
const year = document.querySelector('#years');

const roles = [
  "Backend Java Developer",
  "Microservices Specialist",
  "Spring Boot Engineer",
  "Technical Lead",
  "Lead Software Engineer"
];

function setYear() {
  year.textContent = new Date().getFullYear();
}

setYear();

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

function syncThemeColor() {
  themeColor?.setAttribute("content", root.dataset.theme === "dark" ? "#080c14" : "#f8fafc");
}

syncThemeColor();

function syncHeader() {
  header.classList.toggle("scrolled", window.scrollY > 8);
}

window.addEventListener("scroll", syncHeader);
syncHeader();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  syncThemeColor();
});

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  header.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const current = roles[roleIndex];
  typedRole.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeRole, 85);
    return;
  }

  if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeRole, 1300);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeRole, 45);
    return;
  }

  deleting = false;
  roleIndex = (roleIndex + 1) % roles.length;
  setTimeout(typeRole, 300);
}

typeRole();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
