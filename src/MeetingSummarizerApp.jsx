import React, { useState } from "react";

function MeetingSummarizerApp() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSummarize = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch('https://4d1d3e6e-4666-4dbc-99c4-132e3da00858-00-3gfogaupfmvi8.pike.replit.dev/summarize', {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary || "No summary received.");
    } catch (error) {
      console.error("Error summarizing meeting:", error);
      setSummary("An error occurred while summarizing the meeting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AI Meeting Summarizer</h1>
      <p>Upload your audio and get summaries + action items here.</p>

      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleSummarize} disabled={!file || loading}>
        {loading ? "Summarizing..." : "Summarize Meeting"}
      </button>

      {summary && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default MeetingSummarizerApp;

