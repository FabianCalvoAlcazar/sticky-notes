import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';


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

  @Input() title!:string;
  @Input() text!:string;
  skin!: any;
  content_css!: any;
  public timeoutId:any;
  
  public saving:boolean = false;
  public saved:boolean = false

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
      this.saving = false;
      this.saved = true;
      setTimeout(()=>{
        this.saved = false;
      }, 2000)
    }, 1000); // Time to save changes
  }
}
