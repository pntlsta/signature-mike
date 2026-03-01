import fs from 'fs';

const PROJECT_PHOTOS = [
  { id: 'atc_model', title: 'ATC Model' },
  { id: 'davidson_bedroom', title: 'Davidson Bedroom' },
  { id: 'gloria_bath', title: 'Gloria Bath' },
  { id: 'grant_foyer', title: 'Grant Foyer' },
  { id: 'Others', title: 'Others' },
  { id: 'pruitt_dining', title: 'Pruitt Dining' },
  { id: 'reinerson_model_home', title: 'Reinerson Model Home' },
  { id: 'resley_patio', title: 'Resley Patio' }
];

const MORE_PROJECTS = [
  { id: 'airbnb_project', title: 'Airbnb Project' },
  { id: 'atc_model_room', title: 'ATC Model Room' },
  { id: 'banks_patio', title: 'Banks Patio' },
  { id: 'bec_model_room', title: 'BEC Model Room' },
  { id: 'bordeaux_steak_seafood', title: 'Bordeaux Steak & Seafood' },
  { id: 'caret_guest_suite', title: 'Caret Guest Suite' },
  { id: 'cianciulli_balcony', title: 'Cianciulli Balcony' },
  { id: 'coca_cola_tournament_home', title: 'Coca Cola Tournament Home' },
  { id: 'davidson_living_room', title: 'Davidson Living Room' },
  { id: 'first_state_bank', title: 'First State Bank' },
  { id: 'frederick_home', title: 'Frederick Home' },
  { id: 'gibbs_living_room', title: 'Gibbs Living Room' },
  { id: 'golf_tournament_guest_suites', title: 'Golf Tournament Guest Suites' },
  { id: 'knox_living_room', title: 'Knox Living Room' },
  { id: 'libby_lee_bedroom', title: 'Libby Lee Bedroom' },
  { id: 'miller_theater', title: 'Miller Theater' },
  { id: 'mount_vintage_home', title: 'Mount Vintage Home' },
  { id: 'resley_family_room', title: 'Resley Family Room' },
  { id: 'resley_office', title: 'Resley Office' },
  { id: 'restley_closet', title: 'Restley Closet' },
  { id: 'showroom_restroom', title: 'Showroom Restroom' },
  { id: 'shuman_bedroom', title: 'Shuman Bedroom' },
  { id: 'signh_bedroom', title: 'Signh Bedroom' }
];

const BEFORE_AND_AFTER = Array.from({length: 11}, (_, i) => ({
  id: `${i + 1}`,
  title: `Project ${i + 1}`
}));

const BEHIND_THE_SCENES = [
  { id: 'behind_the_scenes_1', title: 'Behind the Scenes 1' },
  { id: 'mike_headliner', title: 'Mike Headliner' }
];

function generateGrid(category, items) {
  let gridHtml = '';
  for (const item of items) {
    let imgSrc = '';
    if (category === 'BEFORE_AND_AFTER') {
      const paddedId = item.id.padStart(2, '0');
      imgSrc = `/assets/${category}/${item.id}/before_after_${paddedId}_002.jpeg`; // use after photo as thumb
    } else {
      imgSrc = `/assets/${category}/${item.id}/${item.id}_001.jpeg`;
    }
    
    gridHtml += `
        <a class="collection" href="/project.html?category=${category}&id=${item.id}&title=${encodeURIComponent(item.title)}">
          <div class="collection__media">
            <img class="collection__img" src="${imgSrc}" alt="${item.title}" onerror="this.src='https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80'" />
          </div>
          <div class="collection__body">
            <div class="collection__title">${item.title}</div>
            <div class="collection__meta">View project details</div>
          </div>
        </a>`;
  }
  return gridHtml;
}

function generatePortfolioPage() {
  const projectPhotosGrid = generateGrid('PROJECT_PHOTOS', PROJECT_PHOTOS);
  const beforeAndAfterGrid = generateGrid('BEFORE_AND_AFTER', BEFORE_AND_AFTER);
  const behindTheScenesGrid = generateGrid('BEHIND_THE_SCENES', BEHIND_THE_SCENES);
  const moreProjectsGrid = generateGrid('MORE_PROJECTS', MORE_PROJECTS);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portfolio | Signature Mike</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <header class="header">
    <div class="container header__inner">
      <a class="brand" href="/">
        <span class="brand__name">Signature Mike</span>
        <span class="brand__sub">Interiors & Gifts</span>
      </a>
      <button class="navbtn" id="navBtn">Menu</button>
      <nav class="nav" id="nav">
        <a class="nav__link" href="/">Home</a>
        <a class="nav__link" href="/portfolio.html" style="color: var(--accent-light);">Portfolio</a>
        <a class="nav__link" href="/about.html">About</a>
        <a class="nav__link" href="/services.html">Services</a>
        <a class="nav__link" href="/contact.html">Contact</a>
      </nav>
    </div>
  </header>

  <main>
    <section class="section section--tint">
      <div class="container section__head">
        <div class="eyebrow">Portfolio</div>
        <h1 class="h2">Our Projects</h1>
        <p class="p">Explore our curated collections of residential and commercial interior design projects.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="h3" style="margin-bottom: 32px; font-family: var(--serif); color: var(--accent);">Project Photos</h2>
        <div class="collections" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; margin-bottom: 64px;">
${projectPhotosGrid}
        </div>

        <h2 class="h3" style="margin-bottom: 32px; font-family: var(--serif); color: var(--accent);">Before and After</h2>
        <div class="collections" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; margin-bottom: 64px;">
${beforeAndAfterGrid}
        </div>

        <h2 class="h3" style="margin-bottom: 32px; font-family: var(--serif); color: var(--accent);">Behind The Scenes</h2>
        <div class="collections" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px; margin-bottom: 64px;">
${behindTheScenesGrid}
        </div>

        <h2 class="h3" style="margin-bottom: 32px; font-family: var(--serif); color: var(--accent);">More Projects</h2>
        <div class="collections" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 32px;">
${moreProjectsGrid}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <a class="footer-brand" href="/">Signature Mike</a>
      <div class="footer-grid">
        <div>
          <h3 class="footer-title">Explore</h3>
          <ul class="footer-links">
            <li><a href="/portfolio.html">Portfolio</a></li>
            <li><a href="/about.html">About</a></li>
            <li><a href="/services.html">Services</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer-title">Company</h3>
          <ul class="footer-links">
            <li><a href="#">Press</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>
        </div>
        <div style="grid-column: span 2;">
          <h3 class="footer-title">Visit Us</h3>
          <p style="color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6;">
            3505 Professional Circle<br />
            Augusta, GA 30907<br />
            In the Shops On Furys Ferry<br /><br />
            <a href="mailto:Mike@SignatureMike.com" style="color: #fff;">Mike@SignatureMike.com</a><br />
            <a href="tel:+17064471503" style="color: #fff;">706-447-1503</a>
          </p>
        </div>
      </div>
      <div class="footer-divider"></div>
      <div class="footer-bottom">
        <span>&copy; <span id="year"></span> Signature Mike. All rights reserved.</span>
        <span>Designed with precision.</span>
      </div>
    </div>
  </footer>
  <script src="/script.js"></script>
</body>
</html>`;
}

fs.writeFileSync('./portfolio.html', generatePortfolioPage());

