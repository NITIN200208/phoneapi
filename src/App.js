import React, { useState } from "react";

function App() {
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [headers, setHeaders] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://chimpu.online/api/post.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ phonenumber: phoneNumber }),
      });

      const responseHeaders = response.headers;
      let headersObj = {};
      for (let [key, value] of responseHeaders.entries()) {
        headersObj[key] = value; // Store headers in an object
      }
      setHeaders(headersObj); // Update headers state
    } catch (error) {
      console.error("Error:", error);
      setHeaders({ error: "Failed to fetch data" });
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Submit Phone Number</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); // Allow only numbers
            setPhoneNumber(value);
          }}
          placeholder="Enter Phone Number"
          style={{ padding: "10px", width: "200px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <h3>Headers Received:</h3>
        {headers ? (
          <pre style={{ textAlign: "left", display: "inline-block" }}>
            {JSON.stringify(headers, null, 2)}
          </pre>
        ) : (
          <p>No data yet. Submit a phone number to get headers.</p>
        )}
      </div>
    </div>
  );
}

export default App;
