import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../../models/game.model';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="team-card"
      [class.is-special]="team.isSpecialTeam"
      [style.--theme-glow]="team.theme.borderGlow"
      [style.--theme-accent]="team.theme.accentColor"
      [style.animation-delay]="revealDelay"
    >
      <!-- Card Top Bar & Glow -->
      <div class="card-ambient-bg" [style.background]="team.theme.gradient"></div>
      
      <!-- Special Team Fire Header Tag -->
      @if (team.isSpecialTeam) {
        <div class="destiny-badge">
          <span class="destiny-flame">🔥</span>
          <span>BẤT KHẢ PHÂN LY</span>
        </div>
      }

      <div class="card-header">
        <div class="team-title-row">
          <div class="team-badge-circle" [style.border-color]="team.theme.accentColor">
            <span class="badge-icon">{{ team.badgeEmoji }}</span>
          </div>
          <div class="team-info">
            <h3 class="team-name" [style.color]="team.isSpecialTeam ? '#fbbf24' : '#fff'">
              {{ team.name }}
            </h3>
            <span class="member-count-tag">{{ team.members.length }} thành viên</span>
          </div>
        </div>
        @if (team.quote) {
          <div class="team-quote">{{ team.quote }}</div>
        }
      </div>

      <!-- Member List -->
      <div class="members-container">
        <div class="section-label">
          <span>👥 THÀNH VIÊN</span>
        </div>
        <ul class="member-list">
          @for (member of team.members; track member.id) {
            <li class="member-row">
              <div class="avatar" [style.background]="member.avatarBg">
                <span>{{ member.avatarEmoji }}</span>
              </div>
              <div class="member-details">
                <span class="name">{{ member.name }}</span>
                @if (member.tag) {
                  <span class="tag">{{ member.tag }}</span>
                }
              </div>
            </li>
          }
        </ul>
      </div>

      <!-- Superpower Section -->
      <div class="superpower-container">
        @if (team.superpowers && team.superpowers.length > 1) {
          <!-- SPECIAL TEAM 4-POWER COMBO -->
          <div class="power-header">
            <span class="power-category">⚡ SIÊU NĂNG LỰC ({{ team.superpowers.length }})</span>
            <span class="power-vip-badge">🔥 ĐẶC QUYỀN VIP x4</span>
          </div>
          <div class="multi-power-list">
            @for (power of team.superpowers; track power.id) {
              <div class="power-box multi-power" [style.border-left-color]="power.badgeColor">
                <div class="power-title-row">
                  <span class="power-emoji">{{ power.emoji }}</span>
                  <span class="power-name">{{ power.name }}</span>
                  <span class="power-limit mini" [style.color]="power.badgeColor">
                    {{ power.usageLimit }}
                  </span>
                </div>
                <p class="power-desc">{{ power.description }}</p>
              </div>
            }
          </div>
        } @else {
          <!-- REGULAR 1-POWER -->
          <div class="power-header">
            <span class="power-category">⚡ SIÊU NĂNG LỰC</span>
            <span class="power-limit" [style.color]="team.superpower.badgeColor">
              {{ team.superpower.usageLimit }}
            </span>
          </div>
          <div class="power-box" [style.border-left-color]="team.superpower.badgeColor">
            <div class="power-title-row">
              <span class="power-emoji">{{ team.superpower.emoji }}</span>
              <span class="power-name">{{ team.superpower.name }}</span>
            </div>
            <p class="power-desc">{{ team.superpower.description }}</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .team-card {
      position: relative;
      border-radius: 18px;
      background: rgba(17, 21, 43, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--theme-glow, rgba(124, 58, 237, 0.4));
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--theme-glow, rgba(124, 58, 237, 0.2));
      overflow: hidden;
      display: flex;
      flex-direction: column;
      padding: 1.4rem;
      gap: 1.2rem;
      animation: cardRevealPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .team-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 28px var(--theme-glow);
    }

    .team-card.is-special {
      animation: cardRevealPop 0.6s cubic-bezier(0.16, 1, 0.3, 1) both, specialDestinyFlame 3s infinite 0.6s;
    }

    .card-ambient-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 120px;
      pointer-events: none;
      z-index: 0;
      opacity: 0.9;
    }

    .destiny-badge {
      position: absolute;
      top: 10px;
      right: 12px;
      z-index: 2;
      background: linear-gradient(135deg, #ef4444, #f59e0b);
      color: #fff;
      font-size: 0.68rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
      letter-spacing: 0.05em;
    }

    .destiny-flame {
      animation: flamePulse 1s infinite alternate;
    }

    .card-header {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .team-title-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .team-badge-circle {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: rgba(17, 21, 43, 0.8);
      border: 1.5px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      flex-shrink: 0;
    }

    .badge-icon {
      font-size: 1.45rem;
    }

    .team-info {
      display: flex;
      flex-direction: column;
    }

    .team-name {
      font-family: var(--font-heading);
      font-size: 1.35rem;
      font-weight: 800;
      letter-spacing: -0.01em;
      line-height: 1.2;
    }

    .member-count-tag {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-weight: 600;
    }

    .team-quote {
      font-size: 0.8rem;
      color: #fcd34d;
      font-weight: 600;
      font-style: italic;
      margin-top: 2px;
    }

    /* Members Container */
    .members-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .section-label {
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .member-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .member-row {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      background: rgba(8, 11, 24, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 10px;
      padding: 0.45rem 0.65rem;
      transition: all 0.2s ease;
    }

    .member-row:hover {
      background: rgba(8, 11, 24, 0.9);
      border-color: rgba(255, 255, 255, 0.15);
      transform: translateX(3px);
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .member-details {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      flex: 1;
      min-width: 0;
    }

    .member-details .name {
      font-weight: 600;
      font-size: 0.9rem;
      color: #f8fafc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .member-details .tag {
      font-size: 0.68rem;
      font-weight: 600;
      color: #94a3b8;
      background: rgba(255, 255, 255, 0.06);
      padding: 1px 5px;
      border-radius: 4px;
      white-space: nowrap;
    }

    /* Superpower Box */
    .superpower-container {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: auto;
    }

    .power-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.06em;
    }

    .power-category {
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .power-vip-badge {
      font-size: 0.68rem;
      font-weight: 800;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(245, 158, 11, 0.3));
      border: 1px solid rgba(245, 158, 11, 0.7);
      color: #fbbf24;
      padding: 2px 7px;
      border-radius: 6px;
      letter-spacing: 0.05em;
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
      animation: flamePulse 1.2s infinite alternate;
    }

    .multi-power-list {
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    .power-box.multi-power {
      padding: 0.5rem 0.65rem;
      gap: 0.2rem;
    }

    .power-box.multi-power .power-name {
      font-size: 0.88rem;
    }

    .power-limit.mini {
      margin-left: auto;
      font-size: 0.65rem;
      padding: 1px 5px;
    }

    .power-limit {
      font-weight: 800;
      background: rgba(255, 255, 255, 0.07);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.7rem;
    }

    .power-box {
      background: rgba(8, 11, 24, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-left: 3px solid var(--theme-accent, #7c3aed);
      border-radius: 10px;
      padding: 0.65rem 0.8rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .power-title-row {
      display: flex;
      align-items: center;
      gap: 0.45rem;
    }

    .power-emoji {
      font-size: 1.15rem;
    }

    .power-name {
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 0.95rem;
      color: #f1f5f9;
    }

    .power-desc {
      font-size: 0.78rem;
      color: #cbd5e1;
      line-height: 1.35;
      margin: 0;
    }

    @keyframes flamePulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.2); }
    }
  `]
})
export class TeamCardComponent {
  @Input({ required: true }) team!: Team;
  @Input() revealDelay = '0s';
}
