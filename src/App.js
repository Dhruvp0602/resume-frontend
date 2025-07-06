import React, { useState } from "react";
import AuthForm from "./components/Authform";
import ProfileForm from "./components/Profileform";

function App() {
  const [session, setSession] = useState(null);

  return (
    <div style={{ padding: 30 }}>
      <h1>Cloud Resume Generator</h1>
      {!session ? <AuthForm setSession={setSession} /> : <ProfileForm session={session} />}
    </div>
  );
}

export default App;
