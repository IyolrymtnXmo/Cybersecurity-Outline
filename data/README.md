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

## 🌏 ข้อความ 2 ภาษา (สำคัญ)

เว็บรองรับไทย/อังกฤษ ข้อความที่ผู้ใช้เห็น (ชื่อ, คำอธิบาย, focus, skills, checklist ฯลฯ) ให้ใส่เป็น object 2 ภาษา:

```jsonc
"title": { "th": "ชื่อภาษาไทย", "en": "English name" }
```

- ถ้าใส่เป็น **ข้อความธรรมดา** (string เดี่ยว) ระบบจะแสดงข้อความนั้นทั้งสองภาษา — เหมาะกับคำที่ไม่ต้องแปล เช่น `"Git & GitHub"`, `"OWASP"`, ชื่องานสากลอย่าง `"picoCTF"`
- ถ้าลืมใส่ `en` เว็บจะ fallback ไปแสดงภาษาไทยแทน (ไม่พัง แต่จะหลุดเป็นไทยตอนเลือก EN)
- ฟิลด์ที่เป็น "list" เช่น `academicFocus`, `portfolioGoals`, `warnings`, `checklist[].text` ก็ใช้รูปแบบ `{ th, en }` ในแต่ละรายการได้เช่นกัน
- ฟิลด์ `tags` ใช้สำหรับค้นหาเท่านั้น (ไม่แสดงผล) จะใส่ไทย/อังกฤษคละกันก็ได้

---

## วิธีเพิ่ม "เอกสาร" ใหม่ (`resources.json`)

เพิ่ม object ใหม่เข้าไปใน array โดยมีฟิลด์ดังนี้:

```jsonc
{
  "id": "res-xxxx",                  // รหัสไม่ซ้ำใคร (ตั้งเองได้)
  "title": { "th": "ชื่อเอกสาร", "en": "Document name" },
  "description": { "th": "คำอธิบายสั้น ๆ", "en": "Short description" },
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
  "title": { "th": "ชื่องาน", "en": "Event name" },   // หรือ string เดี่ยวถ้าเป็นชื่อสากล เช่น "picoCTF"
  "description": { "th": "คำอธิบาย", "en": "Description" },
  "type": "ctf",                     // ดูรายการประเภทด้านล่าง
  "suitableYears": [2, 3, 4],         // ชั้นปีที่เหมาะสม
  "recommendedSemester": "both",      // 1, 2 หรือ "both"
  "difficulty": "intermediate",       // beginner | intermediate | advanced | mixed
  "status": "annual",                // upcoming | open | closed | annual | archived
  "usualPeriod": { "th": "ช่วงเวลาที่มักจัด", "en": "Typical period" },
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

- `theme` (อังกฤษ) / `themeThai` (ไทย) — หัวข้อหลักของเทอม เว็บจะเลือกแสดงตามภาษาที่ผู้ใช้เลือก
- `shortDescription` — คำโปรยของเทอม (รูปแบบ `{ th, en }`)
- `academicFocus` — จุดเน้นการเรียน (array ของ `{ th, en }`)
- `courseIds` — รหัสวิชาของเทอม (ต้องตรงกับ `id` ใน `courses.json`)
- `skills` — ทักษะที่ควรได้ (แต่ละตัวมี `name`, `category`, `level`, `description` โดย `name`/`description` เป็น `{ th, en }` หรือ string ก็ได้)
- `portfolioGoals`, `warnings`, `advisorNotes`, `studentTips` — array ของ `{ th, en }`
- `checklist` — รายการเช็กลิสต์ (มี `text` แบบ `{ th, en }`, `category`, `required`)

> **เอกสารและงานแข่งของแต่ละเทอมไม่ต้องใส่ที่นี่** — ระบบจะดึงจาก `resources.json` / `opportunities.json` ที่ติดแท็กปี/เทอมตรงกันให้อัตโนมัติ เพิ่มครั้งเดียวใช้ได้ทุกที่

---

## ข้อควรระวังรวม
- JSON ต้องถูกต้อง: ใช้ `"` (double quote) เสมอ, ไม่มีจุลภาคเกินหลังรายการสุดท้าย
- `id` ของแต่ละรายการต้องไม่ซ้ำกัน
- ตรวจ `courseIds` / `relatedCourses` ว่าตรงกับรหัสใน `courses.json`
- หลังแก้ไข รัน `npm run build` เพื่อตรวจสอบก่อนนำขึ้นเว็บจริง
