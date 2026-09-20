/* ============================================================
   ROBUX
   ============================================================ */

function updateRobuxVisibility() {
    const block = document.getElementById('robuxBlock');
    const show = (currentCategory === 'Roblox') &&
                 (currentFilter === 'all' || currentFilter === 'Robux');

    if (show) {
        block.classList.add('visible');
        block.style.display = 'block';
    } else {
        block.classList.remove('visible');
        block.style.display = 'none';
    }
}

function resetRobuxForm() {
    const username = document.getElementById('robuxUsername');
    const amount = document.getElementById('robuxAmount');
    const hint = document.getElementById('robuxHint');
    const btn = document.getElementById('robuxPayBtn');

    if (username) username.value = '';
    if (amount) amount.value = '';
    if (hint) { hint.textContent = 'от 50 до 1500'; hint.classList.remove('error'); }
    if (btn) { btn.disabled = true; btn.textContent = 'Оплатить'; }
}

function setActiveRobuxField(field) {
    if (field === 'username') {
        document.getElementById('robuxUsernameField').classList.add('active');
        document.getElementById('robuxAmountField').classList.remove('active');
    } else {
        document.getElementById('robuxAmountField').classList.add('active');
        document.getElementById('robuxUsernameField').classList.remove('active');
    }
}

function unsetActiveRobuxField() {
    document.getElementById('robuxUsernameField').classList.remove('active');
    document.getElementById('robuxAmountField').classList.remove('active');
}

function onRobuxUsernameInput() {
    const input = document.getElementById('robuxUsername');
    let v = input.value;
    v = v.replace(/[^a-zA-Z0-9_]/g, '');
    v = v.substring(0, 20);
    input.value = v;
    validateRobuxForm();
}

function onRobuxAmountInput() {
    const input = document.getElementById('robuxAmount');
    input.value = input.value.replace(/\D/g, '').substring(0, 4);
    validateRobuxForm();
}

function onRobuxAmountBlur() {
    const input = document.getElementById('robuxAmount');
    const hint = document.getElementById('robuxHint');
    let num = parseInt(input.value, 10);

    if (isNaN(num) || num === 0) {
        hint.textContent = 'от 50 до 1500';
        hint.classList.remove('error');
        unsetActiveRobuxField();
        validateRobuxForm();
        return;
    }

    num = Math.round(num / ROBUX_STEP) * ROBUX_STEP;
    if (num < ROBUX_MIN) num = ROBUX_MIN;
    if (num > ROBUX_MAX) num = ROBUX_MAX;

    input.value = num;
    hint.textContent = 'от 50 до 1500';
    hint.classList.remove('error');
    unsetActiveRobuxField();
    validateRobuxForm();
}

function validateRobuxForm() {
    const username = document.getElementById('robuxUsername').value;
    const amountRaw = document.getElementById('robuxAmount').value;
    const amount = parseInt(amountRaw, 10);
    const hint = document.getElementById('robuxHint');
    const btn = document.getElementById('robuxPayBtn');

    const usernameOk = /^[a-zA-Z0-9_]{3,20}$/.test(username);
    const amountOk = !isNaN(amount) && amount >= ROBUX_MIN && amount <= ROBUX_MAX && amount % ROBUX_STEP === 0;
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
        const total = (amount * ROBUX_RATE).toFixed(2).replace('.', ',');
        btn.textContent = `Оплатить — ${total} ₽`;
    } else {
        btn.textContent = 'Оплатить';
    }
}

function payRobux() {
    const username = document.getElementById('robuxUsername').value;
    const amount = parseInt(document.getElementById('robuxAmount').value, 10);
    const total = (amount * ROBUX_RATE).toFixed(2).replace('.', ',');

    tg.sendData(JSON.stringify({
        action: 'buy_robux',
        username: username,
        amount: amount,
        total: total,
        rate: ROBUX_RATE
    }));

    tg.openLink(SELLER_LINK);
}
