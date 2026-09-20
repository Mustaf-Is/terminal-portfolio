from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "mustafe-ismajli-resume.pdf"
INK = colors.HexColor("#152033")
TEAL = colors.HexColor("#0F766E")
MUTED = colors.HexColor("#526174")
LINE = colors.HexColor("#C7D4DF")


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(14 * mm, 8 * mm, 196 * mm, 8 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(14 * mm, 4.5 * mm, "Mustafe Ismajli - Software Engineer")
    canvas.drawRightString(196 * mm, 4.5 * mm, f"Page {doc.page}")
    canvas.restoreState()


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, rightMargin=14 * mm, leftMargin=14 * mm,
        topMargin=9 * mm, bottomMargin=11 * mm,
        title="Mustafe Ismajli - Resume", author="Mustafe Ismajli",
        subject="Software Engineer resume",
    )
    styles = getSampleStyleSheet()
    name = ParagraphStyle("Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=20, leading=22, textColor=INK, alignment=TA_CENTER, spaceAfter=2)
    role = ParagraphStyle("Role", parent=styles["Normal"], fontName="Helvetica", fontSize=9.2, leading=11, textColor=TEAL, alignment=TA_CENTER, spaceAfter=2)
    contact = ParagraphStyle("Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=7.8, leading=9.5, textColor=MUTED, alignment=TA_CENTER, spaceAfter=6)
    section = ParagraphStyle("Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=10.2, leading=11.5, textColor=TEAL, spaceBefore=5, spaceAfter=2.5)
    body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.2, leading=10.1, textColor=INK, spaceAfter=2)
    job = ParagraphStyle("Job", parent=body, fontName="Helvetica-Bold", fontSize=8.7, leading=10.2, spaceAfter=1)
    right = ParagraphStyle("Right", parent=body, alignment=TA_RIGHT, textColor=MUTED)
    bullet = ParagraphStyle("Bullet", parent=body, leftIndent=9, firstLineIndent=-6, bulletIndent=0, spaceAfter=1.2)

    story = [
        Paragraph("Mustafë Ismajli", name),
        Paragraph("Software Engineer | Backend Systems, Automation &amp; Python", role),
        Paragraph(
            '<link href="mailto:ismajlim26@gmail.com" color="#0F766E">ismajlim26@gmail.com</link>'
            ' &nbsp; | &nbsp; Kosovo &nbsp; | &nbsp; '
            '<link href="https://github.com/Mustaf-Is" color="#0F766E">github.com/Mustaf-Is</link>'
            ' &nbsp; | &nbsp; '
            '<link href="https://www.linkedin.com/in/mustaf%C3%AB-ismajli-99b54b318/" color="#0F766E">LinkedIn</link>',
            contact,
        ),
        Paragraph("PROFILE", section),
        Paragraph("Software engineer experienced in APIs, web scraping, backend integrations, data pipelines, system automation, and practical AI workflows. I build maintainable software that turns messy real-world processes into reliable systems while continuing to deepen my Python expertise.", body),
        Paragraph("EXPERIENCE", section),
        KeepTogether([
            Paragraph("Software Engineer I - Radix Inc. <font color='#526174'>| September 2025 - Present</font>", job),
            Paragraph("- Develop and deploy web scrapers that extract, clean, and integrate large-scale data from diverse sources.", bullet),
            Paragraph("- Engineer data pipelines that automate ingestion workflows, reduce manual effort, and accelerate data refresh cycles.", bullet),
            Paragraph("- Implement AI-assisted data categorization and clustering workflows using OpenAI models.", bullet),
            Paragraph("- Develop APIs and backend product features with Node.js and TypeScript.", bullet),
        ]),
        Spacer(1, 2),
        KeepTogether([
            Paragraph("Software Engineer Intern - Radix Inc. <font color='#526174'>| April 2025 - August 2025</font>", job),
            Paragraph("- Developed RESTful and GraphQL APIs with Node.js and MongoDB for scalable web applications.", bullet),
            Paragraph("- Implemented unit tests for services, mappers, and controllers to improve reliability and maintainability.", bullet),
            Paragraph("- Collaborated in an eight-person cross-functional team using Scrum, Kanban, and Jira.", bullet),
        ]),
        Paragraph("TECHNICAL SKILLS", section),
        Paragraph("<b>Backend &amp; automation:</b> Python, Node.js, TypeScript, Express.js, Java, Spring Boot, REST, GraphQL, web scraping, data pipelines", body),
        Paragraph("<b>Data &amp; infrastructure:</b> MongoDB, MySQL, RabbitMQ, Docker, Azure, Git, GitHub", body),
        Paragraph("<b>Frontend:</b> React, JavaScript, HTML, CSS, Tailwind CSS, Bootstrap", body),
        Paragraph("<b>Quality &amp; workflow:</b> Unit testing, Jest, Jira, Scrum, Kanban", body),
        Paragraph("EDUCATION", section),
        KeepTogether([
            Paragraph("<b>University of Pristina</b> - B.S. Computer Science", body),
            Paragraph("2022 - 2025 | GPA: 9.11/10", right),
            Paragraph("<b>Skënderbeu High School</b> - High School Diploma", body),
            Paragraph("2019 - 2022 | GPA: 5.0/5.0", right),
        ]),
        Paragraph("COURSEWORK", section),
        KeepTogether([
            Paragraph("<b>Front-End Development - Cacttus Education</b>", job),
            Paragraph("May 2022 - July 2022", right),
            Paragraph("Built foundational web-development skills in HTML, CSS, JavaScript, and responsive layout design.", body),
        ]),
        Spacer(1, 2),
        KeepTogether([
            Paragraph("<b>Web Development Professional - ICT for Kosovo's Growth</b>", job),
            Paragraph("October 2024 - January 2025", right),
            Paragraph("Studied HTML, CSS, Bootstrap, JavaScript, jQuery, responsive development, and UX/UI design with Figma.", body),
        ]),
        Paragraph("HACKATHONS", section),
        KeepTogether([
            Paragraph("<b>Data Hackathon - Raiffeisen Bank</b> <font color='#526174'>| November 2024</font>", job),
            Paragraph("- Collaborated on a real-time ingestion pipeline and ETL workflow using online weather data to extract features for weekly weather prediction.", bullet),
        ]),
        Spacer(1, 2),
        KeepTogether([
            Paragraph("<b>AI Hackathon - JunctionX ITP Prizren</b> <font color='#526174'>| May 2025</font>", job),
            Paragraph("- Co-developed CivicPulse, a platform for citizen suggestions and voting that helps prioritize improvements to digital public services.", bullet),
        ]),
        Paragraph("LANGUAGES", section),
        Paragraph("Albanian - Native &nbsp;&nbsp; | &nbsp;&nbsp; English - Proficient", body),
        Paragraph("INTERESTS", section),
        Paragraph("Artificial intelligence, applied mathematics, hackathons, traveling, and sports", body),
    ]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUTPUT)


if __name__ == "__main__":
    build()
