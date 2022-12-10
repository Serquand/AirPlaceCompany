const buttons = document.querySelectorAll(".tickets-container > :first-child .bought-trip")
buttons.forEach(button => {
    button.addEventListener("click", async event => {
        const id = event.target.id.split("-")[3]
        var requestOptions = {
            method: 'PATCH',
        };
          
        const res = await fetch("/flight/cancelTicket/" + id, requestOptions);
        if(res.status == 400) alert('Error')
        else window.location.reload();
    })
});
    