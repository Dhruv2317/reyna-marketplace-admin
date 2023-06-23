import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'
import { TextEditorModalService } from './text-editor-modal.service';
import { Editor, toHTML, toDoc } from 'ngx-editor';

@Component({
  selector: 'app-text-editor-modal',
  templateUrl: './text-editor-modal.component.html',
  styleUrls: ['./text-editor-modal.component.scss']
})
export class TextEditorModalComponent implements OnInit {
  @Output() onEventCompleted: EventEmitter<any> = new EventEmitter();
  editor: Editor;
  editorValue: any;

  constructor(
    private _bsModalRef:BsModalRef,
    private _textEditorModalService:TextEditorModalService,
    ) {
      this.editor = new Editor();
    }

  ngOnInit(): void {
    let details = this._textEditorModalService.getFormData();
    if (details) {
      this.editorValue = toDoc(details);
    }
  }

  saveText() {
    const html = toHTML(this.editorValue)
    this.onEventCompleted.emit(html);
  }

  closeModal(){
    this._bsModalRef.hide();
  }

}
