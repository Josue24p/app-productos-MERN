import multer from 'multer';
import path from 'path';

//Otras librerías de validación Jimp, image-size, image-type

//Destination: Similar al primer script, guarda los archivos en uploads/.
//la carpeta uploads más que todo es para cuando quiero guardar en este caso si subo imagenes en type file poder guardar localmente en este caso en esa ruta
const storage = multer.diskStorage({
    destination: (req, file, cb) => { //los 2 puntos para que sobresalga una carpeta arriba
        cb(null, 'uploads/')  // Asegúrate de que este directorio exista o que multer lo cree
    },
    //Filename: Utiliza la fecha actual para crear un nombre único y mantiene la extensión original del archivo usando path.extname, lo cual es más sencillo y limpio que en el primer script.
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) // Nombre del archivo
    }
});

// fileFilter: Define un filtro que solo acepta archivos cuya propiedad mimetype comienza con "image", lo que significa que solo permitirá imágenes. Esto es útil para prevenir que se suban archivos potencialmente peligrosos o no deseados.
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024*1024*5} //Límite de tamaño del archivo (5MB)
});

export default upload;
