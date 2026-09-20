/* ============================================================
   STARS
   ============================================================ */

function updateStarsVisibility() {
    const block = document.getElementById('starsBlock');
    const show = (currentCategory === 'Telegram') &&
                 (currentFilter === 'all' || currentFilter === 'Stars');

    if (show) {
        block.classList.add('visible');
        block.style.display = 'block';
    } else {
        block.classList.remove('visible');
        block.style.display = 'none';
    }
}

function resetStarsForm() {
    const username = document.getElementById('starsUsername');
    const amount = document.getElementById('starsAmount');
    const hint = document.getElementById('starsHint');
    const btn = document.getElementById('starsPayBtn');

    if (username) username.value = '';
    if (amount) amount.value = '';
    if (hint) { hint.textContent = 'от 50 до 1500'; hint.classList.remove('error'); }
    if (btn) { btn.disabled = true; btn.textContent = 'Оплатить'; }
}

function setActiveField(field) {
    if (field === 'username') {
        document.getElementById('starsUsernameField').classList.add('active');
        document.getElementById('starsAmountField').classList.remove('active');
    } else {
        document.getElementById('starsAmountField').classList.add('active');
        document.getElementById('starsUsernameField').classList.remove('active');
    }
}

function unsetActiveField() {
    document.getElementById('starsUsernameField').classList.remove('active');
    document.getElementById('starsAmountField').classList.remove('active');
}

function onUsernameInput() {
    const input = document.getElementById('starsUsername');
    let v = input.value;
    v = v.replace(/^@+/, '');
    v = v.replace(/[^a-zA-Z0-9_]/g, '');
    v = v.substring(0, 32);
    input.value = v ? '@' + v : '';
    validateStarsForm();
}

function onAmountInput() {
    const input = document.getElementById('starsAmount');
    input.value = input.value.replace(/\D/g, '').substring(0, 4);
    validateStarsForm();
}

function onAmountBlur() {
    const input = document.getElementById('starsAmount');
    const hint = document.getElementById('starsHint');
    let num = parseInt(input.value, 10);

    if (isNaN(num) || num === 0) {
        hint.textContent = 'от 50 до 1500';
        hint.classList.remove('error');
        unsetActiveField();
        validateStarsForm();
        return;
    }

    num = Math.round(num / STARS_STEP) * STARS_STEP;
    if (num < STARS_MIN) num = STARS_MIN;
    if (num > STARS_MAX) num = STARS_MAX;

    input.value = num;
    hint.textContent = 'от 50 до 1500';
    hint.classList.remove('error');
    unsetActiveField();
    validateStarsForm();
}

function validateStarsForm() {
    const username = document.getElementById('starsUsername').value;
    const amountRaw = document.getElementById('starsAmount').value;
    const amount = parseInt(amountRaw, 10);
    const hint = document.getElementById('starsHint');
    const btn = document.getElementById('starsPayBtn');

    const usernameOk = username.length >= 6 && /^@[a-zA-Z0-9_]{5,32}$/.test(username);
    const amountOk = !isNaN(amount) && amount >= STARS_MIN && amount <= STARS_MAX && amount % STARS_STEP === 0;
    const allOk = usernameOk && amountOk;

    if (amountRaw && !amountOk) {
        hint.textContent = 'введите число от 50 до 1500, кратное 50';
        hint.classList.add('error');
    } else {
        hint.textContent = 'от 50 до 1500';
        hint.classList.remove('error');
    }

    btn.disabled = !allOk;
    if (allOk) {
        const total = (amount * STARS_RATE).toFixed(2).replace('.', ',');
        btn.textContent = `Оплатить — ${total} ₽`;
    } else {
        btn.textContent = 'Оплатить';
    }
}

function payStars() {
    const username = document.getElementById('starsUsername').value;
    const amount = parseInt(document.getElementById('starsAmount').value, 10);
    const total = (amount * STARS_RATE).toFixed(2).replace('.', ',');

    tg.sendData(JSON.stringify({
        action: 'buy_stars',
        username: username,
        amount: amount,
        total: total,
        rate: STARS_RATE
    }));

    tg.openLink(SELLER_LINK);
       }
