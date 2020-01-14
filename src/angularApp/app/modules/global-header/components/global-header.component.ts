import { Component, OnInit } from '@angular/core';
import { remote } from 'electron';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss']
})
export class GlobalHeaderComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  close(): void {
      remote.getCurrentWindow().close();
  }

  minimize(): void {
      remote.getCurrentWindow().minimize();
  }
    
  maximize(): void {
      remote.getCurrentWindow().maximize();
  }
}
