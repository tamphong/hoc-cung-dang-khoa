export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

type QuestionBank = Record<string, Question[]>;

export const questionBank: QuestionBank = {
  toan: [
    { id: 1, question: "Căn bậc hai số học của 144 là:", options: ["10", "11", "12", "13"], correct: 2, explanation: "√144 = 12 vì 12² = 144" },
    { id: 2, question: "Phương trình x² - 5x + 6 = 0 có nghiệm là:", options: ["x=1; x=6", "x=2; x=3", "x=-2; x=-3", "x=1; x=5"], correct: 1, explanation: "Δ = 25-24 = 1, x = (5±1)/2 → x=3 hoặc x=2" },
    { id: 3, question: "Hàm số y = 2x + 3 đồng biến khi:", options: ["x > 0", "x < 0", "Với mọi x", "x ≠ 0"], correct: 2, explanation: "Hệ số góc a = 2 > 0 nên hàm đồng biến với mọi x" },
    { id: 4, question: "Diện tích hình tròn có bán kính r = 5cm là:", options: ["25π cm²", "10π cm²", "20π cm²", "50π cm²"], correct: 0, explanation: "S = πr² = π × 5² = 25π cm²" },
    { id: 5, question: "sin 30° có giá trị bằng:", options: ["√3/2", "1/2", "√2/2", "1"], correct: 1, explanation: "sin 30° = 1/2 là giá trị đặc biệt cần nhớ" },
    { id: 6, question: "Tổng các góc trong một tứ giác bằng:", options: ["180°", "270°", "360°", "540°"], correct: 2, explanation: "Tổng các góc trong tứ giác = (4-2) × 180° = 360°" },
    { id: 7, question: "Đường kính của hình tròn có bán kính 7cm là:", options: ["7 cm", "14 cm", "21 cm", "49 cm"], correct: 1, explanation: "Đường kính = 2 × bán kính = 2 × 7 = 14 cm" },
    { id: 8, question: "Nghiệm của phương trình 3x - 9 = 0 là:", options: ["x = 3", "x = -3", "x = 9", "x = 0"], correct: 0, explanation: "3x = 9 → x = 3" },
    { id: 9, question: "cos 60° có giá trị bằng:", options: ["√3/2", "1/2", "√2/2", "0"], correct: 1, explanation: "cos 60° = 1/2 là giá trị đặc biệt cần nhớ" },
    { id: 10, question: "Chu vi hình vuông có cạnh 8cm là:", options: ["16 cm", "24 cm", "32 cm", "64 cm"], correct: 2, explanation: "Chu vi = 4 × cạnh = 4 × 8 = 32 cm" },
    { id: 11, question: "Căn bậc hai của 225 là:", options: ["13", "14", "15", "16"], correct: 2, explanation: "√225 = 15 vì 15² = 225" },
    { id: 12, question: "Hệ số góc của đường thẳng y = -3x + 7 là:", options: ["7", "-3", "3", "-7"], correct: 1, explanation: "Hàm y = ax + b có hệ số góc là a = -3" },
    { id: 13, question: "Phương trình bậc hai ax² + bx + c = 0 có Δ = b² - 4ac < 0 thì:", options: ["Có 2 nghiệm phân biệt", "Có nghiệm kép", "Vô nghiệm", "Vô số nghiệm"], correct: 2, explanation: "Khi Δ < 0, phương trình bậc hai vô nghiệm trong tập số thực" },
    { id: 14, question: "Diện tích tam giác có đáy 10cm, chiều cao 6cm là:", options: ["60 cm²", "30 cm²", "16 cm²", "20 cm²"], correct: 1, explanation: "S = (đáy × cao)/2 = (10 × 6)/2 = 30 cm²" },
    { id: 15, question: "tan 45° có giá trị bằng:", options: ["0", "1/2", "√3", "1"], correct: 3, explanation: "tan 45° = sin45°/cos45° = (√2/2)/(√2/2) = 1" },
  ],

  van: [
    { id: 1, question: "Tác phẩm 'Truyện Kiều' của ai?", options: ["Nguyễn Du", "Nguyễn Trãi", "Hồ Xuân Hương", "Đoàn Thị Điểm"], correct: 0, explanation: "Truyện Kiều là kiệt tác của đại thi hào Nguyễn Du, viết bằng chữ Nôm" },
    { id: 2, question: "Nhân vật chính trong truyện ngắn 'Lão Hạc' của Nam Cao là:", options: ["Chí Phèo", "Lão Hạc", "Thị Nở", "Bá Kiến"], correct: 1, explanation: "Lão Hạc là nhân vật chính, một người nông dân nghèo khổ nhưng giàu lòng tự trọng" },
    { id: 3, question: "Truyện 'Tắt đèn' của Ngô Tất Tố kể về nhân vật nào?", options: ["Chị Dậu", "Thị Nở", "Lão Hạc", "Mị"], correct: 0, explanation: "Chị Dậu là nhân vật trung tâm của tác phẩm Tắt đèn" },
    { id: 4, question: "Phép tu từ nào được dùng trong câu 'Mặt trời của bắp thì nằm trên đồi'?", options: ["So sánh", "Nhân hóa", "Ẩn dụ", "Hoán dụ"], correct: 2, explanation: "Đây là ẩn dụ - dùng hình ảnh mặt trời để chỉ người mẹ (nguồn sống, nguồn yêu thương)" },
    { id: 5, question: "Bài thơ 'Đồng chí' của ai?", options: ["Chính Hữu", "Tố Hữu", "Huy Cận", "Xuân Diệu"], correct: 0, explanation: "Đồng chí là bài thơ nổi tiếng của nhà thơ Chính Hữu, viết năm 1948" },
    { id: 6, question: "'Làng' là truyện ngắn của tác giả nào?", options: ["Nam Cao", "Kim Lân", "Tô Hoài", "Nguyên Hồng"], correct: 1, explanation: "Làng là truyện ngắn của Kim Lân, viết về tình yêu làng quê của ông Hai" },
    { id: 7, question: "Tác phẩm 'Chiếc lược ngà' của ai?", options: ["Nguyễn Minh Châu", "Nguyễn Quang Sáng", "Nguyễn Thi", "Anh Đức"], correct: 1, explanation: "Chiếc lược ngà của Nguyễn Quang Sáng, viết về tình cha con trong chiến tranh" },
    { id: 8, question: "Phép liên kết nào dùng từ thay thế để nối câu?", options: ["Phép nối", "Phép thế", "Phép lặp", "Phép liên tưởng"], correct: 1, explanation: "Phép thế là dùng từ ngữ có ý nghĩa tương đương thay thế cho từ ngữ đã dùng ở câu trước" },
    { id: 9, question: "Truyện ngắn 'Bến quê' của ai?", options: ["Tô Hoài", "Nguyễn Minh Châu", "Nguyên Hồng", "Vũ Trọng Phụng"], correct: 1, explanation: "Bến quê của Nguyễn Minh Châu là truyện ngắn xuất sắc mang nhiều triết lý nhân sinh" },
    { id: 10, question: "Từ 'xanh' trong câu 'Tre xanh xanh tự bao giờ' là từ loại gì?", options: ["Danh từ", "Động từ", "Tính từ", "Đại từ"], correct: 2, explanation: "Xanh là tính từ chỉ màu sắc, được láy thành 'xanh xanh' để nhấn mạnh" },
    { id: 11, question: "Tác phẩm nào thuộc thể loại truyện trung đại Việt Nam?", options: ["Tắt đèn", "Chuyện người con gái Nam Xương", "Đồng chí", "Làng"], correct: 1, explanation: "Chuyện người con gái Nam Xương của Nguyễn Dữ là truyện truyền kỳ trung đại" },
    { id: 12, question: "Hình ảnh 'đầu súng trăng treo' trong bài thơ Đồng chí có ý nghĩa gì?", options: ["Tả cảnh thiên nhiên", "Biểu tượng vừa thực vừa lãng mạn", "Chỉ sự cô đơn", "Tả cảnh chiến tranh"], correct: 1, explanation: "Hình ảnh vừa thực (ánh trăng) vừa lãng mạn (súng-trăng), biểu tượng người lính" },
    { id: 13, question: "Câu 'Học ăn, học nói, học gói, học mở' là câu tục ngữ về:", options: ["Lao động", "Học tập và ứng xử", "Thiên nhiên", "Kinh nghiệm sản xuất"], correct: 1, explanation: "Câu tục ngữ khuyên con người học cách ứng xử văn minh trong cuộc sống" },
    { id: 14, question: "Biện pháp tu từ chính trong câu 'Mồ hôi mà đổ xuống đồng / Lúa mọc trùng trùng sáng cả đồi nương'?", options: ["Ẩn dụ", "So sánh", "Nói quá (phóng đại)", "Điệp ngữ"], correct: 2, explanation: "Lúa mọc 'trùng trùng sáng cả đồi nương' là nói quá để ca ngợi sức lao động" },
    { id: 15, question: "Nhân vật Ông Hai trong truyện 'Làng' (Kim Lân) có đặc điểm nổi bật là:", options: ["Tham lam, ích kỷ", "Yêu làng, yêu nước sâu sắc", "Nhút nhát, sợ hãi", "Thông minh, mưu mẹo"], correct: 1, explanation: "Ông Hai có tình yêu làng rất mãnh liệt gắn liền với tình yêu đất nước" },
  ],

  anh: [
    { id: 1, question: "Choose the correct form: 'She ___ to school every day.'", options: ["go", "goes", "going", "gone"], correct: 1, explanation: "She is third person singular, so we add 's' to the verb: goes" },
    { id: 2, question: "What is the past tense of 'go'?", options: ["goed", "gone", "went", "going"], correct: 2, explanation: "Go is an irregular verb. Past tense = went" },
    { id: 3, question: "Choose the correct sentence:", options: ["I am go to school", "I going to school", "I am going to school", "I goes to school"], correct: 2, explanation: "Present continuous: Subject + am/is/are + V-ing" },
    { id: 4, question: "The opposite of 'beautiful' is:", options: ["ugly", "handsome", "pretty", "lovely"], correct: 0, explanation: "Ugly (xấu) là từ trái nghĩa của beautiful (đẹp)" },
    { id: 5, question: "Which word is a noun?", options: ["quickly", "happy", "freedom", "run"], correct: 2, explanation: "Freedom (tự do) là danh từ. Quickly: trạng từ, happy: tính từ, run: động từ" },
    { id: 6, question: "'She has lived in Hanoi ___ 2010.' Chọn giới từ đúng:", options: ["for", "since", "in", "at"], correct: 1, explanation: "Since + mốc thời gian cụ thể (năm 2010). For + khoảng thời gian" },
    { id: 7, question: "Complete: 'If I ___ rich, I would travel the world.'", options: ["am", "was", "were", "be"], correct: 2, explanation: "Câu điều kiện loại 2 (giả định): If + S + were..., S + would + V" },
    { id: 8, question: "The book ___ written by Nam Cao.", options: ["is", "was", "were", "be"], correct: 1, explanation: "Câu bị động quá khứ: was/were + past participle. 'Book' là số ít → was" },
    { id: 9, question: "Từ 'environment' nghĩa là:", options: ["Môi trường", "Giáo dục", "Chính phủ", "Kinh tế"], correct: 0, explanation: "Environment = môi trường, từ vựng quan trọng về chủ đề thiên nhiên" },
    { id: 10, question: "'How long have you studied English?' – '___ three years.'", options: ["Since", "For", "In", "At"], correct: 1, explanation: "For + khoảng thời gian (three years = 3 năm). Since dùng với mốc cụ thể" },
    { id: 11, question: "Choose the correct comparative: 'This book is ___ than that one.'", options: ["more interesting", "interestinger", "most interesting", "interesting"], correct: 0, explanation: "Tính từ dài (≥3 âm tiết) dùng more + adj để so sánh hơn" },
    { id: 12, question: "What does 'voluntarily' mean?", options: ["Bắt buộc", "Tình nguyện", "Tức giận", "Buồn bã"], correct: 1, explanation: "Voluntarily = một cách tình nguyện, tự nguyện (từ volunteer)" },
    { id: 13, question: "Complete: 'They ___ football when it started raining.'", options: ["played", "were playing", "play", "have played"], correct: 1, explanation: "Past continuous diễn tả hành động đang xảy ra thì bị gián đoạn: were playing" },
    { id: 14, question: "Which sentence is in passive voice?", options: ["She reads the book", "The book is read by her", "She is reading", "She has read"], correct: 1, explanation: "Câu bị động: The book is read by her (chủ ngữ chịu tác động)" },
    { id: 15, question: "The word 'pollution' belongs to which word class?", options: ["Verb", "Adjective", "Noun", "Adverb"], correct: 2, explanation: "Pollution (ô nhiễm) là danh từ. Pollute = động từ, polluted = tính từ" },
  ],

  ly: [
    { id: 1, question: "Đơn vị đo cường độ dòng điện là:", options: ["Vôn (V)", "Ampe (A)", "Ôm (Ω)", "Oát (W)"], correct: 1, explanation: "Ampe (A) là đơn vị đo cường độ dòng điện, đặt theo tên nhà khoa học Ampere" },
    { id: 2, question: "Công thức định luật Ôm là:", options: ["U = I/R", "I = U/R", "R = U × I", "I = R/U"], correct: 1, explanation: "Định luật Ôm: I = U/R (Cường độ = Hiệu điện thế / Điện trở)" },
    { id: 3, question: "Ánh sáng truyền đi trong môi trường trong suốt đồng tính theo:", options: ["Đường cong", "Đường thẳng", "Đường gãy khúc", "Mọi hướng"], correct: 1, explanation: "Trong môi trường trong suốt đồng tính, ánh sáng truyền theo đường thẳng" },
    { id: 4, question: "Hiện tượng khúc xạ ánh sáng xảy ra khi:", options: ["Ánh sáng bị phản xạ", "Ánh sáng truyền qua môi trường khác", "Ánh sáng bị hấp thụ", "Ánh sáng bị tán xạ"], correct: 1, explanation: "Khúc xạ xảy ra khi ánh sáng truyền từ môi trường này sang môi trường khác" },
    { id: 5, question: "Đơn vị đo hiệu điện thế là:", options: ["Ampe", "Ôm", "Vôn", "Oát"], correct: 2, explanation: "Vôn (V) là đơn vị đo hiệu điện thế (điện áp)" },
    { id: 6, question: "Nam châm có mấy cực?", options: ["1", "2", "3", "4"], correct: 1, explanation: "Nam châm có 2 cực: cực Bắc (N) và cực Nam (S)" },
    { id: 7, question: "Tốc độ ánh sáng trong chân không là:", options: ["3×10⁵ km/s", "3×10⁶ km/s", "3×10⁴ km/s", "3×10³ km/s"], correct: 0, explanation: "Tốc độ ánh sáng c ≈ 3×10⁵ km/s = 300.000 km/s" },
    { id: 8, question: "Công thức tính công suất điện là:", options: ["P = U + I", "P = U × I", "P = U / I", "P = U - I"], correct: 1, explanation: "Công suất điện P = U × I (Hiệu điện thế × Cường độ dòng điện), đơn vị Watt" },
    { id: 9, question: "Hiện tượng nào sau đây là ứng dụng của gương cầu lõm?", options: ["Gương chiếu hậu xe ô tô", "Gương trong phòng tắm", "Đèn pin, đèn pha", "Kính tiềm vọng"], correct: 2, explanation: "Gương cầu lõm dùng trong đèn pin, đèn pha để tập trung chùm sáng song song" },
    { id: 10, question: "Điện trở của dây dẫn tăng khi:", options: ["Tiết diện tăng", "Chiều dài tăng", "Nhiệt độ giảm", "Điện áp tăng"], correct: 1, explanation: "R = ρ × l/S — Điện trở tỉ lệ thuận với chiều dài l" },
    { id: 11, question: "Thấu kính hội tụ có đặc điểm:", options: ["Mép dày hơn giữa", "Giữa dày hơn mép", "Dày đều", "Phẳng một mặt"], correct: 1, explanation: "Thấu kính hội tụ có phần giữa dày hơn phần mép, làm hội tụ tia sáng" },
    { id: 12, question: "Đơn vị đo điện năng tiêu thụ trên hóa đơn tiền điện là:", options: ["kW", "kWh", "V", "A"], correct: 1, explanation: "kWh (kilowatt-giờ) là đơn vị đo điện năng tiêu thụ dùng trong thực tế" },
    { id: 13, question: "Dòng điện xoay chiều trong gia đình Việt Nam có tần số:", options: ["50 Hz", "60 Hz", "100 Hz", "220 Hz"], correct: 0, explanation: "Việt Nam dùng dòng xoay chiều 50 Hz, 220V (Mỹ dùng 60Hz, 110V)" },
    { id: 14, question: "Hiện tượng cảm ứng điện từ do Faraday phát hiện. Dòng điện cảm ứng xuất hiện khi:", options: ["Mạch điện đóng", "Từ thông qua mạch biến thiên", "Dây dẫn bị đốt nóng", "Điện trở thay đổi"], correct: 1, explanation: "Dòng điện cảm ứng xuất hiện khi từ thông qua mạch dẫn kín biến thiên" },
    { id: 15, question: "Khi nhúng một vật vào chất lỏng, lực đẩy Archimedes có phương:", options: ["Nằm ngang", "Thẳng đứng hướng lên", "Thẳng đứng hướng xuống", "Nghiêng 45°"], correct: 1, explanation: "Lực đẩy Archimedes luôn có phương thẳng đứng, chiều hướng lên" },
  ],

  hoa: [
    { id: 1, question: "Công thức hóa học của nước là:", options: ["H₂O₂", "H₂O", "HO", "H₃O"], correct: 1, explanation: "Nước (water) có công thức H₂O — 2 nguyên tử H và 1 nguyên tử O" },
    { id: 2, question: "Khí nào chiếm nhiều nhất trong không khí?", options: ["Oxy (O₂)", "Cacbonic (CO₂)", "Nitơ (N₂)", "Hydro (H₂)"], correct: 2, explanation: "Nitơ (N₂) chiếm ~78% không khí, oxy chiếm ~21%" },
    { id: 3, question: "Phản ứng nào sau đây là phản ứng trung hòa?", options: ["Fe + HCl", "NaOH + HCl", "CaCO₃ → CaO + CO₂", "Zn + H₂SO₄"], correct: 1, explanation: "Phản ứng axit + bazơ = muối + nước gọi là phản ứng trung hòa" },
    { id: 4, question: "Chất nào sau đây là phi kim?", options: ["Sắt (Fe)", "Đồng (Cu)", "Lưu huỳnh (S)", "Nhôm (Al)"], correct: 2, explanation: "Lưu huỳnh (S) là phi kim. Fe, Cu, Al là kim loại" },
    { id: 5, question: "Etanol (rượu etylic) có công thức là:", options: ["CH₃OH", "C₂H₅OH", "C₃H₇OH", "HCOOH"], correct: 1, explanation: "Rượu etylic (ethanol) có công thức C₂H₅OH, là thành phần chính của rượu uống" },
    { id: 6, question: "Phản ứng tỏa nhiệt là phản ứng:", options: ["Thu nhiệt từ môi trường", "Giải phóng nhiệt ra môi trường", "Không thay đổi nhiệt", "Cần chiếu sáng"], correct: 1, explanation: "Phản ứng tỏa nhiệt giải phóng năng lượng nhiệt ra môi trường xung quanh" },
    { id: 7, question: "Axit clohidric có công thức:", options: ["H₂SO₄", "HNO₃", "HCl", "H₃PO₄"], correct: 2, explanation: "HCl là axit clohidric (hydrochloric acid), là axit mạnh thường gặp" },
    { id: 8, question: "Glucozo có công thức phân tử:", options: ["C₁₂H₂₂O₁₁", "C₆H₁₂O₆", "C₂H₅OH", "CH₃COOH"], correct: 1, explanation: "Glucozo (đường nho) có công thức C₆H₁₂O₆, là monosaccharide" },
    { id: 9, question: "Kim loại nào dẫn điện tốt nhất?", options: ["Vàng (Au)", "Đồng (Cu)", "Bạc (Ag)", "Nhôm (Al)"], correct: 2, explanation: "Bạc (Ag) dẫn điện tốt nhất, tiếp theo là đồng (Cu) và vàng (Au)" },
    { id: 10, question: "Phản ứng của kim loại với axit tạo ra:", options: ["Bazơ + nước", "Muối + hydro", "Oxit + nước", "Muối + oxy"], correct: 1, explanation: "Kim loại + Axit → Muối + Khí H₂ (hydro). Ví dụ: Zn + 2HCl → ZnCl₂ + H₂" },
    { id: 11, question: "Chất nào sau đây là polime thiên nhiên?", options: ["Nhựa PE", "Cao su tổng hợp", "Tơ nilon", "Tinh bột"], correct: 3, explanation: "Tinh bột là polime thiên nhiên. PE, cao su tổng hợp, tơ nilon là polime tổng hợp" },
    { id: 12, question: "Trong bảng tuần hoàn, các nguyên tố trong cùng nhóm có:", options: ["Cùng số proton", "Cùng số electron hóa trị", "Cùng số khối", "Cùng số neutron"], correct: 1, explanation: "Các nguyên tố cùng nhóm có số electron hóa trị bằng nhau, tính chất hóa học tương tự" },
    { id: 13, question: "Phản ứng CH₄ + Cl₂ → CH₃Cl + HCl (ánh sáng) là phản ứng:", options: ["Cộng", "Thế", "Tách", "Trùng hợp"], correct: 1, explanation: "Nguyên tử H trong CH₄ bị thay thế bởi Cl → đây là phản ứng thế halogen" },
    { id: 14, question: "Axit nào có trong giấm ăn?", options: ["Axit clohidric (HCl)", "Axit axetic (CH₃COOH)", "Axit sunfuric (H₂SO₄)", "Axit nitric (HNO₃)"], correct: 1, explanation: "Giấm ăn chứa 3-5% axit axetic (CH₃COOH)" },
    { id: 15, question: "Oxit bazơ tác dụng với nước tạo thành:", options: ["Axit", "Muối", "Bazơ", "Oxit axit"], correct: 2, explanation: "Oxit bazơ + H₂O → Bazơ. Ví dụ: CaO + H₂O → Ca(OH)₂" },
  ],

  sinh: [
    { id: 1, question: "ADN viết tắt của:", options: ["Axit Deoxyribonucleic", "Axit Ribonucleic", "Adenin Nucleotide", "Axit Nucleic Dạng"], correct: 0, explanation: "ADN = Axit Deoxyribonucleic, phân tử mang thông tin di truyền của sinh vật" },
    { id: 2, question: "Quá trình tổng hợp ARN dựa trên khuôn ADN gọi là:", options: ["Dịch mã", "Phiên mã", "Nhân đôi ADN", "Đột biến"], correct: 1, explanation: "Phiên mã là quá trình tổng hợp ARN từ khuôn mẫu ADN" },
    { id: 3, question: "Con người có bao nhiêu cặp nhiễm sắc thể?", options: ["23", "46", "22", "48"], correct: 0, explanation: "Người có 23 cặp NST (46 chiếc), trong đó 22 cặp thường và 1 cặp giới tính" },
    { id: 4, question: "Quang hợp xảy ra ở bộ phận nào của cây?", options: ["Rễ", "Thân", "Lá (lục lạp)", "Hoa"], correct: 2, explanation: "Quang hợp xảy ra chủ yếu ở lá, cụ thể là trong lục lạp chứa diệp lục" },
    { id: 5, question: "Đột biến gen là:", options: ["Thay đổi cấu trúc NST", "Biến đổi trong cấu trúc gen", "Thay đổi số lượng NST", "Biến dị tổ hợp"], correct: 1, explanation: "Đột biến gen là sự biến đổi trong cấu trúc của gen (thay thế, thêm, mất nucleotit)" },
    { id: 6, question: "Hệ tuần hoàn của người gồm:", options: ["Tim và phổi", "Tim và mạch máu", "Phổi và mạch máu", "Tim, phổi và thận"], correct: 1, explanation: "Hệ tuần hoàn gồm tim và hệ thống mạch máu (động mạch, tĩnh mạch, mao mạch)" },
    { id: 7, question: "Kiểu gen AA, Aa đều biểu hiện cùng một kiểu hình do:", options: ["Đột biến", "Tính trội hoàn toàn", "Hoán vị gen", "Tương tác gen"], correct: 1, explanation: "Do tính trội hoàn toàn — alen A trội che khuất hoàn toàn alen a lặn" },
    { id: 8, question: "Bào quan nào là 'nhà máy năng lượng' của tế bào?", options: ["Nhân tế bào", "Lục lạp", "Ty thể (mitochondria)", "Ribosome"], correct: 2, explanation: "Ty thể thực hiện hô hấp tế bào, tạo ATP — nguồn năng lượng chính của tế bào" },
    { id: 9, question: "Sinh sản vô tính có đặc điểm:", options: ["Cần tế bào sinh dục", "Con giống mẹ về mặt di truyền", "Tạo ra sự đa dạng di truyền", "Cần thụ tinh"], correct: 1, explanation: "Sinh sản vô tính: con có vật chất di truyền giống hoàn toàn cơ thể mẹ" },
    { id: 10, question: "Thuyết tiến hóa của Darwin dựa trên nguyên lý:", options: ["Đột biến ngẫu nhiên", "Chọn lọc tự nhiên", "Di truyền học Mendel", "Địa lý học"], correct: 1, explanation: "Darwin đề xuất chọn lọc tự nhiên là cơ chế chính của tiến hóa" },
    { id: 11, question: "Gen nằm ở đâu trong tế bào?", options: ["Màng tế bào", "Tế bào chất", "Nhân tế bào (trên NST)", "Ty thể"], correct: 2, explanation: "Gen là đoạn ADN nằm trên nhiễm sắc thể trong nhân tế bào" },
    { id: 12, question: "Phản xạ có điều kiện khác phản xạ không điều kiện ở điểm:", options: ["Bẩm sinh, di truyền", "Được hình thành qua học tập", "Không qua vỏ não", "Bền vững, không thay đổi"], correct: 1, explanation: "Phản xạ có điều kiện được hình thành trong đời sống cá thể qua học tập" },
    { id: 13, question: "Hệ thần kinh trung ương gồm:", options: ["Não và tủy sống", "Não và thần kinh ngoại biên", "Tim và não", "Tủy sống và thần kinh cơ"], correct: 0, explanation: "HTKTW gồm não bộ và tủy sống. Thần kinh ngoại biên là phần còn lại" },
    { id: 14, question: "Chọn lọc nhân tạo là:", options: ["Quá trình tiến hóa tự nhiên", "Con người chọn lọc theo nhu cầu", "Đột biến ngẫu nhiên", "Giao phối ngẫu nhiên"], correct: 1, explanation: "Chọn lọc nhân tạo: con người giữ lại những cá thể có đặc tính có lợi cho mình" },
    { id: 15, question: "Miễn dịch là khả năng của cơ thể:", options: ["Hấp thụ dinh dưỡng", "Chống lại các tác nhân gây bệnh", "Sinh sản", "Điều tiết nhiệt độ"], correct: 1, explanation: "Miễn dịch là khả năng nhận diện và chống lại các tác nhân gây bệnh (vi khuẩn, virus...)" },
  ],

  su: [
    { id: 1, question: "Chiến thắng Điện Biên Phủ (1954) kết thúc:", options: ["Kháng chiến chống Mỹ", "Kháng chiến chống Pháp", "Chiến tranh thế giới 2", "Khởi nghĩa Yên Bái"], correct: 1, explanation: "Chiến thắng ĐBP 7/5/1954 kết thúc 9 năm kháng chiến chống thực dân Pháp" },
    { id: 2, question: "Cách mạng tháng Tám 1945 ở Việt Nam diễn ra vào tháng nào?", options: ["Tháng 3", "Tháng 6", "Tháng 8", "Tháng 9"], correct: 2, explanation: "Cách mạng tháng Tám bùng nổ tháng 8/1945, giành chính quyền trên toàn quốc" },
    { id: 3, question: "Nước Việt Nam Dân chủ Cộng hòa ra đời ngày:", options: ["2/9/1945", "30/4/1975", "7/5/1954", "19/8/1945"], correct: 0, explanation: "Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình" },
    { id: 4, question: "Chiến tranh thế giới thứ nhất kết thúc năm:", options: ["1914", "1917", "1918", "1919"], correct: 2, explanation: "Chiến tranh thế giới I kết thúc năm 1918, với thắng lợi của phe Hiệp Ước" },
    { id: 5, question: "Hiệp định Giơnevơ (1954) chia cắt Việt Nam tại vĩ tuyến:", options: ["16", "17", "18", "19"], correct: 1, explanation: "Hiệp định Giơnevơ 1954 tạm thời chia đôi Việt Nam tại vĩ tuyến 17" },
    { id: 6, question: "Chiến dịch Hồ Chí Minh năm 1975 kết thúc ngày:", options: ["30/3/1975", "30/4/1975", "1/5/1975", "7/5/1975"], correct: 1, explanation: "30/4/1975, xe tăng quân Giải phóng húc đổ cổng dinh Độc Lập, thống nhất đất nước" },
    { id: 7, question: "Cách mạng Nga 1917 lật đổ chế độ:", options: ["Phong kiến", "Tư bản", "Sa hoàng", "Thực dân"], correct: 2, explanation: "Cách mạng tháng 10 Nga 1917 do Lênin lãnh đạo đã lật đổ chế độ Sa hoàng" },
    { id: 8, question: "Khởi nghĩa Hai Bà Trưng nổ ra năm:", options: ["39", "40", "41", "42"], correct: 1, explanation: "Khởi nghĩa Hai Bà Trưng nổ ra năm 40 SCN, chống ách đô hộ của nhà Hán" },
    { id: 9, question: "Liên Xô tan rã năm:", options: ["1989", "1990", "1991", "1992"], correct: 2, explanation: "Liên Xô chính thức tan rã ngày 25/12/1991, kết thúc Chiến tranh Lạnh" },
    { id: 10, question: "Phong trào Đông Du do ai khởi xướng?", options: ["Phan Bội Châu", "Phan Châu Trinh", "Nguyễn Ái Quốc", "Lương Văn Can"], correct: 0, explanation: "Phong trào Đông Du (1905-1909) do Phan Bội Châu khởi xướng, đưa học sinh sang Nhật học" },
    { id: 11, question: "Chiến tranh thế giới thứ hai bùng nổ năm:", options: ["1937", "1938", "1939", "1940"], correct: 2, explanation: "CTTG II bùng nổ 1/9/1939 khi Đức tấn công Ba Lan" },
    { id: 12, question: "Hội nghị thành lập Đảng Cộng sản Việt Nam họp năm:", options: ["1925", "1928", "1930", "1935"], correct: 2, explanation: "3/2/1930, Hội nghị thành lập ĐCSVN họp tại Cửu Long (Hồng Kông) do Nguyễn Ái Quốc chủ trì" },
    { id: 13, question: "Trận Bạch Đằng lần thứ ba (1288) do ai chỉ huy?", options: ["Lý Thường Kiệt", "Trần Hưng Đạo", "Lê Lợi", "Nguyễn Trãi"], correct: 1, explanation: "Hưng Đạo Vương Trần Quốc Tuấn chỉ huy trận Bạch Đằng 1288, đánh tan quân Nguyên" },
    { id: 14, question: "Nước nào thả bom nguyên tử xuống Nhật Bản năm 1945?", options: ["Anh", "Liên Xô", "Mỹ", "Pháp"], correct: 2, explanation: "Mỹ thả 2 quả bom nguyên tử xuống Hiroshima (6/8) và Nagasaki (9/8/1945)" },
    { id: 15, question: "Chiến thắng nào chấm dứt ách đô hộ 1000 năm Bắc thuộc?", options: ["Trận Bạch Đằng 938", "Khởi nghĩa Hai Bà Trưng", "Khởi nghĩa Lý Bí", "Trận Chi Lăng"], correct: 0, explanation: "Chiến thắng Bạch Đằng năm 938 của Ngô Quyền chấm dứt 1000 năm Bắc thuộc" },
  ],

  dia: [
    { id: 1, question: "Việt Nam có diện tích khoảng:", options: ["231.000 km²", "311.000 km²", "331.000 km²", "341.000 km²"], correct: 2, explanation: "Việt Nam có diện tích khoảng 331.212 km², đứng thứ 65 thế giới" },
    { id: 2, question: "Sông dài nhất Việt Nam là:", options: ["Sông Hồng", "Sông Mã", "Sông Mê Kông", "Sông Đà"], correct: 2, explanation: "Sông Mê Kông (Cửu Long) dài nhất chảy qua Việt Nam (~4.200 km toàn tuyến)" },
    { id: 3, question: "Đồng bằng lớn nhất Việt Nam là:", options: ["Đồng bằng sông Hồng", "Đồng bằng sông Cửu Long", "Đồng bằng Duyên hải miền Trung", "Đồng bằng Bắc Trung Bộ"], correct: 1, explanation: "ĐBSCL (Nam Bộ) có diện tích ~40.000 km², lớn nhất Việt Nam" },
    { id: 4, question: "Dãy Trường Sơn chạy theo hướng:", options: ["Đông-Tây", "Bắc-Nam", "Tây Bắc-Đông Nam", "Đông Bắc-Tây Nam"], correct: 2, explanation: "Dãy Trường Sơn chạy theo hướng Tây Bắc - Đông Nam, là xương sống của miền Trung" },
    { id: 5, question: "Hà Nội nằm ở vùng địa lý nào?", options: ["Tây Bắc", "Đông Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ"], correct: 2, explanation: "Hà Nội thuộc vùng Đồng bằng sông Hồng, là thủ đô của Việt Nam" },
    { id: 6, question: "Biển Đông có diện tích khoảng:", options: ["1,5 triệu km²", "2,3 triệu km²", "3,5 triệu km²", "4,8 triệu km²"], correct: 2, explanation: "Biển Đông có diện tích khoảng 3,5 triệu km², là biển lớn thứ hai châu Á" },
    { id: 7, question: "Khí hậu Việt Nam thuộc kiểu:", options: ["Ôn đới lục địa", "Nhiệt đới gió mùa", "Cận nhiệt đới", "Địa trung hải"], correct: 1, explanation: "Việt Nam có khí hậu nhiệt đới gió mùa ẩm, với 2 mùa mưa và khô rõ rệt" },
    { id: 8, question: "Núi cao nhất Việt Nam là:", options: ["Phanxipăng", "Putaleng", "Rào Cỏ", "Ngọc Linh"], correct: 0, explanation: "Phanxipăng (3.143 m) là 'Nóc nhà Đông Dương', nằm trong dãy Hoàng Liên Sơn" },
    { id: 9, question: "Dân số Việt Nam hiện nay (khoảng) là:", options: ["80 triệu", "90 triệu", "98-100 triệu", "110 triệu"], correct: 2, explanation: "Dân số Việt Nam đạt khoảng 98-100 triệu người, đứng thứ 15 thế giới" },
    { id: 10, question: "Việt Nam có bao nhiêu tỉnh/thành phố?", options: ["57", "61", "63", "65"], correct: 2, explanation: "Việt Nam có 63 tỉnh và thành phố trực thuộc Trung ương" },
    { id: 11, question: "Vùng có nhiều khoáng sản nhất Việt Nam là:", options: ["Đồng bằng sông Hồng", "Trung du miền núi Bắc Bộ", "Duyên hải Nam Trung Bộ", "Tây Nguyên"], correct: 1, explanation: "Trung du miền núi Bắc Bộ giàu khoáng sản nhất: than đá, sắt, đồng, apatit..." },
    { id: 12, question: "Thành phố Hồ Chí Minh nằm ở vùng:", options: ["Đông Nam Bộ", "Đồng bằng sông Cửu Long", "Nam Trung Bộ", "Tây Nguyên"], correct: 0, explanation: "TP.HCM thuộc vùng Đông Nam Bộ, là trung tâm kinh tế lớn nhất Việt Nam" },
    { id: 13, question: "Quần đảo lớn nhất của Việt Nam là:", options: ["Côn Đảo", "Phú Quốc", "Hoàng Sa", "Trường Sa"], correct: 3, explanation: "Quần đảo Trường Sa là quần đảo lớn nhất của Việt Nam trên Biển Đông" },
    { id: 14, question: "Gió mùa Đông Bắc ảnh hưởng nhiều nhất đến:", options: ["Nam Bộ", "Tây Nguyên", "Miền Bắc Việt Nam", "Nam Trung Bộ"], correct: 2, explanation: "Gió mùa Đông Bắc gây ra mùa đông lạnh ở miền Bắc (từ tháng 11 đến tháng 3)" },
    { id: 15, question: "Cây công nghiệp nào được trồng nhiều nhất ở Tây Nguyên?", options: ["Lúa", "Mía", "Cà phê", "Cao su"], correct: 2, explanation: "Tây Nguyên là vùng sản xuất cà phê lớn nhất Việt Nam, chiếm ~90% sản lượng cả nước" },
  ],
};

export function getRandomQuestions(subjectId: string, count = 10): Question[] {
  const bank = questionBank[subjectId] || [];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
