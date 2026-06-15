# Maintenance Guide — คู่มือดูแลรักษาเว็บไซต์

คู่มือนี้อธิบายวิธีแก้ไขข้อมูลและดูแลเว็บไซต์หลักสูตร **วท.บ. ความมั่นคงปลอดภัยไซเบอร์**
วิทยาลัยการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น

> ข้อมูลเกือบทั้งหมดเก็บเป็นไฟล์ **JSON** ในโฟลเดอร์ `data/` แก้ไขได้โดยไม่ต้องเขียนโค้ด
> หลังแก้ไขทุกครั้งให้รัน `npm run typecheck` และ `npm run build` เพื่อตรวจว่าไม่พัง

หลักการสำคัญ: **ห้ามแต่งข้อมูลที่อ้างว่าเป็นทางการเอง** ข้อมูลที่ยังไม่ยืนยันให้คงสถานะ
`needs-verification` / `sample` / `placeholder` และให้หลักสูตรตรวจสอบก่อนเปลี่ยนเป็น
`verified`

---

## 1. แก้ไขข้อมูลคณาจารย์ (Faculty)

ไฟล์: [`data/faculty.json`](data/faculty.json) — โหลดผ่าน [`lib/faculty.ts`](lib/faculty.ts)

แต่ละรายการมีรูปแบบ:

```jsonc
{
  "id": "jedsada-thongkanluang",        // slug ไม่ซ้ำ
  "nameThai": "อ.เจษฎา ทองก้านเหลือง",
  "nameEnglish": "Lecturer Jedsada Thongkanluang",
  "academicPosition": { "th": "อาจารย์", "en": "Lecturer" },
  "role": null,                          // บทบาทในหลักสูตร (ถ้ามี)
  "email": "jedtho@kku.ac.th",
  "imageUrl": "https://.../photo.jpeg",  // ถ้าโหลดไม่ได้จะ fallback เป็นอักษรย่อ
  "expertise": ["Penetration Testing", "Digital Forensics"],
  "bio": null,
  "office": null,
  "profileUrl": "https://computing.kku.ac.th/...",
  "status": "needs-verification"         // verified | needs-verification | placeholder
}
```

- ฟิลด์ที่ยังไม่มีข้อมูล ให้ใส่ `null` (UI จะแสดง "รอตรวจสอบข้อมูล / To be confirmed")
  — **อย่าเดาหรือแต่งข้อมูล**
- `expertise` เก็บเป็นชื่อสาขาภาษาอังกฤษตามต้นฉบับ (แสดงเหมือนกันทั้งสองภาษา)
- เมื่อหลักสูตรยืนยันแล้ว ให้เปลี่ยน `status` เป็น `"verified"`
- หน้าคณาจารย์มีหมายเหตุกำกับว่าข้อมูลควรได้รับการตรวจสอบก่อนเผยแพร่

---

## 2. แก้ไขคำถามที่พบบ่อย (FAQ)

ไฟล์: [`data/faq.json`](data/faq.json)

```jsonc
{
  "id": "faq-credits",
  "category": "program",        // program|admissions|registration|documents|services|opportunities|contact
  "status": "recommended",      // recommended | needs-verification
  "question": { "th": "...", "en": "..." },
  "answer":   { "th": "...", "en": "..." },
  "relatedRoute": "/study-plan" // (ไม่บังคับ) ลิงก์ไปหน้าที่เกี่ยวข้อง
}
```

- ทุกข้อต้องมีทั้ง `th` และ `en`
- ข้อมูลที่ยังไม่ยืนยันให้ใช้ `status: "needs-verification"`

---

## 3. เพิ่ม/แก้ไขประกาศ (Announcements)

ไฟล์: [`data/announcements.json`](data/announcements.json)

```jsonc
{
  "id": "anc-2026-xxx",
  "category": "registration",   // registration|activity|document|scholarship|general
  "priority": "high",           // high | normal | low
  "status": "official",         // sample | official
  "date": "2026-05-01",         // YYYY-MM-DD (เรียงใหม่สุดก่อนอัตโนมัติ)
  "title": { "th": "...", "en": "..." },
  "body":  { "th": "...", "en": "..." }
}
```

- ปัจจุบันเป็นประกาศ **ตัวอย่าง** (`status: "sample"`) ทั้งหมด
- ก่อนเผยแพร่จริง ให้แทนที่ด้วยประกาศจริงและตั้ง `status: "official"`
  หรือซ่อนหน้าไว้จนกว่าจะมีประกาศจริง

---

## 4. เพิ่ม/แก้ไขเอกสาร (Resources)

ไฟล์: [`data/resources.json`](data/resources.json)

- ใส่ `status` ให้ตรงความจริง: `official` / `recommended` / `draft` / `needs-update`
- ไฟล์ตัวอย่างที่ยังไม่มีไฟล์จริง ให้ติดสถานะ placeholder และนำไฟล์จริงไปไว้ใน
  `public/docs/` แล้วชี้ลิงก์ให้ถูกต้อง (อ้างอิงไฟล์ public ผ่าน `asset()` ใน
  [`lib/asset.ts`](lib/asset.ts) เสมอ ไม่ใช้ path ตรง ๆ เพราะอาจมี basePath)
- ข้อมูลล่าสุดที่เป็นทางการ ให้ลิงก์ไปยังหน้านักศึกษาของวิทยาลัยแทนการคัดลอกมาเก็บ

---

## 5. แก้ไขลิงก์ทางการ (Official Links)

ไฟล์: [`data/official-links.json`](data/official-links.json) — แสดงด้วย
[`components/OfficialLinkCard.tsx`](components/OfficialLinkCard.tsx)

```jsonc
{
  "id": "admissions",
  "title": { "th": "...", "en": "..." },
  "description": { "th": "...", "en": "..." },
  "url": "https://computing.kku.ac.th/bsc-entrance",
  "category": "admissions",     // program|admissions|documents|digital
  "audience": ["prospective", "parent"]
}
```

- ลิงก์เหล่านี้ทำหน้าที่เป็น **gateway** ไปยังหน้าทางการของวิทยาลัย
  ตรวจสอบเป็นระยะว่า URL ยังใช้งานได้

---

## 6. แก้ไขเครดิตผู้จัดทำ (Credits)

ไฟล์: [`data/credits.json`](data/credits.json)

- เครดิตแสดงแบบเล็กและสุภาพที่ Footer และหน้า `/about`
- หากต้องการเพิ่มผู้ร่วมพัฒนา ให้แก้ที่ไฟล์นี้และที่คีย์ `footer.credit`
  ใน [`lib/i18n.ts`](lib/i18n.ts)

---

## 7. เพิ่มหน้า (Route) ใหม่

1. สร้างโฟลเดอร์ใน `app/<route>/` พร้อมไฟล์ `page.tsx`
2. ถ้าหน้านั้นเป็น client component (`"use client"`) ให้เพิ่ม `layout.tsx`
   เล็ก ๆ สำหรับ SEO metadata โดยใช้ helper `pageMeta()` จาก
   [`lib/seo.ts`](lib/seo.ts):

   ```tsx
   import { pageMeta } from "@/lib/seo";
   export const metadata = pageMeta("Title | KKU", "Description (EN + TH)");
   export default function Layout({ children }: { children: React.ReactNode }) {
     return <>{children}</>;
   }
   ```
3. เพิ่มเมนูใน [`components/Navbar.tsx`](components/Navbar.tsx) (อาเรย์ `PRIMARY`
   หรือ `MORE_GROUPS`) และเพิ่ม label สองภาษาใน `dict` ของ
   [`lib/i18n.ts`](lib/i18n.ts)
4. ถ้าเป็น dynamic route ต้อง export `generateStaticParams` (จำเป็นสำหรับ static export)

---

## 8. Build และ Deploy

```bash
npm install
npm run typecheck       # ตรวจชนิดข้อมูล
npm run build           # build production

# Static export สำหรับโดเมนจริง (เสิร์ฟที่ราก):
DEPLOY_TARGET=github-pages NEXT_PUBLIC_BASE_PATH="" npm run build
# ผลลัพธ์อยู่ใน ./out
```

รายละเอียดการ deploy บนโดเมน `cy.computing.kku.ac.th` ดูที่
[`DEPLOYMENT.md`](DEPLOYMENT.md)

---

## 9. ตรวจสอบสองภาษา (TH/EN)

- สลับภาษาด้วยปุ่ม TH/EN มุมขวาบน แล้วเปิดดูทุกหน้า
- ข้อความ UI ต้องแปลครบทั้งสองภาษา (ผ่าน `dict` ใน `lib/i18n.ts` หรือ helper
  `L(th, en)` ในหน้าใหม่)
- ภาษาไทยที่ "ตั้งใจคงไว้" ในโหมด EN ได้แก่: ชื่อบุคคล ชื่อหลักสูตรภาษาไทย
  ชื่อรายวิชาทางการ ชื่อหน่วยงาน และชื่อเอกสารที่ไม่มีชื่ออังกฤษ — นอกนั้นต้องแปล

---

## 10. ตรวจ placeholder ก่อนเผยแพร่จริง

ก่อน launch ให้ค้นหาและตรวจสอบ:

- คำว่า `sample` / `placeholder` / `needs-verification` ในโฟลเดอร์ `data/`
- ฟิลด์ที่เป็น `null` หรือ "รอตรวจสอบข้อมูล / To be confirmed"
- ประกาศตัวอย่างใน `data/announcements.json`
- ใช้เช็กลิสต์ในหน้า `/about` (Official Launch Checklist) ประกอบ
- รัน `git grep` หา credential pattern (IP/password/token) — ต้องไม่พบ

---

## 11. ผู้ดูแลข้อมูล (Data owner)

ควรกำหนดผู้รับผิดชอบร่วมกับหลักสูตรก่อนเผยแพร่จริง:

- **ผู้ดูแลข้อมูลหลักสูตร (Program data owner):** อนุมัติเนื้อหาคณาจารย์ การรับเข้า
  ประกาศ และการติดต่อ
- **ผู้ดูแลทางเทคนิค (Technical maintainer):** ดูแลการแก้ไฟล์ JSON, build และ deploy
- **ผู้ดูแลเซิร์ฟเวอร์ (Server operator):** ดูแลโดเมน HTTPS และการอัปโหลดไฟล์

(ดูช่องสำหรับกรอกใน `DEPLOYMENT.md` §10 — ใช้ placeholder เท่านั้น ไม่ commit ข้อมูลส่วนบุคคล)
