import { Component } from '@angular/core';
import { ModalService } from './modal.service';


@Component({
  moduleId: module.id,
  selector: 'modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css']
})

export class ModalComponent { 
    private viz = false;
    private modalElementId = 'modal-container';
    private overlayElementId = 'overlay';
    modalService: ModalService;
    
    
    constructor() { }

    toggle() {
        if (this.viz) {
            document.getElementById(this.modalElementId).className = 'show';
            document.getElementById(this.overlayElementId).className = 'show';

            this.viz = !this.viz;
        }
        else {
            document.getElementById(this.modalElementId).className = 'hidden';
            document.getElementById(this.overlayElementId).className = 'hidden';
        }
    }

    show(htmlString) {
        document.getElementById(this.modalElementId).className = 'show';
        document.getElementById(this.overlayElementId).className = 'show';

        document.getElementById(this.modalElementId).innerHTML = htmlString;
    }
    
    hide() {
        document.getElementById(this.modalElementId).innerHTML = "";
        document.getElementById(this.modalElementId).className = 'hidden';
        document.getElementById(this.overlayElementId).className = 'hidden';
    }
    
    
}
