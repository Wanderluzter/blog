function loadPage() {
  const hash = location.hash.replace('#', '');
  const [route, param] = hash.split('/');

  if (!route || route === 'home') {
    loadHtmlPage('home');
  } else if (route === 'about') {
    loadHtmlPage('about'); 
  } else if (route === 'posts') {
    loadHtmlPage('posts', loadPosts);
  } else if (route === 'projects') {
    loadHtmlPage('projects', loadProjects);
  } else if (route === 'post' && param) {
    loadSinglePost(param);
  } else {
    document.getElementById('content').innerHTML = '<p>Página não encontrada.</p>';
  }
}

function loadProjects() {
  fetch('data/projects.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('container-cards');
      container.innerHTML = '';

      data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <h2>${project.name}</h2>
          <p>${project.description}</p>
          <a href="${project.url}" target="_blank">Ver Projeto</a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      document.getElementById('container-cards').innerHTML = '<p>Erro ao carregar projetos 😢</p>';
      console.error(err);
    });
}

function loadPosts() {
  fetch('data/posts.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('container-cards');
      container.innerHTML = '';

      data.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <a href="#post/${post.slug}">
            <h2>${post.title}</h2>
            <p><strong>${post.date}</strong></p>
            <p>${post.content.substring(0, 100)}...</p>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      container.innerHTML = '<p>Erro ao carregar posts 😢</p>';
      console.error(err);
    });
}

function loadSinglePost(slug) {
  fetch('data/posts.json')
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.slug === slug);
      if (!post) throw new Error('Post não encontrado');

      document.getElementById('content').innerHTML = `
  <article class="post-card fade-in">
    <h1>${post.title}</h1>
    <p><strong>${post.date}</strong></p>
    <p>${post.content}</p>
    </br>
    <a href="#posts" class="btn">← Voltar para posts</a>
  </article>
`;

    })
    .catch(err => {
      document.getElementById('content').innerHTML = '<p>Post não encontrado 😢</p>';
      console.error(err);
    });
}

function loadHtmlPage(page, callback) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById('content').innerHTML = html;
      if (callback) callback();
    })
    .catch(err => {
      document.getElementById('content').innerHTML = '<p>Erro ao carregar a página 😢</p>';
      console.error(err);
    });
}

window.addEventListener('hashchange', loadPage);
window.addEventListener('load', loadPage);
