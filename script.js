let selectedMachine = null;

function selectMachine(machineNumber) {
    selectedMachine = machineNumber;
    alert("Máquina " + machineNumber + " seleccionada.");
}

function registerClient() {
    const fullName = document.getElementById("fullName").value;
    const time = document.getElementById("time").value;

    if (fullName && selectedMachine && time) {
        const clientData = {
            name: fullName,
            machine: selectedMachine,
            time: time,
            registrationTime: new Date().toLocaleTimeString()
        };

        const clients = JSON.parse(localStorage.getItem("clients")) || [];
        clients.push(clientData);
        localStorage.setItem("clients", JSON.stringify(clients));

        alert("Registro exitoso.");
        window.location.href = "success.html";
    } else {
        alert("Por favor complete todos los campos.");
    }
}

function goToAdminLogin() {
    window.location.href = "admin_login.html";
}
