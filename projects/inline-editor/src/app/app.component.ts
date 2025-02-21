import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  CustomToolbarItemModel,
  DocumentEditorContainerComponent,
} from '@syncfusion/ej2-angular-documenteditor';
import {
  RichTextEditorComponent,
  ToolbarClickEventArgs,
} from '@syncfusion/ej2-angular-richtexteditor';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
    this.toolTrackItem,
    this.toolAcceptItem,
    this.toolRejectItem,
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

  constructor(private http: HttpClient) {}

  public onToolbarClick(args: ToolbarClickEventArgs): void {
    switch (args.item.id) {
      case 'Approve Document':
        this.onApproveDocument();
        break;
      case 'Save Document':
        // this.container.documentEditor.getd
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
  public onSaveDocument(file?: File): void {
    this.container.documentEditor.save('MyDocument', 'Docx');
    // const formData = new FormData();
    // formData.append('files', file);
    // this.http
    //   .post(this.container.serviceUrl + 'Save', formData, {
    //     headers: {
    //       Authorization: `Bearer ${environment.syncfusionLicenseKey}`,
    //     },
    //     responseType: 'text',
    //   })
    //   .subscribe(
    //     (sfdt: string) => {},
    //     (error: any) => {
    //       console.error('Error during conversion:', error);
    //       if (error.status === 0) {
    //         console.error('Network error or CORS issue');
    //       } else {
    //         console.error('API error:', error.status, error.message);
    //       }
    //     }
    //   );
  }
  // Function to handle approval process
  public onApproveDocument(): void {
    alert('Document Approved!');
    // You can also disable toolbar items if needed:
    this.container.toolbar.enableItems(4, false);
  }
}
