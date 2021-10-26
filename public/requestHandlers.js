async function postSave() {
  try {
    const data = {
      score
    };
    console.log("data", data);
    return await fetch("/save", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.log(e);
    return;
  }
}
