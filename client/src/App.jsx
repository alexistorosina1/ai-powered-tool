import UploadResume from "./UploadResume";

export default function App() {
  return (
    <main className="page-shell">
      <section className="resume-card" aria-labelledby="page-title">
        <div className="card-heading">
          <span className="eyebrow">AI resume review</span>
          <h1 id="page-title">Make your resume stand out.</h1>
          <p>
            Upload your resume and add the role you’re targeting. We’ll analyze
            the match and surface practical ways to improve it.
          </p>
        </div>
        <UploadResume />
        <p className="privacy-note">
          <span aria-hidden="true">&#128274;</span> Your files are private and securely processed.
        </p>
      </section>
    </main>
  );
}
