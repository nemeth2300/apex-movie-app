export type Page = {
  description: string;
  excerpt: string;
  id: number;
  key: string;
  thumbnail: {
    height: number;
    width: number;
    size: null;
    duration: null | number;
    mimetype: string;
    url: string;
  };
  title: string;
};
