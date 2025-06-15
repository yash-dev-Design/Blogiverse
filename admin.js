document.addEventListener('DOMContentLoaded', () => {
    // Basic authentication check: redirect to login if not logged in
    // This is a simple client-side check. For a real app, use server-side authentication.
    if (sessionStorage.getItem('isAdminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return; // Stop execution if not authenticated
    }

    // --- DOM Elements ---
    const logoutBtn = document.getElementById('logout-btn');
    const sidebarMenuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const adminSections = document.querySelectorAll('.admin-section');

    const totalPostsStat = document.getElementById('total-posts');
    const recentPostsList = document.getElementById('recent-posts-list');

    const managePostsSearchInput = document.getElementById('manage-posts-search');
    const managePostsFilterCategory = document.getElementById('manage-posts-filter-category');
    const postsTableBody = document.getElementById('posts-table-body');

    const addPostForm = document.getElementById('add-post-form');

    const editPostModalOverlay = document.getElementById('edit-post-modal-overlay');
    const editPostModal = document.getElementById('edit-post-modal');
    const editModalCloseBtn = document.getElementById('edit-modal-close');
    const editModalCancelBtn = document.getElementById('edit-modal-cancel');
    const editPostForm = document.getElementById('edit-post-form');
    const editPostIdInput = document.getElementById('edit-post-id');
    const editPostTitleInput = document.getElementById('edit-post-title');
    const editPostCategorySelect = document.getElementById('edit-post-category');
    const editPostImageUrlInput = document.getElementById('edit-post-image-url');
    const editPostExcerptInput = document.getElementById('edit-post-excerpt');
    const editPostContentInput = document.getElementById('edit-post-content');

    const deleteConfirmModalOverlay = document.getElementById('delete-confirm-modal-overlay');
    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    const deleteModalCloseBtn = document.getElementById('delete-modal-close');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');

    const toastElement = document.getElementById('toast');
    const toastMessageElement = document.getElementById('toast-message');

    // --- Data Storage (Simulated - In a real app, use a database like Firestore) ---
    // Using localStorage for persistent data across sessions for demonstration.
    // Initializing 'posts' as an empty array if no data exists in localStorage.
    // This ensures that the "Recent Posts" block and "Manage Posts" table are empty
    // until the admin adds new posts.
    let posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Function to save posts to localStorage
    function savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    // --- Utility Functions ---

    // Function to show toast notifications
    function showToast(message, type = 'success') {
        toastMessageElement.textContent = message;
        // Remove existing type classes before adding new one
        toastElement.classList.remove('success', 'error', 'info');
        toastElement.classList.add('show', type); // Add 'show' and the specified type class
        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 3000);
    }

    // Function to show modal
    function showModal(overlayElement) {
        overlayElement.classList.add('show');
    }

    // Function to hide modal
    function hideModal(overlayElement) {
        overlayElement.classList.remove('show');
    }

    // --- Admin Panel Navigation ---
    sidebarMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.dataset.section;

            // Remove 'active' from all menu items and sections
            sidebarMenuItems.forEach(li => li.classList.remove('active'));
            adminSections.forEach(sec => sec.classList.remove('active'));

            // Add 'active' to clicked menu item and corresponding section
            item.classList.add('active');
            document.getElementById(sectionId).classList.add('active');

            // Re-render specific sections when navigated to
            if (sectionId === 'manage-posts') {
                renderManagePostsTable();
            } else if (sectionId === 'dashboard') {
                updateDashboardStats();
                renderRecentPosts();
            }
        });
    });

    // --- Logout Functionality ---
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isAdminLoggedIn'); // Clear login flag
        window.location.href = 'admin-login.html'; // Redirect to login page
    });

    // --- Dashboard Section Functions ---

    // Update statistics on the dashboard
    function updateDashboardStats() {
        totalPostsStat.textContent = posts.length;
        // totalUsers and totalComments are placeholders as no data exists for them in this simulation
        document.getElementById('total-users').textContent = '50+';
        document.getElementById('total-comments').textContent = '120+';
    }

    // Render recent posts in the dashboard
    function renderRecentPosts() {
        recentPostsList.innerHTML = '';
        if (posts.length === 0) {
            recentPostsList.innerHTML = '<p class="text-center">No recent posts to display.</p>';
            return;
        }
        // Display up to 5 most recent posts from the entire collection
        // This will now show only posts added by the admin from a fresh start
        const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        sortedPosts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.classList.add('recent-post-item');
            postItem.innerHTML = `
                <img src="${post.image}" onerror="this.onerror=null;this.src='https://placehold.co/60x60/d1d5db/374151?text=NoImg';" alt="${post.title}" class="recent-post-image">
                <div class="recent-post-content">
                    <h4 class="recent-post-title">${post.title}</h4>
                    <p class="recent-post-meta">Category: ${post.category.charAt(0).toUpperCase() + post.category.slice(1)} | ${post.date}</p>
                </div>
            `;
            recentPostsList.appendChild(postItem);
        });
    }

    // --- Manage Posts Section (CRUD: Read, Update, Delete) ---

    // Render the posts table based on current filters and search
    function renderManagePostsTable() {
        postsTableBody.innerHTML = '';
        const searchQuery = managePostsSearchInput.value.toLowerCase();
        const filterCategory = managePostsFilterCategory.value;

        const filteredPosts = posts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchQuery) ||
                                  post.excerpt.toLowerCase().includes(searchQuery) ||
                                  post.content.toLowerCase().includes(searchQuery);
            const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
            return matchesSearch && matchesCategory;
        });

        if (filteredPosts.length === 0) {
            postsTableBody.innerHTML = '<tr><td colspan="5" class="text-center">No posts found.</td></tr>';
            return;
        }

        filteredPosts.forEach(post => {
            const row = postsTableBody.insertRow();
            row.innerHTML = `
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.category.charAt(0).toUpperCase() + post.category.slice(1)}</td>
                <td>${post.date}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" data-id="${post.id}"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
        });

        // Add event listeners to newly created edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.id);
                openEditPostModal(postId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.id);
                openDeleteConfirmModal(postId);
            });
        });
    }

    // Event listeners for search and filter on manage posts page
    managePostsSearchInput.addEventListener('keyup', renderManagePostsTable);
    managePostsFilterCategory.addEventListener('change', renderManagePostsTable);

    // --- CRUD Operations ---

    // Create (Add) Post
    addPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newPost = {
            // Simple ID generation: finds max existing ID and adds 1, or starts at 1 if no posts
            id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
            title: document.getElementById('post-title').value,
            category: document.getElementById('post-category').value,
            image: document.getElementById('post-image-url').value,
            excerpt: document.getElementById('post-excerpt').value,
            content: document.getElementById('post-content').value,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            comments: 0 // New posts start with 0 comments
        };

        posts.push(newPost); // Add the new post to the array
        savePosts(); // Save the updated array to localStorage
        addPostForm.reset(); // Clear the form
        showToast('Post added successfully!'); // Show success message
        updateDashboardStats(); // Update dashboard counts
        renderRecentPosts(); // Update recent posts list
        renderManagePostsTable(); // Update the manage posts table
    });

    // Read (Populate) Edit Post Modal
    let currentEditPostId = null; // Variable to store ID of the post being edited
    function openEditPostModal(postId) {
        currentEditPostId = postId;
        const postToEdit = posts.find(p => p.id === postId); // Find the post by ID
        if (postToEdit) {
            // Populate the edit form fields
            editPostIdInput.value = postToEdit.id;
            editPostTitleInput.value = postToEdit.title;
            editPostCategorySelect.value = postToEdit.category;
            editPostImageUrlInput.value = postToEdit.image;
            editPostExcerptInput.value = postToEdit.excerpt;
            editPostContentInput.value = postToEdit.content;
            showModal(editPostModalOverlay); // Show the edit modal
        }
    }

    // Update Post
    editPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = parseInt(editPostIdInput.value); // Get post ID from hidden input
        const postIndex = posts.findIndex(p => p.id === postId); // Find post index in array

        if (postIndex !== -1) {
            // Update the post object with new values, keeping original comments/date
            posts[postIndex] = {
                ...posts[postIndex],
                title: editPostTitleInput.value,
                category: editPostCategorySelect.value,
                image: editPostImageUrlInput.value,
                excerpt: editPostExcerptInput.value,
                content: editPostContentInput.value
            };
            savePosts(); // Save updated array to localStorage
            hideModal(editPostModalOverlay); // Hide the modal
            showToast('Post updated successfully!'); // Show success message
            renderManagePostsTable(); // Re-render table after update
            updateDashboardStats(); // Update dashboard counts
            renderRecentPosts(); // Update recent posts list
        }
    });

    // Delete Post
    let postToDeleteId = null; // Variable to store ID of the post to be deleted
    function openDeleteConfirmModal(postId) {
        postToDeleteId = postId;
        showModal(deleteConfirmModalOverlay); // Show delete confirmation modal
    }

    confirmDeleteBtn.addEventListener('click', () => {
        if (postToDeleteId !== null) {
            // Filter out the post to be deleted from the array
            posts = posts.filter(p => p.id !== postToDeleteId);
            savePosts(); // Save the new array to localStorage
            hideModal(deleteConfirmModalOverlay); // Hide the modal
            showToast('Post deleted successfully!', 'error'); // Show error (deletion) message
            renderManagePostsTable(); // Re-render table after delete
            updateDashboardStats(); // Update dashboard counts
            renderRecentPosts(); // Update recent posts list
            postToDeleteId = null; // Reset the ID
        }
    });

    // --- Modal Close Handlers ---
    editModalCloseBtn.addEventListener('click', () => hideModal(editPostModalOverlay));
    editModalCancelBtn.addEventListener('click', () => hideModal(editPostModalOverlay));
    deleteModalCloseBtn.addEventListener('click', () => hideModal(deleteConfirmModalOverlay));
    cancelDeleteBtn.addEventListener('click', () => hideModal(deleteConfirmModalOverlay));

    // Initial renders when admin panel loads
    updateDashboardStats();
    renderRecentPosts();
    renderManagePostsTable(); // Initial render for manage posts section
});
