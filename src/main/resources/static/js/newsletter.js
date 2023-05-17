// Assume 'addNewsletterEmailAPI' is the URL for the endpoint to add a new email to the newsletter list
const addNewsletterEmailAPI = 'http://localhost:8080/newsletter/add';

    // Add an 'onsubmit' event listener for newsletter form
const newsletterForm = document.querySelector('#newsletterForm');

newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newsletterEmail = document.querySelector('#newsletterEmail').value;
    addNewsletterEmail(newsletterEmail);
});

function addNewsletterEmail(newsletterEmail) {
    const formData = new FormData();
    formData.append('newsletterEmail', newsletterEmail);

    fetch(addNewsletterEmailAPI, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        console.log(response.status);
        if (response.ok) {
            alert("Successfully added email to the newsletter list!");
        } else {
            alert("Something went wrong. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error adding email to the newsletter list.");
    });
}




