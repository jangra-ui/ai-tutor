// This is a React "Component". Think of it like a Lego block for your webpage
export default function HomePage() {

  // useState is a box to store data. Here we store what the user types
  // "question" is the current text in the input box
  // "setQuestion" is the function to update that text
  const [question, setQuestion] = useState("");

  // This stores the AI's answer so we can show it on screen
  const [answer, setAnswer] = useState("");

  // This tracks if AI is thinking. Shows "Loading..." to user
  const [loading, setLoading] = useState(false);

  // This function runs when user clicks "Ask AI" button
  // "async" means it can wait for AI to reply without freezing the page
  async function handleAskAI() {
    setLoading(true); // Show loading state
    setAnswer(""); // Clear previous answer

    // Send the user's question to our backend API
    // "/api/tutor" is a file we will create next
    const response = await fetch("/api/tutor", {
      method: "POST", // We are sending data
      headers: { "Content-Type": "application/json" }, // Tell server it's JSON data
      body: JSON.stringify({ question: question }) // Convert question to text to send
    });

    // Wait for the server to send back the AI's answer
    const data = await response.json();
    setAnswer(data.answer); // Put the answer in our "answer" box
    setLoading(false); // Stop loading
  }

  // This is what shows on the screen. It's called JSX = HTML + JavaScript
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>AI Tutor 📚</h1> {/* Page Title */}
      <p>Ask me anything about Math, Science, History...</p>

      {/* Input box where user types question */}
      <input
        type="text"
        value={question} // Show whatever is in "question" box
        onChange={(e) => setQuestion(e.target.value)} // When user types, update "question"
        placeholder="Explain photosynthesis for class 8"
        style={{ width: "100%", padding: "10px" }}
      />

      {/* Button. When clicked, run handleAskAI function */}
      <button onClick={handleAskAI} disabled={loading}>
        {loading? "Thinking..." : "Ask AI"}
      </button>

      {/* Only show answer box if answer is not empty */}
      {answer && (
        <div style={{ marginTop: "20px", border: "1px solid gray", padding: "10px" }}>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
