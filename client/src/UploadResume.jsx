import { useState } from "react";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [jobUrl, setJobUrl] = useState("");

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile || null);
    setStatus(selectedFile ? "uploaded" : "idle");
  }

  async function handleUpload() {
    if (!file || !jobUrl) return;

    setStatus("uploading");
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobUrl", jobUrl);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("error");
    }
  }

  const statusMessages = {
    uploading: "Analyzing your resume…",
    success: "Analysis complete — your results are ready.",
    error: "Something went wrong. Please try again.",
  };

  return (
    <div className="upload-form">
      <div className="field-group">
        <label className="field-label" htmlFor="resume-file">Resume</label>
        <label className={`drop-zone ${file ? "has-file" : ""}`} htmlFor="resume-file">
          <input
            id="resume-file"
            className="file-input"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <span className="upload-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 002 2h10a2 2 0 002-2v-4" />
            </svg>
          </span>
          <span className="drop-copy">
            <strong>{file ? file.name : "Choose a file to upload"}</strong>
            <small>{file ? "Ready to analyze" : "PDF, DOC, or DOCX · Max 10 MB"}</small>
          </span>
          <span className="browse-button">{file ? "Change" : "Browse"}</span>
        </label>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="job-url">Job posting URL</label>
        <div className="url-field">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10.6 13.4a4 4 0 005.7.1l2.2-2.2a4 4 0 00-5.7-5.7l-1.2 1.2m1.8 3.8a4 4 0 00-5.7-.1l-2.2 2.2a4 4 0 005.7 5.7l1.2-1.2" />
          </svg>
          <input
            id="job-url"
            type="url"
            placeholder="https://company.com/jobs/role"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
          />
        </div>
      </div>

      <button
        className="analyze-button"
        onClick={handleUpload}
        disabled={!file || !jobUrl || status === "uploading"}
      >
        {status === "uploading" ? <span className="spinner" aria-hidden="true" /> : null}
        {status === "uploading" ? "Analyzing…" : "Analyze my resume"}
        {status !== "uploading" && <span aria-hidden="true">&rarr;</span>}
      </button>

      {statusMessages[status] && (
        <p className={`status-message ${status}`} role="status">
          {statusMessages[status]}
        </p>
      )}
    </div>
  );
}
