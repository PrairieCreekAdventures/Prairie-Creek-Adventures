// Prairie Creek Farms — subtle scroll reveals
// Keeps the editorial tone: no bouncing, no flashy effects.
// Just a gentle fade + rise as sections enter view.

(function () {
  const revealTargets = document.querySelectorAll(
    '.section-head, .post, .season-card, .recipe-row, .pullquote__inner, .about__left, .about__right, .featured__grid > *, .subscribe__inner'
  );

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)';
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // small stagger for items revealing at the same time
        const peers = entry.target.parentElement
          ? Array.from(entry.target.parentElement.children).filter(c => revealTargets.includes(c) || [...c.classList].some(x => ['post','season-card','recipe-row'].includes(x)))
          : [];
        const index = peers.indexOf(entry.target);
        const delay = index > 0 ? Math.min(index * 80, 400) : 0;

        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealTargets.forEach(el => io.observe(el));

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.transition = 'none';
    });
    io.disconnect();
  }
})();
