/* ============================================================
   MODAL: модальное окно товара
   ============================================================ */

let modalProduct = null;
let modalSelectedOption = -1;

// Открыть модалку
function openProductModal(index) {
    const visible = currentProducts.filter(p => {
        if (currentFilter && currentFilter !== 'all') {
            return p.filter === currentFilter;
        }
        return true;
    });

    const p = visible[index];
    if (!p) return;

    modalProduct = p;
    modalSelectedOption = -1;

    document.getElementById('modalImg').src = p.img || document.getElementById('catHeaderIcon').src;
    document.getElementById('modalTitle').textContent = p.name || 'Товар';
    document.getElementById('modalDesc').textContent = p.desc || '';

    const optionsWrap = document.getElementById('modalOptionsWrap');
    const optionsEl = document.getElementById('modalOptions');
    const buyBtn = document.getElementById('modalBuyBtn');

    // Если есть options
    if (p.options && p.options.length > 0) {
        optionsWrap.style.display = 'block';

        optionsEl.innerHTML = p.options.map((opt, i) => `
            <button class="modal-option" onclick="selectOption(${i})" id="modalOption${i}">
                <div class="modal-option-radio"></div>
                <div class="modal-option-label">${opt.label}</div>
            </button>
        `).join('');

        buyBtn.disabled = true;
        buyBtn.textContent = 'Выберите способ';
    } else {
        optionsWrap.style.display = 'none';
        optionsEl.innerHTML = '';

        buyBtn.disabled = false;
        buyBtn.textContent = p.price || 'Купить';
    }

    document.getElementById('modalOverlay').classList.add('visible');
}

// Выбор способа
function selectOption(index) {
    if (!modalProduct || !modalProduct.options) return;

    modalSelectedOption = index;

    document.querySelectorAll('.modal-option').forEach(el => {
        el.classList.remove('selected');
    });

    const selectedEl = document.getElementById('modalOption' + index);
    if (selectedEl) selectedEl.classList.add('selected');

    const opt = modalProduct.options[index];
    const buyBtn = document.getElementById('modalBuyBtn');

    buyBtn.disabled = false;
    buyBtn.textContent = opt.price;
}

// Закрыть модалку
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('visible');
    modalProduct = null;
    modalSelectedOption = -1;
}

// Купить
function buyFromModal() {
    if (!modalProduct) return;

    let price = modalProduct.price || '';
    let optionLabel = '';

    if (modalProduct.options && modalProduct.options.length > 0) {
        if (modalSelectedOption < 0) return;

        const opt = modalProduct.options[modalSelectedOption];
        price = opt.price;
        optionLabel = opt.label;
    }

    tg.sendData(JSON.stringify({
        action: 'buy',
        product: modalProduct.name,
        option: optionLabel,
        price: price,
        category: currentCategory,
        filter: currentFilter
    }));

    tg.openLink(SELLER_LINK);
}
