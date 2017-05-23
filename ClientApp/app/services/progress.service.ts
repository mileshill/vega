import { BrowserXhr } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ProgressService {
  private uploadProgress: Subject<any>;

  startTracking(){
    this.uploadProgress = new Subject();
    return this.uploadProgress;
  }

  notify(progress){
    this.uploadProgress.next(progress);
  }

  endTracking(){
    this.uploadProgress.complete();
  }


  constructor() { }



}


@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {

  constructor(private service: ProgressService) {
    super();
  }

    build(): XMLHttpRequest {
      let xhr: XMLHttpRequest = super.build();


      // Upload events
      xhr.upload.onprogress = (event) => {
        this.service.notify( this.createProgress(event) );
      }

      // Upload complete
      xhr.upload.onloadend = () => {
        this.service.endTracking();
      }

      return xhr;
    }

    
   private createProgress(event){
      return {
          total: event.total,
          percentage: Math.round(event.loaded / event.total * 100)
        }
   }
}