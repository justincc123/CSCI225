
document.getElementById("calculate").addEventListener("click", calculateBill, false);

function calculateBill() {
    var usage = parseFloat(document.getElementById("usage").value);
    var days = parseFloat(document.getElementById("days").value);
    var tax = parseFloat(document.getElementById("tax").value);
    var city = document.querySelector("input[name='city']:checked").value;
    var season = document.querySelector("input[name='season']:checked").value;

    if (isNaN(usage) || isNaN(days) || isNaN(tax)) {
        alert("Please enter valid numbers for usage, days, and tax rate.");
        return;
    }

    var baseCharge = 0.4603 * days;

    var tier1 = 0, tier2 = 0, tier3 = 0;

    if (season === "Summer") {
        if (usage <= 650)
            tier1 = usage * 0.066678;
        else if (usage <= 1000) {
            tier1 = 650 * 0.066678;
            tier2 = (usage - 650) * 0.110748;
        } else {
            tier1 = 650 * 0.066678;
            tier2 = 350 * 0.110748;
            tier3 = (usage - 1000) * 0.114625;
        }
    } else { 
        tier1 = usage * 0.062404;
    }

    var baseRevenue = baseCharge + tier1 + tier2 + tier3;

    var fuelCost = usage * (season === "Summer" ? 0.045876 : 0.042859);
    var demandSide = baseRevenue * 0.015989;
    var nuclear = baseRevenue * 0.041562;
    var environmental = baseRevenue * 0.162813;

    var totalRevenue = baseRevenue + fuelCost + demandSide + nuclear + environmental;
    var franchiseFee = totalRevenue * (city === "Inside" ? 0.030674 : 0.011839);

    var totalBeforeTax = totalRevenue + franchiseFee;
    var finalTotal = totalBeforeTax * (1 + tax / 100);

    if (finalTotal > 500) {
        window.open("https://www.georgiapower.com/residential/save-money-and-energy/products-programs.html");
    }

    var resultHTML = "";
    resultHTML += `<tr><td>Base Charge:</td><td>$${baseCharge.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td>Tier 1 Component:</td><td>$${tier1.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td>Tier 2 Component:</td><td>$${tier2.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td>Tier 3 Component:</td><td>$${tier3.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td><strong>Base Revenue:</strong></td><td><strong>$${baseRevenue.toFixed(2)}</strong></td></tr>`;
    resultHTML += `<tr><td>Fuel Cost Rider:</td><td>$${fuelCost.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td>Demand Side Mgmt Rider:</td><td>$${demandSide.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td>Nuclear Cost Recovery:</td><td>$${nuclear.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td>Environmental Rider:</td><td>$${environmental.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td><strong>Total Revenue:</strong></td><td><strong>$${totalRevenue.toFixed(2)}</strong></td></tr>`;
    resultHTML += `<tr><td>Franchise Fee:</td><td>$${franchiseFee.toFixed(2)}</td></tr>`;
    resultHTML += `<tr><td><strong>Total Before Tax:</strong></td><td><strong>$${totalBeforeTax.toFixed(2)}</strong></td></tr>`;
    resultHTML += `<tr><td><strong>Total (After Tax):</strong></td><td><strong>$${finalTotal.toFixed(2)}</strong></td></tr>`;

    document.getElementById("results").innerHTML = resultHTML;
}
