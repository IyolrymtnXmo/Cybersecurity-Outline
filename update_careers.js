const fs = require('fs');
const file = 'a:/Cybersecurity-Outline/data/careers.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const linksEn = {
  "cybersecurity-engineer": "https://www.cyberseek.org/pathway.html",
  "penetration-tester": "https://www.comptia.org/content/it-careers-path-roadmap/penetration-tester",
  "cybersecurity-analyst": "https://www.cyberseek.org/pathway.html",
  "cybersecurity-architect": "https://www.cyberseek.org/pathway.html",
  "cybersecurity-consultant": "https://www.cyberseek.org/pathway.html",
  "cybersecurity-manager": "https://www.cyberseek.org/pathway.html",
  "incident-responder": "https://www.cyberseek.org/pathway.html",
  "digital-forensics-investigator": "https://www.comptia.org/content/it-careers-path-roadmap/digital-forensics-investigator",
  "appsec-devsecops": "https://www.coursera.org/articles/application-security-engineer",
  "malware-analyst": "https://www.giac.org/certifications/reverse-engineering-malware-grem/",
  "cloud-security-engineer": "https://www.coursera.org/articles/cloud-security-engineer",
  "iam-engineer": "https://www.cyberseek.org/pathway.html",
  "soc-analyst": "https://www.comptia.org/content/it-careers-path-roadmap/security-operations-center-(soc)-analyst",
  "threat-intelligence-analyst": "https://www.comptia.org/content/it-careers-path-roadmap/threat-intelligence-analyst",
  "privacy-engineer": "https://iapp.org/certifications/cipt/",
  "iot-ot-security": "https://www.sans.org/cyber-security-courses/ics-scada-cyber-security-essentials/"
};

const linksTh = {
  "cybersecurity-engineer": "https://www.thnca.or.th/",
  "penetration-tester": "https://www.techtalkthai.com/tag/penetration-testing/",
  "cybersecurity-analyst": "https://www.ncsa.or.th/",
  "cybersecurity-architect": "https://www.thnca.or.th/",
  "cybersecurity-consultant": "https://www.ncsa.or.th/",
  "cybersecurity-manager": "https://www.ncsa.or.th/",
  "incident-responder": "https://www.thaicert.or.th/",
  "digital-forensics-investigator": "https://www.thaicert.or.th/",
  "appsec-devsecops": "https://www.techtalkthai.com/tag/devsecops/",
  "malware-analyst": "https://www.thaicert.or.th/",
  "cloud-security-engineer": "https://www.techtalkthai.com/tag/cloud-security/",
  "iam-engineer": "https://www.techtalkthai.com/tag/iam/",
  "soc-analyst": "https://www.techtalkthai.com/tag/soc/",
  "threat-intelligence-analyst": "https://www.thaicert.or.th/",
  "privacy-engineer": "https://www.techtalkthai.com/tag/pdpa/",
  "iot-ot-security": "https://www.techtalkthai.com/tag/iot-security/"
};

data.forEach(c => {
  c.referenceUrlEn = linksEn[c.id] || "https://www.cyberseek.org/pathway.html";
  c.referenceUrlTh = linksTh[c.id] || "https://www.thnca.or.th/";
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
