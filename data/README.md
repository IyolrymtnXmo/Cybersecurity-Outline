# คู่มือแก้ไขข้อมูล (Data Editing Guide)

ไฟล์ในโฟลเดอร์นี้คือ "เนื้อหา" ของเว็บไซต์ แก้ไขได้โดยไม่ต้องเขียนโค้ด เพียงแก้ค่าใน JSON ให้ถูกต้องตามรูปแบบ
แนะนำให้แก้ผ่าน VS Code เพื่อให้เห็น error ของ JSON ทันที และ **อย่าลืมเครื่องหมายจุลภาค `,` ระหว่างรายการ** และห้ามมีจุลภาคเกินหลังรายการสุดท้าย

> หลังแก้ไฟล์ ให้รัน `npm run build` เพื่อตรวจว่าไม่มีข้อผิดพลาด ก่อน deploy

ไฟล์ข้อมูลหลัก:

| ไฟล์ | ใช้ทำอะไร |
| --- | --- |
| `journey.json` | เนื้อหารายเทอมของเส้นทาง 4 ปี (8 เทอม) |
| `resources.json` | เอกสาร/แบบฟอร์ม/เทมเพลตใน Resource Hub |
| `opportunities.json` | งานแข่ง/ทุน/ฝึกงาน ใน Competition Hub |
| `courses.json`, `curriculum-plan.json` | รายวิชาและแผนการเรียน (ของเดิม) |

---

## วิธีเพิ่ม "เอกสาร" ใหม่ (`resources.json`)

เพิ่ม object ใหม่เข้าไปใน array โดยมีฟิลด์ดังนี้:

```jsonc
{
  "id": "res-xxxx",                  // รหัสไม่ซ้ำใคร (ตั้งเองได้)
  "title": "ชื่อเอกสาร",
  "description": "คำอธิบายสั้น ๆ",
  "category": "coop",               // ดูรายการหมวดด้านล่าง
  "year": 3,                          // 1-4 หรือ "all"
  "semester": 2,                      // 1, 2 หรือ "all"
  "externalUrl": "https://...",      // ลิงก์ภายนอก (ถ้ามี) — ใส่ "/study-plan" ได้ถ้าเป็นหน้าในเว็บ
  "fileUrl": "/docs/file.pdf",       // ไฟล์ที่อัปโหลดไว้ใน public/ (ถ้ามี)
  "fileType": "pdf",                 // pdf | docx | xlsx | link | notion | google-drive | other
  "status": "recommended",           // official | recommended | draft | needs-update
  "placeholder": true,                // true = ยังไม่มีไฟล์จริง (เว็บจะขึ้นป้าย "ตัวอย่าง")
  "owner": "ชื่อผู้ดูแล",            // ไม่บังคับ
  "tags": ["คำค้น1", "คำค้น2"]
}
```

- **หมวด (category):** `curriculum`, `registration`, `project`, `coop`, `wil`, `internship`, `scholarship`, `form`, `portfolio`, `certification`, `activity`, `faq`, `other`
- เอกสารจะ **ไปโผล่อัตโนมัติ** ในหน้าเทอมที่ตรงกับ `year` + `semester` (ใส่ `"all"` = ทุกเทอม)
- **สถานะ (status):**
  - `official` = เอกสารทางการจากหลักสูตร (ใช้เฉพาะของจริงเท่านั้น)
  - `recommended` = แนะนำ
  - `draft` = ฉบับร่าง / กำลังจัดทำ
  - `needs-update` = ต้องอัปเดต

### วิธีแนบไฟล์จริง
1. นำไฟล์ใส่ในโฟลเดอร์ `public/docs/` (เช่น `public/docs/coop-checklist.pdf`)
2. ตั้งค่า `"fileUrl": "/docs/coop-checklist.pdf"`
3. ลบ `"placeholder": true` ออก แล้วปรับ `status` ให้เหมาะสม

### วิธีเปลี่ยนสถานะเอกสาร
แก้ค่า `"status"` ให้เป็นค่าใหม่ และอัปเดต `"updatedAt": "2026-06-13"` (รูปแบบ YYYY-MM-DD)

---

## วิธีเพิ่ม "งานแข่ง/โอกาส" ใหม่ (`opportunities.json`)

```jsonc
{
  "id": "opp-xxxx",
  "title": "ชื่องาน",
  "description": "คำอธิบาย",
  "type": "ctf",                     // ดูรายการประเภทด้านล่าง
  "suitableYears": [2, 3, 4],         // ชั้นปีที่เหมาะสม
  "recommendedSemester": "both",      // 1, 2 หรือ "both"
  "difficulty": "intermediate",       // beginner | intermediate | advanced | mixed
  "status": "annual",                // upcoming | open | closed | annual | archived
  "usualPeriod": "ช่วงเวลาที่มักจัด",
  "deadline": "2026-09-30",          // ถ้ามีกำหนดแน่นอน (ไม่บังคับ)
  "link": "https://...",             // ลิงก์สมัคร/ข้อมูล (ถ้ามี)
  "relatedCourses": ["CP422031"],    // รหัสวิชาที่เกี่ยวข้อง (ดูได้ใน courses.json)
  "relatedSkills": ["CTF", "Web"],
  "teamRequired": true,
  "portfolioWorthy": true,
  "placeholder": true,                // true = งานนี้ควรให้ผู้ใช้ตรวจสอบประกาศล่าสุดเอง
  "tags": ["คำค้น"]
}
```

- **ประเภท (type):** `ctf`, `hackathon`, `competition`, `programming`, `network`, `cloud`, `research`, `startup`, `scholarship`, `internship`, `bootcamp`, `certification`, `conference`, `seminar`, `other`
- งานจะ **ไปโผล่อัตโนมัติ** ในหน้าเทอมของชั้นปีที่อยู่ใน `suitableYears`
- ใส่ `"placeholder": true` กับงานที่รายละเอียด/กำหนดการอาจเปลี่ยนทุกปี เพื่อให้เว็บเตือนผู้ใช้ให้ตรวจสอบประกาศล่าสุด
- ⚠️ **อย่าตั้ง `status`/ข้อความให้ดูเหมือนประกาศทางการ** หากยังไม่ได้ยืนยันกับผู้จัด

---

## วิธีแก้ "ข้อมูลรายเทอม" (`journey.json`)

แต่ละ object คือหนึ่งเทอม (มี 8 เทอม: `y1s1` … `y4s2`) แก้ได้ที่ฟิลด์:

- `themeThai` / `shortDescription` — หัวข้อและคำโปรยของเทอม
- `academicFocus` — จุดเน้นการเรียน (array ของข้อความ)
- `courseIds` — รหัสวิชาของเทอม (ต้องตรงกับ `id` ใน `courses.json`)
- `skills` — ทักษะที่ควรได้ (แต่ละตัวมี `name`, `category`, `level`, `description`)
- `portfolioGoals`, `warnings`, `advisorNotes`, `studentTips` — array ของข้อความ
- `checklist` — รายการเช็กลิสต์ (มี `text`, `category`, `required`)

> **เอกสารและงานแข่งของแต่ละเทอมไม่ต้องใส่ที่นี่** — ระบบจะดึงจาก `resources.json` / `opportunities.json` ที่ติดแท็กปี/เทอมตรงกันให้อัตโนมัติ เพิ่มครั้งเดียวใช้ได้ทุกที่

---

## ข้อควรระวังรวม
- JSON ต้องถูกต้อง: ใช้ `"` (double quote) เสมอ, ไม่มีจุลภาคเกินหลังรายการสุดท้าย
- `id` ของแต่ละรายการต้องไม่ซ้ำกัน
- ตรวจ `courseIds` / `relatedCourses` ว่าตรงกับรหัสใน `courses.json`
- หลังแก้ไข รัน `npm run build` เพื่อตรวจสอบก่อนนำขึ้นเว็บจริง
