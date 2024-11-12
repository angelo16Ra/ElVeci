// Cargar solo las máquinas disponibles en el selector de cliente
function loadAvailableMachines() {
    const machineSelect = document.getElementById("machineSelect");
    const machines = JSON.parse(localStorage.getItem("machines")) || [
        { id: 1, status: "available" },
        { id: 2, status: "available" },
        { id: 3, status: "available" }
        // Agregar más máquinas según sea necesario
    ];

    // Limpiar las opciones en el selector de máquinas
    machineSelect.innerHTML = '<option value="">Seleccionar Máquina</option>';

    // Agregar solo las máquinas disponibles al selector
    machines.forEach(machine => {
        if (machine.status === "available") {
            const option = document.createElement("option");
            option.value = machine.id;
            option.textContent = `Máquina ${machine.id}`;
            machineSelect.appendChild(option);
        }
    });

    // Guardar el estado de las máquinas en el almacenamiento local si no está definido
    localStorage.setItem("machines", JSON.stringify(machines));
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("clientName").value;
    const machineId = parseInt(document.getElementById("machineSelect").value);
    const time = parseInt(document.getElementById("playTime").value);

    if (isNaN(machineId) || isNaN(time)) {
        alert("Por favor, selecciona una máquina y tiempo válido.");
        return;
    }

    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    clients.push({ name, machine: machineId, time });
    localStorage.setItem("clients", JSON.stringify(clients));

    // Marcar la máquina seleccionada como ocupada
    const machines = JSON.parse(localStorage.getItem("machines"));
    const machine = machines.find(m => m.id === machineId);
    machine.status = "occupied";
    localStorage.setItem("machines", JSON.stringify(machines));

    alert("Cliente registrado exitosamente.");
    loadAvailableMachines(); // Actualizar la lista de máquinas disponibles para reflejar el cambio
});

// Cargar las máquinas disponibles al cargar la página
window.onload = loadAvailableMachines;
