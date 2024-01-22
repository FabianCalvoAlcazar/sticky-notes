import { Component, Inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

import { StickyNoteService } from 'src/app/services/stickyNote.service';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { StickyNoteModel } from 'src/app/models/stickyNote';
import { Router } from '@angular/router';

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
  public newStickyNote!: StickyNoteModel;

  constructor(private _stickyNoteService:StickyNoteService, public _dialog: Dialog, private _router:Router){
    this.user = "";
    this.stickyNotes = [];
    this.thereAreNotes = false;
    this.newStickyNote = new StickyNoteModel("","","",0,0)
    this.getStickyNotes();
  }

  ngOnInit(): void {
  }

  getStickyNotes(){
    var userId = localStorage.getItem("userId");

    this._stickyNoteService.getStickyNotes(userId).subscribe(
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
    const dialogRef = this._dialog.open<any>(AddStickyNoteComponent, {
      width: 'auto'
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        if (result.newNoteTitle == ''){
          this.newStickyNote.title = "New Note";
          this.newStickyNote.text =  result.newNoteText;
        } else {
          this.newStickyNote.title = result.newNoteTitle;
          this.newStickyNote.text= result.newNoteText;
        }

        this.newStickyNote.owner = localStorage.getItem("userId");

        this._stickyNoteService.saveStickyNote(this.newStickyNote).subscribe(
          response => {
            console.log(response.message)
            const currentUrl = this._router.url;
            this._router.navigateByUrl('/empty', { skipLocationChange: true }).then(() => {
              this._router.navigate([currentUrl])
            });
          },
          error => {
            console.log("Error: ", error)
          }
        );
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