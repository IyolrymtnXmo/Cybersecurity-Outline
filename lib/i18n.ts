export type Locale = "th" | "en";
export const DEFAULT_LOCALE: Locale = "th";
export const LOCALES: Locale[] = ["th", "en"];

type Entry = { th: string; en: string };

export const dict: Record<string, Entry> = {
  // ---------------------------------------------------------------- nav
  "nav.home": { th: "หน้าแรก", en: "Home" },
  "nav.curriculum": { th: "Curriculum Outline", en: "Curriculum Outline" },
  "nav.courses": { th: "รายวิชา", en: "Courses" },
  "nav.prerequisite": { th: "ตรวจวิชาต่อ", en: "Prereq Check" },
  "nav.studyPlan": { th: "แผนการเรียน", en: "Study Plan" },
  "nav.pathways": { th: "เส้นทาง", en: "Pathways" },
  "nav.outcomes": { th: "Outcomes", en: "Outcomes" },
  "nav.careers": { th: "อาชีพ", en: "Careers" },
  "nav.advisor": { th: "คำแนะนำ", en: "Advisor" },
  "nav.electives": { th: "วิชาเลือก", en: "Electives" },
  "nav.gradeCalculator": { th: "คำนวณเกรด", en: "Grade Calculator" },
  "nav.schedule": { th: "จัดตารางเรียน", en: "Schedule Planner" },
  "nav.brand.tagline": { th: "B.Sc. Cybersecurity", en: "B.Sc. Cybersecurity" },

  // -------------------------------------------------------- shared chrome
  "common.thaiName": { th: "ชื่อภาษาไทย", en: "Thai name" },
  "common.englishName": { th: "ชื่อภาษาอังกฤษ", en: "English name" },
  "common.credits": { th: "หน่วยกิต", en: "credits" },
  "common.year": { th: "ปี", en: "Year" },
  "common.semester": { th: "เทอม", en: "Semester" },
  "common.openCurriculum": { th: "เปิด Curriculum Outline", en: "Open Curriculum Outline" },
  "common.viewAll": { th: "ดูทั้งหมด", en: "View all" },
  "common.menu": { th: "เมนู", en: "Menu" },
  "common.close": { th: "ปิด", en: "Close" },
  "common.print": { th: "พิมพ์ / Print", en: "Print" },
  "common.copy": { th: "คัดลอกสรุปแผนเรียน", en: "Copy study plan" },
  "common.back": { th: "กลับ", en: "Back" },
  "common.search": { th: "ค้นหา", en: "Search" },
  "common.filter": { th: "ตัวกรอง", en: "Filter" },
  "common.noResults": { th: "ไม่พบรายการที่ตรงกับเงื่อนไข", en: "No results match your filters" },
  "common.allYears": { th: "ทุกชั้นปี", en: "All years" },
  "common.allCategories": { th: "ทั้งหมด", en: "All" },
  "common.hasPrereq": { th: "มี prerequisite", en: "Has prerequisite" },
  "common.onlyRisky": { th: "เฉพาะเสี่ยง", en: "Risky only" },
  "common.noPrereq": { th: "ไม่มี prerequisite", en: "No prerequisite" },
  "common.mustPass": { th: "ต้องผ่าน", en: "Pass first" },
  "common.subjects": { th: "วิชา", en: "subjects" },
  "common.needsVerify": { th: "ต้องตรวจสอบกับหลักสูตร", en: "Verify with curriculum" },
  "common.disclaimer": {
    th: "ข้อมูลในเว็บไซต์นี้จัดทำเพื่อช่วยวางแผนการเรียนเบื้องต้น นักศึกษาควรตรวจสอบกับประกาศของมหาวิทยาลัย หลักสูตร และอาจารย์ที่ปรึกษาก่อนลงทะเบียนจริงทุกครั้ง",
    en: "This site is for preliminary academic planning. Always verify with official university announcements, the curriculum document, and your academic advisor before registering.",
  },
  "common.lang.th": { th: "ไทย", en: "Thai" },
  "common.lang.en": { th: "อังกฤษ", en: "English" },
  "common.lang.switchToEn": { th: "สลับเป็นภาษาอังกฤษ", en: "Switch to English" },
  "common.lang.switchToTh": { th: "สลับเป็นภาษาไทย", en: "Switch to Thai" },
  "common.theme.toDark": { th: "สลับเป็นธีมมืด", en: "Switch to dark theme" },
  "common.theme.toLight": { th: "สลับเป็นธีมสว่าง", en: "Switch to light theme" },

  // -------------------------------------------------------------- footer
  "footer.intro": {
    th: "เว็บไซต์นี้จัดทำเพื่อช่วยวางแผนการเรียนเบื้องต้นในหลักสูตร วท.บ. ความมั่นคงปลอดภัยไซเบอร์ ข้อมูลอ้างอิงจากเอกสารตัวอย่างแผนการศึกษาของวิทยาลัยการคอมพิวเตอร์",
    en: "An unofficial student navigator for the B.Sc. Cybersecurity program, built from the College of Computing's sample study plan.",
  },
  "footer.disclaimer": {
    th: "ข้อมูลในเว็บไซต์เป็นแนวทางเบื้องต้น นักศึกษาควรตรวจสอบกับประกาศของมหาวิทยาลัย หลักสูตร และอาจารย์ที่ปรึกษาก่อนลงทะเบียนจริง",
    en: "Information here is a preliminary guide — confirm with the university, curriculum, and your advisor before registering.",
  },
  "footer.nav": { th: "นำทาง", en: "Navigate" },
  "footer.paths": { th: "เส้นทาง", en: "Pathways" },
  "footer.copy": {
    th: "CY Curriculum Outline · Unofficial student navigator",
    en: "CY Curriculum Outline · Unofficial student navigator",
  },

  // -------------------------------------------------------------- home
  "home.heroBadge": { th: "หลักสูตรปริญญาตรี · 4 ปี", en: "Undergraduate Program · 4 years" },
  "home.heroSub": {
    th: "ระบบนำทางหลักสูตรแบบ interactive — เข้าใจโครงสร้าง 4 ปี ตรวจสอบรายวิชาต่อ และจำลองผลกระทบเมื่อติด F พร้อมเส้นทาง Project / Co-op / WIL",
    en: "An interactive curriculum navigator — understand the 4-year structure, check prerequisites, simulate the impact of failing a course, and compare Project / Co-op / WIL tracks.",
  },
  "home.cta.outline": { th: "ดูแผนหลักสูตร", en: "View Curriculum Map" },
  "home.cta.courses": { th: "ค้นหารายวิชา", en: "Search Courses" },
  "home.cta.prereq": { th: "ตรวจสอบวิชาต่อ", en: "Prerequisite Check" },
  "home.cta.pathways": { th: "Project / Co-op / WIL", en: "Project / Co-op / WIL" },
  "home.fact.duration": { th: "ระยะเวลา", en: "Duration" },
  "home.fact.durationVal": { th: "4 ปี", en: "4 years" },
  "home.fact.durationSub": { th: "8 ภาคการศึกษา", en: "8 semesters" },
  "home.fact.credits": { th: "หน่วยกิตรวม", en: "Total credits" },
  "home.fact.creditsSub": { th: "หน่วยกิตขั้นต่ำ", en: "minimum" },
  "home.fact.core": { th: "วิชาแกน Core", en: "Core courses" },
  "home.fact.coreSub": { th: "วิชาในระบบ", en: "in the catalog" },
  "home.fact.faculty": { th: "คณะ/วิทยาลัย", en: "Faculty" },
  "home.section.whatLearn": { th: "สิ่งที่จะได้เรียน", en: "What you'll learn" },
  "home.section.whatLearnTitle": {
    th: "พื้นฐานครบ ตั้งแต่ Programming จนถึง Cybersecurity ขั้นสูง",
    en: "From core programming fundamentals to advanced Cybersecurity",
  },
  "home.pillar.prog": { th: "Programming & Software", en: "Programming & Software" },
  "home.pillar.progDesc": {
    th: "Structured, OOP, Data Structures, Software Design",
    en: "Structured, OOP, Data Structures, Software Design",
  },
  "home.pillar.net": { th: "Network & Systems", en: "Network & Systems" },
  "home.pillar.netDesc": {
    th: "OS, Computer Networking, Wireless & IoT",
    en: "OS, Computer Networking, Wireless & IoT",
  },
  "home.pillar.sec": { th: "Cybersecurity Core", en: "Cybersecurity Core" },
  "home.pillar.secDesc": {
    th: "Intro to Cybersecurity, Law & Ethics, Research Methodology",
    en: "Intro to Cybersecurity, Law & Ethics, Research Methodology",
  },
  "home.pillar.ai": { th: "AI · Cloud · IoT", en: "AI · Cloud · IoT" },
  "home.pillar.aiDesc": {
    th: "AI in Cybersecurity, Cloud Computing, Wireless/IoT",
    en: "AI in Cybersecurity, Cloud Computing, Wireless/IoT",
  },
  "home.outline.kicker": { th: "Interactive Curriculum Map", en: "Interactive Curriculum Map" },
  "home.outline.title": { th: "CY Curriculum Outline", en: "CY Curriculum Outline" },
  "home.outline.desc": {
    th: "ดูภาพรวมหลักสูตรเป็น flow diagram — แต่ละวิชาแยกสีตามหมวด มีเส้นเชื่อม prerequisite และสามารถ hover เพื่อเห็นเส้นทางการเรียนแบบ end-to-end",
    en: "Browse the program as a flow diagram — courses colored by category, prerequisite edges connect related courses, and hovering reveals the full learning path.",
  },
  "home.feature.prereqDesc": {
    th: "เลือกวิชาที่ผ่านแล้ว / ติด F ระบบจะคำนวณว่าเทอมหน้าลงอะไรได้บ้าง",
    en: "Mark passed / failed courses and see what you can register for next term.",
  },
  "home.feature.risk": { th: "Risk Map", en: "Risk Map" },
  "home.feature.riskDesc": {
    th: "ดูว่าวิชาใดเป็นจุดเสี่ยงต่อแผนเรียน เช่น Networking, OOP, Programming",
    en: "See which courses are risky for your study plan — e.g. Networking, OOP, Programming.",
  },
  "home.feature.pathway": { th: "Pathway Compare", en: "Pathway Compare" },
  "home.feature.pathwayDesc": {
    th: "เปรียบเทียบเส้นทาง Project, Co-op, WIL พร้อมข้อควรระวัง",
    en: "Compare Project, Co-op, and WIL tracks with caveats.",
  },
  "home.feature.open": { th: "เปิดดู", en: "Open" },
  "home.careers.kicker": { th: "เส้นทางหลังเรียนจบ", en: "After graduation" },
  "home.careers.title": { th: "อาชีพที่รออยู่", en: "Careers waiting for you" },

  // ---------------------------------------------------------- curriculum
  "curriculum.kicker": { th: "Interactive Curriculum Map", en: "Interactive Curriculum Map" },
  "curriculum.title": { th: "CY Curriculum Outline", en: "CY Curriculum Outline" },
  "curriculum.desc": {
    th: "ภาพรวมหลักสูตรแบบ interactive — hover เพื่อดูเส้นทาง prerequisite, คลิกเพื่อดูรายละเอียดวิชา และสลับ View ตามมุมมองที่ต้องการ",
    en: "An interactive curriculum overview — hover to trace prerequisites, click to open course details, and switch views below.",
  },
  "curriculum.mobileHint": {
    th: "บนหน้าจอเล็ก เราแสดงเป็น Accordion Timeline เพื่อให้อ่านง่าย กรุณาใช้หน้าจอที่กว้างขึ้นเพื่อดู Flow Diagram แบบเต็ม",
    en: "On small screens we show an accordion timeline — use a wider screen to view the full flow diagram.",
  },
  "curriculum.track": { th: "Track", en: "Track" },
  "curriculum.view": { th: "View", en: "View" },
  "curriculum.view.academic": { th: "Academic Plan", en: "Academic Plan" },
  "curriculum.view.prereq": { th: "Prerequisite Network", en: "Prerequisite Network" },
  "curriculum.view.risk": { th: "Risk Map", en: "Risk Map" },
  "curriculum.view.student": { th: "Student Friendly", en: "Student Friendly" },
  "curriculum.view.academic.desc": {
    th: "ดูแผนตามหมวดวิชา (สีตามประเภท)",
    en: "Standard plan view, colored by category",
  },
  "curriculum.view.prereq.desc": {
    th: "เน้นเส้นทาง prerequisite ทั้งหมด",
    en: "Emphasize the prerequisite network",
  },
  "curriculum.view.risk.desc": {
    th: "ระบายสีตามระดับความเสี่ยง",
    en: "Colored by risk level",
  },
  "curriculum.view.student.desc": {
    th: "การ์ดใหญ่ขึ้น อ่านง่ายสำหรับนักศึกษา",
    en: "Larger cards, simpler labels for students",
  },
  "curriculum.legend.prereq": { th: "Prerequisite", en: "Prerequisite" },

  // ---------------------------------------------------------- catalog
  "catalog.kicker": { th: "Course Catalog", en: "Course Catalog" },
  "catalog.title": { th: "รายวิชาในหลักสูตร", en: "Courses in the Program" },
  "catalog.subtitle": {
    th: "ค้นหาด้วยรหัสวิชา ชื่อไทย/อังกฤษ หรือ keyword",
    en: "Search by course code, Thai/English name, or keyword",
  },
  "catalog.placeholder": {
    th: "ค้นหา เช่น CP 421, Cybersecurity, OOP...",
    en: "Search e.g. CP 421, Cybersecurity, OOP...",
  },
  "catalog.found": { th: "พบ", en: "Found" },
  "catalog.coursesCount": { th: "วิชา", en: "courses" },
  "catalog.total": { th: "วิชาในระบบ", en: "courses in the catalog" },
  "catalog.showing": { th: "แสดง", en: "Showing" },

  // ---------------------------------------------------------- prereq
  "prereq.kicker": { th: "Prerequisite Checker", en: "Prerequisite Checker" },
  "prereq.title": {
    th: "ตรวจสอบวิชาต่อ / จำลองสถานการณ์ติด F",
    en: "Prerequisite Checker / Failure Simulator",
  },
  "prereq.desc": {
    th: "เลือกสถานะของแต่ละวิชา (ผ่าน / ติด F / ยังไม่ลง) ระบบจะคำนวณว่าคุณจะลงวิชาอะไรได้ในเทอมถัดไปและวิชาใดจะถูก block",
    en: "Mark each course as passed, failed, or unattempted. The system will calculate which courses you can register for next term and which will be blocked.",
  },
  "prereq.choose": { th: "เลือกสถานะรายวิชา", en: "Mark each course" },
  "prereq.chooseHint": {
    th: "กดที่ปุ่ม ผ่าน / ติด F สำหรับแต่ละวิชา",
    en: "Tap a button for each course",
  },
  "prereq.passed": { th: "ผ่าน", en: "Passed" },
  "prereq.failed": { th: "F", en: "F" },
  "prereq.canTake": { th: "ลงได้", en: "Eligible" },
  "prereq.warning": { th: "ควรระวัง / ยังลงไม่ได้", en: "Caution / not yet eligible" },
  "prereq.blocked": { th: "ถูก block จากการติด F", en: "Blocked by failed prerequisite" },
  "prereq.impact": { th: "ผลกระทบจากการติด F", en: "Impact of failing" },
  "prereq.impactDesc": {
    th: "หากยังไม่ผ่านวิชาต่อไปนี้ จะส่งผลต่อวิชาอื่นในเส้นทางการเรียน (รวมถึงวิชาที่ต่อกันเป็นทอด ๆ)",
    en: "If you haven't passed the courses below, they affect downstream courses — including transitive dependencies.",
  },
  "prereq.riskLevel": { th: "ระดับความเสี่ยง", en: "Risk level" },
  "prereq.noBlockedDirect": {
    th: "ไม่พบวิชาในระบบที่จะถูกกระทบโดยตรง — แต่ควรปรึกษาอาจารย์ที่ปรึกษา",
    en: "No directly affected courses in the system — but consult your advisor",
  },
  "prereq.advisoryNote": {
    th: "⚠️ คำเตือนนี้คำนวณจาก prerequisite ในระบบ ซึ่งบางส่วนเป็นการอนุมานจากลำดับแผนการเรียน ควรปรึกษาอาจารย์ที่ปรึกษาเพื่อยืนยันก่อนตัดสินใจ",
    en: "⚠️ This is computed from prerequisites in the system, some of which are inferred from the study plan order. Confirm with your advisor before deciding.",
  },

  // ---------------------------------------------------------- plan
  "plan.kicker": { th: "Study Plan", en: "Study Plan" },
  "plan.title": { th: "แผนการเรียน 4 ปี", en: "4-Year Study Plan" },
  "plan.desc": {
    th: "ตารางแผนการเรียนแยกตามภาคการศึกษา พร้อมจำนวนหน่วยกิตและหน่วยกิตสะสม",
    en: "Term-by-term study plan with credits per term and cumulative totals.",
  },
  "plan.col.term": { th: "ปี / เทอม", en: "Year / Term" },
  "plan.col.code": { th: "รหัสวิชา", en: "Code" },
  "plan.col.name": { th: "ชื่อวิชา", en: "Course" },
  "plan.col.credits": { th: "หน่วยกิต", en: "Credits" },
  "plan.col.category": { th: "หมวด", en: "Category" },

  // ---------------------------------------------------------- grade calc
  "gpa.kicker": { th: "Grade Calculator", en: "Grade Calculator" },
  "gpa.title": { th: "โปรแกรมคำนวณเกรด (GPA)", en: "GPA Calculator" },
  "gpa.desc": { th: "เลือกแผนการเรียนและกำหนดเกรดที่คาดหวังในแต่ละเทอมเพื่อคำนวณ GPA รายเทอมและ GPA สะสม", en: "Select your track and expected grades for each term to calculate term GPA and cumulative GPA." },
  "gpa.summary": { th: "สรุปผลการเรียน", en: "GPA Summary" },
  "gpa.cumulative": { th: "เกรดเฉลี่ยสะสม (GPAX)", en: "Cumulative GPA (GPAX)" },
  "gpa.totalCredits": { th: "หน่วยกิตรวม", en: "Total Credits" },
  "gpa.term": { th: "เทอม", en: "Term" },
  "gpa.termGpa": { th: "GPA เทอมนี้:", en: "Term GPA:" },

  // ---------------------------------------------------------- pathways
  "paths.kicker": { th: "Pathways", en: "Pathways" },
  "paths.title": { th: "เส้นทาง Project · Co-op · WIL", en: "Pathways: Project · Co-op · WIL" },
  "paths.desc": {
    th: "เปรียบเทียบ 3 เส้นทางหลักของชั้นปี 4 — แต่ละเส้นทางมีลักษณะ ข้อกำหนด และข้อควรระวังแตกต่างกัน",
    en: "Compare the three Year-4 tracks — each has its own profile, requirements, and caveats.",
  },
  "paths.suitable": { th: "เหมาะกับใคร", en: "Who it's for" },
  "paths.requirements": { th: "เงื่อนไข / การเตรียมตัว", en: "Requirements / preparation" },
  "paths.courses": { th: "รายวิชาเฉพาะของเส้นทาง", en: "Track-specific courses" },
  "paths.warnings": { th: "ข้อควรระวัง", en: "Caveats" },

  // ---------------------------------------------------------- outcomes
  "outcomes.kicker": { th: "Learning Outcomes", en: "Learning Outcomes" },
  "outcomes.title": { th: "PLO / YLO — ผลลัพธ์การเรียนรู้", en: "PLO / YLO — Learning Outcomes" },
  "outcomes.plo": { th: "Program Learning Outcomes (PLO)", en: "Program Learning Outcomes (PLO)" },
  "outcomes.ploDesc": {
    th: "เป้าหมายที่นักศึกษาจะสามารถทำได้เมื่อจบหลักสูตร",
    en: "What students will be able to do upon graduation",
  },
  "outcomes.ylo": { th: "Year Learning Outcomes (YLO)", en: "Year Learning Outcomes (YLO)" },
  "outcomes.yloDesc": {
    th: "เป้าหมายของการเรียนแต่ละชั้นปี",
    en: "Learning targets per year",
  },

  // ---------------------------------------------------------- careers
  "careers.kicker": { th: "Careers", en: "Careers" },
  "careers.title": { th: "เส้นทางอาชีพหลังเรียนจบ", en: "Career Paths" },
  "careers.desc": {
    th: "หลักสูตรนี้เปิดเส้นทางสู่งานสาย Cybersecurity ที่หลากหลาย — เลือกวิชาเลือกและ Certification ให้เหมาะกับเส้นทางที่สนใจ",
    en: "This program opens many Cybersecurity career paths — pick electives and certifications aligned with your interest.",
  },
  "careers.skills": { th: "ทักษะ", en: "Skills" },
  "careers.relatedCourses": { th: "วิชาที่ช่วยเตรียมตัว", en: "Helpful courses" },

  // ---------------------------------------------------------- advisor
  "advisor.kicker": { th: "Advisor Notes", en: "Advisor Notes" },
  "advisor.title": { th: "คำแนะนำก่อนลงทะเบียน", en: "Pre-registration Advice" },
  "advisor.desc": {
    th: "คู่มือสั้น ๆ ช่วยให้คุณวางแผนเทอมถัดไปอย่างมั่นใจ — แต่ทุกครั้งก่อนลงทะเบียนจริง ควรปรึกษาอาจารย์ที่ปรึกษาเพื่อยืนยันแผน",
    en: "A short guide for planning your next term — always confirm with your academic advisor before actual registration.",
  },

  // ---------------------------------------------------------- electives
  "electives.kicker": { th: "Elective Course Builder", en: "Elective Course Builder" },
  "electives.title": { th: "หมวดวิชาเลือก — เลือกได้ ≥ 21 หน่วยกิต", en: "Elective Courses — choose ≥ 21 credits" },
  "electives.desc": {
    th: "หมวดวิชาเลือกในหลักสูตรมี 5 กลุ่มย่อย + ชุดวิชาปรับพื้นฐาน นักศึกษาสามารถเลือกข้ามกลุ่มได้ ไม่จำเป็นต้องเลือกทั้งกลุ่มเดียวกัน เลือกการ์ดเพื่อจำลองว่าจะลงวิชาใดบ้าง",
    en: "Electives are organized into 5 subgroups + a foundation module. You can mix across subgroups freely. Click a card to simulate which courses you would register for.",
  },
  "electives.selectedCount": { th: "วิชาที่เลือก", en: "Selected" },
  "electives.creditsTotal": { th: "หน่วยกิตรวมที่เลือก", en: "Selected credits" },
  "electives.target": { th: "เป้าหมาย ≥ 21 หน่วยกิต", en: "Target ≥ 21 credits" },
  "electives.clear": { th: "ล้างที่เลือก", en: "Clear selection" },
  "electives.filter.openOnly": { th: "เฉพาะที่เปิดสอนเทอมนี้", en: "Offered this term only" },
  "electives.filter.allSubgroups": { th: "ทุกกลุ่มย่อย", en: "All subgroups" },
  "electives.subgroup.network": {
    th: "กลุ่มย่อยที่ 1 · เครือข่ายคอมพิวเตอร์",
    en: "Subgroup 1 · Computer Networking",
  },
  "electives.subgroup.platform": {
    th: "กลุ่มย่อยที่ 2 · ความปลอดภัยบนแพลตฟอร์ม",
    en: "Subgroup 2 · Platform Security",
  },
  "electives.subgroup.defense": {
    th: "กลุ่มย่อยที่ 3 · การตรวจจับและป้องกัน",
    en: "Subgroup 3 · Detection & Defense",
  },
  "electives.subgroup.policy": {
    th: "กลุ่มย่อยที่ 4 · นโยบายและการจัดการ",
    en: "Subgroup 4 · Policy & Management",
  },
  "electives.subgroup.theory": {
    th: "กลุ่มย่อยที่ 5 · ทฤษฎีและการประยุกต์",
    en: "Subgroup 5 · Theory & Applications",
  },
  "electives.subgroup.foundation": {
    th: "ชุดวิชาปรับพื้นฐาน",
    en: "Foundation Modules",
  },
  "electives.status.title": { th: "สถานะการเปิดสอน", en: "Offering status" },
  "electives.status.open": { th: "เปิดสอน", en: "Open this term" },
  "electives.status.closed": { th: "ยังไม่เปิด", en: "Not offered" },
  "electives.status.tba": { th: "รอประกาศ", en: "TBA" },
  "electives.status.always": { th: "เปิดทุกภาคการศึกษา", en: "Every term" },
  "electives.openInY3S1": { th: "เปิดสอน ปี 3 / เทอม 1", en: "Offered Y3 Sem 1" },
  "electives.openInY3S2": { th: "เปิดสอน ปี 3 / เทอม 2", en: "Offered Y3 Sem 2" },
  "electives.tabAll": { th: "ทั้งหมด", en: "All" },
  "electives.tabY3S1": { th: "ปี 3 เทอม 1", en: "Y3 Term 1" },
  "electives.tabY3S2": { th: "ปี 3 เทอม 2", en: "Y3 Term 2" },
  "electives.instructor": { th: "ผู้สอน", en: "Instructor" },
  "electives.prereqInfo": { th: "เงื่อนไขของรายวิชา", en: "Prerequisite" },
  "electives.allowEquivalent": { th: "หรือเทียบเท่า", en: "or equivalent" },
  "electives.source": {
    th: "อ้างอิงจากเอกสารหลักสูตร มคอ.2 / หน้าเอกสาร",
    en: "Per the official curriculum document (มคอ.2) / page",
  },
  "electives.empty": { th: "ยังไม่มีวิชาที่ตรงกับตัวกรอง", en: "No courses match the filter" },

  // ---------------------------------------------------------- source links
  "source.officialPdf": { th: "เอกสารหลักสูตรอย่างเป็นทางการ (PDF)", en: "Official Curriculum Document (PDF)" },
  "source.openCourses": { th: "รายวิชาที่เปิดสอน — วิทยาลัยการคอมพิวเตอร์", en: "Courses offered — College of Computing" },

  // ---------------------------------------------------------- drawer
  "drawer.prereqs": { th: "Prerequisite (วิชาที่ต้องผ่านก่อน)", en: "Prerequisites" },
  "drawer.dependents": { th: "วิชาที่ต่อจากวิชานี้", en: "Courses that depend on this" },
  "drawer.failImpact": { th: "ถ้าติด F วิชานี้", en: "If you fail this course" },
  "drawer.risk": { th: "ระดับความเสี่ยงต่อแผนเรียน", en: "Risk level to your study plan" },
  "drawer.description": { th: "คำอธิบายรายวิชา", en: "Course description" },
  "drawer.noPrereq": {
    th: "ไม่มี / ดูตามรายละเอียดที่หลักสูตรกำหนด",
    en: "None / see official curriculum",
  },
  "drawer.noDependents": {
    th: "ไม่มีวิชาในระบบที่ใช้วิชานี้เป็น prerequisite",
    en: "No courses in the system require this as a prerequisite",
  },
  "drawer.disclaimer": {
    th: "ข้อมูลนี้จัดทำเพื่อช่วยวางแผนเบื้องต้น โปรดตรวจสอบกับอาจารย์ที่ปรึกษาและประกาศของหลักสูตรก่อนลงทะเบียนจริง",
    en: "Preliminary planning info — confirm with your advisor and official announcements before registering.",
  },

  // ------------------------------------------------------ schedule planner
  "schedule.title": { th: "จัดตารางเรียน", en: "Course Schedule Planner" },
  "schedule.desc": {
    th: "วางแผนตารางเรียน ค้นหารายวิชา ลากวาง ปรับเวลา และส่งออกเป็น PDF ได้อย่างยืดหยุ่น",
    en: "Plan your timetable — search courses, drag & drop, adjust times, and export to PDF.",
  },
  "schedule.guideline": {
    th: "หมายเหตุ: ข้อมูลตัวอย่างในตารางสร้างจากภาพตารางเรียนแบบ Traditional ที่ผู้ใช้อัปโหลด เพื่อใช้เป็น guideline เท่านั้น ควรแทนที่ด้วยข้อมูลจริงจากระบบรายวิชา",
    en: "Note: Sample blocks are reconstructed from the uploaded traditional timetable images for guideline/demo only — replace with real course-registration data.",
  },
  "schedule.add": { th: "เพิ่ม", en: "Add" },
  "schedule.edit": { th: "แก้ไข", en: "Edit" },
  "schedule.delete": { th: "ลบ", en: "Delete" },
  "schedule.save": { th: "บันทึก", en: "Save" },
  "schedule.cancel": { th: "ยกเลิก", en: "Cancel" },
  "schedule.close": { th: "ปิด", en: "Close" },
  "schedule.conflictBadge": { th: "ชนกัน", en: "Conflict" },

  "schedule.empty.title": { th: "ยังไม่มีรายวิชาในตาราง", en: "No courses on the schedule yet" },
  "schedule.empty.desc": {
    th: "ค้นหารายวิชาจากแผงด้านซ้าย แล้วกด ‘เพิ่ม’ หรือลากวิชามาวางในตารางเพื่อเริ่มต้น",
    en: "Search courses in the panel, then click ‘Add’ or drag a course onto the grid to begin.",
  },

  "schedule.edit.title": { th: "แก้ไขรายวิชาในตาราง", en: "Edit schedule item" },
  "schedule.field.code": { th: "รหัสวิชา", en: "Course code" },
  "schedule.field.section": { th: "กลุ่ม", en: "Group" },
  "schedule.field.title": { th: "ชื่อวิชา", en: "Title" },
  "schedule.field.day": { th: "วัน", en: "Day" },
  "schedule.field.start": { th: "เวลาเริ่ม", en: "Start" },
  "schedule.field.end": { th: "เวลาสิ้นสุด", en: "End" },
  "schedule.field.room": { th: "ห้องเรียน", en: "Room" },
  "schedule.field.building": { th: "อาคาร", en: "Building" },
  "schedule.field.credits": { th: "หน่วยกิต", en: "Credits" },
  "schedule.field.instructor": { th: "อาจารย์ผู้สอน", en: "Instructor" },
  "schedule.field.color": { th: "สีประจำวิชา", en: "Colour" },
  "schedule.field.note": { th: "หมายเหตุ", en: "Note" },
  "schedule.field.year": { th: "ปีการศึกษา", en: "Academic year" },
  "schedule.field.dateRange": { th: "ช่วงวันที่เรียน", en: "Date range" },

  "schedule.search.title": { th: "ค้นหารายวิชา", en: "Search courses" },
  "schedule.search.label": { th: "ค้นหารายวิชา", en: "Search courses" },
  "schedule.search.placeholder": {
    th: "รหัสวิชา ชื่อวิชา หมวด อาจารย์ ห้อง...",
    en: "Code, name, category, instructor, room...",
  },
  "schedule.search.clear": { th: "ล้างคำค้น", en: "Clear search" },
  "schedule.search.count": { th: "พบ {n} รายการ", en: "{n} results" },
  "schedule.search.hint": { th: "กด ‘เพิ่ม’ หรือลากเข้าตาราง", en: "Click ‘Add’ or drag onto the grid" },
  "schedule.search.empty": { th: "ไม่พบรายวิชาที่ตรงกับคำค้น", en: "No courses match your search" },

  "schedule.tool.search": { th: "ค้นหา", en: "Search" },
  "schedule.tool.scale": { th: "ช่อง", en: "Scale" },
  "schedule.tool.endTime": { th: "สิ้นสุด", en: "End" },
  "schedule.tool.view": { th: "มุมมอง", en: "View" },
  "schedule.tool.undo": { th: "ย้อนกลับ (Undo)", en: "Undo" },
  "schedule.tool.redo": { th: "ทำซ้ำ (Redo)", en: "Redo" },
  "schedule.tool.clear": { th: "ล้างตาราง", en: "Clear schedule" },
  "schedule.tool.save": { th: "บันทึกฉบับร่าง", en: "Save draft" },
  "schedule.tool.load": { th: "โหลดที่บันทึกไว้", en: "Load saved" },
  "schedule.tool.exportJson": { th: "ส่งออก JSON", en: "Export JSON" },
  "schedule.tool.print": { th: "พิมพ์", en: "Print" },
  "schedule.tool.exportPdf": { th: "ส่งออก PDF", en: "Export PDF" },
  "schedule.tool.exportPdfHint": {
    th: "เปิดหน้าต่างพิมพ์ แล้วเลือก ‘บันทึกเป็น PDF’",
    en: "Opens the print dialog — choose ‘Save as PDF’",
  },

  "schedule.view.traditional": { th: "ตารางดั้งเดิม", en: "Traditional" },
  "schedule.view.modern": { th: "การ์ดสมัยใหม่", en: "Modern Card" },
  "schedule.view.compact": { th: "กระชับ", en: "Compact" },

  "schedule.stat.courses": { th: "รายวิชา", en: "Courses" },
  "schedule.stat.credits": { th: "หน่วยกิต", en: "Credits" },
  "schedule.stat.hours": { th: "ชม./สัปดาห์", en: "Hrs/week" },
  "schedule.stat.conflicts": { th: "เวลาชนกัน", en: "Conflicts" },

  "schedule.conflict.found": {
    th: "พบวิชาเวลาชนกัน {n} คู่ — ตรวจสอบรายการที่มีกรอบสีแดง",
    en: "Found {n} time conflict(s) — check the red-outlined blocks",
  },
  "schedule.conflict.none": {
    th: "ไม่มีเวลาชนกัน ✓ ตารางเรียบร้อย",
    en: "No time conflicts ✓ Schedule looks good",
  },

  "schedule.confirm.clear": {
    th: "ต้องการล้างรายวิชาทั้งหมดในเทอมนี้หรือไม่? (กด Undo เพื่อเรียกคืนได้)",
    en: "Clear all courses for this term? (You can Undo afterwards.)",
  },
  "schedule.toast.saved": { th: "บันทึกฉบับร่างแล้ว", en: "Draft saved" },
  "schedule.toast.saveErr": { th: "บันทึกไม่สำเร็จ", en: "Could not save" },
  "schedule.toast.noSaved": { th: "ไม่พบฉบับร่างที่บันทึกไว้", en: "No saved draft found" },
  "schedule.toast.loaded": { th: "โหลดตารางที่บันทึกไว้แล้ว", en: "Loaded saved schedule" },
  "schedule.toast.exportErr": { th: "ส่งออก JSON ไม่สำเร็จ", en: "Could not export JSON" },
  "schedule.toast.printErr": {
    th: "ไม่สามารถเปิดหน้าต่างพิมพ์ได้ ลองใช้เมนูพิมพ์ของเบราว์เซอร์",
    en: "Couldn't open print dialog — use your browser's Print menu",
  },

  // -------------------------------------------------------- nav (new hubs)
  "nav.journey": { th: "เส้นทาง 4 ปี", en: "Journey" },
  "nav.resources": { th: "เอกสาร", en: "Resources" },
  "nav.opportunities": { th: "งานแข่ง/โอกาส", en: "Opportunities" },
  "nav.more": { th: "เพิ่มเติม", en: "More" },
  "nav.group.tools": { th: "เครื่องมือวางแผน", en: "Planning tools" },
  "nav.group.program": { th: "เกี่ยวกับหลักสูตร", en: "About the program" },

  // ----------------------------------------------------- shared (new bits)
  "common.viewDetail": { th: "ดูรายละเอียด", en: "View details" },
  "common.download": { th: "ดาวน์โหลด", en: "Download" },
  "common.open": { th: "เปิดดู", en: "Open" },
  "common.openLink": { th: "เปิดลิงก์", en: "Open link" },
  "common.clearFilters": { th: "ล้างตัวกรอง", en: "Clear filters" },
  "common.all": { th: "ทั้งหมด", en: "All" },
  "common.allSemesters": { th: "ทุกเทอม", en: "All terms" },
  "common.year1": { th: "ปี 1", en: "Year 1" },
  "common.year2": { th: "ปี 2", en: "Year 2" },
  "common.year3": { th: "ปี 3", en: "Year 3" },
  "common.year4": { th: "ปี 4", en: "Year 4" },
  "common.placeholder": { th: "ตัวอย่าง — ยังไม่มีไฟล์จริง", en: "Placeholder — no file yet" },
  "common.verifyAnnouncement": {
    th: "ควรตรวจสอบประกาศล่าสุดจากผู้จัด",
    en: "Verify the latest announcement from the organizer",
  },
  "common.disclaimerJourney": {
    th: "ข้อมูลในหน้านี้จัดทำเพื่อช่วยวางแผนการเรียนและรวบรวมแหล่งข้อมูลเบื้องต้น นักศึกษาควรตรวจสอบประกาศล่าสุดจากหลักสูตร วิทยาลัย และมหาวิทยาลัย รวมถึงปรึกษาอาจารย์ที่ปรึกษาก่อนตัดสินใจด้านการลงทะเบียน สหกิจ WIL หรือการยื่นเอกสารสำคัญ",
    en: "This page is a preliminary planning and resource guide. Always check the latest announcements from the program, college, and university, and consult your academic advisor before any decision on registration, co-op, WIL, or submitting important documents.",
  },

  // --------------------------------------------------------------- journey
  "journey.kicker": { th: "Undergraduate Journey", en: "Undergraduate Journey" },
  "journey.title": {
    th: "เส้นทางการเติบโตของนักศึกษาไซเบอร์",
    en: "Cybersecurity Undergraduate Journey",
  },
  "journey.subtitle": {
    th: "ตั้งแต่ปี 1 ถึงปี 4 — แต่ละเทอมควรเรียนรู้อะไร เตรียมเอกสารอะไร เข้าร่วมกิจกรรมอะไร และสร้าง portfolio อย่างไร",
    en: "From Year 1 to Year 4 — what to learn, which documents to prepare, what to join, and how to build your portfolio each term.",
  },
  "journey.view": { th: "มุมมอง", en: "View" },
  "journey.view.timeline": { th: "ไทม์ไลน์", en: "Timeline" },
  "journey.view.card": { th: "การ์ด", en: "Cards" },
  "journey.view.checklist": { th: "เช็กลิสต์", en: "Checklist" },
  "journey.view.roadmap": { th: "โรดแมป", en: "Roadmap" },
  "journey.year": { th: "ปีที่", en: "Year" },
  "journey.term": { th: "เทอม", en: "Sem" },
  "journey.theme": { th: "ธีมของเทอม", en: "Term theme" },
  "journey.openTerm": { th: "เปิดเทอมนี้", en: "Open this term" },
  "journey.backToJourney": { th: "กลับสู่ภาพรวมเส้นทาง", en: "Back to journey overview" },
  "journey.prevTerm": { th: "เทอมก่อนหน้า", en: "Previous term" },
  "journey.nextTerm": { th: "เทอมถัดไป", en: "Next term" },
  "journey.section.focus": { th: "จุดเน้นการเรียน", en: "Academic focus" },
  "journey.section.courses": { th: "รายวิชาในเทอมนี้", en: "Courses this term" },
  "journey.section.skills": { th: "ทักษะที่ควรได้", en: "Skills to build" },
  "journey.section.documents": { th: "เอกสารที่เกี่ยวข้อง", en: "Related documents" },
  "journey.section.competitions": { th: "งานแข่ง/โอกาสที่แนะนำ", en: "Recommended opportunities" },
  "journey.section.portfolio": { th: "เป้าหมาย Portfolio", en: "Portfolio goals" },
  "journey.section.checklist": { th: "เช็กลิสต์ก่อนจบเทอม", en: "End-of-term checklist" },
  "journey.section.warnings": { th: "สิ่งที่ต้องระวัง", en: "Watch out for" },
  "journey.section.advisor": { th: "คำแนะนำจากอาจารย์/หลักสูตร", en: "Advisor notes" },
  "journey.section.tips": { th: "ทิปจากรุ่นพี่", en: "Tips from seniors" },
  "journey.checklist.progress": { th: "ความคืบหน้า", en: "Progress" },
  "journey.checklist.note": {
    th: "เช็กลิสต์นี้บันทึกในเบราว์เซอร์ของคุณเท่านั้น",
    en: "This checklist is saved in your browser only.",
  },
  "journey.required": { th: "สำคัญ", en: "Key" },
  "journey.noCourses": { th: "รายวิชาขึ้นกับเส้นทางที่เลือก — ดูใน Study Plan", en: "Courses depend on your track — see Study Plan" },
  "journey.cta.title": { th: "พร้อมเริ่มเทอมนี้แล้วหรือยัง?", en: "Ready for this term?" },

  // -------------------------------------------------------------- resources
  "resources.kicker": { th: "Resource Hub", en: "Resource Hub" },
  "resources.title": { th: "ศูนย์รวมเอกสารนักศึกษา", en: "Student Resource Hub" },
  "resources.desc": {
    th: "รวมเอกสารหลักสูตร แบบฟอร์ม คู่มือ และเทมเพลตสำคัญไว้ที่เดียว ค้นหาและกรองตามหมวด ชั้นปี และสถานะได้",
    en: "Curriculum documents, forms, guides, and templates in one place — search and filter by category, year, and status.",
  },
  "resources.searchPlaceholder": {
    th: "ค้นหาเอกสาร เช่น สหกิจ, resume, ลงทะเบียน...",
    en: "Search resources e.g. co-op, resume, registration...",
  },
  "resources.count": { th: "พบ {n} เอกสาร", en: "{n} resources" },
  "resources.empty": { th: "ไม่พบเอกสารที่ตรงกับเงื่อนไข", en: "No resources match your filters" },
  "resources.filter.category": { th: "หมวดเอกสาร", en: "Category" },
  "resources.filter.status": { th: "สถานะ", en: "Status" },
  "resources.allCategories": { th: "ทุกหมวด", en: "All categories" },
  "resources.allStatus": { th: "ทุกสถานะ", en: "All statuses" },
  "resources.updated": { th: "อัปเดต", en: "Updated" },
  "resources.status.official": { th: "ทางการ", en: "Official" },
  "resources.status.recommended": { th: "แนะนำ", en: "Recommended" },
  "resources.status.draft": { th: "ฉบับร่าง", en: "Draft" },
  "resources.status.needs-update": { th: "ต้องอัปเดต", en: "Needs update" },
  "resources.cat.curriculum": { th: "เอกสารหลักสูตร", en: "Curriculum" },
  "resources.cat.registration": { th: "การลงทะเบียน", en: "Registration" },
  "resources.cat.project": { th: "โครงงาน", en: "Project" },
  "resources.cat.coop": { th: "สหกิจศึกษา", en: "Co-op" },
  "resources.cat.wil": { th: "WIL", en: "WIL" },
  "resources.cat.internship": { th: "ฝึกงาน", en: "Internship" },
  "resources.cat.scholarship": { th: "ทุนการศึกษา", en: "Scholarship" },
  "resources.cat.form": { th: "แบบฟอร์ม/คำร้อง", en: "Forms" },
  "resources.cat.portfolio": { th: "Portfolio/Resume", en: "Portfolio/Resume" },
  "resources.cat.certification": { th: "Certification", en: "Certification" },
  "resources.cat.activity": { th: "กิจกรรม", en: "Activities" },
  "resources.cat.faq": { th: "คำถามที่พบบ่อย", en: "FAQ" },
  "resources.cat.other": { th: "อื่น ๆ", en: "Other" },

  // ----------------------------------------------------------- opportunities
  "opps.kicker": { th: "Opportunity Hub", en: "Opportunity Hub" },
  "opps.title": { th: "ศูนย์รวมงานแข่งและโอกาส", en: "Competitions & Opportunities" },
  "opps.desc": {
    th: "รวมงานแข่ง CTF แฮกกาธอน ทุน ฝึกงาน และโอกาสพัฒนาตัวเองสำหรับเด็กไซเบอร์ กรองตามชั้นปี ประเภท และระดับความยากได้",
    en: "CTFs, hackathons, scholarships, internships, and growth opportunities for cybersecurity students — filter by year, type, and difficulty.",
  },
  "opps.searchPlaceholder": {
    th: "ค้นหางาน เช่น CTF, hackathon, ทุน, AWS...",
    en: "Search e.g. CTF, hackathon, scholarship, AWS...",
  },
  "opps.count": { th: "พบ {n} รายการ", en: "{n} opportunities" },
  "opps.empty": { th: "ไม่พบรายการที่ตรงกับเงื่อนไข", en: "No opportunities match your filters" },
  "opps.filter.type": { th: "ประเภท", en: "Type" },
  "opps.filter.difficulty": { th: "ระดับความยาก", en: "Difficulty" },
  "opps.filter.status": { th: "สถานะ", en: "Status" },
  "opps.allTypes": { th: "ทุกประเภท", en: "All types" },
  "opps.allDifficulty": { th: "ทุกระดับ", en: "All levels" },
  "opps.allStatus": { th: "ทุกสถานะ", en: "All statuses" },
  "opps.deadline": { th: "กำหนดส่ง", en: "Deadline" },
  "opps.period": { th: "ช่วงเวลา", en: "Usual period" },
  "opps.apply": { th: "สมัคร / ดูข้อมูล", en: "Apply / info" },
  "opps.relatedSkills": { th: "ทักษะที่เกี่ยวข้อง", en: "Related skills" },
  "opps.relatedCourses": { th: "วิชาที่เกี่ยวข้อง", en: "Related courses" },
  "opps.badge.team": { th: "ต้องมีทีม", en: "Team required" },
  "opps.badge.portfolio": { th: "เก็บเข้าพอร์ตได้", en: "Portfolio worthy" },
  "opps.badge.beginner": { th: "เหมาะมือใหม่", en: "Beginner friendly" },
  "opps.diff.beginner": { th: "เริ่มต้น", en: "Beginner" },
  "opps.diff.intermediate": { th: "ขั้นกลาง", en: "Intermediate" },
  "opps.diff.advanced": { th: "ขั้นสูง", en: "Advanced" },
  "opps.diff.mixed": { th: "ผสม", en: "Mixed" },
  "opps.status.upcoming": { th: "กำลังจะมา", en: "Upcoming" },
  "opps.status.open": { th: "เปิดรับ", en: "Open" },
  "opps.status.closed": { th: "ปิดรับ", en: "Closed" },
  "opps.status.annual": { th: "จัดประจำปี", en: "Annual" },
  "opps.status.archived": { th: "จบไปแล้ว", en: "Archived" },
  "opps.type.ctf": { th: "CTF", en: "CTF" },
  "opps.type.hackathon": { th: "Hackathon", en: "Hackathon" },
  "opps.type.competition": { th: "การแข่งขัน", en: "Competition" },
  "opps.type.programming": { th: "เขียนโปรแกรม", en: "Programming" },
  "opps.type.network": { th: "เครือข่าย", en: "Network" },
  "opps.type.cloud": { th: "คลาวด์", en: "Cloud" },
  "opps.type.research": { th: "วิจัย/นวัตกรรม", en: "Research" },
  "opps.type.startup": { th: "สตาร์ทอัพ", en: "Startup" },
  "opps.type.scholarship": { th: "ทุน", en: "Scholarship" },
  "opps.type.internship": { th: "ฝึกงาน", en: "Internship" },
  "opps.type.bootcamp": { th: "ฝึก/บูทแคมป์", en: "Training" },
  "opps.type.certification": { th: "Certification", en: "Certification" },
  "opps.type.conference": { th: "คอนเฟอเรนซ์", en: "Conference" },
  "opps.type.seminar": { th: "สัมมนา", en: "Seminar" },
  "opps.type.other": { th: "อื่น ๆ", en: "Other" },

  // ----------------------------------------------------------- skill levels
  "skill.level.foundation": { th: "พื้นฐาน", en: "Foundation" },
  "skill.level.developing": { th: "กำลังพัฒนา", en: "Developing" },
  "skill.level.applied": { th: "ประยุกต์ใช้", en: "Applied" },
  "skill.level.advanced": { th: "ขั้นสูง", en: "Advanced" },

  // ------------------------------------------------------------- home promo
  "home.cta.journey": { th: "เส้นทาง 4 ปี", en: "4-Year Journey" },
  "home.journey.kicker": { th: "Undergraduate Journey", en: "Undergraduate Journey" },
  "home.journey.title": {
    th: "เส้นทาง 4 ปีของเด็กไซเบอร์",
    en: "The 4-Year Cybersecurity Journey",
  },
  "home.journey.desc": {
    th: "ไม่ใช่แค่ตารางเรียน — แต่เป็นแผนที่บอกว่าแต่ละเทอมควรเรียนรู้อะไร เตรียมเอกสารอะไร ลงแข่งอะไร และสร้างพอร์ตอย่างไร ตั้งแต่วันแรกจนวันรับปริญญา",
    en: "More than a timetable — a map of what to learn, prepare, compete in, and build each term, from day one to graduation.",
  },
  "home.journey.cta": { th: "ดูเส้นทางทั้ง 4 ปี", en: "Explore the journey" },
  "home.journey.yearN": { th: "ปีที่ {n}", en: "Year {n}" },
  "home.hub.kicker": { th: "Resource & Opportunity Hub", en: "Resource & Opportunity Hub" },
  "home.hub.title": { th: "เอกสารและงานแข่ง รวมไว้ที่เดียว", en: "Documents & competitions, all in one place" },
  "home.hub.resources.title": { th: "ศูนย์รวมเอกสาร", en: "Resource Hub" },
  "home.hub.resources.desc": {
    th: "เอกสารหลักสูตร แบบฟอร์ม คู่มือ และเทมเพลต portfolio/resume",
    en: "Curriculum docs, forms, guides, and portfolio/resume templates.",
  },
  "home.hub.opps.title": { th: "งานแข่งและโอกาส", en: "Competitions & Opportunities" },
  "home.hub.opps.desc": {
    th: "CTF แฮกกาธอน ทุน ฝึกงาน และ certification ที่ควรรู้ในแต่ละชั้นปี",
    en: "CTFs, hackathons, scholarships, internships, and certs by year.",
  },
  "home.why.kicker": { th: "ทำไมต้อง Cybersecurity ที่ มข.", en: "Why Cybersecurity at KKU" },
  "home.why.title": { th: "เรียนจริง ลงมือจริง พร้อมทำงานจริง", en: "Learn it, build it, be job-ready" },
  "home.why.handsOn.title": { th: "เรียนรู้แบบลงมือทำ", en: "Hands-on learning" },
  "home.why.handsOn.desc": {
    th: "ฝึกผ่านแล็บ CTF และโปรเจกต์จริงตั้งแต่ปีต้น ๆ",
    en: "Labs, CTFs, and real projects from the early years.",
  },
  "home.why.pathways.title": { th: "Project · Co-op · WIL", en: "Project · Co-op · WIL" },
  "home.why.pathways.desc": {
    th: "เลือกเส้นทางปี 4 ที่เหมาะกับเป้าหมายอาชีพของคุณ",
    en: "Choose a Year-4 track that fits your career goals.",
  },
  "home.why.career.title": { th: "พร้อมสู่สายอาชีพ", en: "Career readiness" },
  "home.why.career.desc": {
    th: "สร้าง portfolio, certification และประสบการณ์จริงก่อนเรียนจบ",
    en: "Build a portfolio, certifications, and real experience before graduating.",
  },
};

export function t(key: string, locale: Locale): string {
  const e = dict[key];
  if (!e) return key;
  return e[locale];
}
