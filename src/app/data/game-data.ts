import { Member, Superpower, TeamTheme } from '../models/game.model';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Phụng Lê 2000',
    year: '2000',
    tag: 'Đại Ca',
    avatarEmoji: '👑',
    avatarBg: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  {
    id: 'm2',
    name: 'Linh Trần 2001',
    year: '2001',
    tag: 'Vợ Lyhan',
    avatarEmoji: '😼',
    avatarBg: 'linear-gradient(135deg, #ec4899, #be185d)'
  },
  {
    id: 'm3',
    name: 'Xuân Đào 2002',
    year: '2002',
    tag: 'Thánh Chơi Dơ',
    avatarEmoji: '🌸',
    avatarBg: 'linear-gradient(135deg, #f43f5e, #fda4af)'
  },
  {
    id: 'm4',
    name: 'Kẽm Gai 2003',
    year: '2003',
    tag: 'Gai Góc',
    avatarEmoji: '⚡',
    avatarBg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)'
  },
  {
    id: 'm5',
    name: 'Ngọc Ngà 2004',
    year: '2004',
    tag: 'Tiểu Thư',
    avatarEmoji: '💎',
    avatarBg: 'linear-gradient(135deg, #06b6d4, #0891b2)'
  },
  {
    id: 'm6',
    name: 'Minh Phi 2004',
    year: '2004',
    tag: 'Chiến Thần',
    avatarEmoji: '🔥',
    avatarBg: 'linear-gradient(135deg, #ef4444, #b91c1c)'
  },
  {
    id: 'm7',
    name: 'Mỹ Xuyến 2007',
    year: '2007',
    tag: 'Út Cưng',
    avatarEmoji: '✨',
    avatarBg: 'linear-gradient(135deg, #a855f7, #9333ea)'
  },
  {
    id: 'm8',
    name: 'Mỹ Tiên 2003',
    year: '2003',
    tag: 'Tiên Nữ',
    avatarEmoji: '🧚‍♀️',
    avatarBg: 'linear-gradient(135deg, #10b981, #059669)'
  },
  {
    id: 'm9',
    name: 'Bác sĩ Thư',
    year: 'BS',
    tag: 'Trưởng Khoa',
    avatarEmoji: '🩺',
    avatarBg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  },
  {
    id: 'm10',
    name: 'Chị Bích',
    year: 'Boss',
    tag: 'Đại Tẩu',
    avatarEmoji: '🛡️',
    avatarBg: 'linear-gradient(135deg, #6366f1, #4338ca)'
  },
  {
    id: 'm11',
    name: 'Xuân Đào nhỏ',
    year: '2004',
    tag: 'Đào pé',
    avatarEmoji: '👑',
    avatarBg: 'linear-gradient(135deg, #06b6d4, #0891b2)'
  }
];

export const SUPERPOWERS: Superpower[] = [
  {
    id: 'sp1',
    name: 'Hồi Sinh',
    emoji: '❤️',
    description: 'Có thể hồi sinh 1 đồng đội bị loại tối đa 3 lần.',
    usageLimit: '3 lần / game',
    badgeColor: '#ef4444'
  },
  {
    id: 'sp2',
    name: 'Đóng Băng',
    emoji: '🧊',
    description: 'Bắt 1 thành viên đội khác đứng bất động trong 10 giây.',
    usageLimit: '2 lần / game',
    badgeColor: '#38bdf8'
  },
  {
    id: 'sp3',
    name: 'Thử Thách Bí Mật',
    emoji: '👀',
    description: 'Được thử thách bí mật từ Admin để lấy thêm siêu năng lực.',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#a855f7'
  },
  {
    id: 'sp4',
    name: 'Bất Tử',
    emoji: '🛡️',
    description: 'Miễn nhiễm hoàn toàn với 1 hình phạt hoặc thử thách khắc nghiệt.',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#10b981'
  },
  {
    id: 'sp5',
    name: 'Tốc Biến',
    emoji: '⚡',
    description: 'Trốn thoát ngay lập tức khỏi 1 cuộc đại chiến.',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#f59e0b'
  },
  {
    id: 'sp6',
    name: 'Cướp Quyền',
    emoji: '😈',
    description: 'Cướp sạch lợi thế hoặc lượt ưu tiên của một đội khác.',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#8b5cf6'
  },
  {
    id: 'sp8',
    name: 'Đổi Số Phận',
    emoji: '🎲',
    description: 'Yêu cầu reroll hoặc bốc thăm lại 1 kết quả ngẫu nhiên.',
    usageLimit: '2 lần / game',
    badgeColor: '#06b6d4'
  },
  {
    id: 'sp9',
    name: 'Đội Trưởng',
    emoji: '👑',
    description: 'Được quyền chỉ định tráo đổi 1 thành viên với đội khác!',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#eab308'
  },
  {
    id: 'sp10',
    name: 'Vạ Miệng',
    emoji: '🎤',
    description: 'Bắt đội đối thủ cử 1 người hát chay 1 bài để qua ải!',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#14b8a6'
  },
  {
    id: 'sp11',
    name: 'Cấm Khẩu',
    emoji: '🤫',
    description: 'Chỉ định 1 thành viên đội khác ngậm miệng không nói trong 2 phút!',
    usageLimit: '1 lần duy nhất',
    badgeColor: '#64748b'
  }
];

export const TROLL_MESSAGES: string[] = [
  'Đang bóc phốt số phận...',
  'Đang quét ADN tình bạn...',
  'Đang tìm đồng đội gánh tạ...',
  'Có người sắp lét...',
  'Số phận đã được vũ trụ an bài...',
  'Không được đổi đội nha các tình yêu 😈',
  'Đừng trách admin, do mình nghiệp! 😂',
  'Hệ thống đang né tránh những cặp đôi toxic...',
  'Bảo hiểm nhân thọ đã chính thức hết hạn!',
  '3 khọm zà kia liệu có chạy thoát không? 🔮',
  'Ai sẽ là người gánh team còng cả lưng? 🏋️'
];

export const TEAM_THEMES: TeamTheme[] = [
  {
    id: 'theme-fire',
    name: 'RỒNG LỬA',
    emoji: '🔥',
    gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(245, 158, 11, 0.15) 100%)',
    borderGlow: 'rgba(239, 68, 68, 0.6)',
    accentColor: '#f59e0b'
  },
  {
    id: 'theme-lightning',
    name: 'TIA CHỚP',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(139, 92, 246, 0.15) 100%)',
    borderGlow: 'rgba(59, 130, 246, 0.6)',
    accentColor: '#60a5fa'
  },
  {
    id: 'theme-ice',
    name: 'BĂNG GIÁ',
    emoji: '❄️',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(16, 185, 129, 0.15) 100%)',
    borderGlow: 'rgba(6, 182, 212, 0.6)',
    accentColor: '#22d3ee'
  },
  {
    id: 'theme-shadow',
    name: 'HẮC ÁM',
    emoji: '👑',
    gradient: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(236, 72, 153, 0.15) 100%)',
    borderGlow: 'rgba(168, 85, 247, 0.6)',
    accentColor: '#c084fc'
  }
];

export const SPECIAL_TEAM_THEME: TeamTheme = {
  id: 'theme-special',
  name: 'KHỌM ZÀ',
  emoji: '🔥',
  gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(245, 158, 11, 0.3) 50%, rgba(217, 70, 239, 0.2) 100%)',
  borderGlow: 'rgba(245, 158, 11, 0.9)',
  accentColor: '#fbbf24'
};
