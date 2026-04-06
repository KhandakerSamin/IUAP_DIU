"use client";

import { useEffect } from "react";

export default function HomeEffects() {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const animateCounter = (element, target) => {
      if (prefersReducedMotion) {
        element.textContent = `${target}+`;
        return;
      }

      let current = 0;
      const totalSteps = 50;
      const increment = target / totalSteps;
      const stepTime = 1500 / totalSteps;

      const timer = window.setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = `${target}+`;
          window.clearInterval(timer);
        } else {
          element.textContent = `${Math.floor(current)}+`;
        }
      }, stepTime);
    };

    const statElements = Array.from(document.querySelectorAll(".stat-value"));
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = Number.parseInt(entry.target.getAttribute("data-target") || "0", 10);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    statElements.forEach((element) => statsObserver.observe(element));

    const anchorHandler = (event) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      const navbar = document.getElementById("navbar");
      const navHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    anchorLinks.forEach((link) => link.addEventListener("click", anchorHandler));

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
      anchorLinks.forEach((link) => link.removeEventListener("click", anchorHandler));
    };
  }, []);

  return null;
}
