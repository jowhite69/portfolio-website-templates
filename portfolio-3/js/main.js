window.onload = () => {

  init();

  async function init() {
    // retreive the data entered in the data.json file
    let response = await fetch('data.json');
    let data = await response.json();

    setupMobileMenu();
    substituteData(data);
    addMenuOptions(data.metadata.menu_options);
    setupAbout(data.metadata.aboutme);
    setupSocialMediaLinks(data.personal.socials);
    getGithubRepos(data.metadata.github_username);
  }

  function substituteData(data) {
    // update the title for the website using the website metadata
    document.getElementById('zt-title').innerText = data.metadata.title;

    document.getElementById('zt-fullname').innerText = `${data.personal.contact.firstname} ${data.personal.contact.lastname}`;
  }

  function setupSocialMediaLinks(socials) {
    const socialDetails = document.getElementById('socialDetails');
    
    for (let social of socials) {
      let a = document.createElement('a');
      let div = document.createElement('div');

      a.setAttribute('href', social.url);
      a.setAttribute('target', '_blank');
      a.innerHTML = `<img src="${social.icon}"/>`;

      div.appendChild(a);
      
      socialDetails.appendChild(div);
    }
  }

  async function getGithubRepos(user) {
    // get the latest repositories that are being worked on
    let response = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed`);
    let repos = (await response.json()).slice(0, 4);

    console.log(repos);

    const projectListing = document.getElementById('projectListings');
    for (let repo of repos) {
      let repoContainer = createRepoContainerEl(repo);
      projectListing.appendChild(repoContainer);
    }
  }

  function createRepoContainerEl(repo) {
    const date = formatDate(repo.updated_at);
    
    const cardTemplate = `
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            ${repo.language 
              ? `<i class="devicon-${repo.language ? repo.language.toLowerCase() : ""}-plain colored is-size-2"></i>`
              : ''
            }
          </div>
          <div class="media-content">
            <p class="title is-4">${repo.name}</p>
          </div>
        </div>
    
        <div class="content">
          ${repo.description ? repo.description : ''}
          <br>
          <small class="has-text-grey-light">Updated ${date}</small>
        </div>
      </div>
    </div>
    `;
    /* create the elements needed for a basic card using bulma css */
    let a = document.createElement('a');
    a.classList.add('column');
    a.innerHTML = cardTemplate;
    a.setAttribute('href', repo.html_url);
    a.setAttribute('target', '_blank');
    return a;
  }

  function setupAbout(about_me) {
    const aboutme = document.getElementById('about');
    aboutme.innerHTML = about_me;
  }

  function addMenuOptions(menu_options) {
    const options = document.getElementById('menuItems');
    for (let option of menu_options) {
      let menuOption = createMenuOptionEl(option);
      options.appendChild(menuOption);
    }
  }

  function createMenuOptionEl(option) {
    let a = document.createElement('a');
    a.setAttribute('href', option.link);
    a.classList.add('navbar-item');
    a.innerText = option.text;
    return a;
  }

  function setupMobileMenu() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  }

  function formatDate(date) {
    const dateObj = new Date(date);

    const options = {/*weekday: 'long',*/ year: 'numeric', month: 'long', day: 'numeric'};

    return dateObj.toLocaleDateString('en-US', options);
  }
}