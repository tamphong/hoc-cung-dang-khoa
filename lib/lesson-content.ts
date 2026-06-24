export type Exercise = {
  problem: string;
  hint?: string;
  steps: string[];
  answer: string;
};

export type Topic = {
  title: string;
  theory: string[];
  formulas?: string[];
  videoTitle?: string;
  videoUrl?: string;
  exercises?: Exercise[];
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
};

export type SubjectLessons = {
  chapters: Chapter[];
};

function ytSearch(query: string) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

const lessonContent: Record<string, SubjectLessons> = {
  Toán: {
    chapters: [
      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 1: CĂN BẬC HAI – CĂN BẬC BA
      // ═══════════════════════════════════════════════════════
      {
        id: "can-bac-hai",
        title: "Chương 1: Căn bậc hai – Căn bậc ba",
        description: "Khái niệm, tính chất và rút gọn biểu thức chứa căn bậc hai, căn bậc ba",
        topics: [
          {
            title: "Căn bậc hai và điều kiện xác định",
            theory: [
              "√a xác định (có nghĩa) khi a ≥ 0",
              "√(a²) = |a| — không phải a (chú ý khi a < 0)",
              "√a · √b = √(ab) với a ≥ 0, b ≥ 0",
              "√(a/b) = √a / √b với a ≥ 0, b > 0",
              "Bình phương hai vế: cách khử dấu căn (cần đặt điều kiện)",
            ],
            formulas: [
              "(√a)² = a  (a ≥ 0)",
              "√(a²) = |a|",
              "√a · √b = √(ab)",
              "√a / √b = √(a/b)  (b > 0)",
            ],
            videoTitle: "Căn bậc hai – Lý thuyết và bài tập lớp 9",
            videoUrl: ytSearch("căn bậc hai lớp 9 lý thuyết bài tập"),
            exercises: [
              {
                problem: "Tính: A = √49 + √(–3)² – √(5 – √25)",
                hint: "Tính từng căn, nhớ √(a²) = |a|",
                steps: [
                  "√49 = 7",
                  "√(–3)² = |–3| = 3",
                  "√25 = 5, nên 5 – √25 = 5 – 5 = 0, √0 = 0",
                  "A = 7 + 3 – 0 = 10",
                ],
                answer: "A = 10",
              },
              {
                problem: "Tìm x biết: √(2x – 1) = 3",
                hint: "Bình phương hai vế, chú ý điều kiện 2x – 1 ≥ 0",
                steps: [
                  "Điều kiện: 2x – 1 ≥ 0 ⟹ x ≥ 1/2",
                  "Bình phương hai vế: 2x – 1 = 9",
                  "2x = 10 ⟹ x = 5",
                  "Kiểm tra: x = 5 ≥ 1/2 ✓ và √(2·5–1) = √9 = 3 ✓",
                ],
                answer: "x = 5",
              },
              {
                problem: "Tính: B = √(3 + √5) · √(3 – √5)",
                hint: "Dùng công thức √a · √b = √(ab) rồi hằng đẳng thức (a+b)(a–b)",
                steps: [
                  "B = √[(3 + √5)(3 – √5)]",
                  "= √(3² – (√5)²)",
                  "= √(9 – 5)",
                  "= √4 = 2",
                ],
                answer: "B = 2",
              },
            ],
          },
          {
            title: "Rút gọn biểu thức chứa căn",
            theory: [
              "Đưa thừa số ra ngoài dấu căn: √(a²b) = |a|·√b (b ≥ 0)",
              "Đưa thừa số vào trong dấu căn: a·√b = √(a²b) (a ≥ 0)",
              "Khử mẫu: √(a/b) = √(ab)/b (a ≥ 0, b > 0)",
              "Trục căn thức ở mẫu đơn giản: A/√B = A√B/B",
              "Trục căn thức ở mẫu dạng liên hợp: nhân cả tử và mẫu với (√A ∓ √B)",
            ],
            formulas: [
              "A/√B = A√B/B",
              "A/(√B + √C) = A(√B – √C)/(B – C)",
              "A/(√B – √C) = A(√B + √C)/(B – C)",
            ],
            videoTitle: "Rút gọn biểu thức chứa căn bậc hai lớp 9",
            videoUrl: ytSearch("rút gọn biểu thức chứa căn lớp 9"),
            exercises: [
              {
                problem: "Rút gọn: P = (√x – 1)/(√x + 1) + 2√x/(x – 1)  (x ≥ 0, x ≠ 1)",
                hint: "Phân tích x – 1 = (√x – 1)(√x + 1), quy đồng mẫu",
                steps: [
                  "Nhận thấy: x – 1 = (√x – 1)(√x + 1)",
                  "P = (√x–1)²/[(√x–1)(√x+1)] + 2√x/[(√x–1)(√x+1)]",
                  "= [(√x–1)² + 2√x] / [(√x–1)(√x+1)]",
                  "= [x – 2√x + 1 + 2√x] / (x – 1)",
                  "= (x + 1) / (x – 1)",
                ],
                answer: "P = (x + 1)/(x – 1)",
              },
              {
                problem: "Trục căn thức mẫu: C = 5/(3 – √2)",
                hint: "Nhân tử và mẫu với biểu thức liên hợp (3 + √2)",
                steps: [
                  "C = 5(3 + √2) / [(3 – √2)(3 + √2)]",
                  "= 5(3 + √2) / (9 – 2)",
                  "= 5(3 + √2) / 7",
                  "= (15 + 5√2) / 7",
                ],
                answer: "C = (15 + 5√2)/7",
              },
              {
                problem: "Rút gọn: D = √(4 – 2√3) + √(4 + 2√3)",
                hint: "Viết 4 – 2√3 = 3 – 2√3 + 1 = (√3 – 1)²",
                steps: [
                  "4 – 2√3 = 3 – 2√3 + 1 = (√3 – 1)² ⟹ √(4–2√3) = √3 – 1 (vì √3 > 1)",
                  "4 + 2√3 = 3 + 2√3 + 1 = (√3 + 1)² ⟹ √(4+2√3) = √3 + 1",
                  "D = (√3 – 1) + (√3 + 1) = 2√3",
                ],
                answer: "D = 2√3",
              },
            ],
          },
          {
            title: "Căn bậc ba",
            theory: [
              "∛a là số x thỏa mãn x³ = a — xác định với mọi a ∈ ℝ (kể cả a < 0)",
              "∛(–a) = –∛a (căn bậc ba là hàm lẻ)",
              "∛(ab) = ∛a · ∛b",
              "∛(a/b) = ∛a / ∛b (b ≠ 0)",
              "Một số căn đặc biệt cần nhớ: ∛1=1, ∛8=2, ∛27=3, ∛64=4, ∛125=5",
            ],
            formulas: [
              "(∛a)³ = a",
              "∛(a³) = a",
              "∛(ab) = ∛a · ∛b",
            ],
            videoTitle: "Căn bậc ba lớp 9 – Lý thuyết và bài tập",
            videoUrl: ytSearch("căn bậc ba lớp 9 bài tập"),
            exercises: [
              {
                problem: "Tính: E = ∛(–125) + ∛8 · ∛(1/8)",
                steps: [
                  "∛(–125) = –∛125 = –5",
                  "∛8 · ∛(1/8) = ∛(8 · 1/8) = ∛1 = 1",
                  "E = –5 + 1 = –4",
                ],
                answer: "E = –4",
              },
              {
                problem: "Tìm x: ∛(x – 2) = 3",
                steps: [
                  "Lập phương hai vế: x – 2 = 3³ = 27",
                  "x = 29",
                ],
                answer: "x = 29",
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 2: HÀM SỐ y = ax² VÀ PHƯƠNG TRÌNH BẬC HAI
      // ═══════════════════════════════════════════════════════
      {
        id: "ham-so-bac-hai",
        title: "Chương 2: Hàm số y = ax² (a ≠ 0)",
        description: "Đồ thị parabol, tính chất hàm số bậc hai và liên hệ với phương trình",
        topics: [
          {
            title: "Hàm số y = ax² và đồ thị",
            theory: [
              "Đồ thị là parabol, đỉnh tại gốc tọa độ O(0;0), trục đối xứng là trục Oy",
              "a > 0: parabol mở lên (hình lõm), điểm thấp nhất là O",
              "a < 0: parabol mở xuống (hình lồi), điểm cao nhất là O",
              "|a| càng lớn → đồ thị càng 'hẹp' (dốc hơn)",
              "Đồng biến khi x > 0 (nếu a > 0); nghịch biến khi x < 0 (nếu a > 0)",
              "Cách vẽ: lập bảng giá trị với x = 0, ±1, ±2, ... rồi nối mượt",
            ],
            formulas: [
              "y = ax²  (a ≠ 0)",
              "Điểm thuộc đồ thị: M(x₀; ax₀²)",
            ],
            videoTitle: "Hàm số y = ax² – Đồ thị và tính chất lớp 9",
            videoUrl: ytSearch("hàm số y bằng ax2 lớp 9 đồ thị tính chất"),
            exercises: [
              {
                problem: "Cho hàm số y = 2x². a) Vẽ đồ thị. b) Tìm tọa độ điểm M thuộc đồ thị có hoành độ x = –3. c) Tìm x để y = 8.",
                steps: [
                  "b) x = –3: y = 2·(–3)² = 2·9 = 18 → M(–3; 18)",
                  "c) y = 8: 2x² = 8 ⟹ x² = 4 ⟹ x = ±2",
                ],
                answer: "M(–3; 18); x = 2 hoặc x = –2",
              },
              {
                problem: "Điểm A(–2; m) thuộc đồ thị y = –x². Tìm m.",
                steps: [
                  "Vì A(–2; m) thuộc đồ thị y = –x²:",
                  "m = –(–2)² = –4",
                ],
                answer: "m = –4",
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 3: PHƯƠNG TRÌNH BẬC HAI MỘT ẨN
      // ═══════════════════════════════════════════════════════
      {
        id: "phuong-trinh-bac-hai",
        title: "Chương 3: Phương trình bậc hai một ẩn",
        description: "Công thức nghiệm, hệ thức Vi-et và các dạng bài tập",
        topics: [
          {
            title: "Công thức nghiệm – Delta (Δ)",
            theory: [
              "Dạng tổng quát: ax² + bx + c = 0  (a ≠ 0)",
              "Biệt thức: Δ = b² – 4ac",
              "Δ > 0: phương trình có 2 nghiệm phân biệt",
              "Δ = 0: phương trình có nghiệm kép x₁ = x₂ = –b/(2a)",
              "Δ < 0: phương trình vô nghiệm thực",
              "Công thức nghiệm thu gọn (khi b = 2b'): Δ' = b'² – ac, nghiệm x = (–b' ± √Δ')/a",
            ],
            formulas: [
              "Δ = b² – 4ac",
              "x₁₂ = (–b ± √Δ) / (2a)  khi Δ ≥ 0",
              "Δ' = b'² – ac  (b = 2b')",
              "x₁₂ = (–b' ± √Δ') / a",
            ],
            videoTitle: "Phương trình bậc hai – Công thức nghiệm lớp 9",
            videoUrl: ytSearch("phương trình bậc hai lớp 9 công thức nghiệm delta"),
            exercises: [
              {
                problem: "Giải phương trình: 2x² – 5x + 3 = 0",
                steps: [
                  "a = 2, b = –5, c = 3",
                  "Δ = (–5)² – 4·2·3 = 25 – 24 = 1 > 0",
                  "√Δ = 1",
                  "x₁ = (5 + 1)/4 = 6/4 = 3/2",
                  "x₂ = (5 – 1)/4 = 4/4 = 1",
                ],
                answer: "x₁ = 3/2; x₂ = 1",
              },
              {
                problem: "Giải phương trình: x² – 6x + 9 = 0",
                steps: [
                  "a = 1, b = –6, c = 9",
                  "Δ = 36 – 36 = 0",
                  "Nghiệm kép: x₁ = x₂ = 6/2 = 3",
                ],
                answer: "x = 3 (nghiệm kép)",
              },
              {
                problem: "Giải phương trình: x² + x + 1 = 0",
                steps: [
                  "Δ = 1² – 4·1·1 = 1 – 4 = –3 < 0",
                  "Vì Δ < 0, phương trình vô nghiệm thực",
                ],
                answer: "Phương trình vô nghiệm",
              },
              {
                problem: "Giải bằng công thức nghiệm thu gọn: x² – 4x – 5 = 0",
                hint: "b = –4 = 2·(–2), nên b' = –2",
                steps: [
                  "b' = –2, Δ' = (–2)² – 1·(–5) = 4 + 5 = 9",
                  "√Δ' = 3",
                  "x₁ = (2 + 3)/1 = 5",
                  "x₂ = (2 – 3)/1 = –1",
                ],
                answer: "x₁ = 5; x₂ = –1",
              },
            ],
          },
          {
            title: "Hệ thức Vi-et và ứng dụng",
            theory: [
              "Nếu x₁, x₂ là hai nghiệm của ax² + bx + c = 0 (a ≠ 0, Δ ≥ 0) thì:",
              "  • Tổng: x₁ + x₂ = –b/a",
              "  • Tích: x₁ · x₂ = c/a",
              "Ứng dụng 1: Không cần giải PT, tính nhanh x₁+x₂, x₁x₂, x₁²+x₂²...",
              "Ứng dụng 2: Tìm hai số khi biết tổng S và tích P → lập PT x² – Sx + P = 0",
              "Ứng dụng 3: Lập phương trình bậc hai khi biết hai nghiệm",
              "Điều kiện để PT có hai nghiệm cùng dấu: Δ ≥ 0, x₁x₂ > 0, x₁+x₂ cùng dấu với nghiệm",
            ],
            formulas: [
              "x₁ + x₂ = –b/a",
              "x₁ · x₂ = c/a",
              "x₁² + x₂² = (x₁+x₂)² – 2x₁x₂",
              "|x₁ – x₂| = √[(x₁+x₂)² – 4x₁x₂] = √Δ / |a|",
            ],
            videoTitle: "Hệ thức Vi-et lớp 9 – Lý thuyết và bài tập",
            videoUrl: ytSearch("hệ thức Vi-et lớp 9 ứng dụng bài tập"),
            exercises: [
              {
                problem: "Cho PT: x² – 5x + 6 = 0. Không giải PT, hãy tính: x₁² + x₂², (x₁ – x₂)²",
                hint: "Dùng Vi-et: S = x₁+x₂ = 5, P = x₁x₂ = 6",
                steps: [
                  "S = x₁+x₂ = 5; P = x₁x₂ = 6",
                  "x₁²+x₂² = S² – 2P = 25 – 12 = 13",
                  "(x₁–x₂)² = S² – 4P = 25 – 24 = 1 ⟹ |x₁–x₂| = 1",
                ],
                answer: "x₁²+x₂² = 13; |x₁–x₂| = 1",
              },
              {
                problem: "Lập phương trình bậc hai có hai nghiệm là x₁ = 3, x₂ = –2",
                steps: [
                  "S = x₁ + x₂ = 3 + (–2) = 1",
                  "P = x₁ · x₂ = 3·(–2) = –6",
                  "Phương trình: x² – Sx + P = 0",
                  "⟹ x² – x – 6 = 0",
                ],
                answer: "x² – x – 6 = 0",
              },
              {
                problem: "Tìm m để PT x² – 2(m+1)x + m² – 1 = 0 có hai nghiệm dương phân biệt",
                hint: "Cần: Δ > 0, S > 0, P > 0",
                steps: [
                  "a = 1, b = –2(m+1), c = m²–1",
                  "Δ > 0: 4(m+1)² – 4(m²–1) > 0 ⟹ 4(m²+2m+1–m²+1) > 0 ⟹ 8m+8 > 0 ⟹ m > –1",
                  "S = 2(m+1) > 0 ⟹ m > –1 (đã thỏa)",
                  "P = m²–1 > 0 ⟹ m > 1 hoặc m < –1",
                  "Kết hợp: m > 1",
                ],
                answer: "m > 1",
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 4: HỆ PHƯƠNG TRÌNH BẬC NHẤT HAI ẨN
      // ═══════════════════════════════════════════════════════
      {
        id: "he-phuong-trinh",
        title: "Chương 4: Hệ phương trình bậc nhất hai ẩn",
        description: "Giải hệ PT bằng phương pháp thế và phương pháp cộng đại số",
        topics: [
          {
            title: "Phương trình bậc nhất hai ẩn và hệ phương trình",
            theory: [
              "PT bậc nhất hai ẩn: ax + by = c (a, b không đồng thời bằng 0)",
              "Nghiệm là cặp số (x₀; y₀) thỏa mãn cả hai phương trình",
              "Hệ có thể: vô nghiệm, có nghiệm duy nhất, vô số nghiệm",
              "Nghĩa hình học: giao điểm của hai đường thẳng ax+by=c và a'x+b'y=c'",
            ],
            videoTitle: "Hệ phương trình bậc nhất hai ẩn lớp 9",
            videoUrl: ytSearch("hệ phương trình bậc nhất hai ẩn lớp 9"),
          },
          {
            title: "Phương pháp thế",
            theory: [
              "Bước 1: Từ một PT, biểu diễn một ẩn theo ẩn kia (ví dụ: x theo y)",
              "Bước 2: Thế vào PT còn lại → PT một ẩn → giải",
              "Bước 3: Tính ẩn còn lại, kết luận nghiệm",
            ],
            videoTitle: "Giải hệ PT bằng phương pháp thế lớp 9",
            videoUrl: ytSearch("giải hệ phương trình phương pháp thế lớp 9"),
            exercises: [
              {
                problem: "Giải hệ: { 2x + y = 5 // x – y = 1 }",
                steps: [
                  "Từ PT(2): x = y + 1",
                  "Thế vào PT(1): 2(y+1) + y = 5 ⟹ 2y+2+y = 5 ⟹ 3y = 3 ⟹ y = 1",
                  "x = y + 1 = 2",
                ],
                answer: "(x; y) = (2; 1)",
              },
              {
                problem: "Giải hệ: { 3x – 2y = 7 // x + 4y = 5 }",
                steps: [
                  "Từ PT(2): x = 5 – 4y",
                  "Thế vào PT(1): 3(5–4y) – 2y = 7 ⟹ 15–12y–2y = 7 ⟹ –14y = –8 ⟹ y = 4/7",
                  "x = 5 – 4·(4/7) = 5 – 16/7 = 19/7",
                ],
                answer: "(x; y) = (19/7; 4/7)",
              },
            ],
          },
          {
            title: "Phương pháp cộng đại số",
            theory: [
              "Bước 1: Nhân hai PT với hệ số thích hợp để hệ số của một ẩn bằng nhau (hoặc đối nhau)",
              "Bước 2: Cộng (hoặc trừ) hai PT để triệt tiêu một ẩn",
              "Bước 3: Giải PT một ẩn còn lại, rồi tìm ẩn kia",
              "Mẹo: Chọn ẩn có hệ số nhỏ để nhân cho thuận tiện",
            ],
            videoTitle: "Giải hệ PT phương pháp cộng đại số lớp 9",
            videoUrl: ytSearch("giải hệ phương trình phương pháp cộng đại số lớp 9"),
            exercises: [
              {
                problem: "Giải hệ: { 3x + 2y = 8 // 3x – y = 5 }",
                steps: [
                  "Trừ PT(2) khỏi PT(1): (3x+2y) – (3x–y) = 8–5 ⟹ 3y = 3 ⟹ y = 1",
                  "Thế y = 1 vào PT(2): 3x – 1 = 5 ⟹ 3x = 6 ⟹ x = 2",
                ],
                answer: "(x; y) = (2; 1)",
              },
              {
                problem: "Giải hệ: { 2x + 3y = 12 // 5x – 2y = 1 }",
                hint: "Nhân PT(1) với 2 và PT(2) với 3 để triệt tiêu y",
                steps: [
                  "PT(1)×2: 4x + 6y = 24",
                  "PT(2)×3: 15x – 6y = 3",
                  "Cộng: 19x = 27 ⟹ x = 27/19",
                  "2·(27/19) + 3y = 12 ⟹ 3y = 12 – 54/19 = 174/19 ⟹ y = 58/19",
                ],
                answer: "(x; y) = (27/19; 58/19)",
              },
              {
                problem: "Bài toán thực tế: Một lớp có 38 học sinh. Số học sinh nam nhiều hơn nữ là 4. Tìm số nam, nữ.",
                hint: "Đặt x = số nam, y = số nữ. Lập hệ PT",
                steps: [
                  "Đặt x = số học sinh nam, y = số học sinh nữ (x, y nguyên dương)",
                  "PT(1): x + y = 38 (tổng số HS)",
                  "PT(2): x – y = 4 (nam nhiều hơn nữ là 4)",
                  "Cộng hai PT: 2x = 42 ⟹ x = 21",
                  "y = 38 – 21 = 17",
                ],
                answer: "21 nam, 17 nữ",
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 5: HỆ THỨC LƯỢNG TRONG TAM GIÁC VUÔNG & TỈ SỐ LƯỢNG GIÁC
      // ═══════════════════════════════════════════════════════
      {
        id: "he-thuc-luong-tg-vuong",
        title: "Chương 5: Hệ thức lượng trong tam giác vuông – Tỉ số lượng giác",
        description: "Các hệ thức về cạnh – đường cao và tỉ số lượng giác của góc nhọn",
        topics: [
          {
            title: "Hệ thức về cạnh và đường cao trong tam giác vuông",
            theory: [
              "Tam giác vuông ABC, góc A = 90°, đường cao AH (H ∈ BC)",
              "BC = a, AB = c, AC = b, AH = h, BH = c', HC = b'",
              "Hệ thức 1 (định lý Pythagore): a² = b² + c²",
              "Hệ thức 2: b² = a·b' (bình phương cạnh góc vuông = tích cạnh huyền với hình chiếu cạnh đó lên huyền)",
              "Hệ thức 3: c² = a·c'",
              "Hệ thức 4: h² = b'·c' (bình phương đường cao = tích hai hình chiếu)",
              "Hệ thức 5: b·c = a·h (tích hai cạnh góc vuông = tích cạnh huyền với đường cao)",
            ],
            formulas: [
              "a² = b² + c²",
              "b² = a·b'; c² = a·c'",
              "h² = b'·c'",
              "b·c = a·h",
              "1/h² = 1/b² + 1/c²",
            ],
            videoTitle: "Hệ thức lượng tam giác vuông lớp 9",
            videoUrl: ytSearch("hệ thức lượng trong tam giác vuông lớp 9"),
            exercises: [
              {
                problem: "Tam giác vuông ABC, góc A = 90°, AB = 6, AC = 8. Tính BC, AH (H là chân đường cao từ A).",
                steps: [
                  "BC² = AB² + AC² = 36 + 64 = 100 ⟹ BC = 10",
                  "AH = AB·AC / BC = 6·8 / 10 = 4,8",
                ],
                answer: "BC = 10; AH = 4,8",
              },
              {
                problem: "Tam giác vuông, cạnh huyền a = 13, đường cao h = 5. Tính hai cạnh góc vuông b và c.",
                hint: "Dùng: bc = ah và b²+c² = a²",
                steps: [
                  "bc = ah = 13·5 = 65",
                  "b² + c² = 13² = 169",
                  "(b + c)² = b²+c²+2bc = 169 + 130 = 299 ⟹ b+c = √299",
                  "(b – c)² = 169 – 130 = 39 ⟹ |b–c| = √39",
                  "b và c là nghiệm của t² – (b+c)t + bc = 0: t² – √299·t + 65 = 0",
                ],
                answer: "b + c = √299 ≈ 17,3; b·c = 65",
              },
            ],
          },
          {
            title: "Tỉ số lượng giác của góc nhọn",
            theory: [
              "Trong tam giác vuông ABC, góc A = 90°, xét góc nhọn B:",
              "  sin B = cạnh đối / cạnh huyền = AC/BC = b/a",
              "  cos B = cạnh kề / cạnh huyền = AB/BC = c/a",
              "  tan B = cạnh đối / cạnh kề = AC/AB = b/c",
              "  cot B = cạnh kề / cạnh đối = AB/AC = c/b",
              "Quan hệ: sin²α + cos²α = 1 (hằng đẳng thức lượng giác cơ bản)",
              "tan α = sin α / cos α; cot α = cos α / sin α",
              "Góc phụ nhau (α + β = 90°): sin α = cos β; tan α = cot β",
            ],
            formulas: [
              "sin²α + cos²α = 1",
              "tan α = sin α / cos α",
              "cot α = 1 / tan α",
              "sin(90°–α) = cos α",
              "tan(90°–α) = cot α",
            ],
            videoTitle: "Tỉ số lượng giác góc nhọn lớp 9",
            videoUrl: ytSearch("tỉ số lượng giác góc nhọn lớp 9 sin cos tan"),
            exercises: [
              {
                problem: "Cho sin α = 3/5. Tính cos α, tan α, cot α.",
                hint: "Dùng sin²α + cos²α = 1",
                steps: [
                  "cos²α = 1 – sin²α = 1 – 9/25 = 16/25 ⟹ cos α = 4/5 (α nhọn nên > 0)",
                  "tan α = sin α / cos α = (3/5)/(4/5) = 3/4",
                  "cot α = 1/tan α = 4/3",
                ],
                answer: "cos α = 4/5; tan α = 3/4; cot α = 4/3",
              },
              {
                problem: "Tam giác vuông ABC, góc C = 90°, BC = 5, AC = 12. Tính sin A, cos A, tan B.",
                steps: [
                  "AB = √(BC² + AC²) = √(25 + 144) = √169 = 13",
                  "sin A = BC/AB = 5/13 (cạnh đối góc A là BC)",
                  "cos A = AC/AB = 12/13",
                  "tan B = AC/BC = 12/5 (góc B, cạnh đối là AC, cạnh kề là BC)",
                ],
                answer: "sin A = 5/13; cos A = 12/13; tan B = 12/5",
              },
              {
                problem: "Tính: A = sin 30° · cos 60° + sin 60° · cos 30°",
                hint: "Dùng giá trị bảng: sin 30°=1/2, cos 30°=√3/2, sin 60°=√3/2, cos 60°=1/2",
                steps: [
                  "A = (1/2)·(1/2) + (√3/2)·(√3/2)",
                  "= 1/4 + 3/4",
                  "= 1",
                  "(Đây chính là sin(30°+60°) = sin 90° = 1, xác nhận công thức cộng)",
                ],
                answer: "A = 1",
              },
            ],
          },
          {
            title: "Bảng giá trị lượng giác thường dùng",
            theory: [
              "sin 0° = 0;  cos 0° = 1;  tan 0° = 0",
              "sin 30° = 1/2;  cos 30° = √3/2;  tan 30° = √3/3 ≈ 0,577",
              "sin 45° = √2/2;  cos 45° = √2/2;  tan 45° = 1",
              "sin 60° = √3/2;  cos 60° = 1/2;  tan 60° = √3 ≈ 1,732",
              "sin 90° = 1;  cos 90° = 0;  tan 90° không xác định",
              "Khi α tăng từ 0° → 90°: sin tăng, cos giảm, tan tăng",
            ],
            videoTitle: "Bảng lượng giác sin cos tan – Cách học thuộc lớp 9",
            videoUrl: ytSearch("bảng lượng giác sin cos tan cot lớp 9 cách nhớ"),
          },
        ],
      },

      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 6: ĐƯỜNG TRÒN
      // ═══════════════════════════════════════════════════════
      {
        id: "duong-tron",
        title: "Chương 6: Đường tròn",
        description: "Tính chất đường tròn, tiếp tuyến và góc với đường tròn",
        topics: [
          {
            title: "Đường tròn – Quan hệ đường thẳng và đường tròn",
            theory: [
              "Đường tròn (O; R): tập hợp các điểm cách O đúng bằng R",
              "Điểm M và đường tròn: trong (OM < R), trên (OM = R), ngoài (OM > R)",
              "Đường thẳng và đường tròn (d = khoảng cách từ tâm đến đường thẳng):",
              "  • d < R: cắt (cát tuyến) — hai điểm chung",
              "  • d = R: tiếp xúc (tiếp tuyến) — một điểm chung",
              "  • d > R: không giao nhau — không có điểm chung",
              "Dây cung vuông góc với bán kính tại trung điểm của dây",
            ],
            videoTitle: "Đường tròn lớp 9 – Lý thuyết cơ bản",
            videoUrl: ytSearch("đường tròn lớp 9 lý thuyết cơ bản quan hệ đường thẳng"),
            exercises: [
              {
                problem: "Đường tròn (O; 5cm). Điểm A cách O là 3cm; điểm B cách O là 5cm; điểm C cách O là 7cm. Điểm nào trong, trên, ngoài đường tròn?",
                steps: [
                  "OA = 3 < R = 5: A nằm trong đường tròn",
                  "OB = 5 = R = 5: B nằm trên đường tròn",
                  "OC = 7 > R = 5: C nằm ngoài đường tròn",
                ],
                answer: "A trong; B trên; C ngoài đường tròn",
              },
            ],
          },
          {
            title: "Tiếp tuyến của đường tròn",
            theory: [
              "Tiếp tuyến tại điểm M: đường thẳng vuông góc với bán kính OM tại M",
              "Từ điểm A ngoài đường tròn có đúng 2 tiếp tuyến AM₁ và AM₂",
              "Tính chất hai tiếp tuyến từ một điểm ngoài: AM₁ = AM₂ (bằng nhau)",
              "Và OA là tia phân giác của góc M₁OM₂ và AM₁AM₂",
              "Độ dài tiếp tuyến: AM = √(OA² – R²)",
            ],
            formulas: [
              "AM ⊥ OM tại M (tiếp tuyến ⊥ bán kính)",
              "AM₁ = AM₂ (hai tiếp tuyến từ ngoài)",
              "AM = √(OA² – R²)",
            ],
            videoTitle: "Tiếp tuyến đường tròn lớp 9",
            videoUrl: ytSearch("tiếp tuyến đường tròn lớp 9 tính chất"),
            exercises: [
              {
                problem: "Từ điểm A cách tâm O một khoảng OA = 10cm, kẻ tiếp tuyến AM với đường tròn (O; 6cm). Tính AM.",
                steps: [
                  "AM ⊥ OM, tam giác OMA vuông tại M",
                  "AM² = OA² – OM² = 100 – 36 = 64",
                  "AM = 8cm",
                ],
                answer: "AM = 8 cm",
              },
            ],
          },
          {
            title: "Góc với đường tròn",
            theory: [
              "Góc ở tâm: đỉnh trùng tâm O; số đo = số đo cung bị chắn",
              "Góc nội tiếp: đỉnh trên đường tròn; số đo = ½ số đo cung bị chắn",
              "Các góc nội tiếp cùng chắn một cung thì bằng nhau",
              "Góc nội tiếp chắn nửa đường tròn (đường kính) = 90°",
              "Góc tạo bởi tiếp tuyến và dây cung = ½ số đo cung bị chắn",
              "Tứ giác nội tiếp: tổng hai góc đối diện = 180°",
            ],
            formulas: [
              "∠nội tiếp = ½ · sđ(cung bị chắn)",
              "∠ở tâm = sđ(cung bị chắn)",
              "∠A + ∠C = 180° (tứ giác nội tiếp, A và C đối nhau)",
            ],
            videoTitle: "Góc nội tiếp – Góc ở tâm đường tròn lớp 9",
            videoUrl: ytSearch("góc nội tiếp góc ở tâm đường tròn lớp 9"),
            exercises: [
              {
                problem: "Cho đường tròn (O). Cung AB = 120°. Tính góc ở tâm AOB và góc nội tiếp ACB (C trên cung lớn).",
                steps: [
                  "Góc ở tâm AOB = số đo cung AB = 120°",
                  "Góc nội tiếp ACB = ½ · sđ(cung AB) = ½ · 120° = 60°",
                ],
                answer: "∠AOB = 120°; ∠ACB = 60°",
              },
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════
      // CHƯƠNG 7: HÌNH TRỤ – HÌNH NÓN – HÌNH CẦU
      // ═══════════════════════════════════════════════════════
      {
        id: "hinh-khong-gian",
        title: "Chương 7: Hình trụ – Hình nón – Hình cầu",
        description: "Công thức diện tích và thể tích các hình không gian",
        topics: [
          {
            title: "Hình trụ",
            theory: [
              "Hình trụ: 2 đáy là hai hình tròn bằng nhau, song song; chiều cao h nối hai tâm",
              "Bán kính đáy R, chiều cao h",
              "Diện tích xung quanh = chu vi đáy × chiều cao",
              "Khi trải ra: hình chữ nhật 2πR × h",
            ],
            formulas: [
              "Sxq = 2πRh",
              "Stp = 2πR(R + h)",
              "V = πR²h",
            ],
            videoTitle: "Hình trụ – Diện tích thể tích lớp 9",
            videoUrl: ytSearch("hình trụ diện tích thể tích lớp 9"),
            exercises: [
              {
                problem: "Hình trụ có R = 3cm, h = 8cm. Tính Sxq, Stp và V.",
                steps: [
                  "Sxq = 2π·3·8 = 48π ≈ 150,8 cm²",
                  "Stp = 2π·3·(3+8) = 66π ≈ 207,3 cm²",
                  "V = π·3²·8 = 72π ≈ 226,2 cm³",
                ],
                answer: "Sxq = 48π cm²; Stp = 66π cm²; V = 72π cm³",
              },
            ],
          },
          {
            title: "Hình nón",
            theory: [
              "Hình nón: đáy là hình tròn bán kính R, đỉnh S, chiều cao h, đường sinh l",
              "Quan hệ: l² = R² + h²",
              "Diện tích xung quanh = ½ × chu vi đáy × đường sinh",
            ],
            formulas: [
              "l² = R² + h²",
              "Sxq = πRl",
              "Stp = πR(R + l)",
              "V = (1/3)πR²h",
            ],
            videoTitle: "Hình nón – Diện tích thể tích lớp 9",
            videoUrl: ytSearch("hình nón diện tích thể tích lớp 9"),
            exercises: [
              {
                problem: "Hình nón có R = 5cm, h = 12cm. Tính đường sinh l, Sxq và V.",
                steps: [
                  "l = √(R²+h²) = √(25+144) = √169 = 13cm",
                  "Sxq = π·5·13 = 65π ≈ 204,2 cm²",
                  "V = (1/3)π·5²·12 = 100π ≈ 314,2 cm³",
                ],
                answer: "l = 13cm; Sxq = 65π cm²; V = 100π cm³",
              },
            ],
          },
          {
            title: "Hình cầu",
            theory: [
              "Hình cầu tâm O, bán kính R: tập hợp điểm cách O đúng R trong không gian",
              "Diện tích mặt cầu = 4 lần diện tích hình tròn lớn nhất",
            ],
            formulas: [
              "S = 4πR²",
              "V = (4/3)πR³",
            ],
            videoTitle: "Hình cầu – Diện tích thể tích lớp 9",
            videoUrl: ytSearch("hình cầu diện tích thể tích lớp 9"),
            exercises: [
              {
                problem: "Quả bóng tròn có đường kính 20cm. Tính diện tích bề mặt và thể tích.",
                steps: [
                  "R = 10cm",
                  "S = 4π·10² = 400π ≈ 1256,6 cm²",
                  "V = (4/3)π·10³ = 4000π/3 ≈ 4188,8 cm³",
                ],
                answer: "S = 400π cm²; V = 4000π/3 cm³",
              },
            ],
          },
        ],
      },
    ],
  },

  Ngữ_Văn: {
    chapters: [
      {
        id: "truyen-kieu",
        title: "Chương 1: Truyện Kiều – Nguyễn Du",
        description: "Tác giả, tác phẩm và các đoạn trích tiêu biểu",
        topics: [
          {
            title: "Tác giả Nguyễn Du và Truyện Kiều",
            theory: [
              "Nguyễn Du (1765–1820), hiệu Tố Như, tên chữ Thanh Hiên",
              "Quê: Tiên Điền, Nghi Xuân, Hà Tĩnh",
              "Truyện Kiều gồm 3.254 câu lục bát, dựa theo Kim Vân Kiều truyện (Trung Quốc)",
              "Chủ đề: số phận bi kịch người phụ nữ tài sắc trong xã hội phong kiến",
              "Giá trị: hiện thực sâu sắc, nhân đạo cao cả, nghệ thuật ngôn từ điêu luyện",
            ],
            videoTitle: "Truyện Kiều Nguyễn Du lớp 9",
            videoUrl: ytSearch("truyện Kiều Nguyễn Du lớp 9 phân tích"),
          },
          {
            title: "Đoạn trích: Chị em Thúy Kiều",
            theory: [
              "Vị trí: phần đầu truyện, giới thiệu hai chị em",
              "Thúy Vân: vẻ đẹp phúc hậu, đoan trang – dự báo cuộc đời bình yên",
              "Thúy Kiều: vẻ đẹp sắc sảo, mặn mà – thiên tài về âm nhạc và thơ ca",
              "Bút pháp ước lệ tượng trưng: so sánh thiên nhiên (trăng, hoa, tuyết...)",
            ],
            videoTitle: "Chị em Thúy Kiều phân tích lớp 9",
            videoUrl: ytSearch("chị em Thúy Kiều phân tích lớp 9"),
          },
          {
            title: "Đoạn trích: Kiều ở lầu Ngưng Bích",
            theory: [
              "Cảnh thiên nhiên mênh mông, cô đơn phản chiếu tâm trạng Kiều",
              "Kiều nhớ Kim Trọng và nhớ cha mẹ → tấm lòng hiếu nghĩa",
              "8 câu cuối: điệp từ 'buồn trông' – mỗi cảnh là một nỗi lo âu",
              "Nghệ thuật tả cảnh ngụ tình đặc sắc",
            ],
            videoTitle: "Kiều ở lầu Ngưng Bích phân tích lớp 9",
            videoUrl: ytSearch("Kiều ở lầu Ngưng Bích phân tích lớp 9"),
          },
        ],
      },
      {
        id: "van-hoc-hien-dai",
        title: "Chương 2: Văn học hiện đại Việt Nam",
        description: "Các tác phẩm văn xuôi và thơ hiện đại lớp 9",
        topics: [
          {
            title: "Làng – Kim Lân",
            theory: [
              "Tình huống: ông Hai nghe tin làng Chợ Dầu theo giặc",
              "Nhân vật ông Hai: yêu làng sâu sắc, đặt tình yêu Tổ quốc lên trên",
              "Tâm lý nhân vật được khắc họa tinh tế qua ngôn ngữ độc thoại nội tâm",
            ],
            videoTitle: "Phân tích truyện Làng Kim Lân lớp 9",
            videoUrl: ytSearch("phân tích truyện Làng Kim Lân lớp 9"),
          },
          {
            title: "Lặng lẽ Sa Pa – Nguyễn Thành Long",
            theory: [
              "Nhân vật anh thanh niên: cống hiến thầm lặng ở vùng núi cao",
              "Ca ngợi những con người lao động bình dị mà cao đẹp",
              "Chủ đề: ý nghĩa của lao động và sự cống hiến",
            ],
            videoTitle: "Lặng lẽ Sa Pa phân tích lớp 9",
            videoUrl: ytSearch("lặng lẽ Sa Pa phân tích lớp 9"),
          },
          {
            title: "Ánh trăng – Nguyễn Duy",
            theory: [
              "Bài thơ về sự vô tình, lãng quên và thức tỉnh lương tâm",
              "Hình ảnh trăng: biểu tượng cho quá khứ, ân nghĩa, thiên nhiên",
              "Thông điệp: sống thủy chung, không quên quá khứ",
            ],
            videoTitle: "Ánh trăng Nguyễn Duy phân tích lớp 9",
            videoUrl: ytSearch("ánh trăng Nguyễn Duy phân tích lớp 9"),
          },
        ],
      },
      {
        id: "tieng-viet",
        title: "Chương 3: Tiếng Việt",
        description: "Từ vựng, ngữ pháp và các phép tu từ",
        topics: [
          {
            title: "Các phương châm hội thoại",
            theory: [
              "Phương châm về lượng: nói đủ thông tin, không thừa không thiếu",
              "Phương châm về chất: chỉ nói điều mình tin là đúng",
              "Phương châm quan hệ: nói đúng đề tài hội thoại",
              "Phương châm cách thức: nói ngắn gọn, rõ ràng, không mơ hồ",
              "Phương châm lịch sự: tế nhị, tôn trọng người nghe",
            ],
            videoTitle: "Các phương châm hội thoại lớp 9",
            videoUrl: ytSearch("các phương châm hội thoại lớp 9"),
          },
          {
            title: "Khởi ngữ và các thành phần biệt lập",
            theory: [
              "Khởi ngữ: nêu đề tài câu nói, đứng trước chủ ngữ (thường có 'về', 'đối với')",
              "Thành phần tình thái: thể hiện nhận định của người nói (hình như, có lẽ...)",
              "Thành phần cảm thán: bộc lộ cảm xúc (ôi, trời ơi...)",
              "Thành phần gọi đáp: dùng để gọi hoặc đáp lại (này, ơi...)",
            ],
            videoTitle: "Khởi ngữ thành phần biệt lập lớp 9",
            videoUrl: ytSearch("khởi ngữ thành phần biệt lập lớp 9"),
          },
        ],
      },
    ],
  },

  Tiếng_Anh: {
    chapters: [
      {
        id: "cac-thi",
        title: "Chương 1: Các thì trong Tiếng Anh",
        description: "Hiện tại, quá khứ, tương lai và hoàn thành",
        topics: [
          {
            title: "Thì hiện tại đơn (Simple Present)",
            theory: [
              "Dùng: thói quen, sự thật hiển nhiên, lịch trình cố định",
              "Dấu hiệu: always, usually, often, sometimes, never, every day...",
              "Khẳng định: S + V(s/es) với he/she/it",
              "Phủ định: S + do/does + not + V",
              "Câu hỏi: Do/Does + S + V?",
            ],
            formulas: [
              "He/She/It + Vs/es",
              "I/You/We/They + V (nguyên thể)",
            ],
            videoTitle: "Simple Present Tense lớp 9",
            videoUrl: ytSearch("simple present tense lớp 9 tiếng anh"),
          },
          {
            title: "Thì hiện tại hoàn thành (Present Perfect)",
            theory: [
              "Dùng: hành động xảy ra trong quá khứ, kết quả ảnh hưởng đến hiện tại",
              "Dấu hiệu: already, yet, just, ever, never, since, for, recently",
              "Cấu trúc: S + have/has + V3(past participle)",
            ],
            formulas: [
              "S + have/has + V3",
              "since + thời điểm cụ thể",
              "for + khoảng thời gian",
            ],
            videoTitle: "Present Perfect thi hiện tại hoàn thành lớp 9",
            videoUrl: ytSearch("thì hiện tại hoàn thành lớp 9 tiếng anh"),
          },
          {
            title: "Thì tương lai đơn và tương lai gần",
            theory: [
              "Will + V: quyết định tức thì, dự đoán không chắc chắn, lời hứa",
              "Be going to + V: kế hoạch đã định trước, dự đoán có bằng chứng",
            ],
            formulas: [
              "S + will + V (nguyên thể)",
              "S + am/is/are + going to + V",
            ],
            videoTitle: "Thì tương lai đơn tương lai gần lớp 9",
            videoUrl: ytSearch("thì tương lai đơn going to lớp 9 tiếng anh"),
          },
        ],
      },
      {
        id: "cau-bi-dong",
        title: "Chương 2: Câu bị động (Passive Voice)",
        description: "Cấu trúc và cách chuyển đổi câu bị động",
        topics: [
          {
            title: "Câu bị động cơ bản",
            theory: [
              "Dùng khi muốn nhấn mạnh vào đối tượng chịu tác động",
              "Tác nhân (by + O) có thể có hoặc không",
              "Quy tắc: O(chủ động) → S(bị động), S(chủ động) → by + O(bị động)",
            ],
            formulas: [
              "Hiện tại đơn: am/is/are + V3",
              "Quá khứ đơn: was/were + V3",
              "Tương lai: will be + V3",
              "Hiện tại HT: have/has been + V3",
              "Hiện tại tiếp diễn: am/is/are being + V3",
            ],
            videoTitle: "Câu bị động Passive Voice lớp 9",
            videoUrl: ytSearch("câu bị động passive voice lớp 9 tiếng anh"),
          },
        ],
      },
      {
        id: "cau-tuong-thuat",
        title: "Chương 3: Câu tường thuật (Reported Speech)",
        description: "Chuyển câu trực tiếp sang gián tiếp",
        topics: [
          {
            title: "Quy tắc lùi thì",
            theory: [
              "Simple Present → Simple Past",
              "Present Continuous → Past Continuous",
              "Present Perfect → Past Perfect",
              "Simple Past → Past Perfect",
              "will → would | can → could | may → might",
            ],
            formulas: [
              "Statements: S + said (that) + S + V(lùi thì)",
              "Questions: S + asked + if/whether + S + V (trật tự bình thường)",
              "Commands: S + told + O + to/not to + V",
            ],
            videoTitle: "Câu tường thuật Reported Speech lớp 9",
            videoUrl: ytSearch("câu tường thuật reported speech lớp 9 tiếng anh"),
          },
        ],
      },
      {
        id: "menh-de-quan-he",
        title: "Chương 4: Mệnh đề quan hệ (Relative Clauses)",
        description: "Who, which, that, where, when, whose, whom",
        topics: [
          {
            title: "Đại từ quan hệ",
            theory: [
              "who: thay thế cho người (làm chủ ngữ)",
              "whom: thay thế cho người (làm tân ngữ)",
              "which: thay thế cho vật",
              "that: thay thế cho cả người lẫn vật (mệnh đề hạn định)",
              "whose: chỉ sở hữu (whose + N)",
              "where: thay thế cho nơi chốn",
              "when: thay thế cho thời gian",
              "why: thay thế cho lý do",
            ],
            videoTitle: "Mệnh đề quan hệ Relative Clauses lớp 9",
            videoUrl: ytSearch("mệnh đề quan hệ who which that lớp 9 tiếng anh"),
          },
        ],
      },
      {
        id: "cau-dieu-kien",
        title: "Chương 5: Câu điều kiện (Conditionals)",
        description: "Điều kiện loại 1, 2 và 3",
        topics: [
          {
            title: "Ba loại câu điều kiện",
            theory: [
              "Loại 1: có thể xảy ra ở hiện tại/tương lai",
              "Loại 2: không có thật ở hiện tại (giả định)",
              "Loại 3: không có thật trong quá khứ (tiếc nuối)",
            ],
            formulas: [
              "Loại 1: If + Simple Present, will + V",
              "Loại 2: If + Simple Past (were), would + V",
              "Loại 3: If + Past Perfect, would have + V3",
            ],
            videoTitle: "Câu điều kiện Conditionals lớp 9",
            videoUrl: ytSearch("câu điều kiện conditionals loại 1 2 3 lớp 9"),
          },
        ],
      },
    ],
  },

  Vật_Lý: {
    chapters: [
      {
        id: "dien-hoc",
        title: "Chương 1: Điện học",
        description: "Định luật Ôm, điện trở, công suất điện",
        topics: [
          {
            title: "Định luật Ôm",
            theory: [
              "Cường độ dòng điện tỉ lệ thuận với hiệu điện thế, tỉ lệ nghịch với điện trở",
              "Điện trở R: đặc trưng cho mức độ cản trở dòng điện của vật dẫn",
            ],
            formulas: [
              "I = U/R (A)",
              "R = U/I (Ω)",
              "U = I·R (V)",
            ],
            videoTitle: "Định luật Ôm vật lý lớp 9",
            videoUrl: ytSearch("định luật Ôm vật lý lớp 9"),
          },
          {
            title: "Đoạn mạch nối tiếp và song song",
            theory: [
              "Nối tiếp: I như nhau, U = U₁+U₂, R = R₁+R₂",
              "Song song: U như nhau, I = I₁+I₂, 1/R = 1/R₁+1/R₂",
            ],
            formulas: [
              "Nối tiếp: Rₜₐ = R₁ + R₂ + ...",
              "Song song: 1/Rₜₐ = 1/R₁ + 1/R₂ + ...",
            ],
            videoTitle: "Đoạn mạch nối tiếp song song vật lý lớp 9",
            videoUrl: ytSearch("đoạn mạch nối tiếp song song vật lý lớp 9"),
          },
          {
            title: "Công suất điện và Công của dòng điện",
            theory: [
              "Công suất điện P: điện năng tiêu thụ trong 1 giây",
              "Công của dòng điện A = P·t = U·I·t",
              "Điện năng tính bằng kWh: 1 kWh = 3 600 000 J",
            ],
            formulas: [
              "P = U·I = I²·R = U²/R (W)",
              "A = P·t = U·I·t (J)",
              "Q = I²·R·t (Định luật Jun-Lenxơ)",
            ],
            videoTitle: "Công suất điện công dòng điện lớp 9",
            videoUrl: ytSearch("công suất điện công dòng điện vật lý lớp 9"),
          },
        ],
      },
      {
        id: "dien-tu-hoc",
        title: "Chương 2: Điện từ học",
        description: "Nam châm, lực điện từ, cảm ứng điện từ, máy phát điện",
        topics: [
          {
            title: "Nam châm và từ trường",
            theory: [
              "Nam châm có hai cực: Bắc (N) và Nam (S); cùng cực đẩy, khác cực hút",
              "Từ trường tồn tại xung quanh nam châm và dây dẫn có dòng điện",
              "Quy tắc nắm tay phải: xác định chiều đường sức từ của ống dây",
            ],
            videoTitle: "Nam châm từ trường vật lý lớp 9",
            videoUrl: ytSearch("nam châm từ trường vật lý lớp 9"),
          },
          {
            title: "Lực điện từ – Quy tắc bàn tay trái",
            theory: [
              "Dây dẫn mang dòng điện trong từ trường chịu lực điện từ",
              "Quy tắc bàn tay trái: B vào lòng bàn tay, 4 ngón theo chiều I → ngón cái chỉ chiều F",
            ],
            videoTitle: "Lực điện từ quy tắc bàn tay trái lớp 9",
            videoUrl: ytSearch("lực điện từ quy tắc bàn tay trái vật lý lớp 9"),
          },
        ],
      },
      {
        id: "quang-hoc",
        title: "Chương 3: Quang học",
        description: "Khúc xạ ánh sáng, thấu kính, mắt và các tật khúc xạ",
        topics: [
          {
            title: "Khúc xạ ánh sáng",
            theory: [
              "Ánh sáng bị gãy khúc khi truyền qua ranh giới hai môi trường trong suốt khác nhau",
              "Tia tới, pháp tuyến, tia khúc xạ nằm trong cùng một mặt phẳng",
              "Từ không khí vào nước: tia khúc xạ lệch gần pháp tuyến (r < i)",
            ],
            videoTitle: "Khúc xạ ánh sáng vật lý lớp 9",
            videoUrl: ytSearch("khúc xạ ánh sáng vật lý lớp 9"),
          },
          {
            title: "Thấu kính hội tụ và phân kỳ",
            theory: [
              "Thấu kính hội tụ: rìa mỏng, giữa dày; hội tụ chùm tia song song tại tiêu điểm F",
              "Thấu kính phân kỳ: rìa dày, giữa mỏng; làm phân kỳ chùm tia sáng",
              "Cách vẽ ảnh: dùng 2 trong 3 tia đặc biệt",
            ],
            formulas: [
              "1/f = 1/d + 1/d' (công thức thấu kính)",
              "k = d'/d = A'B'/AB (độ phóng đại)",
            ],
            videoTitle: "Thấu kính hội tụ phân kỳ vật lý lớp 9",
            videoUrl: ytSearch("thấu kính hội tụ phân kỳ vật lý lớp 9"),
          },
        ],
      },
    ],
  },

  Hóa_Học: {
    chapters: [
      {
        id: "kim-loai",
        title: "Chương 1: Kim loại",
        description: "Tính chất hóa học, dãy hoạt động, nhôm và sắt",
        topics: [
          {
            title: "Tính chất hóa học chung của kim loại",
            theory: [
              "Kim loại tác dụng với oxi → oxit bazơ: 2Mg + O₂ → 2MgO",
              "Kim loại tác dụng với axit → muối + H₂: Fe + 2HCl → FeCl₂ + H₂↑",
              "Kim loại tác dụng với dung dịch muối → muối mới + kim loại mới",
              "Na, K, Ca tác dụng với nước → bazơ + H₂",
            ],
            videoTitle: "Tính chất hóa học kim loại lớp 9",
            videoUrl: ytSearch("tính chất hóa học kim loại lớp 9"),
          },
          {
            title: "Dãy hoạt động hóa học",
            theory: [
              "K, Na, Ca, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Ag, Au",
              "Kim loại đứng trước đẩy kim loại đứng sau ra khỏi dung dịch muối",
              "Kim loại đứng trước H phản ứng với axit loãng giải phóng H₂",
              "K, Na, Ca đứng trước phản ứng với nước ở nhiệt độ thường",
            ],
            videoTitle: "Dãy hoạt động hóa học kim loại lớp 9",
            videoUrl: ytSearch("dãy hoạt động hóa học kim loại lớp 9"),
          },
          {
            title: "Nhôm và Sắt",
            theory: [
              "Nhôm: vừa tác dụng với axit vừa tác dụng với bazơ (tính lưỡng tính)",
              "2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂↑",
              "Sắt: có hai hóa trị II và III",
              "Fe + 2HCl → FeCl₂ + H₂ (Fe hóa trị II)",
              "2Fe + 3Cl₂ → 2FeCl₃ (Fe hóa trị III)",
            ],
            videoTitle: "Nhôm sắt tính chất hóa học lớp 9",
            videoUrl: ytSearch("nhôm sắt tính chất hóa học lớp 9"),
          },
        ],
      },
      {
        id: "phi-kim",
        title: "Chương 2: Phi kim – Sơ lược bảng tuần hoàn",
        description: "Clo, cacbon, silic và sơ lược bảng tuần hoàn nguyên tố",
        topics: [
          {
            title: "Clo và hợp chất của Clo",
            theory: [
              "Cl₂ có tính oxi hóa mạnh",
              "2Na + Cl₂ → 2NaCl | H₂ + Cl₂ → 2HCl",
              "Cl₂ + H₂O ⇌ HCl + HClO (tính tẩy màu)",
              "Nước Javel: NaCl + NaClO | Clorua vôi: CaCl(OCl)",
            ],
            videoTitle: "Clo và hợp chất clo hóa học lớp 9",
            videoUrl: ytSearch("clo và hợp chất hóa học lớp 9"),
          },
          {
            title: "Cacbon và hợp chất của Cacbon",
            theory: [
              "C có 3 dạng thù hình: kim cương, than chì, fullerene",
              "CO: khí không màu, rất độc, tính khử mạnh",
              "CO₂: không màu, không duy trì sự cháy, nặng hơn không khí",
              "CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O (nhận biết CO₂)",
            ],
            videoTitle: "Cacbon CO CO2 hóa học lớp 9",
            videoUrl: ytSearch("cacbon CO CO2 hóa học lớp 9"),
          },
        ],
      },
      {
        id: "hoa-huu-co",
        title: "Chương 3: Hóa học hữu cơ",
        description: "Hiđrocacbon và dẫn xuất",
        topics: [
          {
            title: "Metan, Etilen, Axetilen",
            theory: [
              "CH₄ (metan): phản ứng thế với clo, phản ứng cháy",
              "C₂H₄ (etilen): liên kết đôi, phản ứng cộng, trùng hợp",
              "C₂H₂ (axetilen): liên kết ba, phản ứng cộng mạnh",
              "Benzen C₆H₆: phản ứng thế đặc trưng",
            ],
            formulas: [
              "CH₄ + Cl₂ → CH₃Cl + HCl (as, 1:1)",
              "C₂H₄ + Br₂ → C₂H₄Br₂ (mất màu nước brom)",
              "nCH₂=CH₂ → (–CH₂–CH₂–)ₙ (trùng hợp → PE)",
            ],
            videoTitle: "Metan etilen axetilen hóa học lớp 9",
            videoUrl: ytSearch("metan etilen axetilen hóa học lớp 9"),
          },
          {
            title: "Ancol – Axit axetic – Chất béo – Glucozơ",
            theory: [
              "C₂H₅OH (ancol etylic): lên men tinh bột, phản ứng với Na, este hóa",
              "CH₃COOH (axit axetic): có tính axit, phản ứng với ancol → este",
              "Glucozơ C₆H₁₂O₆: phản ứng tráng gương (nhận biết), lên men → rượu",
              "Chất béo: este của glixerol với axit béo; xà phòng hóa",
            ],
            videoTitle: "Ancol axit axetic glucozo hóa học lớp 9",
            videoUrl: ytSearch("ancol etylic axit axetic glucozo hóa học lớp 9"),
          },
        ],
      },
    ],
  },

  Sinh_Học: {
    chapters: [
      {
        id: "di-truyen",
        title: "Chương 1: Di truyền và biến dị",
        description: "Các quy luật di truyền, ADN và protein",
        topics: [
          {
            title: "Các thí nghiệm của Menđen",
            theory: [
              "Quy luật phân li: mỗi tính trạng do một cặp nhân tố di truyền (gen) quy định",
              "Lai một cặp tính trạng: F2 = 3 trội : 1 lặn",
              "Quy luật phân li độc lập: F2 = 9 : 3 : 3 : 1",
              "Gen trội (A) át gen lặn (a); kiểu gen AA và Aa → kiểu hình giống nhau",
            ],
            formulas: [
              "P: AA × aa → F1: Aa (100% trội)",
              "F1 × F1: Aa × Aa → F2: 1AA : 2Aa : 1aa = 3 trội : 1 lặn",
            ],
            videoTitle: "Quy luật di truyền Menđen lớp 9",
            videoUrl: ytSearch("quy luật di truyền Menđen lớp 9 sinh học"),
          },
          {
            title: "ADN và Gen",
            theory: [
              "ADN: chuỗi xoắn kép gồm 4 loại nucleotit: A, T, G, X",
              "Nguyên tắc bổ sung: A-T, G-X",
              "Gen là đoạn ADN mang thông tin mã hóa một chuỗi axit amin (protein)",
              "Tự nhân đôi ADN: nguyên tắc bổ sung và giữ lại một nửa",
            ],
            formulas: [
              "A = T; G = X",
              "A + G = T + X = N/2 (N = tổng số nucleotit)",
            ],
            videoTitle: "ADN và gen sinh học lớp 9",
            videoUrl: ytSearch("ADN gen sinh học lớp 9"),
          },
        ],
      },
      {
        id: "sinh-vat-moi-truong",
        title: "Chương 2: Sinh vật và môi trường",
        description: "Hệ sinh thái, chuỗi thức ăn, bảo vệ môi trường",
        topics: [
          {
            title: "Môi trường và nhân tố sinh thái",
            theory: [
              "Môi trường: nơi sinh sống, gồm tất cả các nhân tố ảnh hưởng đến sinh vật",
              "Nhân tố sinh thái: vô sinh (nhiệt độ, ánh sáng, nước...) và hữu sinh (sinh vật khác)",
              "Giới hạn sinh thái: khoảng giá trị của nhân tố mà sinh vật sống được",
            ],
            videoTitle: "Môi trường nhân tố sinh thái sinh học lớp 9",
            videoUrl: ytSearch("môi trường nhân tố sinh thái sinh học lớp 9"),
          },
          {
            title: "Hệ sinh thái và chuỗi thức ăn",
            theory: [
              "Hệ sinh thái = quần xã sinh vật + môi trường sống",
              "Chuỗi thức ăn: sinh vật sản xuất → sinh vật tiêu thụ → sinh vật phân giải",
              "Lưới thức ăn: nhiều chuỗi thức ăn đan xen nhau",
              "Dòng năng lượng: chỉ 10% năng lượng được chuyển lên bậc dinh dưỡng cao hơn",
            ],
            videoTitle: "Hệ sinh thái chuỗi thức ăn sinh học lớp 9",
            videoUrl: ytSearch("hệ sinh thái chuỗi thức ăn sinh học lớp 9"),
          },
        ],
      },
    ],
  },

  Lịch_Sử: {
    chapters: [
      {
        id: "lich-su-the-gioi",
        title: "Chương 1: Lịch sử thế giới hiện đại (sau 1945)",
        description: "Chiến tranh lạnh, phong trào giải phóng dân tộc",
        topics: [
          {
            title: "Trật tự thế giới mới sau Chiến tranh thế giới II",
            theory: [
              "Hội nghị Ianta (2/1945): phân chia thế giới thành hai cực Mĩ-Xô",
              "Liên Hợp Quốc thành lập 10/1945, trụ sở tại New York",
              "Chiến tranh Lạnh: đối đầu căng thẳng giữa Mĩ (khối NATO) và Liên Xô (khối Warszawa)",
            ],
            videoTitle: "Trật tự thế giới sau 1945 lịch sử lớp 9",
            videoUrl: ytSearch("trật tự thế giới mới sau 1945 lịch sử lớp 9"),
          },
          {
            title: "Liên Xô và các nước Đông Âu (1945–1991)",
            theory: [
              "Liên Xô: khôi phục kinh tế thần kỳ, trở thành cường quốc thứ hai thế giới",
              "1991: Liên Xô tan rã, 15 nước cộng hòa độc lập",
              "Nguyên nhân tan rã: khủng hoảng kinh tế, mâu thuẫn dân tộc, sai lầm trong cải tổ",
            ],
            videoTitle: "Liên Xô Đông Âu lịch sử lớp 9",
            videoUrl: ytSearch("Liên Xô và Đông Âu lịch sử lớp 9"),
          },
        ],
      },
      {
        id: "lich-su-viet-nam",
        title: "Chương 2: Lịch sử Việt Nam (1919–1975)",
        description: "Phong trào yêu nước, cách mạng tháng Tám, hai cuộc kháng chiến",
        topics: [
          {
            title: "Cách mạng tháng Tám 1945",
            theory: [
              "Điều kiện thuận lợi: Nhật đầu hàng đồng minh (8/1945)",
              "19/8/1945: Tổng khởi nghĩa thành công tại Hà Nội",
              "2/9/1945: Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập",
              "Ý nghĩa: chấm dứt chế độ phong kiến và ách thực dân, nước VNDCCH ra đời",
            ],
            videoTitle: "Cách mạng tháng Tám 1945 lịch sử lớp 9",
            videoUrl: ytSearch("cách mạng tháng Tám 1945 lịch sử lớp 9"),
          },
          {
            title: "Kháng chiến chống Pháp (1946–1954)",
            theory: [
              "19/12/1946: Toàn quốc kháng chiến",
              "Chiến thắng Việt Bắc 1947, chiến dịch Biên giới 1950",
              "Chiến thắng Điện Biên Phủ 7/5/1954: toàn thắng",
              "Hiệp định Giơnevơ 7/1954: chia đôi đất nước tại vĩ tuyến 17",
            ],
            videoTitle: "Kháng chiến chống Pháp lịch sử lớp 9",
            videoUrl: ytSearch("kháng chiến chống Pháp 1946 1954 lịch sử lớp 9"),
          },
        ],
      },
    ],
  },

  Địa_Lý: {
    chapters: [
      {
        id: "dan-cu",
        title: "Chương 1: Địa lý dân cư Việt Nam",
        description: "Dân số, phân bố dân cư, các dân tộc Việt Nam",
        topics: [
          {
            title: "Dân số và gia tăng dân số",
            theory: [
              "Việt Nam có dân số đông (hơn 97 triệu người, 2020), đứng thứ 3 Đông Nam Á",
              "Tỉ lệ gia tăng tự nhiên giảm nhờ chính sách dân số",
              "Cơ cấu dân số trẻ, đang chuyển sang già hóa",
              "Dân số đông: lợi thế lao động nhưng áp lực việc làm, tài nguyên",
            ],
            videoTitle: "Địa lý dân cư Việt Nam lớp 9",
            videoUrl: ytSearch("địa lý dân cư Việt Nam lớp 9"),
          },
          {
            title: "Phân bố dân cư và các loại hình quần cư",
            theory: [
              "Mật độ dân số cao ở đồng bằng (ĐB sông Hồng, ĐB sông Cửu Long)",
              "Thưa thớt ở miền núi và cao nguyên",
              "Tỉ lệ dân thành thị tăng nhưng còn thấp (khoảng 35-37%)",
              "Hà Nội và TP HCM là hai đô thị lớn nhất",
            ],
            videoTitle: "Phân bố dân cư Việt Nam địa lý lớp 9",
            videoUrl: ytSearch("phân bố dân cư Việt Nam địa lý lớp 9"),
          },
        ],
      },
      {
        id: "kinh-te",
        title: "Chương 2: Địa lý kinh tế Việt Nam",
        description: "Nông nghiệp, công nghiệp, dịch vụ và các vùng kinh tế",
        topics: [
          {
            title: "Nông nghiệp Việt Nam",
            theory: [
              "Lúa nước là cây lương thực chính; ĐBSCL và ĐBSH là hai vựa lúa lớn",
              "Cây công nghiệp: cà phê (Tây Nguyên), cao su (Đông Nam Bộ), chè (trung du)",
              "Chăn nuôi phát triển: trâu bò ở miền núi, lợn và gia cầm ở đồng bằng",
              "Thủy sản: đánh bắt và nuôi trồng phát triển mạnh ở duyên hải",
            ],
            videoTitle: "Địa lý nông nghiệp Việt Nam lớp 9",
            videoUrl: ytSearch("địa lý nông nghiệp Việt Nam lớp 9"),
          },
          {
            title: "Công nghiệp và Dịch vụ",
            theory: [
              "Công nghiệp khai thác: than (Quảng Ninh), dầu khí (thềm lục địa phía Nam)",
              "Công nghiệp chế biến: tập trung ở Hà Nội, TP HCM, Đà Nẵng",
              "Giao thông: quốc lộ 1A là trục xương sống Bắc-Nam",
              "Du lịch: Hạ Long, Hội An, Mỹ Sơn là di sản thế giới",
            ],
            videoTitle: "Địa lý công nghiệp dịch vụ Việt Nam lớp 9",
            videoUrl: ytSearch("địa lý công nghiệp dịch vụ Việt Nam lớp 9"),
          },
        ],
      },
      {
        id: "vung-kinh-te",
        title: "Chương 3: Các vùng kinh tế",
        description: "Đặc điểm và thế mạnh của 7 vùng kinh tế",
        topics: [
          {
            title: "Trung du miền núi Bắc Bộ và Đồng bằng sông Hồng",
            theory: [
              "Trung du miền núi BB: giàu tài nguyên khoáng sản, thủy điện, cây công nghiệp",
              "ĐBSH: dân số đông nhất, kinh tế phát triển, trung tâm văn hóa-chính trị",
              "Hà Nội: thủ đô, trung tâm kinh tế, văn hóa, khoa học kỹ thuật",
            ],
            videoTitle: "Vùng kinh tế ĐBSH Bắc Bộ địa lý lớp 9",
            videoUrl: ytSearch("vùng kinh tế đồng bằng sông Hồng địa lý lớp 9"),
          },
          {
            title: "Đông Nam Bộ và Đồng bằng sông Cửu Long",
            theory: [
              "Đông Nam Bộ: vùng kinh tế năng động nhất; TP HCM là trung tâm",
              "Công nghiệp, dịch vụ, dầu khí phát triển mạnh",
              "ĐBSCL: vựa lúa, thủy sản lớn nhất cả nước",
              "Thách thức ĐBSCL: xâm nhập mặn, biến đổi khí hậu",
            ],
            videoTitle: "Vùng Đông Nam Bộ ĐBSCL địa lý lớp 9",
            videoUrl: ytSearch("vùng Đông Nam Bộ đồng bằng sông Cửu Long địa lý lớp 9"),
          },
        ],
      },
    ],
  },
};

export function getLessonContent(subjectId: string): SubjectLessons | null {
  return lessonContent[subjectId] ?? null;
}
