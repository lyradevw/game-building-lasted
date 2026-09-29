import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fate-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="destiny-banner">
      <div class="banner-glow-bg"></div>
      <div class="banner-border-line"></div>
      
      <div class="banner-content">
        <div class="siren-icon-wrapper">
          <span class="siren-icon">🚨</span>
        </div>

        <div class="text-content">
          <div class="headline">
            <span class="warning-tag">CẢNH BÁO TÂM LINH</span>
            <h2 class="title">ĐỊNH MỆNH ĐÃ AN BÀI!</h2>
          </div>
          
          <p class="dramatic-quote">
            🔥 <strong>Phụng Lê 2000 + Linh Trần 2001 + Xuân Đào 2002</strong> 🔥<br>
            Ba người này <em>KHÔNG THỂ THOÁT KHỎI NHAU!</em> Đặc quyền hưởng trọn <strong>4 Siêu Năng Lực VIP</strong>: ❤️ Hồi Sinh, 🧊 Đóng Băng, 🛡️ Bất Tử, ⚡ Tốc Biến!
          </p>
        </div>

        <button
          type="button"
          class="dismiss-btn"
          (click)="dismiss.emit()"
          title="Đóng thông báo"
          aria-label="Đóng cảnh báo định mệnh"
        >
          ✕
        </button>
      </div>
    </div>
  `,
  styles: [`
    .destiny-banner {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      margin: 1.5rem auto 2rem;
      max-width: 900px;
      background: linear-gradient(135deg, rgba(30, 10, 10, 0.9) 0%, rgba(20, 15, 35, 0.95) 100%);
      border: 1px solid rgba(239, 68, 68, 0.7);
      box-shadow: 0 0 35px rgba(239, 68, 68, 0.35), 0 0 70px rgba(245, 158, 11, 0.2);
      animation: bannerSlideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1), specialDestinyFlame 3s infinite;
    }

    .banner-glow-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 10% 50%, rgba(239, 68, 68, 0.2) 0%, transparent 60%);
      pointer-events: none;
    }

    .banner-border-line {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #ef4444, #f59e0b, #ec4899, #ef4444);
      background-size: 300% 100%;
      animation: borderShimmer 3s linear infinite;
    }

    @keyframes borderShimmer {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }

    .banner-content {
      position: relative;
      z-index: 2;
      padding: 1.25rem 1.75rem;
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .siren-icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      animation: sirenSpin 1.2s infinite;
    }

    .siren-icon {
      font-size: 2rem;
    }

    @keyframes sirenSpin {
      0%, 100% { transform: scale(1) rotate(0deg); }
      25% { transform: scale(1.1) rotate(-10deg); }
      75% { transform: scale(1.1) rotate(10deg); }
    }

    .text-content {
      flex: 1;
      min-width: 0;
    }

    .headline {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      margin-bottom: 0.35rem;
      flex-wrap: wrap;
    }

    .warning-tag {
      background: #ef4444;
      color: #fff;
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.6);
    }

    .title {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 900;
      letter-spacing: 0.02em;
      color: #fbbf24;
      text-shadow: 0 0 15px rgba(245, 158, 11, 0.6);
      margin: 0;
    }

    .dramatic-quote {
      font-size: 0.95rem;
      color: #f1f5f9;
      line-height: 1.45;
      margin: 0;
    }

    .dramatic-quote strong {
      color: #f59e0b;
      font-weight: 700;
    }

    .dramatic-quote em {
      color: #ef4444;
      font-style: normal;
      font-weight: 800;
      text-decoration: underline;
    }

    .dismiss-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #94a3b8;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .dismiss-btn:hover {
      background: rgba(239, 68, 68, 0.3);
      color: #fff;
      border-color: rgba(239, 68, 68, 0.6);
    }

    @keyframes bannerSlideDown {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.96);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @media (max-width: 640px) {
      .banner-content {
        padding: 1rem;
        gap: 0.75rem;
      }
      .siren-icon-wrapper {
        width: 44px;
        height: 44px;
      }
      .title {
        font-size: 1.15rem;
      }
      .dramatic-quote {
        font-size: 0.85rem;
      }
    }
  `]
})
export class FateAlertComponent {
  @Output() dismiss = new EventEmitter<void>();
}
