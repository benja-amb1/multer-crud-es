import { Request, Response } from "express";
import { ArticleRequest } from "../interfaces/ArticleReq.interface";
import mongoose from 'mongoose'
import Article from "../models/article";
import path from 'path'
import fs from 'fs'
import article from "../models/article";

//aqui usamos ArticleRequest
export const addArticle = async (req: ArticleRequest, res: Response): Promise<any> => {
  try {
    const { title, subtitle, content } = req.body;

    // 1. Acceda a los archivos cargados desde Multer
    const images = req.files as Express.Multer.File[];

    // 2. Extraer rutas de archivos de las imágenes cargadas
    const imagesPath = images.map(img => img.path);

    // 3. Validar los campos obligatorios
    if (!title || !subtitle || !content || !imagesPath.length) {
      return res.status(400).json({ status: false, message: "All fields are required." });
    }

    // 4. Crear nuevo documento de artículo
    const article = new Article({
      title,
      subtitle,
      content,
      images: imagesPath // ¡¡¡retornar imagesPath!!!
    });

    // 5. Guardar en database
    await article.save();

    // 6. responder con exito
    return res.status(201).json({
      status: true,
      message: "Article created successfully.",
      data: article
    });

  } catch (error) {
    console.error("Error creating article:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};


//aqui usamos ArticleRequest
export const deleteArticle = async (req: ArticleRequest, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid article ID." });
    }

    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ status: false, message: "Article not found." });
    }

    // eliminar imágenes del disco
    if (article.images && article.images.length > 0) {
      for (const imagePath of article.images) {
        try {
          fs.unlinkSync(path.resolve(imagePath)); // ¡¡¡IMPORTANTE!!!
        } catch (err) {
          console.warn(`Could not delete image ${imagePath}:`, err);
        }
      }
    }

    // eliminar arituclo de la bd
    await Article.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Article deleted successfully.",
    });

  } catch (error) {
    console.error("Error deleting article:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};


//aqui usamos ArticleRequest
export const updateArticle = async (req: ArticleRequest, res: Response): Promise<any> => {
  try {
    const { title, subtitle, content } = req.body;
    const { id } = req.params;

    // 1. Acceda a los archivos cargados desde Multer
    const images = req.files as Express.Multer.File[];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid article ID." });
    }

    if (!title || !subtitle || !content) {
      return res.status(400).json({ status: false, message: "Title, subtitle, and content are required." });
    }


    // 2. ¡IMPORTANTE! findById
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ status: false, message: "Article not found." });
    }

    // 3. eliminar imagenes viejas
    if (article.images && article.images.length > 0) {
      for (const oldImg of article.images) {
        try {
          fs.unlinkSync(path.join(oldImg));
        } catch (error) {
          console.warn(`Error deleting image ${oldImg}:`, error);
        }
      }
    }

    // 4. Extraer rutas de archivos de las imágenes cargadas
    const imagesPath = images.map(img => img.path);

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, subtitle, content, images: imagesPath }, //retornar imagesPath
      { new: true }
    );

    res.status(200).json({ status: true, message: "Article updated successfully.", data: updatedArticle });

  } catch (error) {
    console.error("Error updating article:", error);
    return res.status(500).json({ status: false, message: "Server error." });
  }
};