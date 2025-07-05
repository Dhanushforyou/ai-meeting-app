import React, { useState } from "react";

function MeetingSummarizerApp() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Audio = reader.result.split(',')[1]; // remove data: prefix
      setLoading(true);
      try {
        const response = await fetch('https://meeting-summarizer-backend.dr.replit.dev/summarize', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ transcript: base64Audio })
        });
        const data = await response.json();
        setSummary(data.summary || data); // depending on backend
      } catch (err) {
        setSummary("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AI Meeting Summarizer</h1>
      <p>Upload your audio and get summaries + action items here.</p>

      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Summarizing..." : "Summarize Meeting"}
      </button>

      <div style={{ marginTop: "2rem" }}>
        {summary && (
          <>
            <h2>Summary:</h2>
            <pre>{summary}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default MeetingSummarizerApp;
