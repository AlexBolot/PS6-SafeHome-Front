export class Issue {

  static TodoID = 2;
  static DoingID = 3;
  static DoneID = 1;

  id: number;
  Title: string;
  Description: string;
  Date: Date;
  DeclarationDate: Date;
  IDUrgency: number;
  category: String;
  categoryId: number;
  IDAuthor: number;
  IDStatus: number;
  IDLocation: number;
  Picture: string;
  homesId: number;
  locationName: String;
  statusName: String;

  constructor(idIssue: number, title: string, description: string, dateIncident: Date, dateDeclaration: Date, idUrgency: number,
              idCat: number, categorie: String, idAuthor: number, idStatus: number, status: String, idLocation: number, location: String, image: string, idHome: number = -1) {
    this.id = idIssue;
    this.Title = title;
    this.Description = description;
    this.Date = dateIncident;
    this.DeclarationDate = dateDeclaration;
    this.IDUrgency = idUrgency;
    this.category = categorie;
    this.categoryId = idCat;
    this.IDAuthor = idAuthor;
    this.IDStatus = idStatus;
    this.IDLocation = idLocation;
    this.locationName = location;
    this.Picture = image;
    this.homesId = idHome;
    this.statusName = status;
  }
}
