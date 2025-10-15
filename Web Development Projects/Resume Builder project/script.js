function generateResume() {
  document.getElementById("r-name").textContent = document.getElementById("name").value;
  document.getElementById("r-contact").textContent = document.getElementById("contact").value;
  document.getElementById("r-education").textContent = document.getElementById("education").value;
  document.getElementById("r-experience").textContent = document.getElementById("experience").value;
  document.getElementById("r-projects").textContent = document.getElementById("projects").value;
  document.getElementById("r-skills").textContent = document.getElementById("skills").value;
  document.getElementById("r-languages").textContent = document.getElementById("languages").value;
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p", "pt", "a4");
  doc.html(document.getElementById("resume-preview"), {
    callback: function (pdf) {
      pdf.save("resume.pdf");
    },
    margin: [20, 20, 20, 20],
    x: 10,
    y: 10,
    width: 500
  });
}
