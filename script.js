fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('json-viewer');
    container.appendChild(renderNode(data));
  })
  .catch(error => console.error('Error loading JSON:', error));

function renderNode(node) {
  const ul = document.createElement('ul');

  for (const key in node) {
    const li = document.createElement('li');
    const value = node[key];

    const keySpan = document.createElement('span');
    keySpan.classList.add('key');
    keySpan.textContent = key;
    li.appendChild(keySpan);

    const nestedContainer = document.createElement('ul');
    nestedContainer.classList.add('nested');

    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => {
          const itemLi = document.createElement('li');
          itemLi.classList.add('value');
          itemLi.textContent = item;
          nestedContainer.appendChild(itemLi);
        });
      } else {
        nestedContainer.appendChild(renderNode(value));
      }
    } else {
      const valueLi = document.createElement('li');
      valueLi.classList.add('value');
      valueLi.textContent = value;
      nestedContainer.appendChild(valueLi);
    }

    keySpan.addEventListener('click', () => {
      li.classList.toggle('expanded');
    });

    li.appendChild(nestedContainer);
    ul.appendChild(li);
  }

  return ul;
}
