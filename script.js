document.addEventListener('DOMContentLoaded', () => {
    // Hämta elementen
    const modal = document.getElementById('artModal');
    const closeButton = document.querySelector('.close-button');
    const galleryItems = document.querySelectorAll('.art-piece');
    
    // NYTT: Hämta filterknapparna
    const filterButtons = document.querySelectorAll('.filter-btn');


    // --- Logik för Modal (Detaljer) ---

    const openModal = (title, artist, imageSrc) => {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-artist').textContent = artist;
        document.getElementById('modal-image').src = imageSrc;
        document.getElementById('modal-image').alt = `Detaljbild av konstverket: ${title} av ${artist}`;

        modal.style.display = 'block';
    };

    galleryItems.forEach(item => {
        const detailsButton = item.querySelector('.view-details');
        
        detailsButton.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const artist = item.getAttribute('data-artist');
            const imageSrc = item.querySelector('img').src; 
            
            openModal(title, artist, imageSrc);
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // --- NY LOGIK: Filtrering ---
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Hämta den valda kategorin (t.ex. 'abstract' eller 'all')
            const filterValue = button.getAttribute('data-filter');
            
            // 2. Uppdatera den aktiva knappen
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 3. Gå igenom alla konstverk och dölj/visa dem
            galleryItems.forEach(piece => {
                const category = piece.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    piece.classList.remove('hidden'); // Visa elementet
                } else {
                    piece.classList.add('hidden'); // Dölj elementet
                }
            });
        });
    });
});