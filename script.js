fetch('data.json')
  .then(res => res.json())
  .then(data => buildMenus(data))
  .catch(err => {
    document.getElementById('output-box').textContent = 'Failed to load data.json.';
    console.error(err);
  });

function buildMenus(data) {
  const container = document.getElementById('menu-container');

  for (const menuName in data) {
    const menuBtn = createToggleButton(menuName);
    const topicDiv = document.createElement('div');
    topicDiv.classList.add('nested');

    const topics = data[menuName]['topics'];
    for (const topicName in topics) {
      const topicBtn = createToggleButton(topicName);
      const detailDiv = document.createElement('div');
      detailDiv.classList.add('nested');

      const topicContent = topics[topicName];
      for (const key in topicContent) {
        const btn = document.createElement('button');
        btn.textContent = key;
        btn.onclick = () => {
          const value = topicContent[key];
          document.getElementById('output-box').textContent =
            `${menuName} → ${topicName} → ${key}:\n` +
            (Array.isArray(value) ? value.join(', ') : value);
        };
        detailDiv.appendChild(btn);
      }

      topicDiv.appendChild(topicBtn);
      topicDiv.appendChild(detailDiv);
    }

    container.appendChild(menuBtn);
    container.appendChild(topicDiv);
  }
}

function createToggleButton(label) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.onclick = () => {
    const next = btn.nextElementSibling;
    if (next) {
      next.style.display = next.style.display === 'block' ? 'none' : 'block';
    }
  };
  return btn;
}
