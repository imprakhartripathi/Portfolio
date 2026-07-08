(function () {
  var REDIRECT_SECONDS = 3;
  var REDIRECT_MS = REDIRECT_SECONDS * 1000;
  var activeRedirect = null;
  var liveRegion = document.querySelector(".redirect-live");
  var cards = Array.prototype.slice.call(document.querySelectorAll("[data-link-card]"));

  function isModifiedClick(event) {
    return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
  }

  function updateCard(card, secondsRemaining, progress) {
    var value = card.querySelector(".countdown-ring__value");
    var ring = card.querySelector(".countdown-ring");

    if (value) {
      value.textContent = String(secondsRemaining);
    }

    if (ring) {
      ring.style.setProperty("--progress", String(Math.max(0, Math.min(1, progress))));
    }
  }

  function completeRedirect(destination) {
    window.location.assign(destination);
  }

  function startRedirect(card) {
    var destination = card.getAttribute("href");
    var title = card.getAttribute("data-title") || "link";

    if (!destination || activeRedirect) {
      return;
    }

    activeRedirect = {
      card: card,
      destination: destination,
      startedAt: performance.now()
    };

    document.body.classList.add("is-redirecting");
    card.classList.add("is-redirecting");
    card.setAttribute("aria-busy", "true");
    updateCard(card, REDIRECT_SECONDS, 1);

    if (liveRegion) {
      liveRegion.textContent = "Opening " + title + " in " + REDIRECT_SECONDS + " seconds.";
    }

    function tick(now) {
      if (!activeRedirect || activeRedirect.card !== card) {
        return;
      }

      var elapsed = now - activeRedirect.startedAt;
      var progress = 1 - elapsed / REDIRECT_MS;
      var secondsRemaining = Math.max(1, Math.ceil((REDIRECT_MS - elapsed) / 1000));

      updateCard(card, secondsRemaining, progress);

      if (elapsed >= REDIRECT_MS) {
        updateCard(card, 0, 0);
        if (liveRegion) {
          liveRegion.textContent = "Opening " + title + " now.";
        }
        completeRedirect(destination);
        return;
      }

      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (isModifiedClick(event)) {
        return;
      }

      event.preventDefault();
      startRedirect(card);
    });
  });
})();
