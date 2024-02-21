import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { LinkDTO } from '../../models/individual.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-download-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './download-dialog.component.html',
  styleUrl: './download-dialog.component.scss'
})
export class DownloadDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: LinkDTO[],
    private languageService: LanguageService
    ) {}

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }
}
