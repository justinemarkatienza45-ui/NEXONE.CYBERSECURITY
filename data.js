window.NEXONE_COURSES = [
  {
    id: "cyber-foundations",
    title: "Cybersecurity Foundations",
    subtitle: "Build a strong security mindset and understand the modern threat landscape.",
    category: "Fundamentals",
    level: "Beginner",
    duration: "8 hours",
    lessons: 12,
    rating: 4.9,
    students: 12840,
    price: 799,
    badge: "Best seller",
    image: "assets/course-foundations.png",
    outcomes: [
      "Explain core cybersecurity concepts and common attack paths.",
      "Use risk, threat, vulnerability, and control terminology correctly.",
      "Identify phishing, malware, password, and social engineering risks.",
      "Apply practical security habits for devices, accounts, and networks."
    ],
    modules: [
      { title: "Security fundamentals", lessons: ["The security mindset", "Threats, vulnerabilities, and risk", "The CIA triad"] },
      { title: "Everyday attacks", lessons: ["Phishing and social engineering", "Malware and ransomware", "Credential attacks"] },
      { title: "Defensive basics", lessons: ["Secure authentication", "Endpoint hygiene", "Network safety"] },
      { title: "Career and practice", lessons: ["Security roles", "Ethics and responsible use", "Final knowledge check"] }
    ]
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Essentials",
    subtitle: "Learn authorized security testing through safe labs, reporting, and remediation.",
    category: "Offensive Security",
    level: "Intermediate",
    duration: "16 hours",
    lessons: 18,
    rating: 4.8,
    students: 8910,
    price: 1499,
    badge: "Popular",
    image: "assets/course-ethical.png",
    outcomes: [
      "Plan and scope an authorized penetration test.",
      "Perform safe reconnaissance and vulnerability validation.",
      "Document evidence without exposing sensitive data.",
      "Write actionable findings with business-focused remediation."
    ],
    modules: [
      { title: "Rules of engagement", lessons: ["Authorization and scope", "Testing methodology", "Evidence handling"] },
      { title: "Discovery", lessons: ["Passive reconnaissance", "Service enumeration", "Attack surface mapping"] },
      { title: "Validation", lessons: ["Vulnerability triage", "Safe exploitation concepts", "Privilege boundaries"] },
      { title: "Reporting", lessons: ["Risk ratings", "Writing findings", "Executive summaries"] },
      { title: "Capstone", lessons: ["Lab briefing", "Assessment lab", "Remediation review", "Final assessment"] }
    ]
  },
  {
    id: "soc-analyst",
    title: "SOC Analyst Career Path",
    subtitle: "Investigate alerts, analyze logs, and communicate incidents like a Tier 1 analyst.",
    category: "Blue Team",
    level: "Beginner",
    duration: "22 hours",
    lessons: 24,
    rating: 4.9,
    students: 7350,
    price: 1799,
    badge: "Career path",
    image: "assets/course-soc.png",
    outcomes: [
      "Triage security alerts with a repeatable process.",
      "Read authentication, endpoint, DNS, and web logs.",
      "Map activity to attacker tactics and techniques.",
      "Escalate incidents with clear evidence and next steps."
    ],
    modules: [
      { title: "SOC operations", lessons: ["SOC roles and workflow", "Alert lifecycle", "Case management"] },
      { title: "Log analysis", lessons: ["Authentication logs", "DNS and proxy logs", "Endpoint telemetry", "Cloud audit logs"] },
      { title: "Investigation", lessons: ["Building a timeline", "Indicators and context", "False positive analysis"] },
      { title: "Response", lessons: ["Containment decisions", "Escalation notes", "Incident communication"] },
      { title: "Portfolio project", lessons: ["Investigation scenario", "Case report", "Final practical assessment"] }
    ]
  },
  {
    id: "web-security",
    title: "Web Application Security",
    subtitle: "Understand modern web vulnerabilities and build safer web applications.",
    category: "Application Security",
    level: "Intermediate",
    duration: "18 hours",
    lessons: 20,
    rating: 4.7,
    students: 6240,
    price: 1599,
    badge: "Hands-on",
    image: "assets/course-web.png",
    outcomes: [
      "Recognize common web application security flaws.",
      "Model trust boundaries, data flow, and abuse cases.",
      "Test input handling in a controlled lab environment.",
      "Recommend secure coding and verification controls."
    ],
    modules: [
      { title: "Web foundations", lessons: ["HTTP security basics", "Sessions and cookies", "Trust boundaries"] },
      { title: "Input and access", lessons: ["Injection concepts", "Cross-site scripting", "Access control failures"] },
      { title: "Application design", lessons: ["Authentication design", "Secure file handling", "API security"] },
      { title: "Testing and remediation", lessons: ["Test planning", "Evidence and severity", "Fix validation"] },
      { title: "Capstone", lessons: ["Threat model", "Secure review lab", "Final assessment"] }
    ]
  },
  {
    id: "cloud-security",
    title: "Cloud Security Fundamentals",
    subtitle: "Secure identities, workloads, storage, and logging across cloud environments.",
    category: "Cloud Security",
    level: "Intermediate",
    duration: "14 hours",
    lessons: 16,
    rating: 4.8,
    students: 5120,
    price: 1399,
    badge: "New",
    image: "assets/course-cloud.png",
    outcomes: [
      "Apply shared-responsibility thinking to cloud systems.",
      "Design least-privilege access and secure service accounts.",
      "Protect cloud storage, secrets, and network paths.",
      "Build useful audit logging and incident readiness."
    ],
    modules: [
      { title: "Cloud security model", lessons: ["Shared responsibility", "Cloud identities", "Regions and services"] },
      { title: "Secure architecture", lessons: ["Network segmentation", "Storage controls", "Secrets management"] },
      { title: "Monitoring", lessons: ["Audit logs", "Detection patterns", "Cloud incident triage"] },
      { title: "Governance", lessons: ["Policy as code", "Configuration review", "Final assessment"] }
    ]
  },
  {
    id: "digital-forensics",
    title: "Digital Forensics Basics",
    subtitle: "Preserve evidence, build timelines, and investigate digital activity responsibly.",
    category: "Digital Forensics",
    level: "Beginner",
    duration: "12 hours",
    lessons: 15,
    rating: 4.7,
    students: 3980,
    price: 1199,
    badge: "Certificate",
    image: "assets/course-forensics.png",
    outcomes: [
      "Explain evidence integrity and chain-of-custody principles.",
      "Build simple event timelines from multiple artifacts.",
      "Recognize useful endpoint and browser evidence sources.",
      "Document findings clearly and avoid unsupported conclusions."
    ],
    modules: [
      { title: "Forensic principles", lessons: ["Evidence integrity", "Chain of custody", "Investigation planning"] },
      { title: "Artifact review", lessons: ["File metadata", "Browser artifacts", "System events"] },
      { title: "Analysis", lessons: ["Timeline building", "Correlation", "Hypothesis testing"] },
      { title: "Reporting", lessons: ["Notes and screenshots", "Limitations", "Final report"] }
    ]
  }
];
