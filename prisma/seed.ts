import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

const dbPath = path.resolve(process.cwd(), "prisma", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

const SUBJECTS = [
  { name: "Toán", emoji: "📐", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", description: "Đại số, hình học, thống kê lớp 9", order: 1 },
  { name: "Ngữ Văn", emoji: "📖", color: "#dc2626", bg: "#fef2f2", border: "#fecaca", description: "Văn học, tập làm văn, tiếng Việt", order: 2 },
  { name: "Tiếng Anh", emoji: "🌍", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", description: "Ngữ pháp, từ vựng, kỹ năng giao tiếp", order: 3 },
  { name: "Vật Lý", emoji: "⚡", color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", description: "Điện học, quang học, cơ học", order: 4 },
  { name: "Hóa Học", emoji: "🧪", color: "#d97706", bg: "#fffbeb", border: "#fed7aa", description: "Hóa hữu cơ, vô cơ, phản ứng hóa học", order: 5 },
  { name: "Sinh Học", emoji: "🌱", color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", description: "Di truyền học, sinh thái, tiến hóa", order: 6 },
  { name: "Lịch Sử", emoji: "🏛️", color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", description: "Lịch sử Việt Nam và thế giới", order: 7 },
  { name: "Địa Lý", emoji: "🗺️", color: "#0d9488", bg: "#f0fdfa", border: "#99f6e4", description: "Địa lý tự nhiên và kinh tế-xã hội", order: 8 },
];

// Sample questions per subject — 5 easy (L1-10), 5 medium (L11-30), 5 hard (L31-60)
const QUESTIONS: Record<string, Array<{ level: number; question: string; optionA: string; optionB: string; optionC: string; optionD: string; correct: number; explanation: string }>> = {
  "Toán": [
    { level: 2,  question: "Căn bậc hai số học của 144 là:", optionA: "10", optionB: "11", optionC: "12", optionD: "13", correct: 2, explanation: "√144 = 12 vì 12² = 144" },
    { level: 3,  question: "Chu vi hình vuông cạnh 8 cm là:", optionA: "16 cm", optionB: "24 cm", optionC: "32 cm", optionD: "64 cm", correct: 2, explanation: "C = 4 × 8 = 32 cm" },
    { level: 5,  question: "Nghiệm phương trình 3x − 9 = 0 là:", optionA: "x = −3", optionB: "x = 3", optionC: "x = 9", optionD: "x = 0", correct: 1, explanation: "3x = 9 → x = 3" },
    { level: 7,  question: "sin 30° bằng:", optionA: "√3/2", optionB: "1/2", optionC: "√2/2", optionD: "1", correct: 1, explanation: "sin 30° = 1/2" },
    { level: 9,  question: "Diện tích hình tròn bán kính 5 cm là:", optionA: "25π cm²", optionB: "10π cm²", optionC: "20π cm²", optionD: "50π cm²", correct: 0, explanation: "S = πr² = 25π cm²" },
    { level: 15, question: "Phương trình x² − 5x + 6 = 0 có nghiệm:", optionA: "x=1; x=6", optionB: "x=2; x=3", optionC: "x=−2; x=−3", optionD: "x=1; x=5", correct: 1, explanation: "Δ = 1, x = (5±1)/2 → 3 hoặc 2" },
    { level: 18, question: "Hàm số y = 2x + 3 đồng biến khi:", optionA: "x > 0", optionB: "x < 0", optionC: "Với mọi x", optionD: "x ≠ 0", correct: 2, explanation: "a = 2 > 0 nên hàm đồng biến với mọi x" },
    { level: 22, question: "tan 45° bằng:", optionA: "0", optionB: "1/2", optionC: "√3", optionD: "1", correct: 3, explanation: "tan 45° = sin45°/cos45° = 1" },
    { level: 40, question: "Phương trình bậc hai ax² + bx + c = 0 có Δ < 0 thì:", optionA: "Có 2 nghiệm phân biệt", optionB: "Có nghiệm kép", optionC: "Vô nghiệm", optionD: "Vô số nghiệm", correct: 2, explanation: "Δ < 0 → vô nghiệm trong ℝ" },
    { level: 55, question: "Diện tích tam giác đáy 10 cm, cao 6 cm là:", optionA: "60 cm²", optionB: "30 cm²", optionC: "16 cm²", optionD: "20 cm²", correct: 1, explanation: "S = (đáy × cao)/2 = 30 cm²" },
  ],
  "Ngữ Văn": [
    { level: 2,  question: "Truyện Kiều của ai?", optionA: "Nguyễn Du", optionB: "Nguyễn Trãi", optionC: "Hồ Xuân Hương", optionD: "Đoàn Thị Điểm", correct: 0, explanation: "Truyện Kiều là kiệt tác của Nguyễn Du" },
    { level: 4,  question: "Nhân vật chính truyện 'Lão Hạc' là:", optionA: "Chí Phèo", optionB: "Lão Hạc", optionC: "Thị Nở", optionD: "Bá Kiến", correct: 1, explanation: "Lão Hạc là nhân vật trung tâm của Nam Cao" },
    { level: 6,  question: "Bài thơ 'Đồng chí' của ai?", optionA: "Chính Hữu", optionB: "Tố Hữu", optionC: "Huy Cận", optionD: "Xuân Diệu", correct: 0, explanation: "Đồng chí là bài thơ của Chính Hữu (1948)" },
    { level: 8,  question: "'Làng' là truyện ngắn của:", optionA: "Nam Cao", optionB: "Kim Lân", optionC: "Tô Hoài", optionD: "Nguyên Hồng", correct: 1, explanation: "Truyện Làng của Kim Lân về tình yêu làng của ông Hai" },
    { level: 10, question: "Truyện 'Tắt đèn' kể về ai?", optionA: "Chị Dậu", optionB: "Thị Nở", optionC: "Lão Hạc", optionD: "Mị", correct: 0, explanation: "Chị Dậu là nhân vật trung tâm của Ngô Tất Tố" },
    { level: 20, question: "'Chiếc lược ngà' của ai?", optionA: "Nguyễn Minh Châu", optionB: "Nguyễn Quang Sáng", optionC: "Nguyễn Thi", optionD: "Anh Đức", correct: 1, explanation: "Chiếc lược ngà của Nguyễn Quang Sáng" },
    { level: 25, question: "Phép liên kết dùng từ thay thế gọi là:", optionA: "Phép nối", optionB: "Phép thế", optionC: "Phép lặp", optionD: "Phép liên tưởng", correct: 1, explanation: "Phép thế dùng từ ngữ tương đương thay thế" },
    { level: 35, question: "Hình ảnh 'đầu súng trăng treo' biểu tượng:", optionA: "Tả cảnh thiên nhiên", optionB: "Vừa thực vừa lãng mạn", optionC: "Chỉ sự cô đơn", optionD: "Tả cảnh chiến tranh", correct: 1, explanation: "Hình ảnh kép: hiện thực và lãng mạn" },
    { level: 50, question: "Biện pháp tu từ 'Mặt trời của bắp nằm trên đồi' là:", optionA: "So sánh", optionB: "Nhân hóa", optionC: "Ẩn dụ", optionD: "Hoán dụ", correct: 2, explanation: "Ẩn dụ — dùng mặt trời để chỉ người mẹ" },
    { level: 65, question: "'Chuyện người con gái Nam Xương' thuộc thể loại:", optionA: "Truyện hiện đại", optionB: "Truyện truyền kỳ trung đại", optionC: "Thơ", optionD: "Kịch", correct: 1, explanation: "Của Nguyễn Dữ, là truyện truyền kỳ trung đại" },
  ],
  "Tiếng Anh": [
    { level: 2,  question: "She ___ to school every day.", optionA: "go", optionB: "goes", optionC: "going", optionD: "gone", correct: 1, explanation: "She → third person singular → goes" },
    { level: 4,  question: "Past tense of 'go':", optionA: "goed", optionB: "gone", optionC: "went", optionD: "going", correct: 2, explanation: "Go là irregular verb, quá khứ = went" },
    { level: 6,  question: "Opposite of 'beautiful':", optionA: "ugly", optionB: "handsome", optionC: "pretty", optionD: "lovely", correct: 0, explanation: "Ugly = xấu, trái nghĩa của beautiful" },
    { level: 8,  question: "'She has lived in Hanoi ___ 2010.'", optionA: "for", optionB: "since", optionC: "in", optionD: "at", correct: 1, explanation: "Since + mốc thời gian cụ thể" },
    { level: 10, question: "Which word is a NOUN?", optionA: "quickly", optionB: "happy", optionC: "freedom", optionD: "run", correct: 2, explanation: "Freedom (tự do) là danh từ" },
    { level: 20, question: "Complete: 'If I ___ rich, I would travel.'", optionA: "am", optionB: "was", optionC: "were", optionD: "be", correct: 2, explanation: "Câu điều kiện loại 2: If + were" },
    { level: 25, question: "The book ___ written by Nam Cao.", optionA: "is", optionB: "was", optionC: "were", optionD: "be", correct: 1, explanation: "Bị động quá khứ: was + past participle" },
    { level: 35, question: "'They ___ football when it started raining.'", optionA: "played", optionB: "were playing", optionC: "play", optionD: "have played", correct: 1, explanation: "Past continuous: were playing" },
    { level: 50, question: "Which is PASSIVE voice?", optionA: "She reads the book", optionB: "The book is read by her", optionC: "She is reading", optionD: "She has read", correct: 1, explanation: "Câu bị động: The book is read by her" },
    { level: 65, question: "'This book is ___ than that one.'", optionA: "more interesting", optionB: "interestinger", optionC: "most interesting", optionD: "interesting", correct: 0, explanation: "Tính từ dài dùng more + adj" },
  ],
  "Vật Lý": [
    { level: 2,  question: "Đơn vị đo cường độ dòng điện:", optionA: "Vôn (V)", optionB: "Ampe (A)", optionC: "Ôm (Ω)", optionD: "Oát (W)", correct: 1, explanation: "Ampe (A) đo cường độ dòng điện" },
    { level: 4,  question: "Công thức định luật Ôm:", optionA: "U = I/R", optionB: "I = U/R", optionC: "R = U×I", optionD: "I = R/U", correct: 1, explanation: "I = U/R (Ôm)" },
    { level: 6,  question: "Tốc độ ánh sáng trong chân không:", optionA: "3×10⁵ km/s", optionB: "3×10⁶ km/s", optionC: "3×10⁴ km/s", optionD: "3×10³ km/s", correct: 0, explanation: "c ≈ 3×10⁵ km/s = 300.000 km/s" },
    { level: 8,  question: "Nam châm có mấy cực?", optionA: "1", optionB: "2", optionC: "3", optionD: "4", correct: 1, explanation: "Nam châm có 2 cực: Bắc (N) và Nam (S)" },
    { level: 10, question: "Công suất điện P = ?", optionA: "U + I", optionB: "U × I", optionC: "U / I", optionD: "U − I", correct: 1, explanation: "P = U × I, đơn vị Watt" },
    { level: 18, question: "Thấu kính hội tụ có đặc điểm:", optionA: "Mép dày hơn giữa", optionB: "Giữa dày hơn mép", optionC: "Dày đều", optionD: "Phẳng một mặt", correct: 1, explanation: "Thấu kính hội tụ: giữa dày hơn mép" },
    { level: 25, question: "Đơn vị trên hóa đơn tiền điện:", optionA: "kW", optionB: "kWh", optionC: "V", optionD: "A", correct: 1, explanation: "kWh (kilowatt-giờ) đo điện năng tiêu thụ" },
    { level: 35, question: "Dòng điện xoay chiều VN có tần số:", optionA: "50 Hz", optionB: "60 Hz", optionC: "100 Hz", optionD: "220 Hz", correct: 0, explanation: "Việt Nam dùng 50 Hz, 220V" },
    { level: 50, question: "Điện trở tăng khi:", optionA: "Tiết diện tăng", optionB: "Chiều dài tăng", optionC: "Nhiệt độ giảm", optionD: "Điện áp tăng", correct: 1, explanation: "R = ρ×l/S, R tỉ lệ thuận với l" },
    { level: 70, question: "Lực đẩy Archimedes hướng:", optionA: "Nằm ngang", optionB: "Thẳng đứng hướng lên", optionC: "Thẳng đứng hướng xuống", optionD: "Nghiêng 45°", correct: 1, explanation: "Lực đẩy Archimedes thẳng đứng, hướng lên" },
  ],
  "Hóa Học": [
    { level: 2,  question: "Công thức hóa học của nước:", optionA: "H₂O₂", optionB: "H₂O", optionC: "HO", optionD: "H₃O", correct: 1, explanation: "Nước = H₂O" },
    { level: 4,  question: "Khí chiếm nhiều nhất trong không khí:", optionA: "O₂", optionB: "CO₂", optionC: "N₂", optionD: "H₂", correct: 2, explanation: "N₂ chiếm ~78% không khí" },
    { level: 6,  question: "Axit clohidric có công thức:", optionA: "H₂SO₄", optionB: "HNO₃", optionC: "HCl", optionD: "H₃PO₄", correct: 2, explanation: "HCl = axit clohidric" },
    { level: 8,  question: "Etanol (rượu etylic) có công thức:", optionA: "CH₃OH", optionB: "C₂H₅OH", optionC: "C₃H₇OH", optionD: "HCOOH", correct: 1, explanation: "Rượu etylic = C₂H₅OH" },
    { level: 10, question: "Kim loại dẫn điện tốt nhất:", optionA: "Vàng (Au)", optionB: "Đồng (Cu)", optionC: "Bạc (Ag)", optionD: "Nhôm (Al)", correct: 2, explanation: "Bạc dẫn điện tốt nhất, tiếp theo là đồng" },
    { level: 20, question: "Phản ứng trung hòa là:", optionA: "Fe + HCl", optionB: "NaOH + HCl", optionC: "CaCO₃ → CaO + CO₂", optionD: "Zn + H₂SO₄", correct: 1, explanation: "Axit + Bazơ = Muối + Nước" },
    { level: 28, question: "Glucozo có công thức:", optionA: "C₁₂H₂₂O₁₁", optionB: "C₆H₁₂O₆", optionC: "C₂H₅OH", optionD: "CH₃COOH", correct: 1, explanation: "Glucozo = C₆H₁₂O₆" },
    { level: 40, question: "Axit có trong giấm ăn:", optionA: "HCl", optionB: "CH₃COOH", optionC: "H₂SO₄", optionD: "HNO₃", correct: 1, explanation: "Giấm ăn chứa axit axetic CH₃COOH" },
    { level: 55, question: "Phản ứng thế halogen: CH₄ + Cl₂ → ?", optionA: "CH₃Cl + HCl", optionB: "CCl₄ + H₂", optionC: "CH₂Cl₂ + H₂", optionD: "CO₂ + HCl", correct: 0, explanation: "Phản ứng thế: H bị thay bởi Cl → CH₃Cl + HCl" },
    { level: 70, question: "Oxit bazơ + H₂O tạo thành:", optionA: "Axit", optionB: "Muối", optionC: "Bazơ", optionD: "Oxit axit", correct: 2, explanation: "CaO + H₂O → Ca(OH)₂ (bazơ)" },
  ],
  "Sinh Học": [
    { level: 2,  question: "ADN là viết tắt của:", optionA: "Axit Deoxyribonucleic", optionB: "Axit Ribonucleic", optionC: "Adenin Nucleotide", optionD: "Axit Nucleic Dạng", correct: 0, explanation: "ADN = Axit Deoxyribonucleic" },
    { level: 4,  question: "Người có bao nhiêu cặp NST?", optionA: "23", optionB: "46", optionC: "22", optionD: "48", correct: 0, explanation: "23 cặp NST (46 chiếc tổng cộng)" },
    { level: 6,  question: "Quang hợp xảy ra ở:", optionA: "Rễ", optionB: "Thân", optionC: "Lá (lục lạp)", optionD: "Hoa", correct: 2, explanation: "Quang hợp ở lục lạp trong lá" },
    { level: 8,  question: "Bào quan 'nhà máy năng lượng' của tế bào:", optionA: "Nhân tế bào", optionB: "Lục lạp", optionC: "Ty thể", optionD: "Ribosome", correct: 2, explanation: "Ty thể tạo ATP qua hô hấp tế bào" },
    { level: 10, question: "Hệ tuần hoàn gồm:", optionA: "Tim và phổi", optionB: "Tim và mạch máu", optionC: "Phổi và mạch máu", optionD: "Tim, phổi và thận", correct: 1, explanation: "Tim + hệ thống mạch máu" },
    { level: 20, question: "Đột biến gen là:", optionA: "Thay đổi cấu trúc NST", optionB: "Biến đổi trong cấu trúc gen", optionC: "Thay đổi số lượng NST", optionD: "Biến dị tổ hợp", correct: 1, explanation: "Đột biến gen = biến đổi trong cấu trúc gen" },
    { level: 28, question: "Tổng hợp ARN từ khuôn ADN gọi là:", optionA: "Dịch mã", optionB: "Phiên mã", optionC: "Nhân đôi ADN", optionD: "Đột biến", correct: 1, explanation: "Phiên mã = tổng hợp ARN từ ADN" },
    { level: 40, question: "Kiểu gen AA, Aa cùng kiểu hình do:", optionA: "Đột biến", optionB: "Tính trội hoàn toàn", optionC: "Hoán vị gen", optionD: "Tương tác gen", correct: 1, explanation: "A trội hoàn toàn che khuất alen a" },
    { level: 55, question: "Thuyết tiến hóa Darwin dựa trên:", optionA: "Đột biến ngẫu nhiên", optionB: "Chọn lọc tự nhiên", optionC: "Di truyền Mendel", optionD: "Địa lý học", correct: 1, explanation: "Chọn lọc tự nhiên là cơ chế tiến hóa của Darwin" },
    { level: 70, question: "Miễn dịch là khả năng:", optionA: "Hấp thụ dinh dưỡng", optionB: "Chống lại tác nhân gây bệnh", optionC: "Sinh sản", optionD: "Điều tiết nhiệt", correct: 1, explanation: "Miễn dịch = nhận diện và chống tác nhân gây bệnh" },
  ],
  "Lịch Sử": [
    { level: 2,  question: "Ngày 2/9/1945 là ngày:", optionA: "Độc lập VN", optionB: "Quốc khánh Mỹ", optionC: "Giải phóng miền Nam", optionD: "Chiến thắng ĐBP", correct: 0, explanation: "2/9/1945: Bác Hồ đọc Tuyên ngôn Độc lập" },
    { level: 4,  question: "Chiến thắng Điện Biên Phủ năm:", optionA: "1945", optionB: "1954", optionC: "1968", optionD: "1975", correct: 1, explanation: "7/5/1954: Chiến thắng Điện Biên Phủ" },
    { level: 6,  question: "30/4/1975 là ngày:", optionA: "Độc lập VN", optionB: "Thống nhất đất nước", optionC: "Ký Hiệp định Paris", optionD: "Chiến thắng ĐBP", correct: 1, explanation: "30/4/1975: Giải phóng Sài Gòn, thống nhất đất nước" },
    { level: 8,  question: "Khởi nghĩa Hai Bà Trưng nổ ra năm:", optionA: "39", optionB: "40", optionC: "41", optionD: "42", correct: 1, explanation: "Năm 40 SCN, chống ách đô hộ nhà Hán" },
    { level: 10, question: "Chiến tranh thế giới I kết thúc năm:", optionA: "1914", optionB: "1917", optionC: "1918", optionD: "1919", correct: 2, explanation: "CTTG I kết thúc 1918 với phe Hiệp Ước thắng" },
    { level: 20, question: "Đảng CSVN thành lập năm:", optionA: "1925", optionB: "1928", optionC: "1930", optionD: "1935", correct: 2, explanation: "3/2/1930 tại Hồng Kông, do Nguyễn Ái Quốc chủ trì" },
    { level: 25, question: "Cách mạng tháng 10 Nga lật đổ:", optionA: "Phong kiến", optionB: "Tư bản", optionC: "Chế độ Sa hoàng", optionD: "Thực dân", correct: 2, explanation: "Cách mạng 1917 do Lênin lãnh đạo lật đổ Sa hoàng" },
    { level: 35, question: "Phong trào Đông Du do ai khởi xướng?", optionA: "Phan Bội Châu", optionB: "Phan Châu Trinh", optionC: "Nguyễn Ái Quốc", optionD: "Lương Văn Can", correct: 0, explanation: "Phan Bội Châu, đưa học sinh sang Nhật 1905-1909" },
    { level: 50, question: "Hiệp định Giơnevơ chia VN tại vĩ tuyến:", optionA: "16", optionB: "17", optionC: "18", optionD: "19", correct: 1, explanation: "Vĩ tuyến 17 là ranh giới tạm thời năm 1954" },
    { level: 70, question: "Trận Bạch Đằng 1288 do ai chỉ huy?", optionA: "Lý Thường Kiệt", optionB: "Trần Hưng Đạo", optionC: "Lê Lợi", optionD: "Nguyễn Trãi", correct: 1, explanation: "Trần Quốc Tuấn chỉ huy đánh tan quân Nguyên" },
  ],
  "Địa Lý": [
    { level: 2,  question: "Việt Nam có diện tích khoảng:", optionA: "231.000 km²", optionB: "311.000 km²", optionC: "331.000 km²", optionD: "341.000 km²", correct: 2, explanation: "~331.212 km²" },
    { level: 4,  question: "Núi cao nhất Việt Nam:", optionA: "Phanxipăng", optionB: "Putaleng", optionC: "Rào Cỏ", optionD: "Ngọc Linh", correct: 0, explanation: "Phanxipăng 3.143 m, 'Nóc nhà Đông Dương'" },
    { level: 6,  question: "Đồng bằng lớn nhất Việt Nam:", optionA: "Đồng bằng sông Hồng", optionB: "Đồng bằng sông Cửu Long", optionC: "Duyên hải miền Trung", optionD: "Bắc Trung Bộ", correct: 1, explanation: "ĐBSCL ~40.000 km²" },
    { level: 8,  question: "Việt Nam có bao nhiêu tỉnh/thành?", optionA: "57", optionB: "61", optionC: "63", optionD: "65", correct: 2, explanation: "63 tỉnh và thành phố trực thuộc TW" },
    { level: 10, question: "Khí hậu Việt Nam thuộc kiểu:", optionA: "Ôn đới lục địa", optionB: "Nhiệt đới gió mùa", optionC: "Cận nhiệt đới", optionD: "Địa trung hải", correct: 1, explanation: "Nhiệt đới gió mùa ẩm, 2 mùa mưa và khô" },
    { level: 20, question: "Dãy Trường Sơn chạy hướng:", optionA: "Đông-Tây", optionB: "Bắc-Nam", optionC: "Tây Bắc-Đông Nam", optionD: "Đông Bắc-Tây Nam", correct: 2, explanation: "Trường Sơn chạy Tây Bắc - Đông Nam" },
    { level: 28, question: "Vùng giàu khoáng sản nhất VN:", optionA: "Đồng bằng sông Hồng", optionB: "Trung du miền núi Bắc Bộ", optionC: "Duyên hải Nam Trung Bộ", optionD: "Tây Nguyên", correct: 1, explanation: "Nhiều than đá, sắt, đồng, apatit..." },
    { level: 40, question: "Cây công nghiệp nhiều nhất Tây Nguyên:", optionA: "Lúa", optionB: "Mía", optionC: "Cà phê", optionD: "Cao su", correct: 2, explanation: "TN sản xuất ~90% cà phê cả nước" },
    { level: 55, question: "Gió mùa Đông Bắc ảnh hưởng nhiều nhất đến:", optionA: "Nam Bộ", optionB: "Tây Nguyên", optionC: "Miền Bắc VN", optionD: "Nam Trung Bộ", correct: 2, explanation: "Gió mùa ĐB gây mùa đông lạnh ở miền Bắc" },
    { level: 70, question: "Biển Đông diện tích khoảng:", optionA: "1,5 triệu km²", optionB: "2,3 triệu km²", optionC: "3,5 triệu km²", optionD: "4,8 triệu km²", correct: 2, explanation: "~3,5 triệu km², biển lớn thứ hai châu Á" },
  ],
};

const DEFAULT_REWARDS = [
  { name: "Người Mới Bắt Đầu", emoji: "🌱", description: "Hoàn thành bài thi đầu tiên", color: "#6b7280", conditionType: "total_score", conditionValue: 1, pointBonus: 0 },
  { name: "Học Sinh Chăm Chỉ",  emoji: "📚", description: "Đạt 100 điểm tổng", color: "#2563eb", conditionType: "total_score", conditionValue: 100, pointBonus: 20 },
  { name: "Người Giỏi",          emoji: "⭐", description: "Đạt 300 điểm tổng", color: "#7c3aed", conditionType: "total_score", conditionValue: 300, pointBonus: 50 },
  { name: "Học Sinh Xuất Sắc",   emoji: "🏆", description: "Đạt 600 điểm tổng", color: "#d97706", conditionType: "total_score", conditionValue: 600, pointBonus: 100 },
  { name: "Thiên Tài",           emoji: "🌟", description: "Đạt 1000 điểm tổng", color: "#dc2626", conditionType: "total_score", conditionValue: 1000, pointBonus: 200 },
  { name: "Thám Hiểm Level 10",  emoji: "🎯", description: "Đạt level 10 bất kỳ môn nào", color: "#0891b2", conditionType: "subject_level", conditionValue: 10, pointBonus: 30 },
  { name: "Chinh Phục Level 50", emoji: "🚀", description: "Đạt level 50 bất kỳ môn nào", color: "#ea580c", conditionType: "subject_level", conditionValue: 50, pointBonus: 100 },
  { name: "Bậc Thầy Level 100",  emoji: "👑", description: "Đạt level 100 bất kỳ môn nào", color: "#7c3aed", conditionType: "subject_level", conditionValue: 100, pointBonus: 500 },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@dangkhoa.edu.vn" },
    update: {},
    create: { email: "admin@dangkhoa.edu.vn", name: "Admin Đăng Khoa", password: adminPassword, role: "admin" },
  });

  // Demo student
  const studentPassword = await bcrypt.hash("student123", 10);
  await prisma.user.upsert({
    where: { email: "hocsinh@demo.vn" },
    update: {},
    create: { email: "hocsinh@demo.vn", name: "Nguyễn Văn An", password: studentPassword, role: "student" },
  });

  // Subjects
  const subjectMap: Record<string, string> = {};
  for (const s of SUBJECTS) {
    const subject = await prisma.subject.upsert({
      where: { id: s.name },
      update: s,
      create: { id: s.name.replace(/\s/g, "_"), ...s },
    });
    subjectMap[s.name] = subject.id;
  }

  // Questions
  for (const [subjectName, questions] of Object.entries(QUESTIONS)) {
    const subjectId = subjectMap[subjectName];
    if (!subjectId) continue;
    // Delete existing and recreate
    await prisma.question.deleteMany({ where: { subjectId } });
    await prisma.question.createMany({
      data: questions.map((q) => ({ ...q, subjectId })),
    });
  }

  // Rewards
  await prisma.reward.deleteMany({});
  await prisma.reward.createMany({ data: DEFAULT_REWARDS });

  console.log("✅ Seed complete!");
  console.log("   Admin: admin@dangkhoa.edu.vn / admin123");
  console.log("   Demo:  hocsinh@demo.vn / student123");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
