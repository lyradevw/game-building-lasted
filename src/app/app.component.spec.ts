import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TeamGeneratorService } from './services/team-generator.service';

describe('Team Chaos & TeamGeneratorService Tests', () => {
  let generator: TeamGeneratorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [TeamGeneratorService]
    }).compileComponents();

    generator = TestBed.inject(TeamGeneratorService);
  });

  it('should initialize with exactly 10 members', () => {
    expect(generator.members.length).toBe(10);
    const names = generator.members.map(m => m.name);
    expect(names).toContain('Phụng Lê 2000');
    expect(names).toContain('Linh Trần 2001');
    expect(names).toContain('Xuân Đào 2002');
    expect(names).toContain('Kẽm Gai 2003');
    expect(names).toContain('Ngọc Ngà 2004');
    expect(names).toContain('Minh Phi 2004');
    expect(names).toContain('Mỹ Xuyến 2007');
    expect(names).toContain('Mỹ Tiên 2003');
    expect(names).toContain('Bác sĩ Thư');
    expect(names).toContain('Chị Bích');
  });

  it('should generate teams where each team has 2 or 3 members across 100 iterations', () => {
    for (let i = 0; i < 100; i++) {
      generator.setMode('off');
      const { teams } = generator.generateTeams();

      // Check total members
      let allAssigned: string[] = [];
      teams.forEach(team => {
        expect(team.members.length).toBeGreaterThanOrEqual(2);
        expect(team.members.length).toBeLessThanOrEqual(3);
        allAssigned = allAssigned.concat(team.members.map(m => m.name));
      });

      expect(allAssigned.length).toBe(10);
      const uniqueNames = new Set(allAssigned);
      expect(uniqueNames.size).toBe(10);
    }
  });

  it('should guarantee special team of 3 members when mode is guaranteed', () => {
    generator.setMode('guaranteed');
    for (let i = 0; i < 20; i++) {
      const { teams, fixedTeamTriggered } = generator.generateTeams();
      expect(fixedTeamTriggered).toBeTrue();

      const specialTeam = teams.find(t => t.isSpecialTeam);
      expect(specialTeam).toBeDefined();
      expect(specialTeam!.members.length).toBe(3);
      expect(specialTeam!.name).toContain('TEAM ĐỊNH MỆNH');

      const specialNames = specialTeam!.members.map(m => m.name);
      expect(specialNames).toContain('Phụng Lê 2000');
      expect(specialNames).toContain('Linh Trần 2001');
      expect(specialNames).toContain('Xuân Đào 2002');

      // Verify special team receives all 4 superpowers: sp1, sp2, sp4, sp5
      expect(specialTeam!.superpowers.length).toBe(4);
      const powerIds = specialTeam!.superpowers.map(p => p.id);
      expect(powerIds).toContain('sp1');
      expect(powerIds).toContain('sp2');
      expect(powerIds).toContain('sp4');
      expect(powerIds).toContain('sp5');

      // The other 3 teams must also satisfy 2-3 members and each has 1 superpower
      const otherTeams = teams.filter(t => !t.isSpecialTeam);
      expect(otherTeams.length).toBe(3);
      otherTeams.forEach(t => {
        expect(t.members.length).toBeGreaterThanOrEqual(2);
        expect(t.members.length).toBeLessThanOrEqual(3);
        expect(t.superpowers.length).toBe(1);
      });
    }
  });

  it('should format result text for clipboard cleanly with all 4 superpowers for special team', () => {
    generator.setMode('guaranteed');
    const { teams, fixedTeamTriggered } = generator.generateTeams();
    const text = generator.formatResultText(teams, fixedTeamTriggered);

    expect(text).toContain('KẾT QUẢ CHIA ĐỘI');
    expect(text).toContain('ĐỊNH MỆNH ĐÃ AN BÀI');
    expect(text).toContain('Phụng Lê 2000');
    expect(text).toContain('Hồi Sinh');
    expect(text).toContain('Đóng Băng');
    expect(text).toContain('Bất Tử');
    expect(text).toContain('Tốc Biến');
  });

  it('should render 10 member cards in DOM in idle state', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.hero-title')?.textContent).toContain("WHO'S YOUR");
    const memberCards = compiled.querySelectorAll('app-member-card');
    expect(memberCards.length).toBe(10);

    const randomBtn = compiled.querySelector('.huge-random-btn') as HTMLButtonElement;
    expect(randomBtn).toBeTruthy();
    expect(randomBtn.textContent).toContain('RANDOM TEAM');
  });

  it('should transition through randomizing, countdown, and complete reveal with teams', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    // Guaranteed mode for predictable test
    app.generator.setMode('guaranteed');
    app.startRandomization();
    expect(app.gameState).toBe('randomizing');
    expect(app.isRandomizing).toBeTrue();

    // Advance 1800ms -> randomizing completes, countdown starts
    tick(1800);
    expect(app.gameState).toBe('countdown');
    expect(app.isCountdown).toBeTrue();

    // Advance 3200ms -> countdown completes, teams revealing starts
    tick(3200);
    expect(app.gameState).toBe('revealing');
    expect(app.generatedTeams.length).toBe(4);

    // Advance 1000ms -> reveal completes, completed state
    tick(1000);
    expect(app.gameState).toBe('completed');
    expect(app.fixedTeamTriggered).toBeTrue();
    expect(app.showFateAlert).toBeTrue();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const teamCards = compiled.querySelectorAll('app-team-card');
    expect(teamCards.length).toBe(4);

    const fateAlert = compiled.querySelector('app-fate-alert');
    expect(fateAlert).toBeTruthy();

    // Test reset
    app.resetGame();
    expect(app.gameState).toBe('idle');
    expect(app.generatedTeams.length).toBe(0);
    expect(app.showFateAlert).toBeFalse();

    // Advance remaining toast timeout (2800ms)
    tick(3000);
  }));

  it('should open and close fate settings modal', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;

    expect(app.showFateModal).toBeFalse();
    app.openSettings();
    expect(app.showFateModal).toBeTrue();

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-fate-modal')).toBeTruthy();

    app.onFateConfigChange({ mode: 'chance', chance: 75 });
    expect(app.fixedConfig.mode).toBe('chance');
    expect(app.fixedConfig.chancePercentage).toBe(75);

    app.closeSettings();
    expect(app.showFateModal).toBeFalse();
  });
});

