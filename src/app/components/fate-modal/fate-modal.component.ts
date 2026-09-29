import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FixedTeamConfig, FixedTeamMode } from '../../models/game.model';

@Component({
  selector: 'app-fate-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="onBackdropClick($event)">
      <div class="modal-container">
        <!-- Glow accents -->
        <div class="modal-top-glow"></div>

        <div class="modal-header">
          <div class="header-icon-title">
            <span class="header-icon">🔮</span>
            <div>
              <h2 class="modal-title">CÀI ĐẶT SỐ PHẬN</h2>
              <p class="modal-subtitle">Tùy biến cơ chế xuất hiện của Team Định Mệnh</p>
            </div>
          </div>
          <button
            type="button"
            class="close-btn"
            (click)="close.emit()"
            aria-label="Đóng cài đặt"
          >
            ✕
          </button>
        </div>

        <div class="modal-body">
          <!-- Member Focus Box -->
          <div class="special-trio-box">
            <div class="trio-badge">🔥 BỘ BA ĐỊNH MỆNH • ĐẶC QUYỀN VIP</div>
            <p class="trio-desc">3 thành viên được gắn kết bởi sợi tơ hồng nghiệt ngã:</p>
            <div class="trio-chips">
              @for (name of config.members; track name) {
                <span class="member-chip">
                  👤 {{ name }}
                </span>
              }
            </div>
            <div class="special-powers-preview">
              <span class="preview-label">⚡ Hưởng trọn bộ 4 siêu năng lực:</span>
              <div class="preview-chips">
                <span class="power-tag red">❤️ Hồi Sinh (x3)</span>
                <span class="power-tag cyan">🧊 Đóng Băng (x2)</span>
                <span class="power-tag green">🛡️ Bất Tử (x1)</span>
                <span class="power-tag amber">⚡ Tốc Biến (x1)</span>
              </div>
            </div>
          </div>

          <!-- Mode Selection -->
          <div class="config-section">
            <label class="section-title">CHẾ ĐỘ ÁP DỤNG</label>
            <div class="mode-options">
              <!-- Mode: Guaranteed -->
              <div
                class="mode-card"
                [class.active]="selectedMode === 'guaranteed'"
                (click)="setMode('guaranteed')"
              >
                <div class="mode-radio">
                  <span class="radio-inner" *ngIf="selectedMode === 'guaranteed'"></span>
                </div>
                <div class="mode-text">
                  <div class="mode-heading">
                    <span class="mode-name">🔥 Luôn Xuất Hiện (100%)</span>
                    <span class="pill guaranteed">Troll Tuyệt Đối</span>
                  </div>
                  <p class="mode-explain">
                    Bảo đảm 100% Phụng Lê, Linh Trần, Xuân Đào sẽ luôn bị nhốt chung 1 đội!
                  </p>
                </div>
              </div>

              <!-- Mode: Chance -->
              <div
                class="mode-card"
                [class.active]="selectedMode === 'chance'"
                (click)="setMode('chance')"
              >
                <div class="mode-radio">
                  <span class="radio-inner" *ngIf="selectedMode === 'chance'"></span>
                </div>
                <div class="mode-text">
                  <div class="mode-heading">
                    <span class="mode-name">🎲 Xác Suất May Rủi</span>
                    <span class="pill chance">{{ currentChance }}% Tỉ lệ</span>
                  </div>
                  <p class="mode-explain">
                    Mỗi lần bấm nút Random, có xác suất xuất hiện Team Định Mệnh theo % bạn chọn.
                  </p>

                  <!-- Slider (only shown when chance is selected) -->
                  @if (selectedMode === 'chance') {
                    <div class="slider-wrapper" (click)="$event.stopPropagation()">
                      <div class="slider-labels">
                        <span>Hiếm gặp (10%)</span>
                        <strong class="slider-current-val">{{ currentChance }}%</strong>
                        <span>Thường xuyên (90%)</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        step="5"
                        [(ngModel)]="currentChance"
                        class="chance-slider"
                        aria-label="Xác suất xuất hiện Team Định Mệnh"
                      />
                    </div>
                  }
                </div>
              </div>

              <!-- Mode: Off -->
              <div
                class="mode-card"
                [class.active]="selectedMode === 'off'"
                (click)="setMode('off')"
              >
                <div class="mode-radio">
                  <span class="radio-inner" *ngIf="selectedMode === 'off'"></span>
                </div>
                <div class="mode-text">
                  <div class="mode-heading">
                    <span class="mode-name">🌪️ Tắt (Ngẫu Nhiên Thuần Túy)</span>
                    <span class="pill off">Công Bằng</span>
                  </div>
                  <p class="mode-explain">
                    Chia đội hoàn toàn ngẫu nhiên và công bằng, không ép buộc ai chung đội.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn-cancel" (click)="close.emit()">
            Đóng
          </button>
          <button type="button" class="btn-save" (click)="saveChanges()">
            💾 Lưu Thiết Lập
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 90;
      background: rgba(8, 11, 24, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: backdropFade 0.25s ease-out;
    }

    .modal-container {
      position: relative;
      background: #11152b;
      border: 1px solid rgba(124, 58, 237, 0.4);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(124, 58, 237, 0.2);
      border-radius: 20px;
      width: 100%;
      max-width: 540px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-top-glow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #7c3aed, #06b6d4, #f59e0b);
    }

    .modal-header {
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .header-icon-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-icon {
      font-size: 1.8rem;
    }

    .modal-title {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 800;
      color: #fff;
      margin: 0;
    }

    .modal-subtitle {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin: 2px 0 0;
    }

    .close-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .close-btn:hover {
      background: rgba(239, 68, 68, 0.2);
      color: #fff;
    }

    .modal-body {
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      max-height: 70vh;
      overflow-y: auto;
    }

    .special-trio-box {
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 12px;
      padding: 0.85rem 1rem;
    }

    .trio-badge {
      font-size: 0.75rem;
      font-weight: 800;
      color: #f59e0b;
      letter-spacing: 0.06em;
      margin-bottom: 0.35rem;
    }

    .trio-desc {
      font-size: 0.82rem;
      color: #cbd5e1;
      margin-bottom: 0.65rem;
    }

    .trio-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .member-chip {
      background: rgba(17, 21, 43, 0.8);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
    }

    .special-powers-preview {
      margin-top: 0.75rem;
      padding-top: 0.65rem;
      border-top: 1px dashed rgba(245, 158, 11, 0.25);
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .preview-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: #f59e0b;
      letter-spacing: 0.05em;
    }

    .preview-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .power-tag {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 6px;
      background: rgba(17, 21, 43, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .power-tag.red {
      color: #f87171;
      border-color: rgba(239, 68, 68, 0.4);
    }

    .power-tag.cyan {
      color: #38bdf8;
      border-color: rgba(56, 189, 248, 0.4);
    }

    .power-tag.green {
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.4);
    }

    .power-tag.amber {
      color: #fbbf24;
      border-color: rgba(245, 158, 11, 0.4);
    }

    .section-title {
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      display: block;
      margin-bottom: 0.65rem;
    }

    .mode-options {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
    }

    .mode-card {
      display: flex;
      gap: 0.85rem;
      background: rgba(8, 11, 24, 0.6);
      border: 1.5px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 0.85rem 1rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .mode-card:hover {
      background: rgba(8, 11, 24, 0.9);
      border-color: rgba(124, 58, 237, 0.5);
    }

    .mode-card.active {
      background: rgba(124, 58, 237, 0.12);
      border-color: rgba(124, 58, 237, 0.9);
      box-shadow: 0 0 16px rgba(124, 58, 237, 0.25);
    }

    .mode-radio {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .mode-card.active .mode-radio {
      border-color: #06b6d4;
    }

    .radio-inner {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #06b6d4;
      box-shadow: 0 0 8px #06b6d4;
    }

    .mode-text {
      flex: 1;
      min-width: 0;
    }

    .mode-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .mode-name {
      font-weight: 700;
      font-size: 0.92rem;
      color: #f1f5f9;
    }

    .pill {
      font-size: 0.68rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .pill.guaranteed {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.4);
    }

    .pill.chance {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    .pill.off {
      background: rgba(148, 163, 184, 0.2);
      color: #cbd5e1;
    }

    .mode-explain {
      font-size: 0.78rem;
      color: var(--text-muted);
      line-height: 1.35;
      margin: 0;
    }

    /* Slider inside chance card */
    .slider-wrapper {
      margin-top: 0.75rem;
      background: rgba(17, 21, 43, 0.85);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 10px;
      padding: 0.6rem 0.8rem;
    }

    .slider-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
      color: #94a3b8;
      margin-bottom: 0.4rem;
    }

    .slider-current-val {
      color: #fbbf24;
      font-size: 0.85rem;
      font-weight: 800;
    }

    .chance-slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      accent-color: #f59e0b;
      cursor: pointer;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(8, 11, 24, 0.4);
    }

    .btn-cancel {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: var(--text-muted);
      padding: 0.55rem 1rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-cancel:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
    }

    .btn-save {
      background: linear-gradient(135deg, #7c3aed, #06b6d4);
      border: none;
      color: #fff;
      padding: 0.55rem 1.25rem;
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(124, 58, 237, 0.4);
      transition: all 0.2s;
    }

    .btn-save:hover {
      transform: translateY(-1px);
      box-shadow: 0 0 22px rgba(6, 182, 212, 0.6);
    }

    @keyframes backdropFade {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes modalSlideUp {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class FateModalComponent {
  @Input({ required: true }) config!: FixedTeamConfig;
  @Output() close = new EventEmitter<void>();
  @Output() configChange = new EventEmitter<{ mode: FixedTeamMode; chance: number }>();

  selectedMode: FixedTeamMode = 'chance';
  currentChance = 50;

  ngOnInit(): void {
    this.selectedMode = this.config.mode;
    this.currentChance = this.config.chancePercentage;
  }

  setMode(mode: FixedTeamMode): void {
    this.selectedMode = mode;
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close.emit();
    }
  }

  saveChanges(): void {
    this.configChange.emit({
      mode: this.selectedMode,
      chance: this.currentChance
    });
    this.close.emit();
  }
}
