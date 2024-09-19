import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
declare var $ : any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element:ElementRef,private _renderer:Renderer2,private productService: ProductService) 
  { 
    const img = this._renderer.createElement("img");
    img.setAttribute("src","../../../../../assets/clear.png");
    img.setAttribute("style","cursor:pointer;");
    img.width = 15;
    img.height = 15;
    _renderer.appendChild(element.nativeElement,img);    
  }

  @Input() id: string;

  @HostListener("click")
  async onclick(){
    console.log(this.id);
    const td : HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(1000);
   
  }
  


}
