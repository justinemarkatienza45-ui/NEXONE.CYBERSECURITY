(function () {
  const courses = window.NEXONE_COURSES || [];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const money = (value) => new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(value);
  const params = new URLSearchParams(location.search);
  const getCourse = () => courses.find(c => c.id === params.get("id")) || courses[0];

  function getState() {
    try {
      return JSON.parse(localStorage.getItem("nexoneState")) || { learner: null, enrollments: {} };
    } catch {
      return { learner: null, enrollments: {} };
    }
  }

  function setState(state) {
    localStorage.setItem("nexoneState", JSON.stringify(state));
  }

  function showToast(message) {
    let toast = $(".toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast._timer);
    showToast._timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function courseCard(c) {
    return `
      <article class="course-card" data-category="${c.category}" data-level="${c.level}" data-price="${c.price}" data-rating="${c.rating}">
        <a class="course-cover" href="course.html?id=${c.id}" aria-label="View ${c.title}">
          <img src="${c.image}" alt="">
          <span class="badge">${c.badge}</span>
        </a>
        <div class="course-body">
          <span style="color:#c49aff;font-weight:800;font-size:.78rem">${c.category}</span>
          <h3><a href="course.html?id=${c.id}">${c.title}</a></h3>
          <p>${c.subtitle}</p>
          <div class="course-meta">
            <span>${c.level} · ${c.duration}</span>
            <span class="rating">★ ${c.rating}</span>
          </div>
          <div class="course-footer">
            <span class="price">${money(c.price)}</span>
            <a class="button small secondary" href="course.html?id=${c.id}">View course</a>
          </div>
        </div>
      </article>`;
  }

  function renderCourseGrid(target, list = courses) {
    const el = typeof target === "string" ? $(target) : target;
    if (!el) return;
    el.innerHTML = list.map(courseCard).join("");
  }

  function setupGlobalNav() {
    const menu = $(".menu-button");
    const nav = $(".nav-links");
    if (menu && nav) {
      menu.addEventListener("click", () => nav.classList.toggle("open"));
    }

    const search = $("#globalSearch");
    if (search) {
      search.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && search.value.trim()) {
          location.href = `catalog.html?q=${encodeURIComponent(search.value.trim())}`;
        }
      });
    }

    const loginBtn = $("#loginButton");
    if (loginBtn) {
      const state = getState();
      if (state.learner?.name) loginBtn.textContent = state.learner.name.split(" ")[0];
      loginBtn.addEventListener("click", () => {
        if (state.learner) location.href = "dashboard.html";
        else openLoginModal();
      });
    }
  }

  function openLoginModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="loginTitle">
        <h2 id="loginTitle">Welcome to NEXONE</h2>
        <p style="color:var(--muted)">Create a local learner profile for this demo.</p>
        <form id="loginForm">
          <div class="field"><label>Full name</label><input name="name" required autocomplete="name"></div>
          <div class="field"><label>Email</label><input name="email" type="email" required autocomplete="email"></div>
          <button class="button primary full" type="submit">Continue</button>
          <button class="button secondary full" type="button" id="closeModal" style="margin-top:10px">Cancel</button>
        </form>
      </div>`;
    document.body.appendChild(modal);
    $("#closeModal", modal).onclick = () => modal.remove();
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
    $("#loginForm", modal).addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const state = getState();
      state.learner = { name: data.get("name"), email: data.get("email") };
      setState(state);
      modal.remove();
      location.href = "dashboard.html";
    });
  }

  function initHome() {
    if (!$("#featuredCourses")) return;
    renderCourseGrid("#featuredCourses", courses.slice(0, 6));
    $$(".chip[data-category]").forEach(btn => {
      btn.addEventListener("click", () => {
        $$(".chip[data-category]").forEach(x => x.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        renderCourseGrid("#featuredCourses", category === "All" ? courses : courses.filter(c => c.category === category));
      });
    });
  }

  function initCatalog() {
    const grid = $("#catalogGrid");
    if (!grid) return;

    const query = (params.get("q") || "").toLowerCase();
    if ($("#catalogSearch")) $("#catalogSearch").value = params.get("q") || "";

    function applyFilters() {
      const text = ($("#catalogSearch")?.value || "").toLowerCase().trim();
      const levels = $$('input[name="level"]:checked').map(i => i.value);
      const maxPrice = Number($("#maxPrice")?.value || 99999);
      const sort = $("#sortCourses")?.value || "popular";

      let list = courses.filter(c => {
        const haystack = `${c.title} ${c.subtitle} ${c.category} ${c.level}`.toLowerCase();
        return (!text || haystack.includes(text)) &&
          (!levels.length || levels.includes(c.level)) &&
          c.price <= maxPrice;
      });

      if (sort === "price-low") list.sort((a,b) => a.price - b.price);
      if (sort === "price-high") list.sort((a,b) => b.price - a.price);
      if (sort === "rating") list.sort((a,b) => b.rating - a.rating);
      if (sort === "popular") list.sort((a,b) => b.students - a.students);

      renderCourseGrid(grid, list);
      $("#resultCount").textContent = `${list.length} course${list.length === 1 ? "" : "s"}`;
    }

    $("#catalogSearch")?.addEventListener("input", applyFilters);
    $$('input[name="level"]').forEach(i => i.addEventListener("change", applyFilters));
    $("#maxPrice")?.addEventListener("change", applyFilters);
    $("#sortCourses")?.addEventListener("change", applyFilters);
    if (query) $("#catalogSearch").value = query;
    applyFilters();
  }

  function initCourse() {
    if (!$("#courseTitle")) return;
    const c = getCourse();
    document.title = `${c.title} | NEXONE`;
    $("#courseHero").style.setProperty("--course-hero-image", `url("${c.image}")`);
    $("#courseTitle").textContent = c.title;
    $("#courseSubtitle").textContent = c.subtitle;
    $("#courseCategory").textContent = c.category;
    $("#courseLevel").textContent = c.level;
    $("#courseDuration").textContent = c.duration;
    $("#courseLessons").textContent = `${c.lessons} lessons`;
    $("#courseRating").textContent = `★ ${c.rating} (${c.students.toLocaleString()} learners)`;
    $("#coursePrice").textContent = money(c.price);
    $("#courseImage").src = c.image;
    $("#buyCourse").href = `checkout.html?id=${c.id}`;
    $("#learnOutcomes").innerHTML = c.outcomes.map(x => `<li>${x}</li>`).join("");
    $("#courseModules").innerHTML = c.modules.map((m, i) => `
      <div class="accordion-item">
        <button class="accordion-button" aria-expanded="${i === 0}">
          <span>Module ${i + 1}: ${m.title}</span>
          <span>${m.lessons.length} lessons</span>
        </button>
        <div class="accordion-content" ${i === 0 ? "" : "hidden"}>
          <ol class="lesson-list">${m.lessons.map(x => `<li>${x}</li>`).join("")}</ol>
        </div>
      </div>`).join("");

    $$(".accordion-button").forEach(btn => {
      btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        const open = !content.hidden;
        content.hidden = open;
        btn.setAttribute("aria-expanded", String(!open));
      });
    });
  }

  function initCheckout() {
    if (!$("#checkoutForm")) return;
    const c = getCourse();
    const state = getState();
    $("#checkoutCourseImage").src = c.image;
    $("#checkoutCourseTitle").textContent = c.title;
    $("#checkoutCourseMeta").textContent = `${c.level} · ${c.duration} · Certificate included`;
    $("#subtotal").textContent = money(c.price);
    $("#total").textContent = money(c.price);
    if (state.learner) {
      $('[name="name"]').value = state.learner.name || "";
      $('[name="email"]').value = state.learner.email || "";
    }

    $("#applyVoucher").addEventListener("click", () => {
      const code = $("#voucher").value.trim().toUpperCase();
      if (code === "NEXONE10") {
        const discounted = Math.round(c.price * .9);
        $("#discountLine").hidden = false;
        $("#discount").textContent = `-${money(c.price - discounted)}`;
        $("#total").textContent = money(discounted);
        $("#checkoutForm").dataset.total = discounted;
        showToast("Voucher applied: 10% off");
      } else {
        showToast("Try the demo code NEXONE10");
      }
    });

    $("#checkoutForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const newState = getState();
      newState.learner = { name: fd.get("name"), email: fd.get("email") };
      if (!newState.enrollments[c.id]) {
        newState.enrollments[c.id] = {
          enrolledAt: new Date().toISOString(),
          progress: 0,
          completed: [],
          certificateId: null
        };
      }
      setState(newState);
      $("#checkoutStep").hidden = true;
      $("#successStep").hidden = false;
      $("#successCourse").textContent = c.title;
      $("#goLearn").href = `learn.html?id=${c.id}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function initDashboard() {
    if (!$("#dashboardCourses")) return;
    const state = getState();
    const enrollments = Object.entries(state.enrollments || {});
    $("#learnerName").textContent = state.learner?.name ? `Welcome back, ${state.learner.name.split(" ")[0]}` : "Your learning dashboard";

    $("#statEnrolled").textContent = enrollments.length;
    $("#statCompleted").textContent = enrollments.filter(([,e]) => e.progress === 100).length;
    $("#statCertificates").textContent = enrollments.filter(([,e]) => !!e.certificateId).length;
    const avg = enrollments.length ? Math.round(enrollments.reduce((s,[,e]) => s + (e.progress || 0), 0) / enrollments.length) : 0;
    $("#statProgress").textContent = `${avg}%`;

    if (!enrollments.length) return;

    $("#emptyDashboard").hidden = true;
    $("#dashboardCourses").innerHTML = enrollments.map(([id,e]) => {
      const c = courses.find(x => x.id === id);
      if (!c) return "";
      return `
        <article class="enrollment-card">
          <img src="${c.image}" alt="">
          <div>
            <h3>${c.title}</h3>
            <p>${e.progress === 100 ? "Course completed" : `${e.completed.length} of ${c.lessons} lessons completed`}</p>
            <div class="progress"><span style="width:${e.progress || 0}%"></span></div>
          </div>
          <a class="button ${e.progress === 100 ? "secondary" : "primary"}" href="${e.progress === 100 ? `certificate.html?id=${c.id}` : `learn.html?id=${c.id}`}">
            ${e.progress === 100 ? "View certificate" : "Continue"}
          </a>
        </article>`;
    }).join("");
  }

  function lessonContent(c, lesson, moduleTitle) {
    const safeTitle = lesson.replace(/[<>&]/g, "");
    return `
      <span class="eyebrow">${moduleTitle}</span>
      <h1>${safeTitle}</h1>
      <p>This lesson introduces practical, defensive cybersecurity concepts in an authorized learning environment. Apply these ideas only to systems you own or have explicit permission to test.</p>
      <h2>Learning objectives</h2>
      <ul>
        <li>Explain the purpose of this topic in a security program.</li>
        <li>Recognize common indicators, mistakes, and defensive controls.</li>
        <li>Document observations clearly without exposing sensitive data.</li>
      </ul>
      <div class="lesson-callout"><strong>Responsible-use note:</strong> NEXONE labs focus on safe simulation, authorization, evidence handling, and remediation.</div>
      <h2>Practical workflow</h2>
      <ol>
        <li>Confirm scope and authorization before any security activity.</li>
        <li>Collect only the minimum information needed for the task.</li>
        <li>Validate observations safely and avoid service disruption.</li>
        <li>Record evidence, impact, and recommended fixes.</li>
      </ol>
      <h2>Example note format</h2>
      <pre class="lesson-code">Observation: [What was seen]
Evidence: [Timestamp, source, and non-sensitive details]
Risk: [Why it matters]
Recommendation: [Specific defensive action]
Validation: [How the fix can be checked]</pre>
      <h2>Knowledge check</h2>
      <p>Which action should happen first in a security assessment? Confirming written authorization and scope. This protects the organization, the tester, and affected users.</p>`;
  }

  function initLearn() {
    if (!$("#lessonNav")) return;
    const c = getCourse();
    let state = getState();
    if (!state.enrollments[c.id]) {
      location.href = `checkout.html?id=${c.id}`;
      return;
    }

    const flat = [];
    c.modules.forEach((m, mi) => m.lessons.forEach((lesson, li) => flat.push({ lesson, moduleTitle: m.title, mi, li })));
    const enrollment = state.enrollments[c.id];
    let current = Math.min(Number(params.get("lesson") || 0), flat.length - 1);

    $("#learnCourseTitle").textContent = c.title;

    function renderNav() {
      $("#lessonNav").innerHTML = c.modules.map((m, mi) => `
        <div class="module-title">Module ${mi+1}: ${m.title}</div>
        ${m.lessons.map((lesson, li) => {
          const idx = flat.findIndex(x => x.mi === mi && x.li === li);
          const done = enrollment.completed.includes(idx);
          return `<button class="lesson-nav-item ${idx === current ? "active" : ""} ${done ? "completed" : ""}" data-index="${idx}">
            <span class="lesson-check">${done ? "✓" : idx+1}</span>
            <span>${lesson}</span>
          </button>`;
        }).join("")}`).join("");

      $$(".lesson-nav-item").forEach(btn => btn.addEventListener("click", () => {
        current = Number(btn.dataset.index);
        renderLesson();
        renderNav();
      }));
    }

    function renderLesson() {
      const item = flat[current];
      $("#lessonContent").innerHTML = lessonContent(c, item.lesson, item.moduleTitle);
      $("#prevLesson").disabled = current === 0;
      $("#nextLesson").textContent = current === flat.length - 1 ? "Finish course" : "Complete & continue";
      $("#courseProgressLabel").textContent = `${enrollment.progress || 0}% complete`;
      $("#courseProgressBar").style.width = `${enrollment.progress || 0}%`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    $("#prevLesson").addEventListener("click", () => {
      if (current > 0) {
        current -= 1;
        renderLesson();
        renderNav();
      }
    });

    $("#nextLesson").addEventListener("click", () => {
      state = getState();
      const e = state.enrollments[c.id];
      if (!e.completed.includes(current)) e.completed.push(current);
      e.progress = Math.round((e.completed.length / flat.length) * 100);
      if (current === flat.length - 1) {
        e.progress = 100;
        e.certificateId = e.certificateId || `NX-${new Date().getFullYear()}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
        e.completedAt = new Date().toISOString();
        setState(state);
        location.href = `certificate.html?id=${c.id}`;
        return;
      }
      setState(state);
      current += 1;
      enrollment.completed = e.completed;
      enrollment.progress = e.progress;
      renderLesson();
      renderNav();
      showToast("Lesson completed");
    });

    renderNav();
    renderLesson();
  }

  function initCertificate() {
    if (!$("#certificate")) return;
    const c = getCourse();
    const state = getState();
    const enrollment = state.enrollments?.[c.id];
    if (!enrollment || enrollment.progress !== 100) {
      $("#certificateGate").hidden = false;
      $("#certificate").hidden = true;
      $("#certificateActions").hidden = true;
      return;
    }

    $("#certName").textContent = state.learner?.name || "NEXONE Learner";
    $("#certCourse").textContent = c.title;
    $("#certDate").textContent = new Date(enrollment.completedAt || Date.now()).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
    $("#certId").textContent = enrollment.certificateId;
    $("#printCertificate").addEventListener("click", () => window.print());
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupGlobalNav();
    initHome();
    initCatalog();
    initCourse();
    initCheckout();
    initDashboard();
    initLearn();
    initCertificate();
    $("#year") && ($("#year").textContent = new Date().getFullYear());
  });
})();
