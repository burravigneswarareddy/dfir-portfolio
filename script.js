/* =========================================================
   Burra Vigneswara Reddy — DFIR Portfolio · interactions
   ========================================================= */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- Nav scrolled state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav && nav.classList.toggle("scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Role typing effect ---------- */
  const typedEl = document.getElementById("typed");
  const roles = [
    "DFIR Analyst",
    "Incident Responder",
    "Windows Forensics",
    "BEC / Email Investigator",
    "Ransomware Triage",
    "SOC Analyst",
  ];
  if (typedEl) {
    if (prefersReduced) {
      typedEl.textContent = roles[0];
    } else {
      let r = 0, c = 0, deleting = false;
      const tick = () => {
        const word = roles[r];
        c += deleting ? -1 : 1;
        typedEl.textContent = word.slice(0, c);
        let delay = deleting ? 45 : 90;
        if (!deleting && c === word.length) { delay = 1600; deleting = true; }
        else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* ---------- Terminal boot sequence ---------- */
  const term = document.getElementById("termBody");
  const lines = [
    { t: '<span class="p">analyst@soc</span><span class="dim">:</span><span class="o">~$</span> <span class="c">./triage.sh --case CASE-002</span>' },
    { t: '<span class="o">[*] Mounting forensic image (read-only)...</span> <span class="ok">OK</span>' },
    { t: '<span class="o">[*] Parsing Windows Event Logs...</span> <span class="ok">DONE</span>' },
    { t: '<span class="o">[*] Carving Prefetch / Amcache / Shimcache...</span> <span class="ok">DONE</span>' },
    { t: '<span class="w">[!] Suspicious scheduled task: \\Updater (persistence)</span>' },
    { t: '<span class="bad">[!] Mass file rename .locked -> ENCRYPTION detected</span>' },
    { t: '<span class="o">[*] Mapping behavior to MITRE ATT&CK...</span>' },
    { t: '<span class="dim">    T1566 Phishing · T1059 Exec · T1053 Persist · T1486 Impact</span>' },
    { t: '<span class="o">[*] Generating IOC + timeline report...</span> <span class="ok">OK</span>' },
    { t: '<span class="ok">[+] Containment recommended. Report written: case_002.md</span>' },
    { t: '<span class="p">analyst@soc</span><span class="dim">:</span><span class="o">~$</span> <span class="caret">_</span>' },
  ];

  if (term) {
    if (prefersReduced) {
      term.innerHTML = lines.map((l) => `<span class="l">${l.t}</span>`).join("");
    } else {
      let i = 0;
      const printLine = () => {
        if (i >= lines.length) return;
        const span = document.createElement("span");
        span.className = "l";
        span.innerHTML = lines[i].t;
        span.style.opacity = "0";
        term.appendChild(span);
        requestAnimationFrame(() => {
          span.style.transition = "opacity .25s";
          span.style.opacity = "1";
        });
        i++;
        setTimeout(printLine, 480 + Math.random() * 280);
      };
      // start when terminal scrolls into view
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { printLine(); io.disconnect(); }
        });
      }, { threshold: 0.25 });
      io.observe(term);
    }
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat__num[data-count]");
  const runCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    if (prefersReduced) { el.textContent = target.toFixed(decimals) + suffix; return; }
    const dur = 1100;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(step);
  };
  if (counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(
    ".skillcard, .case, .tl-item, .cert, .edu__item, .contact__card, .about__text, .about__card"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));
  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("in"));
  } else {
    const rio = new IntersectionObserver((entries) => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          // small stagger within a batch
          setTimeout(() => e.target.classList.add("in"), (idx % 6) * 70);
          rio.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach((el) => rio.observe(el));
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__links a");
  const setActive = (id) => {
    navLinks.forEach((a) =>
      a.style.color = a.getAttribute("href") === "#" + id ? "var(--acc)" : ""
    );
  };
  const sio = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => sio.observe(s));
})();
