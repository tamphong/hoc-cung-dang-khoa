import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number; // 0-3 index
  explanation: string;
}

export async function POST(req: NextRequest) {
  try {
    const { subjectId, subjectName, topics } = await req.json();

    if (!subjectId || !subjectName) {
      return NextResponse.json({ error: "Missing subject" }, { status: 400 });
    }

    const topicList = (topics as string[]).join(", ");

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Tạo 10 câu hỏi trắc nghiệm môn ${subjectName} lớp 9 Việt Nam.
Chủ đề có thể bao gồm: ${topicList}.

Yêu cầu:
- Câu hỏi phải đúng theo chương trình học lớp 9 hiện hành
- Mỗi câu có 4 đáp án (A, B, C, D)
- Độ khó vừa phải, phù hợp học sinh lớp 9
- Câu hỏi đa dạng, không lặp lại chủ đề

Trả về JSON theo đúng định dạng sau (không thêm text nào khác):
{
  "questions": [
    {
      "id": 1,
      "question": "Câu hỏi...",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correct": 0,
      "explanation": "Giải thích ngắn gọn tại sao đáp án đúng"
    }
  ]
}

Lưu ý: "correct" là index 0-3 (0=A, 1=B, 2=C, 3=D).`,
        },
      ],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch (err) {
    console.error("generate-questions error:", err);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
