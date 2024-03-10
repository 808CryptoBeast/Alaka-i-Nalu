function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');

  sidebar.classList.toggle('active');
  content.classList.toggle('active');
}

// Add the following lines to close the sidebar when clicking outside it
document.addEventListener('click', function (e) {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');
  
  if (!sidebar.contains(e.target) && !content.contains(e.target)) {
    sidebar.classList.remove('active');
    content.classList.remove('active');
  }
});
