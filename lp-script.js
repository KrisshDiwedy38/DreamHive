// Modal functionality
const modalOverlay = document.getElementById('modal-overlay');
const closeButton = document.getElementById('close-button');
const cadButtons = document.querySelectorAll('[data-trigger="form"]');
const form = document.getElementById('signup-form');
const submitButton = document.getElementById('submit-button');
const loading = document.getElementById('loading');
const successMessage = document.getElementById('success-message');

// Open modal when CAD buttons are clicked
cadButtons.forEach(button => {
    button.addEventListener('click', function() {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal function
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
    
    // Reset form
    form.reset();
    loading.style.display = 'none';
    successMessage.style.display = 'none';
    submitButton.disabled = false;
    submitButton.textContent = 'SUBMIT';
}

// Close modal when close button is clicked
closeButton.addEventListener('click', closeModal);

// Close modal when overlay (background) is clicked
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Google Sheets Integration
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    loading.style.display = 'block';
    successMessage.style.display = 'none';

    // Get form data
    const formData = new FormData(form);
    const data = {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        timestamp: new Date().toISOString()
    };

    try {
        // For demo purposes, we'll simulate a successful submission
        // Replace this with actual Google Sheets submission
        await simulateSubmission(data);
        
        // Show success message
        loading.style.display = 'none';
        successMessage.style.display = 'block';
        submitButton.textContent = 'SUCCESS!';
        
        // Auto-close modal after 2 seconds
        setTimeout(closeModal, 2000);
        
    } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting the form. Please try again.');
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'SUBMIT';
        loading.style.display = 'none';
    }
});

// Simulate submission (replace with actual Google Sheets submission)
async function simulateSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Submitted data:', data);
            resolve();
        }, 1500);
    });
}

// Actual Google Sheets submission function (uncomment when ready to use)

async function submitToGoogleSheets(data) {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}


const calendarPic = document.getElementById('calendar');
const todoPic = document.getElementById('todo');
const journalPic = document.getElementById('journal');
const trackerPic = document.getElementById('track');
const calendarTag = document.getElementById('calendar-tag');
const todoTag = document.getElementById('todo-tag');
const journalTag = document.getElementById('journal-tag');
const trackerTag = document.getElementById('trackers-tag');
const tag = document.querySelectorAll('.tag');

calendarTag.addEventListener('click', () => {
    calendarPic.style.visibility ='visible';
    todoPic.style.visibility = 'hidden';
    journalPic.style.visibility='hidden';
    trackerPic.style.visibility='hidden';
    tagHighlight(0)

})

todoTag.addEventListener('click', () => {
    calendarPic.style.visibility ='hidden';
    todoPic.style.visibility = 'visible';
    journalPic.style.visibility='hidden';
    trackerPic.style.visibility='hidden';
    tagHighlight(1)
})
journalTag.addEventListener('click', () => {
    calendarPic.style.visibility ='hidden';
    todoPic.style.visibility = 'hidden';
    journalPic.style.visibility='visible';
    trackerPic.style.visibility='hidden';
    tagHighlight(2)
})
trackerTag.addEventListener('click', () => {
    calendarPic.style.visibility ='hidden';
    todoPic.style.visibility = 'hidden';
    journalPic.style.visibility='hidden';
    trackerPic.style.visibility='visible';
    tagHighlight(3)
})


function tagHighlight(n){
    let arr = Array.from(tag);
    for ( let i in arr){
        if( i == n ){
            tag[i].style.width = '110%';
        }
        else{
            tag[i].style.width = '70%';
        }
    }
}
