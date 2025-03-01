function compareMarketing() {
    // Get input values and check if any field is empty
    let inputs = document.querySelectorAll("input[type=number]");
    for (let input of inputs) {
        if (input.value.trim() === "") {
            alert("Please fill all fields before comparing.");
            return; // Stop execution if any field is empty
        }
    }

    // Parse input values
    let reachDigital = parseFloat(document.getElementById("reachDigital").value);
    let reachTraditional = parseFloat(document.getElementById("reachTraditional").value);
    let costDigital = parseFloat(document.getElementById("costDigital").value);
    let costTraditional = parseFloat(document.getElementById("costTraditional").value);
    let engagementDigital = parseFloat(document.getElementById("engagementDigital").value);
    let engagementTraditional = parseFloat(document.getElementById("engagementTraditional").value);
    let conversionDigital = parseFloat(document.getElementById("conversionDigital").value);
    let conversionTraditional = parseFloat(document.getElementById("conversionTraditional").value);
    let roiDigital = parseFloat(document.getElementById("roiDigital").value);
    let roiTraditional = parseFloat(document.getElementById("roiTraditional").value);

    // Show Chart Section
    document.getElementById("chartSection").style.display = "block";

    let labels = ["Reach", "Cost", "Engagement", "Conversion", "ROI"];
    let digitalData = [reachDigital, costDigital, engagementDigital, conversionDigital, roiDigital];
    let traditionalData = [reachTraditional, costTraditional, engagementTraditional, conversionTraditional, roiTraditional];

    // Destroy existing charts if they exist
    Chart.helpers.each(Chart.instances, function(instance) {
        instance.destroy();
    });

    // Function to add chart titles **ABOVE the chart in a proper order**
    function addChartTitle(id, title) {
        let chartContainer = document.getElementById(id).parentNode;
        let existingTitle = chartContainer.querySelector(".chart-title");
        if (!existingTitle) {
            let titleElement = document.createElement("h3");
            titleElement.className = "chart-title";
            titleElement.innerText = title;
            titleElement.style.textAlign = "center";
            titleElement.style.margin = "10px 0";
            chartContainer.insertBefore(titleElement, chartContainer.firstChild);
        }
    }

    // **Order of Charts & Titles**
    addChartTitle("barChart", "📊 Bar Chart - Comparison of Marketing Metrics");
    new Chart(document.getElementById("barChart").getContext("2d"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                { label: "Digital Marketing", data: digitalData, backgroundColor: "rgba(54, 162, 235, 0.6)" },
                { label: "Traditional Marketing", data: traditionalData, backgroundColor: "rgba(255, 99, 132, 0.6)" }
            ]
        }
    });

    addChartTitle("lineChart", "📈 Line Chart - Marketing Performance Trend");
    new Chart(document.getElementById("lineChart").getContext("2d"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                { label: "Digital", data: digitalData, borderColor: "blue", fill: false },
                { label: "Traditional", data: traditionalData, borderColor: "red", fill: false }
            ]
        }
    });

    addChartTitle("pieChart", "🥧 Pie Chart - Cost Distribution in Marketing");
    new Chart(document.getElementById("pieChart").getContext("2d"), {
        type: "pie",
        data: {
            labels: ["Digital", "Traditional"],
            datasets: [{ data: [costDigital, costTraditional], backgroundColor: ["blue", "red"] }]
        }
    });

    addChartTitle("radarChart", "📡 Radar Chart - Marketing Metrics Spread");
    new Chart(document.getElementById("radarChart").getContext("2d"), {
        type: "radar",
        data: {
            labels: labels,
            datasets: [
                { label: "Digital", data: digitalData, borderColor: "blue", backgroundColor: "rgba(54, 162, 235, 0.2)" },
                { label: "Traditional", data: traditionalData, borderColor: "red", backgroundColor: "rgba(255, 99, 132, 0.2)" }
            ]
        }
    });

    addChartTitle("stackedChart", "📊 Stacked Chart - Layered Metric Comparison");
    new Chart(document.getElementById("stackedChart").getContext("2d"), {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                { label: "Digital", data: digitalData, backgroundColor: "rgba(54, 162, 235, 0.6)" },
                { label: "Traditional", data: traditionalData, backgroundColor: "rgba(255, 99, 132, 0.6)" }
            ]
        },
        options: {
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            }
        }
    });

    addChartTitle("scatterChart", "📌 Scatter Chart - Cost vs Reach in Marketing");
    new Chart(document.getElementById("scatterChart").getContext("2d"), {
        type: "scatter",
        data: {
            datasets: [
                { label: "Digital", data: [{ x: costDigital, y: reachDigital }], backgroundColor: "blue" },
                { label: "Traditional", data: [{ x: costTraditional, y: reachTraditional }], backgroundColor: "red" }
            ]
        },
        options: {
            scales: {
                x: { type: "linear", position: "bottom", title: { display: true, text: "Cost (USD)" } },
                y: { title: { display: true, text: "Reach (People)" } }
            }
        }
    });
}
