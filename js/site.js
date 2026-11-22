/* =========================================================================
   SHARED SITE CONFIGURATION & NAVIGATION (100% Self-Hosted)
   Edit SITE_CONFIG below once to update your site title or navigation links
   across all 17 pages automatically.
   ========================================================================= */

const SITE_CONFIG = {
  siteTitle: "Moreland's E-Portfolio Template",
  navItems: [
    { id: "home", label: "Home", path: "index.html" },
    { id: "literacy", label: "Literacy", path: "literacy.html" },
    {
      group: "module",
      label: "Module",
      dropdownWidth: "w-md",
      align: "align-left",
      children: [
        { id: "module-1", label: "Module 1 (ED 501)", path: "modules/module-1.html" },
        { id: "module-2", label: "Module 2 (ED 502)", path: "modules/module-2.html" },
        { id: "module-3", label: "Module 3 (ED 503)", path: "modules/module-3.html" },
        { id: "module-4", label: "Module 4 (ED 504)", path: "modules/module-4.html" },
        { id: "module-5", label: "Module 5 (ED 505)", path: "modules/module-5.html" },
        { id: "module-6", label: "Module 6 (ED 506)", path: "modules/module-6.html" }
      ]
    },
    { id: "clinical-practice", label: "Clinical Practice", path: "clinical-practice.html" },
    { id: "intasc-standards", label: "InTASC Standards", path: "intasc-standards.html" },
    {
      id: "med",
      group: "med",
      label: "M.Ed.",
      path: "med/index.html",
      dropdownWidth: "w-lg",
      align: "align-right",
      children: [
        { id: "med-edtech", label: "M.Ed. in Educational Technology", path: "med/edtech.html" },
        { id: "med-ece", label: "M.Ed. in Early Childhood Education", path: "med/early-childhood.html" },
        { id: "med-sped", label: "M.Ed. in Special Education", path: "med/special-education.html" },
        { id: "med-multilingual", label: "M.Ed. in Multilingual Learners", path: "med/multilingual-learners.html" },
        { id: "med-globalization", label: "M.Ed. in Globalization in Education", path: "med/globalization.html" },
        { id: "med-research", label: "M.Ed. in Educational Research", path: "med/educational-research.html" }
      ]
    }
  ]
};

function resolvePath(root, relativePath) {
  return root + relativePath;
}

function isItemOrChildActive(item, activePage) {
  if (item.id && item.id === activePage) return true;
  return Array.isArray(item.children) && item.children.some(child => child.id === activePage);
}

function buildDesktopNavItem(item, index, root, activePage) {
  if (!item.children) {
    const isActive = item.id === activePage;
    return `
      <div class="desktop-nav-item" data-nav-index="${index}">
        <a href="${resolvePath(root, item.path)}" class="nav-link${isActive ? " active" : ""}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>
      </div>`;
  }

  const groupActive = isItemOrChildActive(item, activePage);
  const linksHtml = item.children.map(child => {
    const isActive = child.id === activePage;
    return `<a href="${resolvePath(root, child.path)}" class="nav-link nav-dropdown-link${isActive ? " active" : ""}"${isActive ? ' aria-current="page"' : ""}>${child.label}</a>`;
  }).join("\n");

  const triggerHtml = item.path
    ? `<a href="${resolvePath(root, item.path)}" class="nav-link${groupActive ? " active" : ""}"${item.id === activePage ? ' aria-current="page"' : ""} aria-haspopup="true">
         <span>${item.label}</span>
         <svg class="nav-caret" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5H7z"/></svg>
       </a>`
    : `<button type="button" class="nav-link${groupActive ? " active" : ""}" aria-haspopup="true">
         <span>${item.label}</span>
         <svg class="nav-caret" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5H7z"/></svg>
       </button>`;

  return `
    <div class="desktop-nav-item" data-nav-index="${index}">
      ${triggerHtml}
      <div class="nav-dropdown ${item.align} ${item.dropdownWidth}">
        <div class="nav-dropdown-panel">
          ${linksHtml}
        </div>
      </div>
    </div>`;
}

function buildOverflowNavItem(item, root, activePage) {
  if (!item.children) {
    const isActive = item.id === activePage;
    return `<a href="${resolvePath(root, item.path)}" class="nav-link nav-dropdown-link${isActive ? " active" : ""}"${isActive ? ' aria-current="page"' : ""}>${item.label}</a>`;
  }

  const groupActive = isItemOrChildActive(item, activePage);
  const subLinksHtml = item.children.map(child => {
    const isActive = child.id === activePage;
    return `<a href="${resolvePath(root, child.path)}" class="nav-link nav-dropdown-link${isActive ? " active" : ""}"${isActive ? ' aria-current="page"' : ""}>${child.label}</a>`;
  }).join("\n");

  const triggerHtml = item.path
    ? `<a href="${resolvePath(root, item.path)}" class="nav-link nav-dropdown-link${groupActive ? " active" : ""}"${item.id === activePage ? ' aria-current="page"' : ""} aria-haspopup="true">
         <span>${item.label}</span>
         <svg class="nav-caret" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 17l5-5-5-5v10z"/></svg>
       </a>`
    : `<button type="button" class="nav-link nav-dropdown-link${groupActive ? " active" : ""}" aria-haspopup="true">
         <span>${item.label}</span>
         <svg class="nav-caret" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 17l5-5-5-5v10z"/></svg>
       </button>`;

  return `
    <div class="nav-sub-wrap">
      ${triggerHtml}
      <div class="nav-sub-flyout ${item.dropdownWidth}">
        <div class="nav-dropdown-panel">
          ${subLinksHtml}
        </div>
      </div>
    </div>`;
}

function renderSiteNavigation() {
  const container = document.getElementById("site-nav");
  if (!container) return;

  const root = document.body.dataset.root || "";
  const activePage = document.body.dataset.page || "home";

  const desktopItemsHtml = SITE_CONFIG.navItems
    .map((item, idx) => buildDesktopNavItem(item, idx, root, activePage))
    .join("\n");

  container.innerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <div class="header-brand">
          <a href="${resolvePath(root, "index.html")}" class="site-title-link">
            ${SITE_CONFIG.siteTitle}
          </a>
        </div>

        <nav id="desktopNav" aria-label="Top navigation" class="desktop-nav">
          <div id="desktopNavPrimary" class="desktop-nav-primary">
            ${desktopItemsHtml}
          </div>
          <div id="desktopNavMore" class="nav-more-wrap is-hidden">
            <button id="desktopNavMoreBtn" type="button" class="nav-link" aria-haspopup="true">
              <span>More</span>
              <svg class="nav-caret" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5H7z"/></svg>
            </button>
            <div class="nav-dropdown align-right w-md">
              <div id="desktopNavMoreList" class="nav-dropdown-panel"></div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  `;

  // Dynamic responsive "More" overflow menu for top navigation
  const desktopNav = document.getElementById("desktopNav");
  const primaryList = document.getElementById("desktopNavPrimary");
  const moreContainer = document.getElementById("desktopNavMore");
  const moreBtn = document.getElementById("desktopNavMoreBtn");
  const moreList = document.getElementById("desktopNavMoreList");

  function updateDesktopNavOverflow() {
    if (!desktopNav || window.getComputedStyle(desktopNav).display === "none") return;

    const itemEls = Array.from(primaryList.querySelectorAll(".desktop-nav-item"));
    itemEls.forEach(el => el.classList.remove("is-hidden"));
    moreContainer.classList.add("is-hidden");
    moreList.innerHTML = "";
    moreBtn.classList.remove("active");

    const availableWidth = desktopNav.clientWidth;
    if (primaryList.scrollWidth <= availableWidth) {
      return;
    }

    moreContainer.classList.remove("is-hidden");
    const moreWidth = moreContainer.offsetWidth + 8;
    const overflowIndices = [];

    for (let i = itemEls.length - 1; i >= 0; i--) {
      if (primaryList.scrollWidth + moreWidth <= availableWidth) {
        break;
      }
      itemEls[i].classList.add("is-hidden");
      overflowIndices.unshift(i);
    }

    if (overflowIndices.length === 0) {
      moreContainer.classList.add("is-hidden");
      return;
    }

    let moreHasActive = false;
    moreList.innerHTML = overflowIndices.map(idx => {
      const item = SITE_CONFIG.navItems[idx];
      if (isItemOrChildActive(item, activePage)) {
        moreHasActive = true;
      }
      return buildOverflowNavItem(item, root, activePage);
    }).join("\n");

    moreBtn.classList.toggle("active", moreHasActive);
  }

  updateDesktopNavOverflow();
  window.addEventListener("resize", updateDesktopNavOverflow);
}

window.addEventListener("DOMContentLoaded", renderSiteNavigation);
