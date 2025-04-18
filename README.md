# 📝 To Do List Fullstack – NestJS + NextJS + WebSockets

Aplicación fullstack de lista de tareas desarrollada con **NestJS** en el backend y **NextJS** en el frontend. Permite al usuario autenticarse, realizar operaciones CRUD sobre sus tareas, y recibir notificaciones en tiempo real mediante **WebSockets**. Todo el proyecto está dockerizado y sigue principios de arquitectura limpia.

---

## 🚀 Tecnologías utilizadas

- 🔧 **Backend**: NestJS, TypeORM, PostgreSQL, JWT, Socket.IO
- 🎨 **Frontend**: NextJS App Router, Redux Toolkit, Material UI, CSS Modules
- 🐳 **Docker**: Docker y Docker Compose para levantar toda la app
- 🔌 **WebSockets**: Comunicación en tiempo real entre pestañas con Socket.IO
- 🛠 **Validaciones**: DTOs, Pipes y Guards personalizados
- 📜 **Documentación**: Swagger para endpoints REST

---

## 📁 Estructura del proyecto

```
todo-app/
├── backend/              # API NestJS + WebSockets
│   ├── src/
│   │   ├── auth/         # Módulo de autenticación (JWT)
│   │   ├── tasks/        # CRUD de tareas + gateway Socket.IO
│   │   ├── users/        # Módulo de usuarios
│   │   └── app.module.ts
├── frontend/             # Cliente NextJS (App Router)
│   ├── src/
│   │   ├── app/          # Rutas /dashboard, /login, /edit, etc.
│   │   ├── store/        # Redux Toolkit slices
│   │   ├── components/   # Sidebar, Topbar, Modales
│   │   └── lib/          # Conexión a socket
├── docker-compose.yml    # Levanta frontend, backend y base de datos
```

---

## ⚙️ Instalación y levantamiento

### 🚨 Requisitos previos

- Tener instalado Docker y Docker Compose

### ▶️ Levantar con Docker

```bash
docker-compose up --build
```

- Frontend disponible en: [http://localhost:3000](http://localhost:3000)
- Backend disponible en: [http://localhost:4000](http://localhost:4000)
- Swagger en: [http://localhost:4000/api](http://localhost:4000/api)

---

## 👤 Usuario de prueba

Puedes usar este usuario para iniciar sesión:

```
📧 Email: reto@blindariesgos.com
🔐 Contraseña: Reto123
```
 Si esta es la primera vez que utiliza el sistema, por favor, no olvide registrarlo.


## 🔐 Autenticación

- Login vía JWT
- Token persistido en `localStorage`
- Rutas protegidas con guards en backend y middleware en frontend
- Token enviado en el header: `Authorization: Bearer <token>`

---

## 📦 Funcionalidades principales

### ✅ Tareas

- Crear, ver, editar y eliminar tareas
- Estado `done` modificable desde dashboard
- Edición y creación mediante **modales dinámicos**
- Cambios reflejados en tiempo real

### 🔔 Notificaciones en tiempo real

- Al crear, editar o eliminar tareas se muestran toasts automáticos
- Implementado con `react-hot-toast` y `Socket.IO`

### 🔄 Reactividad entre pestañas

- Abre varias pestañas en `/dashboard`
- Realiza un cambio en una y se actualiza automáticamente en todas

---

## 🔧 Endpoints disponibles (Swagger)

Disponible en:

```
http://localhost:4000/api
```

Incluye:

- `POST /auth/login`
- `POST /users/register`
- `GET/POST/PATCH/DELETE /tasks` (con JWT)

---

## 📁 Variables de entorno

### 🔐 backend/.env

```
PORT=4000
JWT_SECRET=supersecreto
DATABASE_HOST=db
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=tododb
```

### 🌐 frontend/.env

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## ✅ Bonus: Buenas prácticas aplicadas

- ✔️ Separación por módulos y responsabilidades
- ✔️ Principios SOLID y DTOs con validación
- ✔️ Pipes para transformar datos
- ✔️ Guards para rutas protegidas
- ✔️ Clean architecture en backend y frontend
- ✔️ WebSockets desacoplados mediante Gateway

---

## 🧠 Posibles mejoras

- Filtros por estado de tarea (pendientes / completadas)
- Subtareas o etiquetas
- Modo offline con persistencia temporal
- Soporte multiusuario real

---

## 🧑‍💻 Autor

Desarrollado por **Blindariesgos** como reto técnico.  
¡Gracias por revisar el proyecto! 🚀
