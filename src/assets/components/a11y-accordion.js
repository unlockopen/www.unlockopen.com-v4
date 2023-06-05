'use strict';

function startDom() {
  // Get all accordion headings
  let headings = document.querySelectorAll('[data-accordion]');

  // Wrap content in a button
  for (let heading of headings) {
    // Get the content attribute
    let contentAttribute = heading.getAttribute('data-accordion');

    // Get the content
    let content = heading.nextElementSibling;
    if (!content) continue;

    // Create a button, and copy heading content into it
    let btn = document.createElement('button');
    btn.innerHTML = heading.innerHTML;

    // Wipe the heading content, and replace it with the button
    heading.innerHTML = '';
    heading.append(btn);

    // Hide the content
    content.setAttribute('hidden', '');

    // Add ARIA
    btn.setAttribute('aria-expanded', false);
  }
}

startDom();

document.addEventListener('click', clickHandler);

function clickHandler(event) {
  // Only run on accordion buttons
  let accordion = event.target.closest('[data-accordion]');
  if (!accordion) return;

  // Get the content associated with the accordion
  let content = accordion.nextElementSibling;
  if (!content) return;

  // If the content is expanded, hide it
  // Otherwise, show it
  if (event.target.getAttribute('aria-expanded') === 'true') {
    event.target.setAttribute('aria-expanded', false);
    content.setAttribute('hidden', '');
  } else {
    event.target.setAttribute('aria-expanded', true);
    content.removeAttribute('hidden');
  }
}
