export interface I_Article {
  id?: string;
  type: "article";
  body: string;
  tags?: string[];
  project?: string;
  createdAt?: any;
  updatedAt?: any;
}
  