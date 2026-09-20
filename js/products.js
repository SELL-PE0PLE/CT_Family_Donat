/* ============================================================
   PRODUCTS: отрисовка товаров, фильтрация, поиск
   ============================================================ */

function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    let filtered = currentProducts;

    if (currentFilter && currentFilter !== 'all') {
        filtered = filtered.filter(p => p.filter === currentFilter);
    }

    if (query) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(query)
        );
    }

    renderProducts(filtered);
}

function renderProducts(products) {
    const container = document.getElementById('categoryProducts');

    const hideEmpty =
        (currentCategory === 'Telegram' && (currentFilter === 'all' || currentFilter === 'Stars')) ||
        (currentCategory === 'Roblox' && (currentFilter === 'all' || currentFilter === 'Robux'));

    if (!products || products.length === 0) {
        if (hideEmpty) {
            container.innerHTML = '';
        } else {
            container.innerHTML = `<div class="empty-products">Товаров пока нет</div>`;
        }
        return;
    }

    container.innerHTML = products.map((p, i) => {
        const hasPrice = p.price && p.price.trim() !== '';

        return `
            <div class="product-card" onclick="openProductModal(${i})">
                <img class="product-img" src="${p.img || document.getElementById('catHeaderIcon').src}" alt="${p.name}">
                ${hasPrice ? `
                    <div class="product-info">
                        <div class="product-price">${p.price}</div>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}
