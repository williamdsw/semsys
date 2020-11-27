import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  constructor() { }

  public buildFileName(fileName: string): string {
    if (!fileName || fileName === '') {
      return null;
    }

    fileName = fileName.toLowerCase ();
    fileName = fileName.split (' ').join ('-');
    fileName = fileName.split ('_').join ('-');
    return fileName;
  }

}
