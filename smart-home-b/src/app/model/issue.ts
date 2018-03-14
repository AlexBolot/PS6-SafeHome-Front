export class Issue {
  idIssue: number;
  title: string;
  description: string;
  dateIncident: Date;
  dateDeclaration: Date;
  idUrgency: number;
  idCat: number;
  idAuthor: number;
  idStatus: number;
  idLocation: number;
  image: string;
  idHome: number;

  constructor(idIssue: number, title: string, description: string, dateIncident: Date, dateDeclaration: Date, idUrgency: number,
              idCat: number, idAuthor: number, idStatus: number, idLocation: number, image: string, idHome: number = -1) {
    this.idIssue = idIssue;
    this.title = title;
    this.description = description;
    this.dateIncident = dateIncident;
    this.dateDeclaration = dateDeclaration;
    this.idUrgency = idUrgency;
    this.idCat = idCat;
    this.idAuthor = idAuthor;
    this.idStatus = idStatus;
    this.idLocation = idLocation;
    this.image = image;
    this.idHome = idHome;
  }
}
