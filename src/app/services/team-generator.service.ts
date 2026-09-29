import { Injectable } from '@angular/core';
import { Member, Superpower, Team, FixedTeamConfig, FixedTeamMode } from '../models/game.model';
import { INITIAL_MEMBERS, SUPERPOWERS, TEAM_THEMES, SPECIAL_TEAM_THEME } from '../data/game-data';
import { DEFAULT_FIXED_TEAM_CONFIG } from '../config/fixed-team.config';

@Injectable({
  providedIn: 'root'
})
export class TeamGeneratorService {
  private currentMembers: Member[] = [...INITIAL_MEMBERS];
  private fixedTeamConfig: FixedTeamConfig = { ...DEFAULT_FIXED_TEAM_CONFIG };

  public get members(): Member[] {
    return this.currentMembers;
  }

  public get config(): FixedTeamConfig {
    return this.fixedTeamConfig;
  }

  public updateConfig(newConfig: Partial<FixedTeamConfig>): void {
    this.fixedTeamConfig = { ...this.fixedTeamConfig, ...newConfig };
  }

  public setMode(mode: FixedTeamMode): void {
    this.fixedTeamConfig.mode = mode;
  }

  public setChance(chance: number): void {
    this.fixedTeamConfig.chancePercentage = Math.max(0, Math.min(100, chance));
  }

  public resetMembers(): void {
    this.currentMembers = [...INITIAL_MEMBERS];
  }

  /**
   * Fisher-Yates shuffle helper
   */
  private shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  /**
   * Determine if the special fixed team should be triggered
   */
  public shouldTriggerFixedTeam(): boolean {
    if (this.fixedTeamConfig.mode === 'guaranteed') {
      return true;
    }
    if (this.fixedTeamConfig.mode === 'off') {
      return false;
    }
    // Mode is 'chance'
    const roll = Math.random() * 100;
    return roll < this.fixedTeamConfig.chancePercentage;
  }

  /**
   * Generate 4 teams satisfying:
   * - Total 10 members
   * - Each team has 2 or 3 members
   * - Every member in exactly 1 team, no duplicates
   */
  public generateTeams(): { teams: Team[]; fixedTeamTriggered: boolean } {
    const fixedTriggered = this.shouldTriggerFixedTeam();
    const fixedMemberNames = new Set(this.fixedTeamConfig.members);
    const specialPowerIds = this.fixedTeamConfig.superpowerIds || ['sp1', 'sp2', 'sp4', 'sp5'];
    const specialSuperpowers = SUPERPOWERS.filter(sp => specialPowerIds.includes(sp.id));
    const nonSpecialPowers = this.shuffle(SUPERPOWERS.filter(sp => !specialPowerIds.includes(sp.id)));

    let generatedTeams: Team[] = [];

    if (fixedTriggered) {
      // Find fixed members from current member list
      const fixedMembers = this.currentMembers.filter(m => fixedMemberNames.has(m.name));
      const remainingMembers = this.currentMembers.filter(m => !fixedMemberNames.has(m.name));

      // We have 3 fixed members forming 1 team of size 3
      // Remaining 7 members are partitioned into 3 teams: sizes [3, 2, 2] in random order
      const remainingSizes = this.shuffle([3, 2, 2]);
      const shuffledRemaining = this.shuffle(remainingMembers);

      const otherTeamsMembers: Member[][] = [];
      let cursor = 0;
      for (const size of remainingSizes) {
        otherTeamsMembers.push(shuffledRemaining.slice(cursor, cursor + size));
        cursor += size;
      }

      // Special team receives all 4 special superpowers (sp1, sp2, sp4, sp5)!
      const specialTeam: Team = {
        id: 'team-destiny',
        teamNumber: 1,
        name: this.fixedTeamConfig.teamName,
        badgeEmoji: '🔥',
        members: fixedMembers,
        superpower: specialSuperpowers[0],
        superpowers: specialSuperpowers,
        isSpecialTeam: true,
        theme: SPECIAL_TEAM_THEME,
        quote: this.fixedTeamConfig.subtitle
      };

      const regularThemes = this.shuffle([...TEAM_THEMES]);
      const otherTeams: Team[] = otherTeamsMembers.map((teamMembers, idx) => {
        const power = nonSpecialPowers[idx % nonSpecialPowers.length];
        return {
          id: `team-${idx + 2}`,
          teamNumber: idx + 2,
          name: `TEAM 0${idx + 2}`,
          badgeEmoji: regularThemes[idx % regularThemes.length].emoji,
          members: teamMembers,
          superpower: power,
          superpowers: [power],
          isSpecialTeam: false,
          theme: regularThemes[idx % regularThemes.length]
        };
      });

      generatedTeams = [specialTeam, ...otherTeams];

    } else {
      // Pure random division
      // Pick random permutation of [3, 3, 2, 2]
      const teamSizes = this.shuffle([3, 3, 2, 2]);
      const shuffledMembers = this.shuffle(this.currentMembers);
      const regularThemes = this.shuffle([...TEAM_THEMES]);
      let cursor = 0;
      let nonSpecialIdx = 0;

      generatedTeams = teamSizes.map((size, idx) => {
        const teamMembers = shuffledMembers.slice(cursor, cursor + size);
        cursor += size;

        // Check if all 3 fixed members happen to be together by chance
        const hasAllFixed = size === 3 && fixedMemberNames.size === 3 &&
          teamMembers.every(m => fixedMemberNames.has(m.name));

        const theme = hasAllFixed ? SPECIAL_TEAM_THEME : regularThemes[idx % regularThemes.length];
        const teamName = hasAllFixed ? this.fixedTeamConfig.teamName : `TEAM 0${idx + 1}`;
        const powers = hasAllFixed ? specialSuperpowers : [nonSpecialPowers[nonSpecialIdx++ % nonSpecialPowers.length]];

        return {
          id: `team-${idx + 1}`,
          teamNumber: idx + 1,
          name: teamName,
          badgeEmoji: hasAllFixed ? '🔥' : theme.emoji,
          members: teamMembers,
          superpower: powers[0],
          superpowers: powers,
          isSpecialTeam: hasAllFixed,
          theme,
          quote: hasAllFixed ? this.fixedTeamConfig.subtitle : undefined
        };
      });
    }

    const actualFixedSelected = generatedTeams.some(t => t.isSpecialTeam);
    return {
      teams: generatedTeams,
      fixedTeamTriggered: actualFixedSelected
    };
  }

  /**
   * Format result into clean, friendly text for copying
   */
  public formatResultText(teams: Team[], fixedTriggered: boolean): string {
    let text = `🎲 KẾT QUẢ CHIA ĐỘI - TEAM CHAOS 🎲\n`;
    text += `═══════════════════════════════════\n\n`;

    if (fixedTriggered) {
      text += `🚨 ĐỊNH MỆNH ĐÃ AN BÀI 🚨\nBa người này KHÔNG THỂ THOÁT KHỎI NHAU!\n\n`;
    }

    teams.forEach(team => {
      text += `${team.badgeEmoji} ${team.name}\n`;
      team.members.forEach(member => {
        text += `  • ${member.name}\n`;
      });
      if (team.superpowers && team.superpowers.length > 1) {
        text += `⚡ ĐẶC QUYỀN VIP (SỞ HỮU TRỌN BỘ ${team.superpowers.length} SIÊU NĂNG LỰC):\n`;
        team.superpowers.forEach(sp => {
          text += `  - ${sp.emoji} ${sp.name} (${sp.usageLimit}): ${sp.description}\n`;
        });
      } else {
        const sp = (team.superpowers && team.superpowers.length > 0) ? team.superpowers[0] : team.superpower;
        text += `⚡ Siêu năng lực: ${sp.emoji} ${sp.name} (${sp.usageLimit})\n`;
        text += `  💬 ${sp.description}\n`;
      }
      text += `\n`;
    });

    text += `═══════════════════════════════════\n`;
    text += `👉 Luật chơi: Đội nào vi phạm bị phạt theo quy định của nhóm! 😈`;
    return text;
  }
}
