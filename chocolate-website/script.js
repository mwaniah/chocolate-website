document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const cocoaContainer = document.getElementById('cocoa-container');

    // Cocoa Dust Animation
    const createCocoaDust = () => {
        if (!cocoaContainer) return;
        const dust = document.createElement('div');
        dust.classList.add('cocoa-dust');
        dust.style.left = `${Math.random() * 100}vw`;
        dust.style.animationDuration = `${Math.random() * 2 + 3}s`; // 3s to 5s duration
        dust.style.animationDelay = `${Math.random() * 2}s`;
        cocoaContainer.appendChild(dust);

        // Remove dust element after it falls
        dust.addEventListener('animationend', () => {
            dust.remove();
        });
    };

    // Create multiple dust particles
    for (let i = 0; i < 50; i++) {
        createCocoaDust();
    }
    
    // Periodically add more dust
    setInterval(createCocoaDust, 200);

    // Intersection Observer for section animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Build a Box functionality
    const addToBoxButtons = document.querySelectorAll('.add-to-box');
    const boxItemsContainer = document.getElementById('box-items');
    const boxTotalElement = document.getElementById('box-total');
    const resetBoxButton = document.getElementById('reset-box');

    let box = {};

    const updateBoxView = () => {
        boxItemsContainer.innerHTML = '';
        let total = 0;
        for (const name in box) {
            const item = box[name];
            const itemElement = document.createElement('div');
            itemElement.classList.add('box-item');
            itemElement.innerHTML = `
                <span>${name} x${item.quantity}</span>
                <span>Ksh${(item.price * item.quantity).toFixed(2)}</span>
            `;
            boxItemsContainer.appendChild(itemElement);
            total += item.price * item.quantity;
        }
        boxTotalElement.textContent = total.toFixed(2);
    };

    addToBoxButtons.forEach(button => {
        button.addEventListener('click', () => {
            const option = button.closest('.chocolate-option');
            const name = option.dataset.name;
            const price = parseFloat(option.dataset.price);

            if (box[name]) {
                box[name].quantity++;
            } else {
                box[name] = { price, quantity: 1 };
            }
            updateBoxView();
        });
    });

    resetBoxButton.addEventListener('click', () => {
        box = {};
        updateBoxView();
    });

    // Checkout Modal Functionality
    const checkoutBtn = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeButton = document.querySelector('.close-button');
    const orderSummaryContainer = document.getElementById('order-summary');
    const checkoutForm = document.getElementById('checkout-form');

    checkoutBtn.addEventListener('click', () => {
        orderSummaryContainer.innerHTML = boxItemsContainer.innerHTML;
        checkoutModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your order! We will contact you shortly to confirm the details.');
        box = {};
        updateBoxView();
        checkoutModal.style.display = 'none';
    });

    const paymentIcons = document.querySelectorAll('.payment-icon');
    paymentIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            paymentIcons.forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
        });
    });
});