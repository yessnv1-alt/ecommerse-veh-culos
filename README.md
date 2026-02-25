# 🏎️ GarageOnline - Plataforma E-commerce de Vehículos

GarageOnline es una aplicación web sofisticada y altamente interactiva dedicada a la exhibición y venta de vehículos. Este proyecto ha sido desarrollado como una **Single Page Application (SPA)** técnica, utilizando tecnologías modernas de frontend para ofrecer una experiencia de usuario fluida, accesible y profesional.

---

## 🌟 Características Principales

* **🔄 Consumo de Datos Dinámico:** Los vehículos se cargan en tiempo real desde una API externa (JSON) mediante el uso de `fetch` y `async/await`.
* **📱 Diseño Totalmente Adaptativo:** Interfaz optimizada para móviles, tablets y escritorio utilizando **Bootstrap 5**.
* **🛒 Carrito de Compras Pro:** * Gestión de cantidades mediante modales dinámicos.
    * Contador con animaciones tipo *pulse*.
    * Persistencia de datos en memoria.
* **🔍 Buscador Inteligente:** Filtrado instantáneo por marca, modelo o categoría.
* **📄 Generación de Facturas PDF:** Integración con la librería **jsPDF** para emitir comprobantes de compra legales al instante.
* **🧪 Testing Integrado:** Pruebas unitarias automáticas visibles desde la consola del navegador.

---

## 🛠️ Tecnologías y Herramientas

| Tecnología | Propósito |
| :--- | :--- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estructura semántica y Accesibilidad (WCAG AA). |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Diseño visual, animaciones y maquetado personalizado. |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica de negocio (ES6+), manipulación del DOM y Fetch API. |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) | Framework de diseño responsivo y componentes UI. |
| ![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=flat&logo=font-awesome&logoColor=white) | Iconografía vectorial interactiva. |
| ![jsPDF](https://img.shields.io/badge/jsPDF-000000?style=flat) | Biblioteca para generación dinámica de archivos PDF. |

---

## 🚀 Instalación y Uso Local

Para ejecutar este proyecto en tu computadora local, sigue estos sencillos pasos:

1.  **Clonar o descargar:** Descarga los archivos `index.html`, `style.css` y `script.js`.
2.  **Abrir con VS Code:** Abre la carpeta del proyecto en Visual Studio Code.
3.  **Ejecutar servidor:**
    * Instala la extensión **Live Server**.
    * Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.
4.  **Verificar:** El sitio se abrirá automáticamente en tu navegador predeterminado (usualmente en `http://127.0.0.1:5500`).

---

## 🧪 Pruebas Automatizadas (QA)

El proyecto incluye un módulo de pruebas integrado. Para ver los resultados:
1.  Abre el sitio web en el navegador.
2.  Presiona `F12` o clic derecho -> **Inspeccionar**.
3.  Ve a la pestaña **Console**.
4.  Deberías ver un reporte similar a este:
    > 🧪 Iniciando Pruebas Unitarias...  
    > ✅ PASSED: Carga de datos inicial  
    > ✅ PASSED: Función addItemToCart funciona correctamente  
    > ✅ PASSED: UI del carrito actualizada  

---

## 📁 Estructura del Proyecto

```bash
/
├── index.html   # Estructura principal y Modales de Bootstrap
├── style.css    # Estilos personalizados y animaciones
├── script.js    # Lógica, Fetch API, Carrito y Facturación PDF
└── README.md    # Documentación del proyecto

---

📄 Licencia
Este proyecto es de código abierto y se distribuye con fines educativos.

🚀 Desarrollado con pasión para la era de la Inteligencia Artificial.


👤 Autor
Estudiante: [Tu Nombre Aquí]

Materia: Programación Web / Desarrollo Frontend

Fecha: Febrero 2026

Profesor: [Nombre del Profesor]
