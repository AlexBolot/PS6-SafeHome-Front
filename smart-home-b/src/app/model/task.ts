export class Task {
  Text: String;
  id: number;
  IDIssue: number;
  IDAuthor: number;
  IDAssignee: number;

  constructor(Text: String, id: number, IDIssue: number, IDAuthor: number, IDAssignee: number) {
    this.Text = Text;
    this.id = id;
    this.IDIssue = IDIssue;
    this.IDAuthor = IDAuthor;
    this.IDAssignee = IDAssignee;
  }
}
