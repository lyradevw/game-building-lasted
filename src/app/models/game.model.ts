export interface Member {
  id: string;
  name: string;
  year?: string;
  tag?: string;
  avatarEmoji: string;
  avatarBg: string;
}

export interface Superpower {
  id: string;
  name: string;
  emoji: string;
  description: string;
  usageLimit: string;
  badgeColor: string;
}

export interface TeamTheme {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  borderGlow: string;
  accentColor: string;
}

export interface Team {
  id: string;
  teamNumber: number;
  name: string;
  badgeEmoji: string;
  members: Member[];
  superpower: Superpower;
  superpowers: Superpower[];
  isSpecialTeam: boolean;
  theme: TeamTheme;
  quote?: string;
}

export type FixedTeamMode = 'guaranteed' | 'chance' | 'off';

export interface FixedTeamConfig {
  memberIds?: string[];
  members: string[];
  teamName: string;
  subtitle: string;
  mode: FixedTeamMode;
  chancePercentage: number;
  dramaticQuote: string;
  superpowerIds?: string[];
}

export type GameState = 'idle' | 'randomizing' | 'countdown' | 'revealing' | 'completed';
