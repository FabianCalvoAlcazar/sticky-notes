import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { StickyNoteModel } from 'src/app/models/stickyNote';
import { StickyNoteService } from 'src/app/services/stickyNote.service';


@Component({
  selector: 'app-stickynote',
  standalone: true,
  imports: [
    EditorModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './stickynote.component.html',
  styleUrl: './stickynote.component.scss'
})
export class StickynoteComponent implements OnInit{
  
  @Input() stickyNote!: StickyNoteModel;

  skin!: any;
  content_css!: any;

  public timeoutId:any;
  public saving:boolean = false;
  public saved:boolean = false

  constructor(private _stickyNoteService: StickyNoteService){}

  ngOnInit(): void {
    this.skin = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide')
    this.content_css = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default')
  }

  changeDetected(){
    if(this.saving){
      clearTimeout(this.timeoutId);
    }

    this.save();
  }

  save(){
    this.saving = true;
    this.timeoutId = setTimeout( () => {
      this._stickyNoteService.updateStickyNote(this.stickyNote).subscribe(
        response => {
          console.log(response)
        }
      )
      this.saving = false;
      this.saved = true;
      setTimeout(()=>{
        this.saved = false;
      }, 2000)
    }, 1000); // Time to save changes
  }
}
