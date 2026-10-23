export interface ParsedDocumentResult {
  filename: string;
  size: number;
  extractedText: string;
}

export async function parseUploadedFile(file: File): Promise<ParsedDocumentResult> {
  const filename = file.name;
  const size = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const rawResult = e.target?.result;
        let text = '';

        if (typeof rawResult === 'string') {
          // If plain text / md / json
          text = rawResult;
        } else if (rawResult instanceof ArrayBuffer) {
          // Decode ArrayBuffer
          const decoder = new TextDecoder('utf-8');
          const decoded = decoder.decode(rawResult);
          text = decoded.replace(/[^\x20-\x7E\t\n\r\u0400-\u04FF]/g, ' ').replace(/\s+/g, ' ').trim();
        }

        // Clean up common boilerplate
        text = text.trim();

        resolve({
          filename,
          size,
          extractedText: text,
        });
      } catch (err: any) {
        reject(new Error('Failed to read file content: ' + err.message));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error occurred'));
    };

    // If text-like file
    if (
      file.type.includes('text') ||
      filename.endsWith('.txt') ||
      filename.endsWith('.md') ||
      filename.endsWith('.csv') ||
      filename.endsWith('.json')
    ) {
      reader.readAsText(file);
    } else {
      // For other documents, read as ArrayBuffer for binary extraction
      reader.readAsArrayBuffer(file);
    }
  });
}

export function exportToCSV(filename: string, headers: string[], rows: (string | number)[][]) {
  const escapeCell = (cell: string | number) => {
    const str = String(cell ?? '');
    return `"${str.replace(/"/g, '""')}"`;
  };

  const csvContent = [
    headers.map(escapeCell).join(','),
    ...rows.map((row) => row.map(escapeCell).join(',')),
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
