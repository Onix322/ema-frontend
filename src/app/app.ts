import {ChangeDetectorRef, Component, signal} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButton} from '@angular/material/button';

//measured in px
type WindowDimensions = {
  height: number
  width: number
}

//measured in px
type LayoutSetting = {
  responsive: boolean
  headerH: number,
  headerW: number,
  contentH: number,
  contentW: number,
  menuH: number,
  menuW: number,
  maxMenuW: number,
}

@Component({
  selector: 'app-root',
  imports: [MatGridList, MatGridTile, MatButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {

  protected readonly title = signal('ema-frontend');
  protected defaultRowHeight = 1;
  protected defaultColWidth = 1;

  //Layout Settings
  //default values
  protected layoutSettings: LayoutSetting = {
    responsive: true,
    headerH: this.defaultRowHeight + 10,
    headerW: this.defaultColWidth + 10,
    contentH: this.defaultRowHeight + 10,
    contentW: this.defaultColWidth + 10,
    menuH: this.defaultRowHeight + 10,
    menuW: this.defaultColWidth + 10,
    maxMenuW: 100,
  }

  //Window Settings
  protected windowDimensions: WindowDimensions = {
    height: 0,
    width: 0,
  }

  constructor() {
    this.windowDimensions = this.collectDimensions()
    this.layoutSettings = this.initLayout()
  }

  private initLayout(): LayoutSetting {
    if(this.layoutSettings.responsive){
      this.initLayoutDimensions(this.windowDimensions)
      this.initResponsiveness()
      return this.layoutSettings
    }
    this.initLayoutDimensions(this.windowDimensions)
    return this.layoutSettings
  }

  private initResponsiveness() {
    window.addEventListener("resize", () => {
      this.windowDimensions = this.collectDimensions()
      this.initLayoutDimensions(this.windowDimensions)
    })
  }

  private initLayoutDimensions(relativeTo?: WindowDimensions): LayoutSetting {
    const dim: WindowDimensions = relativeTo ?? {
      height: window.innerHeight,
      width: window.innerWidth,
    }
    this.layoutSettings.headerH = 30
    this.layoutSettings.contentH = dim.height - this.layoutSettings.headerH
    this.layoutSettings.menuH = dim.height - this.layoutSettings.headerH

    return this.layoutSettings
  }

  private collectDimensions(): WindowDimensions {
    return {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2
    }
  }
}
