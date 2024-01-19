import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { StickyNoteService } from 'src/app/services/stickyNote.service';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { STRING_TYPE } from '@angular/compiler';

// Used by component add-sticky-notes
export interface DialogData {
  newNoteTitle: string;
  newNoteText: string;
}

@Component({
  selector: 'app-my-sticky-notes',
  templateUrl: './my-sticky-notes.component.html',
  styleUrls: ['./my-sticky-notes.component.scss'],
  providers: [StickyNoteService]
})
export class MyStickyNotesComponent implements OnInit{
  public user:any;
  public stickyNotes:Array<any>
  public thereAreNotes: boolean;

  public newStickyNote= {
    newNoteTitle: "",
    newNoteText: ""
  }

  constructor(private _stickyNoteService:StickyNoteService, public dialog: Dialog){
    this.user = "";
    this.stickyNotes = [];
    this.thereAreNotes = false;
    this.getStickyNotes();
  }

  ngOnInit(): void {
  }

  getStickyNotes(){
    this._stickyNoteService.getStickyNotes().subscribe(
      response => {
        if (response) {
          this.user = response.user;
          this.stickyNotes = response.message;

          if (response.message != "Nothing to show"){
            this.thereAreNotes = true;
          }
        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log("Something went wrong.")
      }
    );
  }

  async addStickyNote(){
    const dialogRef = this.dialog.open<any>(AddStickyNoteComponent, {
      width: '1000px',
      data: {
        newNoteTitle: String, 
        newNoteText: String
      }
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        if (result.newNoteTitle == ''){
          this.newStickyNote.newNoteTitle = "New Note";
          this.newStickyNote.newNoteText =  result.newNoteText;
          console.log(this.newStickyNote)
        } else {
          this.newStickyNote.newNoteTitle = result.newNoteTitle;
          this.newStickyNote.newNoteText= result.newNoteText;
          console.log(this.newStickyNote)
        }
      } else {
        console.log('canceled')
      }
    });
  }
}

@Component({
  selector: 'app-add-sticky-note',
  standalone: true,
  imports: [
    FormsModule,
    EditorModule
  ],
  templateUrl: 'add-sticky-note.html',
  styleUrl: 'add-sticky-note.scss'
})
export class AddStickyNoteComponent {

  skin!: any;
  content_css!: any;
  
  public data = {
    newNoteTitle: '', 
    newNoteText: ''
  }
  
  constructor(
    public dialogRef: DialogRef<any>,
  ) {
    this.skin = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide')
    this.content_css = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')
  }
}