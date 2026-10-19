import { renderButton, renderCard } from '@saas/ui';

const btnContainer = document.getElementById('btn-target');
const cardContainer = document.getElementById('metric-card-target');
const streamContainer = document.getElementById('api-stream');

if (btnContainer) btnContainer.innerHTML = renderButton('Log Out Session');
if (cardContainer) cardContainer.innerHTML = renderCard('System Operations Status', 'Welcome back! Monorepo workspaces share UI modules natively.');

// Async call pointing to unified endpoint managed via our future Nginx deployment config
fetch('/api/v1/data')
  .then(res => res.json())
  .then(data => {
    if (streamContainer) streamContainer.textContent = JSON.stringify(data, null, 2);
  })
  .catch(err => {
    if (streamContainer) streamContainer.textContent = `⚠️ Runtime Failure: Cannot interface with API upstream. Details: ${err.message}`;
  });
