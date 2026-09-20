/* ============================================================
   MAIN: открытие/закрытие категории, финал
   ============================================================ */

// Открыть категорию
function openCategory(name, icon) {
    currentCategory = name;
    currentFilter = 'all';

    document.getElementById('page-main').classList.add('hidden');
    document.getElementById('page-category').classList.add('visible');

    document.getElementById('catHeaderIcon').src = icon;
    document.getElementById('catHeaderTitle').textContent = name;

    const products = productsData[name] || [];
    currentProducts = products;

    // Фильтры
    const filters = filtersData[name] || [];
    const container = document.getElementById('filtersContainer');

    let html = `<div class="filter-chip active" data-filter="all" onclick="setFilter('all')">Все</div>`;
    filters.forEach(filter => {
        html += `<div class="filter-chip" data-filter="${filter}" onclick="setFilter('${filter}')">${filter}</div>`;
    });
    container.innerHTML = html;

    document.getElementById('searchInput').value = '';

    // Скрываем оба блока
    const starsBlock = document.getElementById('starsBlock');
    const robuxBlock = document.getElementById('robuxBlock');

    starsBlock.classList.remove('visible');
    robuxBlock.classList.remove('visible');
    starsBlock.style.display = 'none';
    robuxBlock.style.display = 'none';

    // Убираем класс horizontal (больше не нужен)
    document.getElementById('categoryProducts').classList.remove('horizontal');

    // Сброс форм
    try { resetStarsForm(); } catch(e) { console.warn(e); }
    try { resetRobuxForm(); } catch(e) { console.warn(e); }

    // Показываем нужное
    updateStarsVisibility();
    updateRobuxVisibility();

    renderProducts(products);

    tg.BackButton.show();
}

// Закрыть категорию
function closeCategory() {
    document.getElementById('page-main').classList.remove('hidden');
    document.getElementById('page-category').classList.remove('visible');
    currentCategory = '';
    currentProducts = [];

    document.getElementById('modalOverlay').classList.remove('visible');

    document.getElementById('starsBlock').classList.remove('visible');
    document.getElementById('robuxBlock').classList.remove('visible');
    document.getElementById('starsBlock').style.display = 'none';
    document.getElementById('robuxBlock').style.display = 'none';

    tg.BackButton.hide();
}

// Установить фильтр
function setFilter(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(el => {
        el.classList.toggle('active', el.dataset.filter === filter);
    });

    updateStarsVisibility();
    updateRobuxVisibility();
    filterProducts();
}

// Кнопка "Предложения"
function openMore() {
    tg.openLink('https://t.me/CT_FAMILY_DONAT/20');
}

// Запрет контекстного меню на картинках
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.webkitTouchCallout = 'none';
    }
}, { passive: true });

// BackButton: если модалка открыта → закрывает модалку, иначе → категорию
tg.BackButton.onClick(function() {
    const modalOpen = document.getElementById('modalOverlay').classList.contains('visible');

    if (modalOpen) {
        closeModal();
    } else {
        closeCategory();
    }
});
