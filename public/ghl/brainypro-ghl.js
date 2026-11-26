/* brAIny pro — GHL white-label script
 * Load via GHL Agency Settings → Company → Custom JS (as a <script src> tag).
 * Light, defensive, and idempotent. Edit CONFIG below.
 */
(function () {
  "use strict";
  if (window.__brainyProGhlLoaded) return;
  window.__brainyProGhlLoaded = true;

  var CONFIG = {
    tabTitle: "brAIny pro", // set to "" to leave GHL's title alone
    faviconUrl: "https://brainyprolocal.com/icon.png", // "" to skip
    hideSelectors: [
      // Add selectors to hide, e.g. ".some-ghl-promo-banner"
    ],
    supportLink: {
      enabled: false,
      label: "Support",
      href: "https://brainyprolocal.com/contact",
    },
  };

  function apply() {
    try {
      if (CONFIG.tabTitle && document.title !== CONFIG.tabTitle) {
        document.title = CONFIG.tabTitle;
      }

      if (CONFIG.faviconUrl) {
        var icon = document.querySelector("link[rel~='icon']");
        if (!icon) {
          icon = document.createElement("link");
          icon.rel = "icon";
          document.head.appendChild(icon);
        }
        if (icon.href !== CONFIG.faviconUrl) icon.href = CONFIG.faviconUrl;
      }

      CONFIG.hideSelectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el) {
          el.style.display = "none";
        });
      });

      if (CONFIG.supportLink.enabled && !document.getElementById("bp-support-link")) {
        var sidebar = document.querySelector("#sidebar-v2 .sidebar-v2-location");
        if (sidebar) {
          var a = document.createElement("a");
          a.id = "bp-support-link";
          a.href = CONFIG.supportLink.href;
          a.target = "_blank";
          a.rel = "noopener";
          a.textContent = CONFIG.supportLink.label;
          a.style.cssText = "display:block;padding:10px 16px;color:#fff;";
          sidebar.appendChild(a);
        }
      }
    } catch (e) {
      /* never break the GHL app */
    }
  }

  var timer = null;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () {
      timer = null;
      apply();
    }, 150);
  }

  apply();
  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
