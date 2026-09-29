import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header">
      <div class="header-container">
        <!-- Logo and Title -->
        <div class="brand">
          <div class="logo-icon-wrapper">
            <span class="logo-dice">🎲</span>
            <div class="logo-glow"></div>
          </div>
          <div class="title-group">
            <h1 class="brand-title">TEAM <span class="gradient-text">CHAOS</span></h1>
            <p class="brand-subtitle">Ai sẽ chung đội với ai? • Số phận gọi tên ai?</p>
          </div>
        </div>

        <!-- Top Right Actions -->
        <div class="actions-group">
          <!-- Member count badge -->
          <div class="badge-members" title="10 người chơi trong danh sách">
            <span class="pulse-dot"></span>
            <span class="badge-text">{{ memberCount }} Thành Viên</span>
          </div>

          <!-- Fate Settings Button -->
          <button
            type="button"
            class="action-btn settings-btn"
            (click)="openSettings.emit()"
            title="Cài đặt cơ chế Team Định Mệnh"
            aria-label="Cài đặt số phận"
          >
            <span class="icon">⚙️</span>
            <span class="btn-label">Troll Settings</span>
            @if (isFixedGuaranteed) {
              <span class="mode-tag guaranteed">100%</span>
            } @else if (isFixedChance) {
              <span class="mode-tag chance">{{ chancePercentage }}%</span>
            } @else {
              <span class="mode-tag off">OFF</span>
            }
          </button>

          <!-- Audio Mute/Unmute Toggle -->
          <button
            type="button"
            class="action-btn sound-btn"
            (click)="toggleSound.emit()"
            [attr.title]="isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'"
            [class.muted]="isMuted"
            aria-label="Bật hoặc tắt âm thanh"
          >
            <span class="icon">{{ isMuted ? '🔇' : '🔊' }}</span>
          </button>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      position: sticky;
      top: 0;
      z-index: 40;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      background: rgba(8, 11, 24, 0.82);
      border-bottom: 1px solid rgba(124, 58, 237, 0.2);
      padding: 0.85rem 1.5rem;
      transition: all 0.3s ease;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .logo-icon-wrapper {
      position: relative;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.4), rgba(6, 182, 212, 0.3));
      border: 1px solid rgba(124, 58, 237, 0.5);
      border-radius: 12px;
      box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
      flex-shrink: 0;
    }

    .logo-dice {
      font-size: 1.6rem;
      animation: diceFloat 4s ease-in-out infinite;
      display: inline-block;
    }

    @keyframes diceFloat {
      0%, 100% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(15deg) scale(1.1); }
    }

    .title-group {
      display: flex;
      flex-direction: column;
    }

    .brand-title {
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      line-height: 1.1;
      color: #fff;
    }

    .gradient-text {
      background: linear-gradient(135deg, #a855f7 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.4));
    }

    .brand-subtitle {
      font-size: 0.82rem;
      color: var(--text-muted);
      font-weight: 500;
      margin-top: 2px;
    }

    .actions-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .badge-members {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      background: rgba(17, 21, 43, 0.9);
      border: 1px solid rgba(6, 182, 212, 0.3);
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      color: #38bdf8;
      font-weight: 600;
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #38bdf8;
      box-shadow: 0 0 8px #38bdf8;
      animation: dotBlink 1.8s infinite;
    }

    @keyframes dotBlink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(17, 21, 43, 0.8);
      border: 1px solid rgba(124, 58, 237, 0.3);
      color: var(--text-main);
      border-radius: 10px;
      padding: 0.42rem 0.8rem;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .action-btn:hover {
      background: rgba(124, 58, 237, 0.2);
      border-color: rgba(124, 58, 237, 0.6);
      transform: translateY(-1px);
      box-shadow: 0 0 12px rgba(124, 58, 237, 0.3);
    }

    .settings-btn .mode-tag {
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 6px;
      font-weight: 700;
    }

    .mode-tag.guaranteed {
      background: rgba(239, 68, 68, 0.25);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.4);
    }

    .mode-tag.chance {
      background: rgba(245, 158, 11, 0.25);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .mode-tag.off {
      background: rgba(100, 116, 139, 0.25);
      color: #94a3b8;
      border: 1px solid rgba(100, 116, 139, 0.4);
    }

    .sound-btn {
      padding: 0.42rem 0.6rem;
    }

    .sound-btn.muted {
      opacity: 0.65;
    }

    @media (max-width: 768px) {
      .app-header {
        padding: 0.65rem 1rem;
      }
      .brand-title {
        font-size: 1.25rem;
      }
      .brand-subtitle {
        display: none;
      }
      .badge-members {
        display: none;
      }
      .btn-label {
        display: none;
      }
    }
  `]
})
export class HeaderComponent {
  @Input() memberCount = 10;
  @Input() isMuted = false;
  @Input() isFixedGuaranteed = false;
  @Input() isFixedChance = true;
  @Input() chancePercentage = 50;

  @Output() toggleSound = new EventEmitter<void>();
  @Output() openSettings = new EventEmitter<void>();
}
