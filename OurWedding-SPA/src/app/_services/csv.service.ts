import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  downloadFile(data: any, filename: string) {
    const replacer = (key, value) => (value === null ? '' : value);
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const blob = new Blob([csvArray], { type: 'text/csv' });
    saveAs(blob, filename);
  }
}
