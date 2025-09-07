// form-submit.js - Google Sheets Integration Script

// Configuration
const CONFIG = {
    // Replace this with your Google Apps Script Web App URL
    GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyNzvlcL-kRCkBoLZe9KhAvJeLW0X3i7w9I7oSjNOMKmYgjEHvXROIBbzBGLn1WcL8/exec',
    
    // Form selectors
    SELECTORS: {
        form: '#signup-form',
        submitButton: '#submit-button',
        loading: '#loading',
        successMessage: '#success-message',
        modalOverlay: '#modal-overlay',
        closeButton: '#close-button',
        cadTriggers: '[data-trigger="form"]'
    }
};

class FormHandler {
    constructor() {
        this.form = document.querySelector(CONFIG.SELECTORS.form);
        this.submitButton = document.querySelector(CONFIG.SELECTORS.submitButton);
        this.loading = document.querySelector(CONFIG.SELECTORS.loading);
        this.successMessage = document.querySelector(CONFIG.SELECTORS.successMessage);
        this.modalOverlay = document.querySelector(CONFIG.SELECTORS.modalOverlay);
        this.closeButton = document.querySelector(CONFIG.SELECTORS.closeButton);
        this.cadTriggers = document.querySelectorAll(CONFIG.SELECTORS.cadTriggers);
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Form submission
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
        
        // Modal triggers
        this.cadTriggers.forEach(button => {
            button.addEventListener('click', () => this.openModal());
        });
        
        // Modal close events
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modalOverlay) {
            this.modalOverlay.addEventListener('click', (e) => {
                if (e.target === this.modalOverlay) {
                    this.closeModal();
                }
            });
        }
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay?.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        if (this.modalOverlay) {
            this.modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal() {
        if (this.modalOverlay) {
            this.modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            this.resetForm();
        }
    }
    
    resetForm() {
        if (this.form) {
            this.form.reset();
        }
        this.hideLoading();
        this.hideSuccess();
        this.enableSubmitButton();
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Show loading state
        this.showLoading();
        this.disableSubmitButton();
        
        // Collect form data
        const formData = this.collectFormData();
        
        try {
            // Submit to Google Sheets
            await this.submitToGoogleSheets(formData);
            
            // Show success
            this.hideLoading();
            this.showSuccess();
            
            // Auto-close after delay
            setTimeout(() => this.closeModal(), 2000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.handleSubmissionError(error);
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.focus();
                isValid = false;
                return;
            }
            
            // Email validation
            if (field.type === 'email' && !this.isValidEmail(field.value)) {
                field.focus();
                alert('Please enter a valid email address.');
                isValid = false;
                return;
            }
        });
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    collectFormData() {
        const formData = new FormData(this.form);
        
        return {
            firstName: formData.get('first-name') || '',
            lastName: formData.get('last-name') || '',
            email: formData.get('email') || '',
            timestamp: new Date().toISOString(),
            source: 'CAD Website Form'
        };
    }
    
    async submitToGoogleSheets(data) {
        // For development/demo purposes, use simulation
        if (CONFIG.GOOGLE_SCRIPT_URL.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
            return this.simulateSubmission(data);
        }
        
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'no-cors' // Required for Google Apps Script
        });
        
        // Note: With no-cors mode, we can't read the response
        // We'll assume success if no error is thrown
        return { success: true };
    }
    
    // Demo simulation - remove when using real Google Sheets
    simulateSubmission(data) {
        return new Promise((resolve) => {
            console.log('📋 Form Data Submitted:', data);
            setTimeout(resolve, 1500); // Simulate network delay
        });
    }
    
    showLoading() {
        if (this.loading) {
            this.loading.style.display = 'block';
        }
        if (this.successMessage) {
            this.successMessage.style.display = 'none';
        }
    }
    
    hideLoading() {
        if (this.loading) {
            this.loading.style.display = 'none';
        }
    }
    
    showSuccess() {
        if (this.successMessage) {
            this.successMessage.style.display = 'block';
        }
        if (this.submitButton) {
            this.submitButton.textContent = 'SUCCESS!';
            this.submitButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        }
    }
    
    hideSuccess() {
        if (this.successMessage) {
            this.successMessage.style.display = 'none';
        }
    }
    
    disableSubmitButton() {
        if (this.submitButton) {
            this.submitButton.disabled = true;
            this.submitButton.textContent = 'Submitting...';
        }
    }
    
    enableSubmitButton() {
        if (this.submitButton) {
            this.submitButton.disabled = false;
            this.submitButton.textContent = 'SUBMIT';
            this.submitButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
    }
    
    handleSubmissionError(error) {
        this.hideLoading();
        this.enableSubmitButton();
        
        // User-friendly error message
        const errorMessage = this.getErrorMessage(error);
        alert(errorMessage);
    }
    
    getErrorMessage(error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            return 'Network error. Please check your internet connection and try again.';
        }
        
        if (error.status === 429) {
            return 'Too many requests. Please wait a moment and try again.';
        }
        
        return 'There was an error submitting the form. Please try again.';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
    
    // Log setup instructions for easy reference
    console.log(GOOGLE_SHEETS_SETUP.instructions);
});

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormHandler;
}