export interface Subject {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  description: string;
  topics: string[];
}

export const subjects: Subject[] = [
  {
    id: "toan",
    name: "Toán",
    emoji: "📐",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    description: "Đại số, hình học, thống kê lớp 9",
    topics: ["Căn bậc hai", "Hàm số bậc nhất", "Phương trình bậc hai", "Hình học phẳng", "Lượng giác"],
  },
  {
    id: "van",
    name: "Ngữ Văn",
    emoji: "📖",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fecaca",
    description: "Văn học, tập làm văn, tiếng Việt",
    topics: ["Truyện Kiều", "Tắt đèn", "Lão Hạc", "Làm văn nghị luận", "Tiếng Việt"],
  },
  {
    id: "anh",
    name: "Tiếng Anh",
    emoji: "🌍",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    description: "Ngữ pháp, từ vựng, kỹ năng giao tiếp",
    topics: ["Grammar", "Vocabulary", "Reading", "Writing", "Speaking"],
  },
  {
    id: "ly",
    name: "Vật Lý",
    emoji: "⚡",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    description: "Điện học, quang học, cơ học",
    topics: ["Điện học", "Quang học", "Cơ học", "Nhiệt học", "Âm học"],
  },
  {
    id: "hoa",
    name: "Hóa Học",
    emoji: "🧪",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fed7aa",
    description: "Hóa hữu cơ, vô cơ, phản ứng hóa học",
    topics: ["Hidrocacbon", "Ancol-Axit", "Phi kim", "Kim loại", "Dung dịch"],
  },
  {
    id: "sinh",
    name: "Sinh Học",
    emoji: "🌱",
    color: "#16a34a",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    description: "Di truyền học, sinh thái, tiến hóa",
    topics: ["Di truyền học", "Sinh thái học", "Tiến hóa", "Sinh học tế bào", "Hệ cơ thể"],
  },
  {
    id: "su",
    name: "Lịch Sử",
    emoji: "🏛️",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    description: "Lịch sử Việt Nam và thế giới",
    topics: ["Lịch sử Việt Nam", "Chiến tranh thế giới", "Cách mạng", "Phong trào giải phóng", "Thế kỷ XX"],
  },
  {
    id: "dia",
    name: "Địa Lý",
    emoji: "🗺️",
    color: "#0d9488",
    bg: "#f0fdfa",
    border: "#99f6e4",
    description: "Địa lý tự nhiên và kinh tế-xã hội",
    topics: ["Địa lý tự nhiên", "Dân số", "Kinh tế", "Vùng lãnh thổ", "Địa lý thế giới"],
  },
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}
