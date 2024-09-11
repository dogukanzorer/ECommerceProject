import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  
  // message(message:string, messageType:MessageType, position: Position, delay:Number, dismissOthers:boolean = false)
     message(message:string, options: Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay)
    alertify.set('notifier','position',options.position);
    const msj = alertify[options.messageType](message);
    if(options.dissmissOthers){
     msj.dismissOthers();
    }

  }

  dismiss(){
    alertify.dismissAll();
  }
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position:Position = Position.BottomRight;
  delay: Number = 3;
  dissmissOthers: boolean = false;
}