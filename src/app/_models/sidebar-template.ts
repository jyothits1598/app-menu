import { TemplateRef } from '@angular/core';

export class SidebarTemplate{
    templateRef: TemplateRef<any>;
    context: any;
    fromComponent: string;

    constructor(template: TemplateRef<any>, context: any, fromComponent: string){
        this.templateRef = template;
        this.context = context;
        this.fromComponent = fromComponent;
    }
}