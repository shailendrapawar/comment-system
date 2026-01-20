
export const pingHealth = (PORT) => {
    fetch(`http://localhost:${PORT}/health-check`)
        .then(res => res.text())
        .then(text => console.log(`[${new Date().toISOString()}] Health ping: ${text}`))
        .catch(err => console.error("Health ping failed:", err.message));
}