import {ElementRef, Injectable, Type, ViewContainerRef} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayContent {
  private _lastContent: Type<any>| undefined
  private _currentContent: Type<any> | undefined
  private _vcr: ViewContainerRef | undefined
  private _content: ElementRef<HTMLElement> | undefined

  constructor() {}

  public displayContent<C>(component: Type<C>, appendTo?: HTMLElement): ElementRef<HTMLElement> {
    if(!this._vcr){
      throw new Error('ViewContainerRef has not been set.')
    }
    const content = this._vcr.createComponent(component)
    const contentHTML = <ElementRef<HTMLElement>>content.location
    if (appendTo) {
      for (let child of appendTo.children) {
        appendTo.removeChild(child)
      }
      appendTo.appendChild(contentHTML.nativeElement)
    }
    this._lastContent = this._currentContent
    this._currentContent = component
    return contentHTML
  }


  get lastContent(): Type<any> | undefined {
    return this._lastContent;
  }

  get currentContent(): Type<any> | undefined {
    return this._currentContent;
  }

  set vcr(value: ViewContainerRef) {
    this._vcr = value;
  }

  set content(value: ElementRef<HTMLElement> | undefined) {
    this._content = value;
  }

  get content(): ElementRef<HTMLElement> | undefined {
    return this._content;
  }
}
