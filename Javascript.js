   const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

const shopBtn = document.getElementById('shop-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const searchIcon = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-input-container');
const closeSearch = document.querySelector('.close-search');
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

const products = [
  { name: "Yonex Badminton Racket", category: "Rackets", url: "product.html" },
  { name: "Victor Shoes", category: "Footwear", url: "product.html" },
  { name: "Li-Ning T-Shirt", category: "Apparel", url: "product.html" },
  { name: "Badminton Shuttlecocks", category: "Accessories", url: "product.html" },
  { name: "Yonex Arcsaber 11", category: "Professional Rackets", url: "product.html" },
  { name: "Victor Thruster K Falcon", category: "Advanced Rackets", url: "product.html" },
  { name: "Li-Ning Windstorm 72", category: "Beginner Rackets", url: "product.html" }
];

shopBtn.addEventListener('click', () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');

  document.querySelectorAll('.submenu').forEach(menu => {
    menu.classList.remove('open');
  });

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
  });
});


overlay.addEventListener('click', () => {
  closeBtn.click();
});

sidebarLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const submenuId = link.getAttribute('data-submenu');
    const submenu = document.getElementById(`submenu-${submenuId}`);

    submenu.classList.toggle('open');
    link.classList.toggle('active');
  });
});

searchIcon.addEventListener('click', function(e) {
  e.stopPropagation();
  searchContainer.classList.add('active');
  searchInput.focus();
});

closeSearch.addEventListener('click', function() {
  searchContainer.classList.remove('active');
  searchResults.classList.remove('active');
  searchInput.value = '';
});

searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  searchResults.innerHTML = '';

  if (searchTerm.length > 0) {
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.category.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'search-result-item';

        const highlightedName = highlightMatch(product.name, searchTerm);
        const highlightedCategory = highlightMatch(product.category, searchTerm);
        
        item.innerHTML = `
          <div>${highlightedName}</div>
          <div class="search-result-category">${highlightedCategory}</div>
        `;
        item.addEventListener('click', function() {
          window.location.href = product.url;
        });
        searchResults.appendChild(item);
      });
      searchResults.classList.add('active');
    } else {
      searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
      searchResults.classList.add('active');
    }
  } else {
    searchResults.classList.remove('active');
  }
});

function highlightMatch(text, term) {
  if (!term) return text;
  const regex = new RegExp(term, 'gi');
  return text.replace(regex, match => 
    `<span class="search-result-highlight">${match}</span>`
  );
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) {
    searchContainer.classList.remove('active');
    searchResults.classList.remove('active');
  }
});

searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    const searchTerm = this.value.trim();
    if (searchTerm) {
      // Implement your search action here
      console.log('Searching for:', searchTerm);
    }
  }
});
