(() => {
  const ARROW = '<svg viewBox="0 0 20 20" fill="none"><path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" stroke-width="1.8"/></svg>';
  const ARROW_UR = '<svg viewBox="0 0 20 20" fill="none"><path d="M5 15 15 5M7 5h8v8" stroke="currentColor" stroke-width="1.8"/></svg>';
  const page = document.body.dataset.page || 'home';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => innerWidth <= 680;
  const TINT = new Set(["10_2.jpg", "10_4.jpg", "12.4-sredina.jpg", "12_1_1-1.jpg", "1850-1.jpg", "19.3.jpg", "2-2-sq.jpg", "3-1.jpg", "HadilnaRebra.jpg", "KUHALNIKMESALO.jpg", "Konusna_posoda_z_vrati.jpg", "MLIN_ZAPRT_2j.jpg", "MLP_1650.jpg", "MLP_1654_1.jpg", "MLP_1658.jpg", "MLP_1687.jpg", "MLP_1693.jpg", "MLP_1721.jpg", "MLP_1745.jpg", "MLP_1749.jpg", "MLP_1800-1.jpg", "MLP_1825.jpg", "MLP_1841.jpg", "MLP_1850.jpg", "MLP_1886.jpg", "MLP_1919.sredina.jpg", "MLP_1939.jpg", "OdprteOglatimiVrati.jpg", "Pasterizator_Zottel_60l_SPIRALA_07-2023.jpg", "Vinifikator_3300L.jpg", "_D9I1886-1.jpg", "_RE_4453-1.jpg", "certifikati-iso.jpg", "ibc_45-dvojna_osnovna.jpg", "kategorija-dodatna-oprema.jpg", "noge-odprte.jpg", "pivo-_20250303.jpg", "transportne.jpg", "vinfikatorji.jpg", "zaprte-hladilni-plasc.jpg", "zaprte-oglata-vrata.jpg"]);
  const img = (f) => 'assets/img/' + (TINT.has(f) ? 's/' : '') + f;
  const catUrl = (s) => 'kategorija.html?k=' + s;
  if (reduced) document.documentElement.classList.add('reduced');

  /* ---------- Header + mega menu ---------- */
  const navItems = [
    ['Izdelki', 'izdelki.html', 'izdelki'],
    ['O nas', 'o-nas.html', 'o-nas'],
    ['Prodajna mreža', 'prodajna-mreza.html', 'mreza'],
    ['Katalog', 'izdelki.html#katalog', 'katalog'],
    ['Kontakt', 'kontakt.html', 'kontakt'],
  ];
  const groupsHtml = Z.groups.map((g) => `<div><h5>${g}</h5>${Z.cats.filter((c) => c.group === g).map((c) => `<a href="${catUrl(c.slug)}" data-img="${c.img}">${c.name}</a>`).join('')}</div>`).join('');
  const hdr = document.createElement('header');
  hdr.className = 'hdr';
  hdr.innerHTML = `
    <a class="logo" href="index.html" aria-label="Zottel domov"><img src="assets/Zottel-logo30.svg" alt="Zottel, 30 let"></a>
    <nav class="nav">
      ${navItems.map(([n, h, k]) => k === 'izdelki'
        ? `<div class="has-mega"><a href="${h}" class="${page === k || page === 'kategorija' ? 'active' : ''}">${n}</a>
            <div class="mega"><div class="mega-feature"><h4>Izdelki iz nerjavnega jekla evropskega porekla</h4><img id="megaImg" src="${img('MLP_1886.jpg')}" alt=""><a class="link-arrow" href="izdelki.html">Vsi izdelki ${ARROW}</a></div><div class="mega-cols">${groupsHtml}</div></div></div>`
        : `<a href="${h}" class="${page === k ? 'active' : ''}">${n}</a>`).join('')}
      <a class="btn" href="kontakt.html">Povpraševanje ${ARROW}</a>
    </nav>
    <button class="burger" aria-label="Meni"><span></span><span></span></button>`;
  document.body.prepend(hdr);
  const megaImg = hdr.querySelector('#megaImg');
  hdr.querySelectorAll('.mega-cols a').forEach((a) => a.addEventListener('mouseenter', () => { megaImg.src = img(a.dataset.img); }));

  const mm = document.createElement('div');
  mm.className = 'mmenu';
  mm.innerHTML = `<a href="izdelki.html">Izdelki</a><div class="sub">${Z.cats.map((c) => `<a href="${catUrl(c.slug)}">${c.name}</a>`).join('')}</div>` +
    navItems.slice(1).map(([n, h]) => `<a href="${h}">${n}</a>`).join('') +
    `<div style="margin-top:32px"><a class="btn" href="kontakt.html" style="font-size:18px;border:0;padding:0 28px;display:inline-flex">Povpraševanje ${ARROW}</a></div>`;
  document.body.appendChild(mm);
  hdr.querySelector('.burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));
  mm.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));

  /* ---------- Footer ---------- */
  const ftr = document.createElement('footer');
  ftr.className = 'ftr';
  ftr.innerHTML = `
    <div class="ftr-top">
      <div class="news"><h5>E-novice</h5><p>Prijavite se na Zottel e-novice in bodite obveščeni o aktualnih novostih in odličnih ponudbah.</p>
        <form onsubmit="event.preventDefault();this.innerHTML='<p style=&quot;color:#8dc63f;margin:0&quot;>Hvala, prijava je uspela.</p>'"><input type="email" required placeholder="Vaš e-naslov" aria-label="E-naslov"><button class="btn">Prijava</button></form></div>
      <div><h5>Izdelki</h5>${Z.cats.slice(0, 6).map((c) => `<a href="${catUrl(c.slug)}">${c.name}</a>`).join('')}<a href="izdelki.html">Vsi izdelki</a></div>
      <div><h5>Podjetje</h5><a href="o-nas.html">O nas</a><a href="prodajna-mreza.html">Prodajna mreža</a><a href="izdelki.html#katalog">Katalog</a><a href="https://www.zottel.si/b2b-dostop" target="_blank" rel="noopener">B2B dostop</a><a href="kontakt.html">Kontakt</a></div>
      <div><h5>Kontakt</h5><a href="mailto:${Z.contact.email}">${Z.contact.email}</a><a href="tel:${Z.contact.phoneHref}">${Z.contact.phone}</a><a href="kontakt.html">Cesta Žalskega tabora 19<br>3310 Žalec, Slovenija</a>
        <div style="margin-top:18px">${Z.social.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('')}</div></div>
    </div>
    <div class="ftr-logo"><img src="assets/Zottel-logo.svg" alt="Zottel"></div>
    <div class="ftr-bottom"><span>© ${new Date().getFullYear()} Zottel d. o. o. &nbsp;·&nbsp; <a href="https://www.zottel.si/pravilnik-o-zasebnosti" target="_blank" rel="noopener">Pravilnik o zasebnosti</a></span>
      <span class="eu"><img src="assets/img/Logo_EKP_sklad_za_regionalni_razvoj_SLO_slogan.png" alt="Evropska unija, Evropski sklad za regionalni razvoj"></span></div>`;
  document.body.appendChild(ftr);

  /* ---------- Page renderers ---------- */
  const cardHtml = (c, i) => `
    <a class="gcard rv" href="${catUrl(c.slug)}" data-group="${c.group}">
      <span class="go">${ARROW_UR}</span>
      <div class="pimg"><img src="${img(c.img)}" alt="${c.name}" loading="lazy"></div>
      <div><small>${c.group}</small><h3>${c.name}</h3></div>
    </a>`;

  if (page === 'izdelki') {
    const grid = document.getElementById('pgrid');
    grid.innerHTML = Z.cats.map(cardHtml).join('');
    const filter = document.getElementById('filter');
    filter.innerHTML = ['Vse', ...Z.groups].map((g, i) => `<button class="${i ? '' : 'on'}" data-g="${g}">${g}</button>`).join('');
    filter.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      filter.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
      grid.querySelectorAll('.gcard').forEach((c) => c.classList.toggle('hidden', b.dataset.g !== 'Vse' && c.dataset.group !== b.dataset.g));
      window.ScrollTrigger && ScrollTrigger.refresh();
    });
  }

  if (page === 'kategorija') {
    const slug = new URLSearchParams(location.search).get('k') || 'posode-za-vino';
    const c = Z.cat(slug) || Z.cats[0];
    document.title = c.name + ' | Zottel';
    document.getElementById('cName').textContent = c.name;
    document.getElementById('cCrumb').textContent = c.name;
    document.getElementById('cIntro').textContent = c.intro;
    document.getElementById('cImg').src = img(c.img);
    document.getElementById('cImg').alt = c.name;
    const t = document.getElementById('cText');
    if (c.text) t.textContent = c.text; else t.closest('.textcols').remove();
    document.getElementById('cGroup').textContent = c.group;
    document.getElementById('cCount').textContent = c.items.length + (c.items.length === 1 ? ' izdelek' : c.items.length < 5 ? ' izdelki' : ' izdelkov');
    document.getElementById('cItems').innerHTML = c.items.map(([n, f]) => `
      <a class="gcard rv ${f ? '' : 'noimg'}" href="kontakt.html?izdelek=${encodeURIComponent(n)}">
        <span class="go">${ARROW_UR}</span>
        <div class="pimg">${f ? `<img src="${img(f)}" alt="${n}" loading="lazy">` : '<span></span>'}</div>
        <div><small>Povpraševanje</small><h3>${n}</h3></div>
      </a>`).join('');
    const others = Z.cats.filter((x) => x.slug !== c.slug && x.group === c.group).concat(Z.cats.filter((x) => x.group !== c.group)).slice(0, 4);
    document.getElementById('cOther').innerHTML = others.map(cardHtml).join('');
  }

  if (page === 'kontakt') {
    const p = new URLSearchParams(location.search).get('izdelek');
    if (p) { const ta = document.getElementById('msg'); ta.value = 'Pozdravljeni, zanima me ponudba za: ' + p + '.'; }
  }

  document.querySelectorAll('form.cform').forEach((f) => f.addEventListener('submit', (e) => { e.preventDefault(); f.classList.add('sent'); f.querySelector('button').disabled = true; }));

  /* Video embed (O nas) */
  document.querySelectorAll('.video[data-yt]').forEach((v) => v.addEventListener('click', () => {
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${v.dataset.yt}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen title="Zottel video"></iframe>`;
  }, { once: true }));

  /* Countries list */
  const cl = document.getElementById('countries');
  if (cl) cl.innerHTML = Z.countries.map(([sl, en]) => `<span data-en="${en}" class="${en === 'Slovenia' ? 'home' : ''}">${sl}</span>`).join('');

  /* ---------- Industries (home) ---------- */
  const ind = document.getElementById('indList');
  if (ind) {
    const vis = document.getElementById('indVisual');
    ind.innerHTML = Z.industries.map((x, i) => `
      <li class="${i ? '' : 'on'}"><button><span class="nm">${x.name}</span><span class="ct">${String(x.cats.length).padStart(2, '0')}</span></button>
        <div class="ind-body"><div><div class="ind-mimg"><img src="${x.img}" alt="${x.name}" loading="lazy"></div><p>${x.text}</p><div class="links">${x.cats.map((s) => `<a href="${catUrl(s)}">${Z.cat(s).name}</a>`).join('')}</div></div></div></li>`).join('');
    vis.innerHTML = Z.industries.map((x, i) => `<img src="${x.img}" alt="${x.name}" class="${i ? '' : 'on'}" loading="${i ? 'lazy' : 'eager'}">`).join('');
    const set = (i) => {
      ind.querySelectorAll('li').forEach((li, j) => li.classList.toggle('on', i === j));
      vis.querySelectorAll('img').forEach((im, j) => im.classList.toggle('on', i === j));
      setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 650);
    };
    ind.querySelectorAll('li').forEach((li, i) => {
      li.querySelector('button').addEventListener('click', () => set(i));
      li.addEventListener('mouseenter', () => { if (!isMobile() && matchMedia('(hover:hover)').matches) set(i); });
    });
  }

  /* ---------- Programme cards (home) ---------- */
  const track = document.getElementById('track');
  if (track) {
    const picks = [
      ['posode-za-vino', 'Odprte in zaprte posode za fermentacijo, shranjevanje in zorenje vina.'],
      ['vodne-stiskalnice-za-sadje', 'Elektropolirana zunanjost. Menjavo membrane opravimo brezplačno.'],
      ['sadni-mlin', 'Kompakten mlin s tremi nastavki za finost mletja.'],
      ['oprema-za-pivovarne', 'Konusne posode za fermentacijo in zorenje piva.'],
      ['posode-za-zganje', 'Posode za destilate in mešalne posode, tudi z mešali ATEX.'],
      ['pasterizatorji-za-sok', 'Pasterizatorja P60 in P90 ter PE200.'],
      ['posode-za-med', 'Z inox pipo za med in protiprašnim pokrovom.'],
    ];
    track.innerHTML = picks.map(([s, d], i) => { const c = Z.cat(s); return `
      <a class="pcard" href="${catUrl(s)}"><span class="idx">${String(i + 1).padStart(2, '0')}</span><span class="go">${ARROW_UR}</span>
        <div class="pimg"><img src="${img(c.img)}" alt="${c.name}" loading="lazy"></div><h3>${c.name}</h3><p>${d}</p></a>`; }).join('') +
      `<a class="pcard more" href="izdelki.html"><span class="d3">Še ${Z.cats.length - picks.length} programov izdelkov</span><div><p>Večnamenski kotli in lonci, IBC posode, brzoparilniki, posode za olje in meso v slanici.</p><div class="link-arrow" style="margin-top:24px">Vsi izdelki ${ARROW}</div></div></a>`;
  }

  /* ---------- World dot map ---------- */
  const mapEl = document.getElementById('map');
  if (mapEl && window.d3 && window.topojson && window.WORLD) {
    const cv = mapEl.querySelector('canvas');
    const ctx = cv.getContext('2d');
    const land = topojson.feature(WORLD, WORLD.objects.countries);
    const names = new Set(Z.countries.map((c) => c[1]));
    const hits = land.features.filter((f) => names.has(f.properties.name));
    const home = land.features.find((f) => f.properties.name === 'Slovenia');
    let dots = [], hlDots = [], W, H, proj, t0 = performance.now(), hl = null;
    const homeLL = [15.17, 46.25];
    const build = () => {
      const r = mapEl.getBoundingClientRect();
      W = r.width; H = W * (isMobile() ? .62 : .48);
      const dpr = Math.min(devicePixelRatio, 2);
      cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      proj = d3.geoEqualEarth().rotate([-20, 0]).fitExtent([[0, 0], [W, H * 1.22]], { type: 'Sphere' });
      proj.translate([proj.translate()[0], proj.translate()[1] - H * .02]);
      // rasterise land + highlighted countries once, then sample pixels (fast)
      const off = document.createElement('canvas'); off.width = Math.ceil(W); off.height = Math.ceil(H);
      const oc = off.getContext('2d', { willReadFrequently: true });
      const path = d3.geoPath(proj, oc);
      oc.fillStyle = 'rgb(1,0,0)'; oc.beginPath(); path(land); oc.fill();
      hits.forEach((f, i) => { oc.fillStyle = `rgb(2,${i + 1},0)`; oc.beginPath(); path(f); oc.fill(); });
      const data = oc.getImageData(0, 0, off.width, off.height).data;
      const step = Math.max(5, W / 230);
      dots = []; hlDots = [];
      for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) {
        const k = (Math.floor(y) * off.width + Math.floor(x)) * 4;
        if (data[k + 3] < 128) continue;
        const hf = data[k] === 2 && hits[data[k + 1] - 1];
        if (hf) hlDots.push([x, y, hf.properties.name, Math.random()]);
        else if (proj.invert([x, y])[1] > -58) dots.push([x, y]);
      }
      build.step = step;
    };
    const draw = (now) => {
      const t = (now - t0) / 1000, s = build.step, r = s * .3;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,.16)';
      for (const [x, y] of dots) { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
      for (const [x, y, n, ph] of hlDots) {
        const a = Math.min(1, Math.max(0, (t * 1.4 - ph * .8)));
        ctx.fillStyle = n === 'Slovenia' ? '#8dc63f' : (hl === n ? '#ffffff' : `rgba(78,150,235,${.55 + .45 * a})`);
        ctx.beginPath(); ctx.arc(x, y, r * (hl === n ? 1.5 : 1.15) * a, 0, 7); ctx.fill();
      }
      const [hx, hy] = proj(homeLL);
      const pulse = (t % 2.4) / 2.4;
      ctx.strokeStyle = `rgba(141,198,63,${1 - pulse})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(hx, hy, 6 + pulse * 40, 0, 7); ctx.stroke();
      ctx.fillStyle = '#8dc63f'; ctx.beginPath(); ctx.arc(hx, hy, 5, 0, 7); ctx.fill();
      // arcs from Žalec
      ctx.lineWidth = 1.1;
      hits.forEach((f, i) => {
        if (f.properties.name === 'Slovenia') return;
        const c = d3.geoCentroid(f);
        const ac = f.properties.name === 'Russia' ? [45, 56] : f.properties.name === 'United States of America' ? [-90, 39] : f.properties.name === 'Norway' ? [9, 61] : c;
        const [ex, ey] = proj(ac);
        const prog = Math.min(1, Math.max(0, t * .9 - i * .04));
        if (!prog) return;
        const mx = (hx + ex) / 2, my = (hy + ey) / 2 - Math.hypot(ex - hx, ey - hy) * .28;
        ctx.strokeStyle = hl === f.properties.name ? 'rgba(255,255,255,.95)' : 'rgba(120,175,240,.38)';
        ctx.beginPath(); ctx.moveTo(hx, hy);
        const N = 30; for (let k = 1; k <= N * prog; k++) { const u = k / N; ctx.lineTo((1 - u) ** 2 * hx + 2 * (1 - u) * u * mx + u * u * ex, (1 - u) ** 2 * hy + 2 * (1 - u) * u * my + u * u * ey); }
        ctx.stroke();
      });
      if (running) requestAnimationFrame(draw);
    };
    let running = false;
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !build.step) build();
      if (e.isIntersecting && !running) { running = true; if (!draw.started) { t0 = performance.now(); draw.started = true; } requestAnimationFrame(draw); }
      else if (!e.isIntersecting) running = false;
    }, { rootMargin: '300px' }).observe(mapEl);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(build, 200); });
    document.querySelectorAll('#countries span').forEach((s) => {
      s.addEventListener('mouseenter', () => { hl = s.dataset.en; });
      s.addEventListener('mouseleave', () => { hl = null; });
    });
  }

  /* ---------- Motion ---------- */
  if (!window.gsap || reduced) { document.querySelectorAll('.rv').forEach((e) => { e.style.opacity = 1; e.style.transform = 'none'; }); document.querySelector('.loader')?.remove(); document.querySelectorAll('.statement .w').forEach((w) => (w.style.opacity = 1)); return; }
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const t = document.querySelector(a.getAttribute('href')); if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -60 }); } }));
  if (location.hash) setTimeout(() => { const t = document.querySelector(location.hash); t && lenis.scrollTo(t, { offset: -60, immediate: true }); }, 300);

  // header hide on scroll down
  let lastY = 0;
  lenis.on('scroll', ({ scroll }) => {
    hdr.classList.toggle('scrolled', scroll > 40);
    hdr.classList.toggle('hide', scroll > 300 && scroll > lastY && !document.body.classList.contains('menu-open'));
    lastY = scroll;
  });

  // Split headings into masked words
  document.querySelectorAll('[data-split]').forEach((el) => {
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((w) => {
            if (!w) return;
            if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(' ')); return; }
            const o = document.createElement('span'); o.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:top;padding:.08em 0 .1em;margin:-.08em 0 -.1em';
            const i = document.createElement('span'); i.className = 'wi'; i.style.display = 'inline-block'; i.textContent = w;
            o.appendChild(i); frag.appendChild(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    if (el.closest('.hero') || el.closest('.phero')) return;
    gsap.from(el.querySelectorAll('.wi'), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: .035, scrollTrigger: { trigger: el, start: 'top 85%' } });
  });

  // Generic reveals
  ScrollTrigger.batch('.rv', { start: 'top 90%', onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .08 }) });

  // Parallax inside frames
  document.querySelectorAll('[data-par]').forEach((el) => {
    const amt = parseFloat(el.dataset.par) || 12;
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // Counters
  document.querySelectorAll('[data-count]').forEach((el) => {
    const end = parseFloat(el.dataset.count), fmt = (v) => el.dataset.sep ? Math.round(v).toLocaleString('de-DE') : Math.round(v);
    const o = { v: el.dataset.from ? parseFloat(el.dataset.from) : 0 };
    el.textContent = fmt(o.v);
    gsap.to(o, { v: end, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = fmt(o.v)), scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // Statement word scrub
  const st = document.querySelector('.statement p');
  if (st) {
    st.innerHTML = st.innerHTML.split(/(\s+)/).map((w) => (/^\s+$/.test(w) || !w ? w : `<span class="w">${w}</span>`)).join('');
    gsap.to(st.querySelectorAll('.w'), { opacity: 1, stagger: .05, ease: 'none', scrollTrigger: { trigger: st, start: 'top 78%', end: 'bottom 45%', scrub: true } });
  }

  // Horizontal programme
  if (track) {
    const mmq = gsap.matchMedia();
    mmq.add('(min-width: 681px)', () => {
      const dist = () => track.scrollWidth - innerWidth;
      const tw = gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.programme', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (s) => gsap.set('.progress i', { scaleX: s.progress }) } });
      return () => tw.kill();
    });
    mmq.add('(max-width: 680px)', () => { const p = track.parentElement; p.style.overflowX = 'auto'; p.style.scrollSnapType = 'x mandatory'; track.querySelectorAll('.pcard').forEach((c) => (c.style.scrollSnapAlign = 'start')); });
  }

  // Catalog cover tilt on scroll
  const cover = document.querySelector('.catalog .cover img');
  if (cover) gsap.fromTo(cover, { rotateY: -18, rotateX: 6, y: 80 }, { rotateY: 0, rotateX: 0, y: -20, ease: 'none', scrollTrigger: { trigger: '.catalog', start: 'top bottom', end: 'bottom 40%', scrub: true } });

  // Map caption hover sync done above. Phero image entrance
  const ph = document.querySelector('.phero-img img');
  if (ph) gsap.from(ph, { y: 120, opacity: 0, duration: 1.4, ease: 'expo.out', delay: .15 });
  const phs = document.querySelectorAll('.phero [data-split] .wi');

  // ---------- Home hero intro ----------
  const loader = document.querySelector('.loader');
  const heroWords = document.querySelectorAll('.hero [data-split] .wi');
  const tanks = document.querySelectorAll('.tank img');
  const intro = () => {
    const tl = gsap.timeline();
    if (heroWords.length) tl.from(heroWords, { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: .05 }, 0);
    if (tanks.length) tl.from(tanks, { yPercent: 105, duration: 1.6, ease: 'expo.out', stagger: { each: .08, from: 'center' } }, .1);
    tl.from('.hero-side > *, .hero-meta', { opacity: 0, y: 24, duration: 1, ease: 'expo.out', stagger: .08 }, .5);
    tl.from(hdr.children, { y: -24, opacity: 0, duration: 1, ease: 'expo.out', stagger: .06 }, .3);
  };
  if (phs.length) gsap.from(phs, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: .04, delay: .1 });

  if (loader) {
    const seen = sessionStorage.getItem('zLoaded');
    if (seen) { loader.remove(); intro(); }
    else {
      sessionStorage.setItem('zLoaded', 1);
      lenis.stop();
      gsap.timeline({ onComplete: () => { loader.remove(); lenis.start(); } })
        .from('.loader img', { opacity: 0, y: 20, duration: .8, ease: 'expo.out' })
        .to('.loader .bar', { scaleX: 1, duration: .9, ease: 'power2.inOut' }, .1)
        .to('.loader img', { opacity: 0, y: -20, duration: .5, ease: 'power2.in' }, 1.05)
        .to(loader, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 1.2)
        .add(intro, 1.5);
    }
  }

  // Hero scroll: tanks rise at different speeds, headline drifts
  if (document.querySelector('.hero')) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    tl.to('.hero-top', { yPercent: -40, opacity: .2, ease: 'none' }, 0);
    document.querySelectorAll('.tank').forEach((t, i) => tl.to(t, { y: () => -innerHeight * (0.06 + Math.abs(i - 2.5) * 0.05), ease: 'none' }, 0));
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();
