export interface IArticle {
  title: string;
  description: string;
  date: Date;
  modified_date?: Date;
  image?: string;
  disqus?: boolean
  tags: string[];
  categories: string[];
}
