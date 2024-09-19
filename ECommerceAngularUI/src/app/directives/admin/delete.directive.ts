import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDailogComponent, DeleteState } from '../../dialogs/delete-dailog/delete-dailog.component';


declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor(private element:ElementRef,private _renderer:Renderer2,private productService: ProductService,public dialog:MatDialog) 
  { 
    const img = this._renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/clear.png");
    img.setAttribute("style","cursor:pointer;");
    img.width = 15;
    img.height = 15;
    _renderer.appendChild(element.nativeElement,img);    
  }

  @Input() id: string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.openDialog(async () => {
      console.log(this.id);
    const td : HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).animate({
      opacity:0,
      left:"+=50",
      height:"toogle",
    },700 ,() => {this.callback.emit();})
    });
    
  }
  
  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDailogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }


}

