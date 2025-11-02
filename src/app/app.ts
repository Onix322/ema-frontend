import {AfterViewInit, Component, ElementRef, signal, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EmployeeContent} from './components/content/employee-content/employee-content';
import {QuickActions} from './components/content/quick-actions/quick-actions';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {CarsContent} from './components/content/cars-content/cars-content';
import {DisplayContent} from './service/display-content';

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
  imports: [MatButton, MatIcon, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App implements AfterViewInit {

  @ViewChild("content", {read: ElementRef<HTMLElement>})
  protected contentRef!: ElementRef<HTMLElement>
  protected readonly title = signal('ema-frontend');
  protected defaultRowHeight = 1;
  protected defaultColWidth = 1;
  protected readonly CarsContent = CarsContent;

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

  //Layout Settings
  //Window Settings
  protected windowDimensions: WindowDimensions = {
    height: 0,
    width: 0,
  }
  protected readonly EmployeeContent = EmployeeContent;
  protected readonly QuickActions = QuickActions;
  private currentContent: Type<any> | null = null

  constructor(private dc: DisplayContent, private vcr: ViewContainerRef) {
    this.windowDimensions = this.collectDimensions()
    this.layoutSettings = this.initLayout()
    this.dc.vcr = this.vcr
  }

  ngAfterViewInit() {
    if (this.currentContent == null) this.currentContent = QuickActions
    this.displayContent<any>(this.currentContent, this.contentRef.nativeElement)
    this.dc.content = this.contentRef
  }

  public displayContent<C>(component: Type<C>, appendTo?: HTMLElement): ElementRef<HTMLElement> {
    return this.dc.displayContent<C>(component, appendTo)
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

}
