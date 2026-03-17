let chart

async function analyze() {
    const input = document.getElementById("input").value

    const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ input })
    })

    const data = await res.json()

    document.getElementById("result").innerText = data.result
    document.getElementById("tokens").innerText = `Tokens: ${data.beforeTokens} → ${data.afterTokens} (${data.reduction}%)`
    document.getElementById("latency").innerText = "Latency: " + data.latency + "ms"
    document.getElementById("pruned").innerText = data.pruned

    const ctx = document.getElementById("chart").getContext("2d")

    if (chart) {
        chart.destroy()
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Before", "After"],
            datasets: [{
                label: "Token Count",
                data: [data.beforeTokens, data.afterTokens]
            }]
        }
    })
}