import { FixedTeamConfig } from '../models/game.model';

/**
 * CẤU HÌNH TEAM ĐỊNH MỆNH (FIXED / SPECIAL TEAM CONFIGURATION)
 * -------------------------------------------------------------
 * Bạn có thể tùy chỉnh dễ dàng:
 * - mode:
 *     'guaranteed' -> Luôn luôn xuất hiện (100%)
 *     'chance'     -> Xuất hiện theo tỉ lệ phần trăm (chancePercentage)
 *     'off'        -> Tắt chế độ cố định, chia ngẫu nhiên thuần túy (0%)
 * - chancePercentage: Xác suất xuất hiện khi mode = 'chance' (mặc định 50%)
 * - members: Danh sách 3 thành viên cố định
 */
export const DEFAULT_FIXED_TEAM_CONFIG: FixedTeamConfig = {
  memberIds: ['m1', 'm2', 'm3'],
  members: [
    'Phụng Lê 2000',
    'Linh Trần 2001',
    'Xuân Đào 2002'
  ],
  teamName: '🔥 TEAM ĐỊNH MỆNH',
  subtitle: 'Tam Hảo Tụ Nghĩa • Kiếp Này Khó Trốn',
  mode: 'guaranteed', // Gán cứng mặc định theo yêu cầu của user
  chancePercentage: 100, // Luôn luôn xuất hiện 100%
  dramaticQuote: '🚨 ĐỊNH MỆNH ĐÃ AN BÀI 🚨\nBa người này KHÔNG THỂ THOÁT KHỎI NHAU!',
  superpowerIds: ['sp1', 'sp2', 'sp4', 'sp5'] // 4 siêu năng lực mặc định: Hồi Sinh, Đóng Băng, Bất Tử, Tốc Biến
};

