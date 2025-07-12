import { Request } from "express";

/*
Esto es muy importante, ya que nos permitirá realizar las solicitudes sin problemas.
*/

interface Article {
  title: string;
  subtitle: string;
  content: string;
  images: string[];
}

export interface ArticleRequest extends Request {
  article?: Article
}
