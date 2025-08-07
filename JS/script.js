let todos = [];
let currentFilter = 'all';

// Sembunyikan semua section selain dashboard saat pertama kali halaman dimuat
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.hero').classList.remove('hidden');
  document.getElementById('todo-section').classList.add('hidden');
  document.querySelector('.process-section').classList.add('hidden');
  document.getElementById('about-section').classList.add('hidden');
});

// Navigasi: ke section To-Do
function tampilkanTodo() {
  document.querySelector('.hero').classList.add('hidden');
  document.getElementById('about-section').classList.add('hidden');
  document.getElementById('todo-section').classList.remove('hidden');
  document.querySelector('.process-section').classList.remove('hidden');
}

// Navigasi: klik logo kembali ke dashboard
document.getElementById('logo').addEventListener('click', () => {
  document.querySelector('.hero').classList.remove('hidden');
  document.getElementById('todo-section').classList.add('hidden');
  document.querySelector('.process-section').classList.add('hidden');
  document.getElementById('about-section').classList.add('hidden');
});

// Navigasi: klik tombol "Tentang Kami"
document.querySelector(".about-button").addEventListener("click", () => {
  document.querySelector('.hero').classList.add('hidden');
  document.getElementById('todo-section').classList.add('hidden');
  document.querySelector('.process-section').classList.add('hidden');
  document.getElementById('about-section').classList.remove('hidden');
});

// Popup Sosial Media
document.querySelector('.social-button').addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('social-popup').classList.add('show');
});

function tutupPopup() {
  document.getElementById('social-popup').classList.remove('show');
}

// Inisialisasi Flatpickr
flatpickr("#time", {
  enableTime: true,
  dateFormat: "d/m/Y H:i",
  time_24hr: true,
  altInput: true,
  altFormat: "l, d F Y - H:i",
  defaultDate: new Date()
});

// Submit form
document.getElementById("todoForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const task = e.target.task.value;
  const category = e.target.category.value;
  const description = e.target.description.value;
  const time = e.target.time.value;

  const newTodo = {
    task,
    category,
    description,
    time,
    status: 'active',
    showDetails: true
  };

  todos.push(newTodo);
  renderTodos();
  e.target.reset();
});

// Toggle status tugas
function toggleStatus(index) {
  todos[index].status = todos[index].status === 'active' ? 'completed' : 'active';
  renderTodos();
}

// Hapus tugas yang sudah selesai
function deleteCompleted() {
  todos = todos.filter(todo => todo.status !== 'completed');
  renderTodos();
}

// Atur filter tugas
function filterTodos(filter) {
  currentFilter = filter;

  const buttons = document.querySelectorAll('.todo-filter button[data-filter]');
  buttons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === filter) {
      btn.classList.add('active');
    }
  });

  renderTodos();
}

// Tampilkan daftar tugas
function renderTodos() {
  const listContainer = document.getElementById('todo-list');
  listContainer.innerHTML = '';

  todos.forEach((todo, index) => {
    if (currentFilter !== 'all' && todo.status !== currentFilter) return;

    const card = document.createElement('div');
    card.className = `todo-card ${todo.status}`;

    const checkbox = document.createElement('div');
    checkbox.className = 'todo-checkbox';
    checkbox.onclick = () => toggleStatus(index);
    card.appendChild(checkbox);

    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = `${String(index + 1).padStart(2, '0')} - ${todo.task}`;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = todo.showDetails ? '−' : '+';
    toggleBtn.className = 'toggle-btn';
    toggleBtn.onclick = () => {
      todo.showDetails = !todo.showDetails;
      renderTodos();
    };

    header.appendChild(title);
    header.appendChild(toggleBtn);
    card.appendChild(header);

    if (todo.showDetails) {
      const separator = document.createElement('hr');
      card.appendChild(separator);

      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = `Kategori: ${todo.category} | Waktu: ${todo.time}`;
      card.appendChild(meta);

      const desc = document.createElement('div');
      desc.className = 'desc';
      desc.textContent = todo.description;
      card.appendChild(desc);
    }

    listContainer.appendChild(card);
  });
}
