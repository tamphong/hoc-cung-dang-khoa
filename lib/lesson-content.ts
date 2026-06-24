export type Topic = {
  title: string;
  theory: string[];
  formulas?: string[];
  videoTitle?: string;
  videoUrl?: string;
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
      {
        id: "can-bac-hai",
        title: "Chương 1: Căn bậc hai – Căn bậc ba",
        description: "Khái niệm, tính chất và ứng dụng của căn bậc hai, căn bậc ba",
        topics: [
          {
            title: "Căn bậc hai và điều kiện xác định",
            theory: [
              "√a xác định khi a ≥ 0",
              "√(a²) = |a| (không phải a)",
              "√a · √b = √(ab) với a, b ≥ 0",
              "√(a/b) = √a / √b với a ≥ 0, b > 0",
            ],
            formulas: ["(√a)² = a (a ≥ 0)", "√(a²) = |a|", "√a · √b = √(ab)"],
            videoTitle: "Căn bậc hai lớp 9 – Lý thuyết và bài tập",
            videoUrl: ytSearch("căn bậc hai lớp 9 lý thuyết bài tập"),
          },
          {
            title: "Rút gọn biểu thức chứa căn",
            theory: [
              "Đưa thừa số ra ngoài dấu căn: √(a²b) = |a|√b",
              "Trục căn thức ở mẫu: nhân cả tử và mẫu với liên hợp",
              "Khử mẫu của biểu thức lấy căn",
            ],
            formulas: [
              "A/√B = A√B/B",
              "A/(√B – √C) = A(√B + √C)/(B – C)",
            ],
            videoTitle: "Rút gọn biểu thức chứa căn lớp 9",
            videoUrl: ytSearch("rút gọn biểu thức chứa căn lớp 9"),
          },
          {
            title: "Căn bậc ba",
            theory: [
              "∛a là số x sao cho x³ = a (xác định với mọi a ∈ ℝ)",
              "∛(ab) = ∛a · ∛b",
              "∛(a/b) = ∛a / ∛b (b ≠ 0)",
            ],
            videoTitle: "Căn bậc ba lớp 9",
            videoUrl: ytSearch("căn bậc ba lớp 9"),
          },
        ],
      },
      {
        id: "ham-so-bac-hai",
        title: "Chương 2: Hàm số y = ax² (a ≠ 0)",
        description: "Đồ thị, tính chất và ứng dụng hàm số bậc hai",
        topics: [
          {
            title: "Hàm số y = ax² và đồ thị",
            theory: [
              "Đồ thị là parabol đỉnh O(0,0), trục đối xứng là trục Oy",
              "a > 0: parabol mở lên, hàm đồng biến khi x > 0, nghịch biến khi x < 0",
              "a < 0: parabol mở xuống, hàm nghịch biến khi x > 0, đồng biến khi x < 0",
              "|a| càng lớn thì parabol càng hẹp",
            ],
            videoTitle: "Hàm số y=ax² lớp 9 đồ thị và tính chất",
            videoUrl: ytSearch("hàm số y bằng ax2 lớp 9 đồ thị tính chất"),
          },
        ],
      },
      {
        id: "phuong-trinh-bac-hai",
        title: "Chương 3: Phương trình bậc hai một ẩn",
        description: "Giải phương trình bậc hai, hệ thức Vi-et",
        topics: [
          {
            title: "Công thức nghiệm",
            theory: [
              "Dạng chuẩn: ax² + bx + c = 0 (a ≠ 0)",
              "Δ = b² – 4ac",
              "Δ > 0: hai nghiệm phân biệt x₁₂ = (–b ± √Δ) / 2a",
              "Δ = 0: nghiệm kép x = –b / 2a",
              "Δ < 0: vô nghiệm (thực)",
            ],
            formulas: [
              "Δ = b² – 4ac",
              "x₁₂ = (–b ± √Δ) / 2a",
              "Δ' = (b/2)² – ac (công thức nghiệm thu gọn)",
            ],
            videoTitle: "Phương trình bậc hai lớp 9 công thức nghiệm",
            videoUrl: ytSearch("phương trình bậc hai lớp 9 công thức nghiệm"),
          },
          {
            title: "Hệ thức Vi-et và ứng dụng",
            theory: [
              "Nếu x₁, x₂ là nghiệm của ax² + bx + c = 0 thì:",
              "x₁ + x₂ = –b/a (tổng hai nghiệm)",
              "x₁ · x₂ = c/a (tích hai nghiệm)",
              "Ứng dụng: tìm nghiệm khi biết tổng/tích, lập phương trình biết nghiệm",
            ],
            formulas: ["x₁ + x₂ = –b/a", "x₁ · x₂ = c/a"],
            videoTitle: "Hệ thức Vi-et lớp 9 và ứng dụng",
            videoUrl: ytSearch("hệ thức Vi-et lớp 9 ứng dụng bài tập"),
          },
        ],
      },
      {
        id: "hinh-hoc-duong-tron",
        title: "Chương 4: Đường tròn",
        description: "Tính chất đường tròn, tiếp tuyến, góc với đường tròn",
        topics: [
          {
            title: "Đường tròn – Khái niệm cơ bản",
            theory: [
              "Đường tròn tâm O bán kính R: tập hợp điểm cách O đúng R",
              "Dây cung, đường kính, cung tròn",
              "Quan hệ điểm và đường tròn: trong (d<R), trên (d=R), ngoài (d>R)",
              "Dây cung vuông góc với bán kính tại trung điểm dây",
            ],
            videoTitle: "Đường tròn lớp 9 lý thuyết cơ bản",
            videoUrl: ytSearch("đường tròn lớp 9 lý thuyết cơ bản"),
          },
          {
            title: "Góc với đường tròn",
            theory: [
              "Góc ở tâm bằng số đo cung bị chắn",
              "Góc nội tiếp bằng nửa cung bị chắn",
              "Góc nội tiếp cùng chắn một cung thì bằng nhau",
              "Góc nội tiếp chắn nửa đường tròn = 90°",
            ],
            formulas: [
              "∠nội tiếp = (1/2) · cung bị chắn",
              "∠ở tâm = cung bị chắn",
            ],
            videoTitle: "Góc nội tiếp đường tròn lớp 9",
            videoUrl: ytSearch("góc nội tiếp đường tròn lớp 9"),
          },
        ],
      },
      {
        id: "hinh-khong-gian",
        title: "Chương 5: Hình trụ – Hình nón – Hình cầu",
        description: "Diện tích và thể tích các hình không gian",
        topics: [
          {
            title: "Hình trụ",
            theory: ["Hình trụ có 2 đáy là hình tròn bằng nhau, song song nhau"],
            formulas: [
              "Sxq = 2πRh (diện tích xung quanh)",
              "Stoàn phần = 2πR(R + h)",
              "V = πR²h",
            ],
            videoTitle: "Hình trụ hình nón hình cầu lớp 9",
            videoUrl: ytSearch("hình trụ hình nón hình cầu lớp 9 công thức"),
          },
          {
            title: "Hình nón và Hình cầu",
            theory: ["Hình nón: đáy tròn, đỉnh, đường sinh l", "Hình cầu: bán kính R"],
            formulas: [
              "Snón xq = πRl",
              "Vnón = (1/3)πR²h",
              "Scầu = 4πR²",
              "Vcầu = (4/3)πR³",
            ],
            videoTitle: "Hình nón hình cầu lớp 9 công thức diện tích thể tích",
            videoUrl: ytSearch("hình nón hình cầu lớp 9 diện tích thể tích"),
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
