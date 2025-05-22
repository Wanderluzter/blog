function loadPage() {
  const page = location.hash.replace('#', '') || 'home';
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error('Page not found');
      return res.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
      if (page === 'projects') {
        loadProjects();
      } else if (page === 'posts') {
        loadPosts();
      }
    })
    .catch(err => {
      document.getElementById('content').innerHTML = '<p>Page not found.</p>';
    });
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
          <img src="${project.image}" alt="${project.name}" />
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
          <img src="${post.image}" alt="${post.title}" />
          <h2>${post.title}</h2>
          <p><strong>${post.date}</strong></p>
          <p>${post.content}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      document.getElementById('container-cards').innerHTML = '<p>Erro ao carregar posts 😢</p>';
      console.error(err);
    });
}

window.addEventListener('hashchange', loadPage);
window.addEventListener('load', loadPage);
