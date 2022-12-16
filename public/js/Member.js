const buttons = document.querySelectorAll(".tickets-container > :first-child .bought-trip")

//Sending a request to cancel a ticket
buttons.forEach(button => {
    button.addEventListener("click", async event => {
        const id = event.target.id.split("-")[3]
        var requestOptions = {
            method: 'PATCH',
        };
          
        // Fetch to the good endpoint, and if we had an error, display an alert message
        const res = await fetch("/flight/cancelTicket/" + id, requestOptions);
        if(res.status == 400) {
            const alertModal = document.querySelector(".modal-alert")
            alertModal.style.display = "block";
            alertModal.querySelector("p").innerText = (await res.json()).information;
        }
        else window.location.reload();
    })
});
    