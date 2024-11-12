function loadClients() {
    const clientsList = document.getElementById("clientsList");
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    
    // Limpiar la lista de clientes en el HTML
    clientsList.innerHTML = ""; 
    
    // Reiniciar todas las consolas a disponibles
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`console${i}`).querySelector("img").src = "img/ps5.png";
    }

    clients.forEach((client, index) => {
        // Crear un contenedor para cada cliente
        const clientContainer = document.createElement("div");
        clientContainer.classList.add("client-container");

        // Crear elementos para la hora, nombre y monto
        const timeBox = document.createElement("div");
        timeBox.classList.add("time-box");
        timeBox.innerText = client.registrationTime;

        const clientInfo = document.createElement("span");
        clientInfo.innerText = `${client.name} - Máquina ${client.machine} - ${client.time} minutos`;

        const amountInput = document.createElement("input");
        amountInput.type = "number";
        amountInput.placeholder = "S/ Monto";
        amountInput.classList.add("amount-input");
        amountInput.dataset.index = index;
        amountInput.value = client.amount || ""; 

        amountInput.addEventListener("input", function() {
            client.amount = parseFloat(amountInput.value) || 0;
            localStorage.setItem("clients", JSON.stringify(clients));
        });

        clientContainer.appendChild(timeBox);
        clientContainer.appendChild(clientInfo);
        clientContainer.appendChild(amountInput);

        clientsList.appendChild(clientContainer);

        // Actualizar el estado de la consola correspondiente
        const consoleImage = document.getElementById(`console${client.machine}`).querySelector("img");
        consoleImage.src = "img/ps5.png"; // Cambiar imagen a 'no disponible'
    });
}

function calcularTotal() {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    let total = 0;

    clients.forEach(client => {
        const amount = parseFloat(client.amount) || 0;
        total += amount;
    });

    document.getElementById("totalDisplay").innerText = total.toFixed(2);
}

function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}:${seconds}`;
}

window.onload = function() {
    loadClients();
    setInterval(updateClock, 1000);
};

function finalizarSesion() {
    window.location.href = "admin_login.html";
}

function exportarAExcel() {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    
    // Crear un arreglo para almacenar los datos de las filas
    const rows = clients.map(client => ({
        "Hora de Ingreso": client.registrationTime,
        "Nombres y Apellidos": client.name,
        "Monto (S/.)": client.amount ? client.amount.toFixed(2) : "0.00"
    }));

    // Crear una hoja de trabajo (workbook) y una hoja (worksheet) de SheetJS
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Agregar la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes Registrados");

    // Exportar el archivo Excel
    XLSX.writeFile(workbook, "Clientes_Registrados.xlsx");
}
function exportarAExcel() {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    
    // Crear un arreglo para almacenar los datos de las filas
    const rows = clients.map(client => ({
        "Hora de Ingreso": client.registrationTime,
        "Nombres y Apellidos": client.name,
        "Tiempo de Uso (minutos)": client.time,
        "Monto (S/.)": client.amount ? client.amount.toFixed(2) : "0.00"
    }));

    // Crear una hoja de trabajo (workbook) y una hoja (worksheet) de SheetJS
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // Agregar la hoja al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes Registrados");

    // Exportar el archivo Excel
    XLSX.writeFile(workbook, "Clientes_Registrados.xlsx");
}
