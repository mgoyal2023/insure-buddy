import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  message = '';
  messages: { text: string, from: 'user' | 'bot' }[] = [];

  triggerPdfUpload() {
    (document.getElementById('pdf-upload') as HTMLInputElement)?.click();
  }

  onPdfSelected(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      // Handle PDF file upload logic here
      alert(`Selected PDF: ${file.name}`);
    }
  }

  sendMessage() {
    if (this.message.trim()) {
      this.messages.push({ text: this.message, from: 'user' });
      this.message = '';
      // Optionally, add a fake bot response for demo
      setTimeout(() => {
        this.messages.push({ text: 'This is a bot reply.', from: 'bot' });
      }, 500);
    }
  }
}
