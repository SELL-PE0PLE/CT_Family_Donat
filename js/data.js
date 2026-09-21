/* ============================================================
   DATA
   ============================================================ */

const productsData = {
    'Telegram': [
        {
            name: 'Telegram Premium',
            desc: 'Подписка Telegram Premium на 1 месяц',
            price: '',
            filter: 'Premium',
            img: 'https://i.ibb.co/RkLvqms5/IMG-20260920-224429-549.jpg',
            options: [
                { label: 'Без входа', price: '265 ₽' },
                { label: 'Со входом', price: '250 ₽' }
            ]
        },
        {
            name: 'Telegram Premium',
            desc: 'Подписка Telegram Premium на 3 месяца',
            price: '',
            filter: 'Premium',
            img: 'https://i.ibb.co/8LhQLbYT/IMG-20260920-224550-595.jpg',
            options: [
                { label: '🎁 Подарком', price: '950 ₽' }
            ]
        },
        {
            name: 'Telegram Premium',
            desc: 'Подписка Telegram Premium на 6 месяцев',
            price: '',
            filter: 'Premium',
            img: 'https://i.ibb.co/xqcQX4Hc/IMG-20260920-224740-600.jpg',
            options: [
                { label: '🎁 Подарком', price: '1150 ₽' }
            ]
        },
        {
            name: 'Telegram Premium',
            desc: 'Подписка Telegram Premium на 12 месяцев',
            price: '',
            filter: 'Premium',
            img: 'https://i.ibb.co/B55rkbc4/IMG-20260920-224844-835.jpg',
            options: [
                { label: '✈️ Без входа', price: '1700 ₽' },
                { label: '✈️ Со входом', price: '1650 ₽' },
                { label: '🎁 Подарком', price: '2050 ₽' }
            ]
        },
        {
            name: 'Telegram Premium',
            desc: 'Подписка Telegram Premium на 24 месяца',
            price: '',
            filter: 'Premium',
            img: 'https://i.ibb.co/1fRbCc0B/IMG-20260920-225006-007.jpg',
            options: [
                { label: '✈️ Без входа', price: '2750 ₽' },
                { label: '✈️ Со входом', price: '2700 ₽' }
            ]
        }
    ],
    'Brawl Stars': [],
    'Roblox': [],
    'Clash Royale': [],
    'Clash of Clans': [],
    'Standoff 2': [
        {
            name: 'Gold',
            desc: 'Игровая валюта Standoff 2 — 100 Gold',
            price: '110 ₽',
            filter: 'Gold',
            img: 'https://i.ibb.co/rfLd3s61/Picsart-26-09-20-15-32-39-663.png'
        },
        {
            name: 'Gold',
            desc: 'Игровая валюта Standoff 2 — 500 Gold',
            price: '500 ₽',
            filter: 'Gold',
            img: 'https://i.ibb.co/DDBFZT5L/Picsart-26-09-20-15-33-04-921.png'
        },
        {
            name: 'Gold',
            desc: 'Игровая валюта Standoff 2 — 1000 Gold',
            price: '820 ₽',
            filter: 'Gold',
            img: 'https://i.ibb.co/HpNB0jbG/Picsart-26-09-20-15-33-25-009.png'
        },
        {
            name: 'Gold',
            desc: 'Игровая валюта Standoff 2 — 3000 Gold',
            price: '1800 ₽',
            filter: 'Gold',
            img: 'https://i.ibb.co/JRCyhbLk/Picsart-26-09-20-15-33-56-538.png'
        }
    ]
};

const filtersData = {
    'Telegram': ['Stars', 'Premium', 'Другое'],
    'Brawl Stars': ['Gems', 'Passes', 'Другое'],
    'Roblox': ['Robux', 'Другое'],
    'Clash Royale': ['Gems', 'Passes', 'Другое'],
    'Clash of Clans': ['Gems', 'Passes', 'Другое'],
    'Standoff 2': ['Gold', 'Gold Passes', 'Другое']
};

let currentCategory = '';
let currentFilter = 'all';
let currentProducts = [];
