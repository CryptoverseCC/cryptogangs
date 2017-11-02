if (document.readyState === 'complete') {
  run();
} else {
  window.addEventListener('load', run);
}

function run() {
  const config = {
    apiKey: "AIzaSyDG41SYgTflhm8FTJNM_2TbgN8d-VuwF48",
    authDomain: "cryptog-dd7cc.firebaseapp.com",
    databaseURL: "https://cryptog-dd7cc.firebaseio.com",
    projectId: "cryptog-dd7cc",
    storageBucket: "cryptog-dd7cc.appspot.com",
    messagingSenderId: "113104682893"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  database.ref('/gangs').once('value').then((snapshot) => {
    const gangs = Object.values(snapshot.val());

    gangs.forEach((gang) => {
      const gang$ = createGang(gang);
      document.querySelector('.feed').prepend(gang$);
    });
  });
}

function createGang(gang) {
  const element$ = document.createElement('div');
  element$.innerHTML = `
    <div class="content">
      <a href="${gang.url}" target="_blank">
        <img class="content-image" src="${gang.mediaUrl}">
          <div class="content-details fadeIn-bottom">
            <h3 class="content-title">${gang.userName}</h3>
            <p class="crypto content-text">${gang.text}</p>
          </div>
        </a>
      </div>
      `;

  element$.classList.add('container');

  return element$;
}
