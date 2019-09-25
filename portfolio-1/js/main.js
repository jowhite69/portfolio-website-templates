window.onload = async () => {
  // retreive the data entered in the data.json file
  let response = await fetch('data.json');
  let data = await response.json();


  initializeWebsite(data);


  function initializeWebsite(data) {
    // update the title fo the website using the website metadata
    document.getElementById('title').innerText = data.metadata.title;

    // inject the user's full name into the webpage
    document.getElementById('fullname').innerText = `${data.personal.contact.firstname} ${data.personal.contact.lastname}`;
    

    const socials = document.getElementById('social-details');
    
    for (let social of data.personal.socials) {
      let a = document.createElement('a');
      let li = document.createElement('li');

      a.setAttribute('href', social.url);
      a.setAttribute('target', '_blank');
      a.innerHTML = `<img src="${social.icon}"/>`;

      li.appendChild(a);
      
      socials.appendChild(li);
    }


    addMenuOptions(data);
    getGithubRepos(data.metadata.github_username);
  }

  function addMenuOptions(data) {
    const options = document.getElementById('menu-options');
    for (let option of data.metadata.menu_options) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.setAttribute('href', option.link);
      a.innerText = option.text;
      li.appendChild(a);
      options.appendChild(li);
    }

    const menuToggle = document.getElementById('menu-toggle');

    menuToggle.onclick = () => {
      menuToggle.classList.toggle('change');
      options.classList.toggle('active');
    }
  }

  async function getGithubRepos(user) {
    // get the latest repositories that are being worked on
    let response = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed`);
    let repos = (await response.json()).slice(0, 4);

    console.log(repos);

    const projectListing = document.getElementById('project-listings');
    for (let repo of repos) {
      let div = document.createElement('div');
      let a = document.createElement('a');
      div.innerText = repo.name;
      a.setAttribute('href', repo.html_url);
      a.setAttribute('target', '_blank');
      a.appendChild(div);
      projectListing.appendChild(a);
    }
  }
}