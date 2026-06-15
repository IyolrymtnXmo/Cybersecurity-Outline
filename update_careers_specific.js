const fs = require('fs');
const file = 'a:/Cybersecurity-Outline/data/careers.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const linksEn = {
  "cybersecurity-engineer": "https://www.coursera.org/articles/cybersecurity-engineer",
  "penetration-tester": "https://www.coursera.org/articles/penetration-tester",
  "cybersecurity-analyst": "https://www.coursera.org/articles/cybersecurity-analyst-salary-guide-and-career-paths",
  "cybersecurity-architect": "https://www.coursera.org/articles/security-architect",
  "cybersecurity-consultant": "https://www.coursera.org/articles/security-consultant",
  "cybersecurity-manager": "https://www.coursera.org/articles/chief-information-security-officer",
  "incident-responder": "https://www.coursera.org/articles/incident-responder",
  "digital-forensics-investigator": "https://www.coursera.org/articles/computer-forensics-investigator",
  "appsec-devsecops": "https://www.coursera.org/articles/application-security-engineer",
  "malware-analyst": "https://www.giac.org/certifications/reverse-engineering-malware-grem/",
  "cloud-security-engineer": "https://www.coursera.org/articles/cloud-security-engineer",
  "iam-engineer": "https://www.cyberark.com/what-is/identity-and-access-management/",
  "soc-analyst": "https://www.coursera.org/articles/soc-analyst",
  "threat-intelligence-analyst": "https://www.crowdstrike.com/cybersecurity-101/threat-intelligence/",
  "privacy-engineer": "https://iapp.org/certifications/cipt/",
  "iot-ot-security": "https://www.sans.org/cyber-security-courses/ics-scada-cyber-security-essentials/"
};

const linksTh = {
  "cybersecurity-engineer": "https://blog.skooldio.com/cyber-security-career-path/",
  "penetration-tester": "https://www.techtalkthai.com/what-is-penetration-testing/",
  "cybersecurity-analyst": "https://www.techtalkthai.com/how-to-become-a-cybersecurity-analyst/",
  "cybersecurity-architect": "https://www.aware.co.th/it-security-architect/",
  "cybersecurity-consultant": "https://www.techtalkthai.com/security-consultant-career-path/",
  "cybersecurity-manager": "https://www.techtalkthai.com/5-skills-to-be-ciso/",
  "incident-responder": "https://www.thaicert.or.th/papers/general/2018/pa2018ge001.html",
  "digital-forensics-investigator": "https://www.techtalkthai.com/what-is-digital-forensics/",
  "appsec-devsecops": "https://www.techtalkthai.com/devsecops-concept-and-implementation/",
  "malware-analyst": "https://www.techtalkthai.com/basic-malware-analysis/",
  "cloud-security-engineer": "https://www.techtalkthai.com/cloud-security-best-practices/",
  "iam-engineer": "https://www.techtalkthai.com/what-is-iam-identity-and-access-management/",
  "soc-analyst": "https://www.techtalkthai.com/what-is-soc-security-operations-center/",
  "threat-intelligence-analyst": "https://www.techtalkthai.com/what-is-cyber-threat-intelligence/",
  "privacy-engineer": "https://www.techtalkthai.com/pdpa-for-it-and-cybersecurity/",
  "iot-ot-security": "https://www.techtalkthai.com/what-is-ot-security/"
};

data.forEach(c => {
  if (linksEn[c.id]) c.referenceUrlEn = linksEn[c.id];
  if (linksTh[c.id]) c.referenceUrlTh = linksTh[c.id];
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Update complete.');
