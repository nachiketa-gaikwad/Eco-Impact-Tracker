let selectedFile = null;

// Trigger file input when camera area is clicked
document.getElementById('cameraArea').addEventListener('click', function() {
    triggerFileInput();
});

// Open file picker
function triggerFileInput() {
    document.getElementById('fileInput').click();
}

// Handle file selection
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        selectedFile = file;
        
        // Update UI to show file is selected
        const cameraArea = document.getElementById('cameraArea');
        const fileName = document.getElementById('fileName');
        
        cameraArea.classList.add('has-file');
        fileName.textContent = `Selected: ${file.name}`;
        
        // Automatically process the file
        processFile(file);
    }
});

// Process the uploaded file
function processFile(file) {
    // Show processing overlay
    document.getElementById('processingOverlay').style.display = 'flex';
    
    // Simulate processing time (2-3 seconds)
    setTimeout(() => {
        // Hide processing overlay
        document.getElementById('processingOverlay').style.display = 'none';
        
        // Calculate random credits (between 3-10)
        const creditsEarned = Math.floor(Math.random() * 8) + 3;
        
        // Show success modal
        showSuccessModal(creditsEarned);
        
        // Show credits on the page
        displayCredits(creditsEarned);
        
    }, 2500);
}

// Display credits earned
function displayCredits(credits) {
    const creditsEarnedDiv = document.getElementById('creditsEarned');
    const creditsNumber = document.getElementById('earnedCredits');
    
    creditsNumber.textContent = credits;
    creditsEarnedDiv.style.display = 'block';
}

// Show success modal
function showSuccessModal(credits) {
    const modal = document.getElementById('successModal');
    const modalCredits = document.getElementById('modalCredits');
    
    modalCredits.textContent = credits;
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    
    // Reset for next upload
    resetUpload();
}

// Reset upload UI
function resetUpload() {
    selectedFile = null;
    document.getElementById('fileInput').value = '';
    document.getElementById('cameraArea').classList.remove('has-file');
    document.getElementById('fileName').textContent = 'Click to capture or upload';
    document.getElementById('creditsEarned').style.display = 'none';
}

// Go back to homepage
function goBack() {
    window.location.href = 'homepage.html';
}

// Go to homepage/dashboard
function goToHomepage() {
    window.location.href = 'homepage.html';
}

// Prevent default drag and drop behavior
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    document.getElementById('cameraArea').addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Handle drag and drop
document.getElementById('cameraArea').addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        document.getElementById('fileInput').files = files;
        const event = new Event('change', { bubbles: true });
        document.getElementById('fileInput').dispatchEvent(event);
    }
}