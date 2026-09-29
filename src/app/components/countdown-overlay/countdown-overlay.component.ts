import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="countdown-backdrop">
      <div class="countdown-inner">
        <div class="radar-circle"></div>
        <div class="radar-circle-outer"></div>

        @if (currentCount > 0) {
          <div class="count-number" [attr.data-count]="currentCount">
            {{ currentCount }}
          </div>
          <div class="count-sublabel">SỐ PHẬN ĐANG GỌI TÊN...</div>
        } @else {
          <div class="lets-go-text">
            <span class="boom-emoji">💥</span>
            <span class="burst-text">LET'S GO!</span>
          </div>
          <div class="count-sublabel ready">ĐÃ CÓ KẾT QUẢ!</div>
        }
      </div>
    </div>
  `,
  styles: [`
    .countdown-backdrop {
      position: fixed;
      inset: 0;
      z-index: 100;
      background: rgba(8, 11, 24, 0.88);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-out;
    }

    .countdown-inner {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 320px;
      height: 320px;
    }

    .radar-circle {
      position: absolute;
      width: 220px;
      height: 220px;
      border-radius: 50%;
      border: 2px dashed rgba(124, 58, 237, 0.6);
      animation: rotateRadar 6s linear infinite;
    }

    .radar-circle-outer {
      position: absolute;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      border: 1px solid rgba(6, 182, 212, 0.4);
      animation: pulseRadar 1.5s ease-in-out infinite;
    }

    @keyframes rotateRadar {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes pulseRadar {
      0%, 100% { transform: scale(0.95); opacity: 0.3; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }

    .count-number {
      font-family: var(--font-heading);
      font-size: 8rem;
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(135deg, #00f0ff 0%, #a855f7 50%, #ec4899 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 40px rgba(6, 182, 212, 0.9));
      animation: countZoom 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    @keyframes countZoom {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      50% {
        transform: scale(1.15);
        opacity: 1;
      }
      100% {
        transform: scale(1);
        opacity: 0.95;
      }
    }

    .lets-go-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      animation: letsGoExplode 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .boom-emoji {
      font-size: 4rem;
      animation: boomRotate 0.6s infinite alternate;
    }

    .burst-text {
      font-family: var(--font-heading);
      font-size: 3.5rem;
      font-weight: 900;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #f43f5e 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 35px rgba(245, 158, 11, 0.9));
      text-transform: uppercase;
      white-space: nowrap;
    }

    @keyframes letsGoExplode {
      0% {
        transform: scale(0.2) rotate(-10deg);
        opacity: 0;
      }
      70% {
        transform: scale(1.2) rotate(3deg);
        opacity: 1;
      }
      100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }

    @keyframes boomRotate {
      0% { transform: scale(1) rotate(-5deg); }
      100% { transform: scale(1.15) rotate(10deg); }
    }

    .count-sublabel {
      margin-top: 1.2rem;
      font-family: var(--font-heading);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.15em;
      color: #94a3b8;
      text-transform: uppercase;
    }

    .count-sublabel.ready {
      color: #38bdf8;
      letter-spacing: 0.2em;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class CountdownOverlayComponent {
  /** 3, 2, 1, or 0 (0 means LET'S GO) */
  @Input({ required: true }) currentCount = 3;
}
