import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { StickyNoteService } from 'src/app/services/stickyNote.service';

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

  constructor(private _stickyNoteService:StickyNoteService){
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
            console.log(this.stickyNotes)

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
}
