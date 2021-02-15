import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { StudentAccountService } from '../../../services/student-account.service';
import { Auth } from '../../../../shared/auth';
import { Helper } from '../../../../shared/helper';
import { Message } from '../../../../shared/message';
import { AppModule } from '../../../../app.module';

@Component({
  selector: 'app-send-note',
  templateUrl: './send-note.component.html',
  styleUrls: ['./send-note.component.scss']
})
export class SendNoteComponent implements OnInit {

  // init document
  public doc: any = AppModule.doc;

  public newNotes: string;
  public newNotesUpdate = false;
  @Input() student: any;
  @Input() updateStudent: any;

  constructor(private studentAccountService: StudentAccountService) { }

  /**
   *  load available services for student
   */
  sendNotes() {
    if(this.newNotes) {
      const data = {
        api_token: Auth.getApiToken(),
        student_id: this.student.id,
        notes: this.newNotes
      };
      this.newNotesUpdate = true;
      this.studentAccountService.sendNotes(data).subscribe((r) => {
        this.newNotesUpdate = false;
        this.newNotes = '';
        Message.success(Helper.trans('done'));
        this.updateStudent();
        this.dismis();
      });
    } else
      Message.error(Helper.trans('write some notes'));
  }

  /**
   * dismis notes Modal
   */
  dismis() {
    this.doc.jquery('#notesModal').modal('hide');
  }

  ngOnInit() {
  }

}
