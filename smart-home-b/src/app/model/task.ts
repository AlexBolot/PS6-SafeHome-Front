export class Task {
  Text: String;
  id: number;
  IDIssue: number;
  IDAuthor: number;
  author: String;
  IDAssignee: number;
  assignee: String;
  done: boolean

  constructor(Text: String, id: number, IDIssue: number, IDAuthor: number, IDAssignee: number, author: String, assignee: String, done: boolean) {
    this.Text = Text;
    this.id = id;
    this.IDIssue = IDIssue;
    this.IDAuthor = IDAuthor;
    this.IDAssignee = IDAssignee;
    this.author = author;
    this.assignee = assignee;
    this.done = done;
  }
}
