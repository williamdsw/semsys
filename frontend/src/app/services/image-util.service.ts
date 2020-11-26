import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  // CONSTRUCTOR

  constructor() { }

  // HELPER FUNCTIONS

  public buildFileName (fileName: string) : string {
    fileName = fileName.toLowerCase ();
    fileName = fileName.split (' ').join ('-');
    fileName = fileName.split ('_').join ('-');
    return fileName;
  }

}
