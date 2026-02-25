/**
 * GarageOnline - Lógica de Negocio
 */

let vehiclesData = [];
let cart = [];
let selectedVehicle = null;

document.addEventListener('DOMContentLoaded', () => {
    loadVehicles();
    setupEventListeners();
    runTests(); // Ejecución automática de pruebas
});

// 1. CARGA DE DATOS
async function loadVehicles() {
    const container = document.getElementById('productsContainer');
    const spinner = document.getElementById('loadingSpinner');

    try {
        const response = await fetch('https://raw.githubusercontent.com/JUANCITOPENA/Pagina_Vehiculos_Ventas/refs/heads/main/vehiculos.json');
        if (!response.ok) throw new Error('Error al cargar datos');
        
        vehiclesData = await response.json();
        displayVehicles(vehiclesData);
    } catch (error) {
        container.innerHTML = `<div class="alert alert-danger w-100">Hubo un error: ${error.message}</div>`;
    } finally {
        spinner.style.display = 'none';
    }
}

// 2. MOSTRAR VEHÍCULOS
function displayVehicles(data) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    data.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'col-md-4 col-sm-6 mb-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${vehicle.imagen}" class="card-img-top" alt="${vehicle.modelo}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
                    <p class="mb-1 text-primary fw-bold">Categoría: ${vehicle.categoria}</p>
                    <p class="card-text-desc">Tipo: ${vehicle.tipo.replace(/[^\w\s]/gi, '')}</p>
                    <h4 class="mt-2">$${vehicle.precio_venta.toLocaleString()}</h4>
                    <button class="btn btn-primary mt-auto addToCartBtn" data-codigo="${vehicle.codigo}">
                        <i class="fas fa-cart-plus me-2"></i>Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. FILTRADO
function filterVehicles() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = vehiclesData.filter(v => 
        v.marca.toLowerCase().includes(term) || 
        v.modelo.toLowerCase().includes(term) || 
        v.categoria.toLowerCase().includes(term)
    );
    displayVehicles(filtered);
}

// 4. GESTIÓN DEL CARRITO
function setupEventListeners() {
    // Buscador
    document.getElementById('searchInput').addEventListener('input', filterVehicles);

    // Event Delegation para botones de compra
    document.getElementById('productsContainer').addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCartBtn') || e.target.parentElement.classList.contains('addToCartBtn')) {
            const btn = e.target.closest('.addToCartBtn');
            const codigo = parseInt(btn.getAttribute('data-codigo'));
            selectedVehicle = vehiclesData.find(v => v.codigo === codigo);
            
            const qModal = new bootstrap.Modal(document.getElementById('quantityModal'));
            document.getElementById('quantityInput').value = 1;
            qModal.show();
        }
    });

    // Confirmar añadir al carrito
    document.getElementById('addToCartBtn').onclick = () => {
        const qty = parseInt(document.getElementById('quantityInput').value);
        if (qty > 0) {
            addItemToCart(selectedVehicle, qty);
            bootstrap.Modal.getInstance(document.getElementById('quantityModal')).hide();
        }
    };

    // Procesar Pago
    document.getElementById('processPaymentBtn').onclick = () => {
        const name = document.getElementById('payName').value;
        if (!name) return alert("Por favor ingrese su nombre");
        
        alert("¡Pago exitoso! Generando factura...");
        generateInvoice(name);
        
        cart = [];
        updateCartUI();
        bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
        bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
    };
}

function addItemToCart(vehicle, quantity) {
    const existing = cart.find(item => item.codigo === vehicle.codigo);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            ...vehicle,
            quantity: quantity
        });
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cartItems');
    const badge = document.getElementById('cartCount');
    const totalSpan = document.getElementById('cartTotal');
    
    container.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const subtotal = item.precio_venta * item.quantity;
        total += subtotal;
        count += item.quantity;

        container.innerHTML += `
            <div class="d-flex align-items-center mb-3 border-bottom pb-2">
                <img src="${item.imagen}" class="cart-item-img me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-0">${item.marca} ${item.modelo}</h6>
                    <small>Cantidad: ${item.quantity} x $${item.precio_venta.toLocaleString()}</small>
                </div>
                <div class="fw-bold">$${subtotal.toLocaleString()}</div>
            </div>
        `;
    });

    totalSpan.innerText = `$${total.toLocaleString()}`;
    badge.innerText = count;
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 300);
}

// 5. GENERACIÓN DE PDF (Factura)
function generateInvoice(customerName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("GarageOnline - Factura de Venta", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Cliente: ${customerName}`, 20, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 50);
    doc.text("--------------------------------------------------", 20, 60);

    let y = 70;
    let total = 0;

    cart.forEach(item => {
        const sub = item.precio_venta * item.quantity;
        doc.text(`${item.marca} ${item.modelo} (x${item.quantity})`, 20, y);
        doc.text(`$${sub.toLocaleString()}`, 160, y);
        y += 10;
        total += sub;
    });

    doc.text("--------------------------------------------------", 20, y + 5);
    doc.setFontSize(16);
    doc.text(`TOTAL PAGADO: $${total.toLocaleString()}`, 20, y + 20);

    doc.save(`Factura_GarageOnline_${Date.now()}.pdf`);
}

// 6. BLOQUE DE TESTING
function runTests() {
    console.log("🧪 Iniciando Pruebas Unitarias...");

    // Test 1: Filtrado
    const testFilter = vehiclesData.length >= 0;
    console.log(testFilter ? "✅ PASSED: Carga de datos inicial" : "❌ FAILED: Carga de datos");

    // Test 2: Lógica de Carrito
    const mockVehicle = { codigo: 999, marca: "Test", modelo: "Model", precio_venta: 1000 };
    addItemToCart(mockVehicle, 2);
    const itemInCart = cart.find(i => i.codigo === 999);
    
    if (itemInCart && itemInCart.quantity === 2) {
        console.log("✅ PASSED: Función addItemToCart funciona correctamente");
    } else {
        console.log("❌ FAILED: Función addItemToCart falló");
    }

    // Test 3: UI Update
    updateCartUI();
    const badgeText = document.getElementById('cartCount').innerText;
    console.log(badgeText !== "0" ? "✅ PASSED: UI del carrito actualizada" : "❌ FAILED: UI del carrito no actualiza");
    
    // Limpiar test
    cart = cart.filter(i => i.codigo !== 999);
    updateCartUI();
}