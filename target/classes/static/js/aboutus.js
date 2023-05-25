let activeModal = null;

function showModal(modalId) {
    if (activeModal) {
        activeModal.style.display = 'none';
    }

    let modal = document.getElementById("modal" + modalId);
    modal.style.display = "block";
    activeModal = modal;
}

function hideModal(modalId) {
    let modal = document.getElementById("modal" + modalId);
    modal.style.display = "none";
    if (activeModal === modal) {
        activeModal = null;
    }
}

window.onclick = function(event) {
    if (activeModal && event.target === activeModal) {
        activeModal.style.display = "none";
        activeModal = null;
    }
};