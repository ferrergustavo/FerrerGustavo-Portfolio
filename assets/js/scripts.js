document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll('.character-card');

    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalDownload = document.getElementById('modalDownload');
    const modalGithub = document.getElementById('modalGithub');
    const modalMedia = document.getElementById('modalMedia');
    const closeModalBtn = document.getElementById('closeModal');

    let activeCard = null;

    function openCard(card) {
        activeCard = card;

        const type = card.dataset.type;


        modalTitle.textContent = card.dataset.title;
        modalDesc.innerHTML = '';

       
        card.dataset.desc.split('|').forEach(text => {
            const li = document.createElement('li');
            li.textContent = text.trim();
            modalDesc.appendChild(li);
        });

       
        modalImg.style.display = 'none';
        modalSketchfab.style.display = 'none';
        modalSketchfab.src = '';
        modalDownload.style.display = 'none';

        if (type === 'game') {
            if (card.dataset.github) {
                modalGithub.href = card.dataset.github;
                modalGithub.style.display = 'inline-flex';
            } else {
                modalGithub.style.display = 'none';
            }
            modalImg.src = card.dataset.image;
            modalImg.style.display = 'block';

            modalDownload.href = card.dataset.download;
            modalDownload.style.display = 'inline-block';
            
        }

        if (type === 'model') {
            modalSketchfab.src = card.dataset.sketchfab;
            modalSketchfab.style.display = 'block';
            if (card.dataset.github) {
                modalGithub.href = card.dataset.github;
                modalGithub.style.display = 'inline-flex';
            } else {
                modalGithub.style.display = 'none';
            }
        }



        modalOverlay.style.display = 'flex';
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
        modalSketchfab.src = '';
        activeCard = null;
    }

    cards.forEach(card => {
        card.addEventListener('click', () => openCard(card));
    });

    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });


   
    const typingText = document.getElementById("typing-text");
    if (!typingText) return;


    const texts = [
        "Game ",
        "Full Stack Web "
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = texts[textIndex];

        if (!isDeleting) {
            charIndex++;
        } else {
            charIndex--;
        }

        typingText.innerHTML =
            `<span class="highlight">${current.slice(0, charIndex)}</span>`;

        if (!isDeleting && charIndex === current.length) {
            setTimeout(() => isDeleting = true, 1200);
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 90);
    }

    typeEffect();
});
