export interface ResponseAPIPost {
  id:           number;
  title:        string;
  creationDate: Date;
  imageURL:     string;
  userId:       number;
  userEmail:    string;
}
export interface AddPost {
  title:    string;
  image: File;
  userEmail:   string;
}
