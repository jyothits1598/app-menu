import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationDialogConfig } from '../../model/confirmation-dialog-config';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() config: ConfirmationDialogConfig;
  constructor() { }

  ngOnInit(): void {
  }

}
