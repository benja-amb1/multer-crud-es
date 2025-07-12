## ¿Qué son Multer, fs y path?

- **Multer**: Un middleware para gestionar la carga de archivos en Node.js. Procesa `multipart/form-data` y guarda archivos (como imágenes) en el servidor.

- **fs**: El módulo del sistema de archivos de Node.js. Permite leer, escribir, eliminar y administrar archivos y directorios en el servidor.

- **path**: Un módulo de Node.js utilizado para gestionar y formatear rutas de archivos de forma segura en diferentes sistemas operativos.

[English](https://github.com/benja-amb1/multer-crud)

# Multer CRUD

CRUD básico de artículos con subida, actualización y eliminación de imágenes usando **Express**, **Multer** y **MongoDB**.

---

## Funcionalidades principales

- Crear artículos con imágenes (`POST /api/articles`)
- Actualizar artículos y sus imágenes (`PUT /api/articles/:id`)
- Eliminar artículos y las imágenes asociadas (`DELETE /api/articles/:id`)
- Servir imágenes estáticas desde la carpeta `uploads`

---

## Pasos realizados en el proyecto

1. **Configuración inicial**
   - Creación de los modelos (`models/article.ts`)
   - Definición de la interfaz para las solicitudes (`ArticleReq`)

2. **Configuración del servidor**
   - Archivo principal (`index.ts`) con conexión a MongoDB
   - Uso de middlewares: `express.json()`, `express.urlencoded()`, `cors`
   - Servir la carpeta `uploads` estáticamente (`app.use('/uploads', express.static('uploads'))`)

3. **Rutas y controladores**
   - Creación de rutas para CRUD en `routes/article.ts`
   - Controlador para crear artículos con imágenes (`addArticle`)
   - Controlador para actualizar artículos y reemplazar imágenes (`updateArticle`)
   - Controlador para eliminar artículos y borrar imágenes del servidor (`deleteArticle`)

4. **Uso de Multer**
   - Middleware configurado para recibir archivos (imágenes)
   - Manejo de archivos recibidos en los controladores
   - Guardar rutas relativas de las imágenes en la base de datos

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio

```bash
git clone https://github.com/benja-amb1/multer-crud.git
cd multer-crud
