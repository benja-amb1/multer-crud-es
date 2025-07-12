import express from 'express';
import multer from 'multer';
import { addArticle, deleteArticle, updateArticle } from '../controllers/article';

// configurar el almacenamiento Multer
const storage = multer.diskStorage({
  // 1. destination → carpeta donde se guardarán los archivos cargados
  destination: function (req, file, cb) {
    // siempre pasa null como primer argumento (sin error), el segundo es la ruta de la carpeta
    cb(null, './images/articles'); // asegúrese de que esta carpeta exista (siempre en la raíz del proyecto)
  },

  // 2. filename → define el nombre del archivo guardado
  filename: function (req, file, cb) {
    // anteponga una marca de tiempo al archivo para evitar conflictos de nombres
    cb(null, 'articles' + Date.now() + '_' + file.originalname);
  }
});

// crea una instancia de multer con la configuración de almacenamiento
const upload = multer({ storage });

const router = express.Router();

/*
  multer nos da dos metodos:
  - upload.single('fieldName') → para subir un solo archivo
  - upload.array('fieldName', maxCount) → para subir varios archivos

  'file0' es el nombre del campo que el frontend debe usar en FormData.
*/

router.post('/add-article', upload.array('file0', 10), addArticle); // funciona ✅

router.delete('/delete-article/:id', deleteArticle); // funciona ✅

router.put('/update-article/:id', upload.array('file0', 10), updateArticle); // funciona ✅


export default router;
