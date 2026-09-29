import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-wrapper" [class.show]="visible">
      <div class="toast-pill">
        <span class="toast-icon">{{ icon }}</span>
        <span class="toast-message">{{ message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .toast-wrapper {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .toast-wrapper.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    .toast-pill {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(17, 21, 43, 0.95);
      border: 1px solid rgba(6, 182, 212, 0.5);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.3);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 0.75rem 1.4rem;
      border-radius: 999px;
      color: #f8fafc;
      font-size: 0.9rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .toast-icon {
      font-size: 1.15rem;
    }
  `]
})
export class ToastComponent {
  @Input() visible = false;
  @Input() message = '';
  @Input() icon = '✨';
}
