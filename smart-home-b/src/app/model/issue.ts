export class Issue {

  static TodoID = 1;
  static DoingID = 2;
  static DoneID = 3;
  static ArchivedID = 4;

  id: number;
  Title: string;
  Description: string;
  Date: Date;
  DeclarationDate: Date;
  IDUrgency: number;
  category: string;
  categoryId: number;
  IDAuthor: number;
  IDStatus: number;
  IDLocation: number;
  Picture: string;
  homesId: number;
  locationName: string;
  statusName: string;

  DateDone: Date = null;

  constructor(idIssue: number, title: string, description: string, dateIncident: Date, dateDeclaration: Date, idUrgency: number,
              idCat: number, categorie: string, idAuthor: number, idStatus: number, status: string, idLocation: number, location: string,
              image: string, idHome: number = -1, DateDone: Date = null) {
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
    this.DateDone = DateDone;
  }
}
