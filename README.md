# Examen3-Diaz
# 🌟 Muro de Estados Efímero - Proyecto Full Stack

Un muro interactivo en tiempo real donde los usuarios publican **estados cortos** que reemplazan al anterior.  
Solo se muestra **el último estado publicado**, visible para todos los usuarios en tiempo real.  

---

## 📋 Características

- **Autenticación OAuth 2.0** con Google y GitHub.
- **Estados efímeros**: solo se muestra el último mensaje.
- **Actualización en tiempo real** con Socket.IO.
- **Protección con JWT** y cookies seguras.
- **Frontend en React** y **Backend en Express**.
- Estilo moderno y responsivo.

---

## 📂 Estructura del Proyecto

├── backend/
│ ├── package.json
│ ├── server.js
│ ├── config/
│ │ ├── passport.js
│ │ └── jwt.js
│ ├── middleware/
│ │ └── auth.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── api.js
│ └── .env
└── frontend/
├── package.json
├── src/
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ └── App.js
└── public/


## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio
https://github.com/Nicole352/Examen3-Diaz.git
cd examen3
2️⃣ Configuración del Backend

cd backend
npm install
*Variables de Entorno (.env)
Crea un archivo .env en la carpeta backend con el siguiente contenido:

PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=tu_super_secreto_jwt_aqui_cambialo

# Google OAuth
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=tu_github_client_id
GITHUB_CLIENT_SECRET=tu_github_client_secret

# URLs
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000

3️⃣ Configuración del Frontend
cd ../frontend
npm install

▶️ Ejecución
*Backend
cd backend
npm run dev

*Frontend
bash
Copiar
Editar
cd frontend
npm start
📡 Tecnologías Utilizadas
Backend
Node.js + Express
Passport.js (Google & GitHub OAuth)
Socket.IO
JWT (jsonwebtoken)
dotenv, cors, cookie-parser


Frontend
React
Socket.IO Client
Axios
js-cookie

🖼️ Funcionalidades
Iniciar sesión con Google o GitHub.
Publicar un estado (máx. 280 caracteres).
Ver el último estado publicado por cualquier usuario.
Actualización automática sin recargar la página.
Cerrar sesión limpiando cookies y token.


**Capturas**
<img width="1584" height="533" alt="image" src="https://github.com/user-attachments/assets/95bfb4cc-c8d2-4bf2-afe5-72d23e20150f" />


<img width="1600" height="825" alt="image" src="https://github.com/user-attachments/assets/39fd7dd8-794c-4b29-960c-493603e165ac" />


<img width="1600" height="817" alt="image" src="https://github.com/user-attachments/assets/9a883c5c-b895-4ff0-bfc9-fb7fafafaf80" />


<img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/84c2b311-789e-4a80-9a19-6b5afe75d5b9" />


<img width="1590" height="810" alt="image" src="https://github.com/user-attachments/assets/947c98ac-654e-4b1d-ad34-9602919a3b13" />


<img width="1598" height="725" alt="image" src="https://github.com/user-attachments/assets/dc1837f0-01ed-45e0-b6bb-8b69e033a599" />







