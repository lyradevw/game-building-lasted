import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../models/game.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="member-card"
      [class.is-shuffling]="isShuffling"
      [class.is-special-trio]="isSpecialTrio"
      [style.animation-delay]="shuffleDelay"
    >
      <div class="avatar-ring" [style.background]="member.avatarBg">
        <span class="avatar-icon">{{ member.avatarEmoji }}</span>
      </div>
      
      <div class="info">
        <div class="name-row">
          <span class="member-name">{{ member.name }}</span>
          @if (isSpecialTrio) {
            <span class="fate-icon" title="Thành viên nhóm Định Mệnh">🔥</span>
          }
        </div>
        <div class="tag-row">
          @if (member.tag) {
            <span class="member-tag">{{ member.tag }}</span>
          }
          @if (member.year) {
            <span class="year-pill">{{ member.year }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .member-card {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: rgba(17, 21, 43, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(124, 58, 237, 0.25);
      border-radius: 14px;
      padding: 0.65rem 0.85rem;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .member-card:hover {
      border-color: rgba(6, 182, 212, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(6, 182, 212, 0.2);
      background: rgba(26, 32, 66, 0.85);
    }

    .member-card.is-special-trio {
      border-color: rgba(245, 158, 11, 0.35);
    }

    .avatar-ring {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      position: relative;
    }

    .avatar-icon {
      font-size: 1.35rem;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      min-width: 0;
      flex: 1;
    }

    .name-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.35rem;
    }

    .member-name {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.92rem;
      color: #f1f5f9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .fate-icon {
      font-size: 0.8rem;
      filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.8));
      animation: flamePulse 1.5s infinite;
    }

    @keyframes flamePulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }

    .tag-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .member-tag {
      font-size: 0.7rem;
      font-weight: 600;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.06);
      padding: 1px 6px;
      border-radius: 4px;
    }

    .year-pill {
      font-size: 0.68rem;
      font-weight: 700;
      color: #38bdf8;
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 1px 5px;
      border-radius: 4px;
    }

    /* Rapid shuffle animation */
    .member-card.is-shuffling {
      animation: cardShuffleGlitch 0.35s ease-in-out infinite alternate;
      border-color: rgba(6, 182, 212, 0.8);
      box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
    }
  `]
})
export class MemberCardComponent {
  @Input({ required: true }) member!: Member;
  @Input() isShuffling = false;
  @Input() isSpecialTrio = false;
  @Input() shuffleDelay = '0s';
}
