export class Issue {
  id: number;
  Title: string;
  Description: string;
  Date: Date;
  DeclarationDate: Date;
  IDUrgency: number;
  categoryId: number;
  IDAuthor: number;
  IDStatus: number;
  IDLocation: number;
  Picture: string;
  homesId: number;

  constructor(idIssue: number, title: string, description: string, dateIncident: Date, dateDeclaration: Date, idUrgency: number,
              idCat: number, idAuthor: number, idStatus: number, idLocation: number, image: string, idHome: number = -1) {
    this.id = idIssue;
    this.Title = title;
    this.Description = description;
    this.Date = dateIncident;
    this.DeclarationDate = dateDeclaration;
    this.IDUrgency = idUrgency;
    this.categoryId = idCat;
    this.IDAuthor = idAuthor;
    this.IDStatus = idStatus;
    this.IDLocation = idLocation;
    this.Picture = image;
    this.homesId = idHome;
  }
}
