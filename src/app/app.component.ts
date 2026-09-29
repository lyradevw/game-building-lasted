import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { CountdownOverlayComponent } from './components/countdown-overlay/countdown-overlay.component';
import { FateAlertComponent } from './components/fate-alert/fate-alert.component';
import { FateModalComponent } from './components/fate-modal/fate-modal.component';
import { ToastComponent } from './components/toast/toast.component';

import { Member, Team, GameState, FixedTeamMode, FixedTeamConfig } from './models/game.model';
import { TeamGeneratorService } from './services/team-generator.service';
import { SoundService } from './services/sound.service';
import { ConfettiService } from './services/confetti.service';
import { TROLL_MESSAGES } from './data/game-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MemberCardComponent,
    TeamCardComponent,
    CountdownOverlayComponent,
    FateAlertComponent,
    FateModalComponent,
    ToastComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = '🎲 TEAM CHAOS';

  // Game States
  gameState: GameState = 'idle';
  countdownStep = 3;
  currentTrollMessage = 'Đang bóc phốt số phận...';
  
  // Data
  members: Member[] = [];
  generatedTeams: Team[] = [];
  fixedTeamTriggered = false;
  showFateAlert = false;
  showFateModal = false;

  // Toast
  toastVisible = false;
  toastMessage = '';
  toastIcon = '✨';
  private toastTimeout: any;

  // Intervals & Timers
  private tickerInterval: any;
  private countdownTimer: any;
  private soundTickInterval: any;

  // Set of fixed team member names for highlighting
  fixedMemberNames = new Set<string>();

  constructor(
    public generator: TeamGeneratorService,
    public sound: SoundService,
    private confetti: ConfettiService
  ) {}

  ngOnInit(): void {
    this.members = this.generator.members;
    this.updateFixedSet();
  }

  ngOnDestroy(): void {
    this.clearAllTimers();
  }

  private updateFixedSet(): void {
    this.fixedMemberNames = new Set(this.generator.config.members);
  }

  get isSpecialTrio(): (item: Member | string) => boolean {
    const fixedMemberIds = new Set(this.generator.config.memberIds || ['m1', 'm2', 'm3']);
    return (item: Member | string) => {
      if (typeof item === 'string') {
        return this.fixedMemberNames.has(item) || fixedMemberIds.has(item);
      }
      return fixedMemberIds.has(item.id) || this.fixedMemberNames.has(item.name);
    };
  }

  get isIdle(): boolean {
    return this.gameState === 'idle';
  }

  get isRandomizing(): boolean {
    return this.gameState === 'randomizing';
  }

  get isCountdown(): boolean {
    return this.gameState === 'countdown';
  }

  get isCompleted(): boolean {
    return this.gameState === 'completed' || this.gameState === 'revealing';
  }

  get isMuted(): boolean {
    return this.sound.muted;
  }

  get fixedConfig(): FixedTeamConfig {
    return this.generator.config;
  }

  toggleSound(): void {
    const isMuted = this.sound.toggleMute();
    this.showToast(
      isMuted ? '🔇 Đã tắt âm thanh trò chơi' : '🔊 Đã bật âm thanh trò chơi',
      isMuted ? '🔇' : '🔊'
    );
  }

  openSettings(): void {
    this.sound.playClick();
    this.showFateModal = true;
  }

  closeSettings(): void {
    this.sound.playClick();
    this.showFateModal = false;
  }

  onFateConfigChange(event: { mode: FixedTeamMode; chance: number }): void {
    this.generator.setMode(event.mode);
    this.generator.setChance(event.chance);
    this.showToast('⚙️ Đã lưu thiết lập Số Phận thành công!', '💾');
  }

  /**
   * Main CTA: Start the dramatic Random Team process
   */
  startRandomization(): void {
    if (this.isRandomizing || this.isCountdown) return;

    this.sound.playClick();
    this.gameState = 'randomizing';
    this.showFateAlert = false;

    // Rapid shuffle animation & troll message ticker
    let tickCount = 0;
    this.soundTickInterval = setInterval(() => {
      this.sound.playTick();
    }, 120);

    let msgIndex = Math.floor(Math.random() * TROLL_MESSAGES.length);
    this.currentTrollMessage = TROLL_MESSAGES[msgIndex];

    this.tickerInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % TROLL_MESSAGES.length;
      this.currentTrollMessage = TROLL_MESSAGES[msgIndex];
      tickCount++;
    }, 320);

    // Shuffle for 1.8 seconds then proceed to countdown
    setTimeout(() => {
      clearInterval(this.tickerInterval);
      clearInterval(this.soundTickInterval);
      this.startCountdown();
    }, 1800);
  }

  /**
   * Dramatic Countdown: 3 -> 2 -> 1 -> 💥 LET'S GO!
   */
  private startCountdown(): void {
    this.gameState = 'countdown';
    this.countdownStep = 3;
    this.sound.playCountdownBeep(3);

    // Count 2
    setTimeout(() => {
      this.countdownStep = 2;
      this.sound.playCountdownBeep(2);
    }, 800);

    // Count 1
    setTimeout(() => {
      this.countdownStep = 1;
      this.sound.playCountdownBeep(1);
    }, 1600);

    // Count 0: LET'S GO!
    setTimeout(() => {
      this.countdownStep = 0;
      this.sound.playLetsGoImpact();
      this.confetti.launch(0.5, 0.4, 60);
    }, 2400);

    // Finish countdown and reveal
    setTimeout(() => {
      this.revealResults();
    }, 3200);
  }

  /**
   * Generate teams and reveal them with effects
   */
  private revealResults(): void {
    const result = this.generator.generateTeams();
    this.generatedTeams = result.teams;
    this.fixedTeamTriggered = result.fixedTeamTriggered;
    this.gameState = 'revealing';

    // Play reveal sound for teams
    this.generatedTeams.forEach((_, idx) => {
      setTimeout(() => {
        this.sound.playCardReveal(idx);
      }, idx * 180);
    });

    // Check special team
    setTimeout(() => {
      this.gameState = 'completed';
      if (this.fixedTeamTriggered) {
        this.showFateAlert = true;
        this.sound.playDestinyAlert();
        this.confetti.launch(0.5, 0.35, 120, true);
      } else {
        this.sound.playSuccessChime();
        this.confetti.launch(0.5, 0.35, 80, false);
      }
    }, this.generatedTeams.length * 200 + 100);
  }

  /**
   * Reset back to initial state
   */
  resetGame(): void {
    this.sound.playClick();
    this.clearAllTimers();
    this.gameState = 'idle';
    this.generatedTeams = [];
    this.showFateAlert = false;
    this.showToast('🔄 Đã làm mới danh sách đội!', '🔄');
  }

  /**
   * Copy cleanly formatted team result to clipboard
   */
  async copyResult(): Promise<void> {
    this.sound.playClick();
    if (!this.generatedTeams || this.generatedTeams.length === 0) return;

    const formattedText = this.generator.formatResultText(
      this.generatedTeams,
      this.fixedTeamTriggered
    );

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedText);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = formattedText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      this.sound.playSuccessChime();
      this.showToast('📋 Đã sao chép kết quả! Gửi vào nhóm Zalo/Messenger ngay!', '✅');
    } catch {
      this.showToast('Không thể sao chép tự động. Vui lòng chọn văn bản thủ công!', '⚠️');
    }
  }

  /**
   * Show toast notification helper
   */
  private showToast(msg: string, icon: string): void {
    this.toastMessage = msg;
    this.toastIcon = icon;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 2800);
  }

  private clearAllTimers(): void {
    if (this.tickerInterval) clearInterval(this.tickerInterval);
    if (this.soundTickInterval) clearInterval(this.soundTickInterval);
    if (this.countdownTimer) clearTimeout(this.countdownTimer);
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
  }
}
