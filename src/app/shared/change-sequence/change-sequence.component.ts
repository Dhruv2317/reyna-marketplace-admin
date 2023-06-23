import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment'; 

@Component({
  selector: 'app-change-sequence',
  templateUrl: './change-sequence.component.html',
  styleUrls: ['./change-sequence.component.scss']
})
export class ChangeSequenceComponent implements OnInit {
  @Output() onSequenceChange: EventEmitter<any> = new EventEmitter();
  @Input() mode!: any;
  @Input() data: any[] = [];

  environmentUrl: any = environment
  pdfIcon: string = '../../../assets/img/pdf_file_icon.png'
  videoIcon: string = '../../../assets/img/video-play-icon.png'

  public originalData: any = [];
  public isSequenceUpdated = false;

  constructor(
    public cdr: ChangeDetectorRef
  ) {
    
  }

  ngOnInit() {
    this.originalData = this.data.slice(0);
    this.cdr.detectChanges();
  }


  public resetValues() {
    this.data = []
  }

  public resetSequence() {
    this.data = this.originalData.slice(0);
    this.isSequenceUpdated = false;
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.isSequenceUpdated = true;
  }

  public saveUpdatedSequence() {
    let sequenceArray: any[] = []
    this.data.forEach((item: any, index: any) => {
      sequenceArray.push({ item: item, sequence: (index + 1) });
    });

    this.onSequenceChange.emit({mode: this.mode, data: sequenceArray})
  }
}
