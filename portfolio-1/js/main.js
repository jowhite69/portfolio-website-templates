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
    addMenuOptions(data);
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
  }
}