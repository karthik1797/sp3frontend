import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  CustomToolbarItemModel,
  DocumentEditorContainerComponent,
} from '@syncfusion/ej2-angular-documenteditor';
import { ToolbarClickEventArgs } from '@syncfusion/ej2-angular-richtexteditor';
import { userDetails } from 'projects/inline-editor/src/constants/userMockData';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
})
export class DocumentEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('document_editor')
  public container!: DocumentEditorContainerComponent;

  //Custom toolbat item.
  public toolSaveItem: CustomToolbarItemModel = {
    prefixIcon: 'e-save',
    tooltipText: 'Save Document',
    text: this.onWrapText('Save Document'),
    id: 'Save Document',
  };
  public toolApproveItem: CustomToolbarItemModel = {
    prefixIcon: 'e-check',
    tooltipText: 'Approve Document',
    text: this.onWrapText('Approve Document'),
    id: 'Approve Document',
  };
  public toolTrackItem: CustomToolbarItemModel = {
    prefixIcon: 'e-review-track-changes',
    tooltipText: 'Track Changes',
    text: 'Track Changes',
    id: 'trackChanges',
  };
  public toolAcceptItem: CustomToolbarItemModel = {
    prefixIcon: 'e-review-accept',
    tooltipText: 'Accept Change',
    text: 'Accept',
    id: 'acceptChange',
  };
  public toolRejectItem: CustomToolbarItemModel = {
    prefixIcon: 'e-review-reject',
    tooltipText: 'Reject Change',
    text: 'Reject',
    id: 'rejectChange',
  };

  public items = [
    'New',
    'Open',
    this.toolSaveItem,
    this.toolApproveItem,
    'Separator',
    'Undo',
    'Redo',
    // this.toolTrackItem,
    // this.toolAcceptItem,
    // this.toolRejectItem,
    'Separator',
    'Image',
    'Table',
    'Hyperlink',
    'Bookmark',
    'TableOfContents',
    'Separator',
    'Header',
    'Footer',
    'PageSetup',
    'PageNumber',
    'Break',
    'InsertFootnote',
    'InsertEndnote',
    'Separator',
    'Find',
    'Separator',
    'Comments',
    'TrackChanges',
    'Separator',
    'LocalClipboard',
    'RestrictEditing',
    'Separator',
    'FormFields',
    'UpdateFields',
    'ContentControl',
  ];
  public userInfo: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getUserDetails();
  }
  ngAfterViewInit(): void {}

  getUserDetails() {
    userDetails().then((res: any) => {
      this.userInfo = res;
    });
  }

  public onToolbarClick(args: ToolbarClickEventArgs): void {
    switch (args.item.id) {
      case 'Approve Document':
        this.onApproveDocument();
        break;
      case 'Save Document':
        this.onSaveDocument();
        break;
    }
  }

  private onWrapText(text: string): string {
    let content: string = '';
    const index: number = text.lastIndexOf(' ');

    if (index !== -1) {
      content =
        text.slice(0, index) +
        "<div class='e-de-text-wrap'>" +
        text.slice(index + 1) +
        '</div>';
    } else {
      content = text;
    }

    return content;
  }

  onCreated() {
    //Specifies the language id to map server side dictionary.
    this.container.documentEditor.spellChecker.languageID = 1033;
    this.container.documentEditor.spellChecker.removeUnderline = false;
    this.container.documentEditor.spellChecker.allowSpellCheckAndSuggestion =
      true;
  }
  // Function to handle saving the document
  public onSaveDocument(): void {
    const editor = this.container.documentEditor;
    const documentData = editor.serialize();
    const payload = {
      fileName: 'MyDocument.docx',
      content: documentData,
    };
    this.http
      .post(this.container.serviceUrl + 'Save', payload, {
        responseType: 'text',
      })
      .subscribe(
        (sfdt: string) => {
          alert('Document Saved!');
        },
        (error: any) => {
          console.error('Error during conversion:', error);
          if (error.status === 0) {
            console.error('Network error or CORS issue');
          } else {
            console.error('API error:', error.status, error.message);
          }
        }
      );
  }
  isValidFile(file: File): boolean {
    const allowedExtensions = ['docx'];
    const allowedMimeTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return (
      fileExtension !== undefined &&
      allowedExtensions.includes(fileExtension) &&
      allowedMimeTypes.includes(file.type)
    );
  }
  // Function to handle approval process
  public async onApproveDocument() {
    const editor = this.container.documentEditor;
    editor.saveAsBlob('Docx').then((exportedDocument: Blob) => {
      const blob = exportedDocument;
      const file = new File([blob], `${editor.documentName}.docx`, {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      let formdata = new FormData();
      formdata.append('files', blob);
      formdata.append('approverName', this.userInfo.userName);

      this.http
        .post(this.container.serviceUrl + 'appendSignature', formdata, {
          responseType: 'text',
        })
        .subscribe(
          (sfdt: string) => {
            this.container.documentEditor.open(sfdt);
          },
          (error: any) => {
            console.error('Error during conversion:', error);
            if (error.status === 0) {
              console.error('Network error or CORS issue');
            } else {
              console.error('API error:', error.status, error.message);
            }
          }
        );
    });
    // const a = document.createElement('a');
    // const objectUrl = URL.createObjectURL(blob);
    // a.href = objectUrl;
    // a.download = 'downloaded-file';
    // a.click();
    // URL.revokeObjectURL(objectUrl);
  }

  backToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
