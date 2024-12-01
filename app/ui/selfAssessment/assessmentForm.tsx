import { useState } from "react";
import React from "react";

interface AssessmentProps {
    onSelect: (result:string) => void;
}

export default function AssessmentForm({ onSelect }: AssessmentProps) {
    const [responses, setResponses] = useState<{ [key: string]: number }>({});
    const [points,setPoints] = useState(0);
;
    const handleChange = (sectionIndex: number, questionIndex: number, value: number) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [`section-${sectionIndex}-question-${questionIndex}`]: value,
        }));
        setPoints((prevPoints) => prevPoints + value);

    };

    const sections = [
        {
            title: "ด้านความทนต่อแรงกดดัน",
            questions: [
                "เรื่องไม่สบายใจเล็กน้อย ทำให้ฉันว้าวุ่นใจนั่งไม่ติด",
                "ฉันไม่ใส่ใจกับที่คนหัวเราะเยาะฉัน",
                "เมื่อฉันทำผิดพลาดหรือเสียหาย ฉันยอมรับผิดหรือผลที่ตามมา",
                "ฉันเคยยอมทนลำบากเพื่ออนาคตที่ดีขึ้น",
                "เวลาทุกข์ใจมากๆ ฉันเจ็บป่วยไม่สบาย",
                "ฉันสอนและเตือนตัวเอง",
                "ความยากลำบากทำให้ฉันแกร่งขึ้น",
                "ฉันไม่จดจำเรื่องเลวร้ายในอดีต",
                "ถึงแม้ปัญหาจะหนักหนาเพียงใดชีวิตฉันก็ไม่เลวร้ายไปหมด",
                "เมื่อมีเรื่องหนักใจ ฉันมีคนปรับทุกข์ด้วย",
            ],
            type: [1, 2, 2, 2, 1, 2, 2, 2, 2, 2],
        },
        {
            title: "ด้านการมีความหวังและกำลังใจ",
            questions: [
                "จากประสบการณ์ที่ผ่านมาทำให้ฉันมั่นใจว่าจะแก้ปัญหาต่างๆที่ผ่านเข้ามาในชีวิตได้",
                "ฉันมีครอบครัวและคนใกล้ชิดเป็นกำลังใจ",
                "ฉันมีแผนการที่จะทำให้ชีวิตก้าวไปข้างหน้า",
                "เมื่อมีปัญหาวิกฤติเกิดขึ้น ฉันรู้สึกว่าตัวเองไร้ความสามารถ",
                "เป็นเรื่องยากลำบากสำหรับฉันที่จะทำให้ชีวิตดีขึ้น",
            ],
            type: [2, 2, 2, 1, 1],
        },
        {
            title: "ด้านการต่อสู้และเอาชนะอุปสรรค",
            questions: [
                "ฉันอยากหนีปัญหาไปให้พ้น หากมีปัญหาหนักหนาที่ต้องรับผิดชอบ",
                "การแก้ไขปัญหาทำให้ฉันมีประสบการณ์มากขึ้น",
                "ในการพูดคุย ฉันหาเหตุผลที่ทุกคนยอมรับหรือเห็นด้วยกับฉันได้",
                "ฉันเตรียมหาทางออกไว้ หากปัญหาร้ายแรงกว่าที่คิด",
                "ฉันชอบฟังความคิดเห็นที่แตกต่างจากฉัน",
            ],
            type: [1, 2, 2, 2, 2], // Type 1: 4, 3, 2, 1, For type 2: 1, 2, 3, 4
        },
    ];

    const allAnswered = sections.every((section, sectionIndex) => {
        return section.questions.every((_, questionIndex) => {
            const questionName = `section-${sectionIndex}-question-${questionIndex}`;
            return responses[questionName] !== undefined;
        });
    });

    let results = "";
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!allAnswered) {
            alert("กรุณาตอบแบบประเมินให้ครบทุกข้อ");
            return;
        }
        if (points > 69) { // สูงกว่าปกติ
            results = "สูงกว่าปกติ"
        }
        else {
            if (54 <= points && points <= 69) { // ปกติ
                results = "ปกติ"
            }
            else { // ต่ำกว่าปกติ
                results = "ต่ำกว่าปกติ"
            }
        }
        onSelect(results)
    };

    const columns = ["ไม่จริง", "จริงบางครั้ง", "ค่อนข้างจริง", "จริงมาก"];
    return (
        <div>
            <div className="text-2xl text-center mb-6">แบบประเมินพลังสุขภาพจิต โดยกรมสุขภาพจิต กระทรวงสาธารณสุข</div>
            <div className="text-xl text-center mb-6">คำชี้แจง: เลือกข้อที่ตรงกับความเป็นจริงมากที่สุด โดยข้อคำถามสอบถามถึงความคิด ความรู้สึก พฤติกรรมของท่านในรอบ 3 เดือนที่ผ่านมา</div>

            <div className="flex justify-center">
                <table className="w-4/5 border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="border border-gray-300 px-4 py-2">ข้อคำถาม</th>
                            {columns.map((col) => (
                                <th key={col} className="border border-gray-300 px-4 py-2 w">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((section, sectionIndex) => (
                            <React.Fragment key={`section-${sectionIndex}`}>
                                {/* Section Title Row */}
                                <tr className="bg-gray-200">
                                    <td
                                        colSpan={columns.length + 1}
                                        className="border border-gray-300 px-4 py-2 font-bold text-left"
                                    >
                                        {section.title}
                                    </td>
                                </tr>
                                {/* Questions for the Section */}
                                {section.questions.map((question, questionIndex) => (
                                    <tr key={`question-${sectionIndex}-${questionIndex}`} className="hover:bg-gray-100">
                                        {/* Question Text */}
                                        <td className="border border-gray-300 px-4 py-2 text-left">
                                            {`${questionIndex + 1}. ${question}`}
                                        </td>
                                        {/* Choices */}
                                        {columns.map((_, colIndex) => (
                                            <td key={colIndex} className="border border-gray-300 px-4 py-2">
                                                <input
                                                    type="radio"
                                                    name={`section-${sectionIndex}-question-${questionIndex}`}
                                                    value={
                                                        section.type[questionIndex] === 1
                                                            ? 4 - colIndex // For type 1: 4, 3, 2, 1
                                                            : colIndex + 1 // For type 2: 1, 2, 3, 4
                                                    }
                                                    className="form-radio text-blue-500"
                                                    onChange={(e) =>
                                                        handleChange(
                                                            sectionIndex,
                                                            questionIndex,
                                                            parseInt(e.target.value)
                                                        )}
                                                    required
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center w-full mt-5">
                <button
                    className="font-anuphan bg-[#2B6EB0] hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-150 w-1/4 items-center"
                    onClick={handleSubmit}
                >
                    ส่งแบบประเมิน
                </button>
            </div>
        </div>
    );
}
