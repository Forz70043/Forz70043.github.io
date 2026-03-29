/**
 * Projects data & renderer
 * To reorder: move objects in the array.
 * To add: add a new object + matching i18n keys in translations.js
 */
const projects = [
  {
    id: 'project1',
    name: 'Portfolio Website',
    image: '/libs/image/AP-dev1.webp',
    alt: 'Screenshot of Alfonso Pisicchio\'s portfolio website built with HTML, TailwindCSS and JavaScript',
    github: 'https://github.com/Forz70043/Forz70043.github.io',
    stack: [
      { icon: 'devicon-html5-plain colored', name: 'HTML' },
      { icon: 'devicon-tailwindcss-original colored', name: 'TailwindCSS' },
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
    ]
  },
  {
    id: 'project4',
    name: 'Dev-Toolkit',
    image: '/libs/image/dev-kit.gif',
    alt: 'Terminal demo of the dev-toolkit npm package showing CLI utilities in action',
    github: 'https://github.com/Forz70043/dev-toolkit',
    stack: [
      { icon: 'devicon-javascript-plain colored', name: 'JavaScript' },
      { icon: 'devicon-npm-original-wordmark colored', name: 'npm' },
    ]
  },
  {
    id: 'project2',
    name: 'DynamicVH',
    image: '/libs/image/dynamicVH.webp',
    alt: 'Bash script output for creating dynamic Apache virtual hosts on Ubuntu',
    github: 'https://github.com/Forz70043/dynamicVH',
    stack: [
      { icon: 'devicon-bash-plain text-gray-800 dark:text-gray-100', name: 'Bash' },
      { icon: 'devicon-apache-plain colored', name: 'Apache' },
    ]
  },
  {
    id: 'project3',
    name: 'Node API',
    image: '/libs/image/node-api.webp',
    alt: 'Architecture diagram of a REST API integration system built with Node.js and Express',
    github: 'https://github.com/Forz70043/node-api',
    stack: [
      { icon: 'devicon-nodejs-plain colored', name: 'Node.js' },
      { icon: 'devicon-express-original text-gray-800 dark:text-gray-100', name: 'Express' },
    ]
  },
  {
    id: 'project5',
    name: 'Bridge',
    image: '/libs/image/BridgeGIF.gif',
    alt: 'Bridge — native desktop app for managing WSL distributions on Windows, work in progress',
    github: 'https://github.com/Forz70043/bridge',
    stack: [
      { icon: 'devicon-csharp-plain colored', name: 'C#' },
      { icon: 'devicon-dotnetcore-plain colored', name: 'WPF/.NET' },
    ]
  },
  {
    id: 'project6',
    name: 'Shopping List API',
    image: '/libs/image/GroceryListGIF.gif',
    alt: 'Shopping List REST API with JWT authentication and CRUD operations, work in progress',
    github: 'https://github.com/Forz70043/shoppingList',
    stack: [
      { icon: 'devicon-nodejs-plain colored', name: 'Node.js' },
      { icon: 'devicon-express-original text-gray-800 dark:text-gray-100', name: 'Express' },
      { icon: 'devicon-mysql-plain colored', name: 'MySQL' },
    ]
  },
  {
    id: 'project9',
    name: 'Git Prompt',
    image: '/libs/image/GitPromptGIF.gif',
    alt: 'Git Prompt — ultra-fast Git branch indicator for Linux terminal written in Go, work in progress',
    github: 'https://github.com/Forz70043/git-prompt',
    stack: [
      { icon: 'devicon-go-original-wordmark colored', name: 'Go' },
    ]
  },
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map(p => {
    const icons = p.stack.map(s =>
      `<i class="${s.icon}" title="${s.name}"></i>`
    ).join('');

    return `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition p-4">
        <img src="${p.image}" alt="${p.alt}" class="rounded-lg mb-4 w-full aspect-video object-cover" loading="lazy">
        <h3 data-i18n="${p.id}-title" class="font-bold text-xl mb-2"></h3>
        <p data-i18n="${p.id}-desc" class="text-gray-600 dark:text-gray-300 mb-4"></p>
        <div class="flex flex-wrap gap-3 mb-4 text-3xl">${icons}</div>
        <a data-i18n="${p.id}-link-text" href="${p.github}"
          class="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank" rel="noopener noreferrer"
          aria-label="View ${p.id} on GitHub"></a>
      </div>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  if (typeof applyTranslations === 'function') applyTranslations();
});
