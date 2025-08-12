
async function fetchAPI() {
    const tenantID = tenantID;
    const clientID = clientID;
    const clientSecret =clientSecret;
  
    try {
      const url = `https://login.microsoftonline.com/${tenantID}/oauth2/token`;
      console.log("URL:", url);
  
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientID,
          client_secret: clientSecret,
          resource: "https://graph.microsoft.com",
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response status:", response.status);
        console.error("Response text:", errorText);
          displayMessage(`HTTP error! status: ${response.status}, details: ${errorText}`);
          throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }
  
      const data = await response.json();
      console.log("API Response:", data);
        displayMessage(`<pre>${JSON.stringify(data, null, 2)}</pre>`);
    } catch (error) {
      console.error("Error fetching API:", error);
        displayMessage(`Error fetching API: ${error.message}`);
    }
  }
  