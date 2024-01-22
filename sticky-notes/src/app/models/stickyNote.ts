export class StickyNoteModel{
    constructor(
        public owner:string | null,
        public title:string,
        public text:string,
        public positionX:number,
        public positionY:number
    ){}
}