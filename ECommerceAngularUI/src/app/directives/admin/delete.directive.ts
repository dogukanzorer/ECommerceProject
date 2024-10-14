import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDailogComponent, DeleteState } from '../../dialogs/delete-dailog/delete-dailog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';


declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective  {

  constructor(private element:ElementRef,private _renderer:Renderer2,private httpClientService:HttpClientService,private spinner:NgxSpinnerService
    , public dialog:MatDialog,private alertify:AlertifyService) 
  { 
    const img = this._renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/clear.png");
    img.setAttribute("style","cursor:pointer;");
    img.width = 15;
    img.height = 15;
    _renderer.appendChild(element.nativeElement,img);    
  }

  @Input() id: string;
  @Input() contoller: string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.openDialog(async () => {
    
     this.spinner.show(SpinnerType.BallSpinClockwiseFadeRotating);
    const td : HTMLTableCellElement = this.element.nativeElement;
   
    this.httpClientService.delete({
      controller: this.contoller
    },this.id).subscribe(data => {
      $(td.parentElement).animate({
        opacity:0,
        left:"+=50",
        height:"toogle",
      },700 ,() => {this.callback.emit();
        this.alertify.message("Product deleted succesfuly",{
          dissmissOthers:true,
          messageType:MessageType.Success,
          position:Position.TopRight
        });
  
      });
    }, (errorResponse:HttpErrorResponse) => {
      this.spinner.show(SpinnerType.BallSpinClockwiseFadeRotating);
      this.alertify.message("An error was encountered while deleting the product.",{
        dissmissOthers:true,
        messageType:MessageType.Success,
        position:Position.TopRight
      });
    });
    
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

