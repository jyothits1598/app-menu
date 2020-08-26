import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { SidebarTemplate } from '../_models/sidebar-template';

@Injectable({
  providedIn: 'root'
})
export class SideNavbarService {
  templates: Array<SidebarTemplate> = [];
  archived: Array<SidebarTemplate> = [];

  constructor() { }

  AddTemplate(template: TemplateRef<any>, context: any, fromComponent: string) {
    this.templates.push(new SidebarTemplate(template, { $implicit: context }, fromComponent));
  }

  RemoveTemplate(fromComponent: string) {
    let index = this.templates.findIndex((templ) => { return templ.fromComponent === fromComponent })
    if (index > -1) this.templates.splice(index, 1);
  }
}
