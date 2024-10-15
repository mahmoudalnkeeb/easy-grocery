const id = window.location.pathname.slice(1);

console.log(id);

function saveCheckboxStatus(checkbox) {
  const itemId = checkbox.id;
  const isChecked = checkbox.checked;
  const storageKey = `${id}_${itemId}`;
  localStorage.setItem(storageKey, isChecked);
}

function loadCheckboxStatus() {
  const sections = ['highPriorityList', 'mediumPriorityList', 'lowPriorityList'];
  sections.forEach((section) => {
    const items = document.getElementById(section).querySelectorAll('.grocery-item input[type="checkbox"]');
    items.forEach((item) => {
      const itemId = item.id;
      const storageKey = `${id}_${itemId}`; // Unique key for each checkbox
      const isChecked = localStorage.getItem(storageKey) === 'true'; // Retrieve and convert to boolean
      item.checked = isChecked; // Set checkbox state
    });
  });
}

function setupEventListeners() {
  const sections = ['highPriorityList', 'mediumPriorityList', 'lowPriorityList'];
  sections.forEach((section) => {
    const items = document.getElementById(section).querySelectorAll('.grocery-item input[type="checkbox"]');
    items.forEach((item) => {
      item.addEventListener('change', function () {
        saveCheckboxStatus(this);
      });
    });
  });
}

// Load checkbox statuses when the page is loaded
window.onload = () => {
  loadCheckboxStatus();
  setupEventListeners(); // Set up event listeners for checkboxes
};
