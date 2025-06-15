// DOMContentLoaded listener to ensure the HTML is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Toggle for Mobile ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Event listener for hamburger menu click
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active'); // Toggle 'active' class on nav-menu
        hamburger.classList.toggle('active'); // Toggle 'active' class on hamburger
    });

    // --- Dynamic Content Loading (Simulated Posts) ---
    // This array holds the post data. In a real application, this would come from a database.
    const allPosts = [
        {
            id: 1,
            category: 'technology',
            image: 'https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZpY2lhbCUyMGludGVsbGlnZW5jZXxlbnwwfHwwfHx8MA%3D%3D',
            title: 'The Future of AI in Everyday Life',
            excerpt: 'Explore how artificial intelligence is set to transform various aspects of our daily routines, from smart homes to personalized experiences.',
            date: 'May 28, 2025',
            comments: 3
        },
        {
            id: 2,
            category: 'lifestyle',
            image: 'https://images.unsplash.com/photo-1659177121700-bc9c36da8a40?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluZGZ1bCUyMExpdmluZyUzQSUyMEF%20ndWlkZSUyMHRvJTIwSW5uZXIlMjBQZWFjZXxlbnwwfHwwfHx8MA%3D%3D',
            title: 'Mindful Living: A Guide to Inner Peace',
            excerpt: 'Discover practical tips and techniques for incorporating mindfulness into your busy life to achieve greater calm and well-being.',
            date: 'May 25, 2025',
            comments: 5
        },
        {
            id: 3,
            category: 'travel',
            image: 'https://images.unsplash.com/photo-1704314315344-cd10b9779ce6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fDEwJTIwTXVzdCUyMFZpc2l0JTIwRGVzdGluYXRpb25zJTIwaW4lMjBTb3V0aGVhc3QlMjBBc2lhfGVufDB8fDB8fHww',
            title: '10 Must-Visit Destinations in Southeast Asia',
            excerpt: 'Embark on a virtual journey through stunning landscapes and vibrant cultures with our top picks for your next adventure.',
            date: 'May 22, 2025',
            comments: 8
        },
        {
            id: 4,
            category: 'education',
            image: 'https://images.unsplash.com/photo-1682310916704-8f91c1a1b66b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEVmZmVjdGl2ZSUyMFN0dWR5JTIwSGFiaXRzJTIwZm9yJTIwQ29sbGVnZSUyMFN0dWRlbnRzfGVufDB8MHwwfHx8MA%3D%3D',
            title: 'Effective Study Habits for College Students',
            excerpt: 'Boost your academic performance with proven strategies for time management, note-taking, and exam preparation.',
            date: 'May 19, 2025',
            comments: 2
        },
        {
            id: 5,
            category: 'technology',
            image: 'https://plus.unsplash.com/premium_photo-1700942979302-72ef87e43525?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VGhlJTIwUmlzZSUyMG9mJTIwUXVhbnR1bSUyMENvbXB1dGluZ3xlbnwwfDB8MHx8fDA%3D',
            title: 'The Rise of Quantum Computing',
            excerpt: 'Delve into the fascinating world of quantum computing and its potential to revolutionize industries and solve complex problems.',
            date: 'May 16, 2025',
            comments: 6
        },
        {
            id: 6,
            category: 'lifestyle',
            image: 'https://plus.unsplash.com/premium_photo-1681827729342-f16ad41200e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGVhbHRoeSUyMExpZmV8ZW58MHwwfDB8fHww',
            title: 'Healthy Living: Tips for a Balanced Life',
            excerpt: 'Learn about simple habits that can lead to a healthier and more fulfilling life, covering diet, exercise, and mental well-being.',
            date: 'May 14, 2025',
            comments: 4
        },
        {
            id: 7,
            category: 'travel',
            image: 'https://images.unsplash.com/photo-1629792644612-9950553f1aa3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8RXhwbG9yaW5nJTIwRXVyb3BlYW4lMjBDYXBpdGFscyUzQSUyMEElMjBHcmFuZCUyMFRvdXJ8ZW58MHx8MHx8fDA%3D',
            title: 'Exploring European Capitals: A Grand Tour',
            excerpt: 'A comprehensive guide to the most captivating capital cities in Europe, highlighting their history, culture, and attractions.',
            date: 'May 10, 2025',
            comments: 7
        },
        {
            id: 8,
            category: 'education',
            image: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFRoZSUyMEJlbmVmaXRzJTIwb2YlMjBPbmxpbmUlMjBMZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D',
            title: 'The Benefits of Online Learning',
            excerpt: 'Understand how online learning platforms are transforming education and offering flexible opportunities for students worldwide.',
            date: 'May 07, 2025',
            comments: 1
        }
    ];

    const postsGrid = document.getElementById('posts-grid');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // --- Function to Display Posts ---
    // Clears the current posts and renders new ones based on the provided array.
    function displayPosts(postsToDisplay) {
        postsGrid.innerHTML = ''; // Clear existing posts
        if (postsToDisplay.length === 0) {
            postsGrid.innerHTML = '<p class="text-center">No articles found matching your criteria.</p>';
            return;
        }
        postsToDisplay.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card', 'fade-in-post');
            postCard.setAttribute('data-category', post.category);
            postCard.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="post-image">
                <div class="post-content">
                    <span class="post-category">${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="post-meta">
                        <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="far fa-comments"></i> ${post.comments} Comments</span>
                    </div>
                    <!-- Read More button removed as per request -->
                </div>
            `;
            postsGrid.appendChild(postCard);
        });
    }

    // --- Function to Filter and Search Posts ---
    // Filters posts based on category and search query.
    function filterAndSearchPosts() {
        const searchQuery = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

        const filteredPosts = allPosts.filter(post => {
            const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                                  post.excerpt.toLowerCase().includes(searchQuery) ||
                                  post.category.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
        displayPosts(filteredPosts);
    }

    // --- Event Listeners for Category Filters ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');
            filterAndSearchPosts(); // Re-filter posts
        });
    });

    // --- Event Listener for Search Input ---
    searchInput.addEventListener('keyup', filterAndSearchPosts); // Filter on key up

    // --- Scroll to Top Button Functionality ---
    // Shows/hides the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // Scrolls to the top when the button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll animation
        });
    });

    // --- Contact Form Submission (Basic Simulation) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            // In a real application, you would send this data to a server
            showToast('Message sent successfully!', 'success');
            contactForm.reset(); // Clear the form
        });
    }

    // --- Newsletter Form Submission (Basic Simulation) ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            // In a real application, you would send this data to a server
            showToast('Subscribed to newsletter!', 'success');
            newsletterForm.reset(); // Clear the form
        });
    }

    // --- Toast Notification Function ---
    // Displays a temporary notification message.
    function showToast(message, type = 'info') {
        let toast = document.querySelector('.toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.classList.add('toast');
            document.body.appendChild(toast);
        }

        toast.innerHTML = `
            <div class="toast-content">
                <i class="toast-icon fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <p>${message}</p>
            </div>
        `;
        toast.classList.add(type);
        toast.classList.add('show');

        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.remove(type);
        }, 3000);
    }

    // Initial display of posts when the page loads
    displayPosts(allPosts);
});
