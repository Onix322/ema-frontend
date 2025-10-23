import {AfterViewInit, Component, ElementRef, signal, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EmployeeContent} from './components/content/employee-content/employee-content';
import {QuickActions} from './components/content/quick-actions/quick-actions';
import {Q} from '@angular/cdk/keycodes';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';

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
  imports: [MatGridList, MatGridTile, MatButton, MatIcon, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements AfterViewInit{

  @ViewChild("content", {read: ElementRef<HTMLElement>})
  protected contentRef!: ElementRef<HTMLElement>
  private currentContent: Type<any> | null = null

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
  protected readonly EmployeeContent = EmployeeContent;

  constructor(private vcr: ViewContainerRef) {
    this.windowDimensions = this.collectDimensions()
    this.layoutSettings = this.initLayout()
  }

  ngAfterViewInit() {
    if(this.currentContent == null) this.currentContent = QuickActions
    this.displayContent<any>(this.currentContent, this.contentRef.nativeElement)
  }

  protected displayContent<C>(component: Type<C>, appendTo?: HTMLElement): ElementRef<HTMLElement> {
    const content = this.vcr.createComponent(component)
    const contentHTML = <ElementRef<HTMLElement>>content.location
    if (appendTo) {
      for (let child of appendTo.children) {
        appendTo.removeChild(child)
      }
      appendTo.appendChild(contentHTML.nativeElement)
    }
    this.currentContent = component
    return contentHTML
  }

  private initLayout(): LayoutSetting {
    if (this.layoutSettings.responsive) {
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

  protected readonly QuickActions = QuickActions;
}
