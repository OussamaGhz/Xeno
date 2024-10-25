function findPeakBandwidth(clients) {
    // Create a map to store hourly bandwidth sums
    const hourlyBandwidth = new Map();
    
    // Process each client's data
    clients.forEach(client => {
        client.data.forEach(record => {
            // Extract hour from timestamp
            const hour = record.timestamp.substring(0, 13) + ":00:00";
            
            // Add bandwidth to hourly sum
            if (!hourlyBandwidth.has(hour)) {
                hourlyBandwidth.set(hour, 0);
            }
            hourlyBandwidth.set(hour, hourlyBandwidth.get(hour) + record.bandwidth);
        });
    });
    
    // Find the hour with maximum bandwidth
    let maxBandwidth = 0;
    let peakHour = null;
    
    hourlyBandwidth.forEach((bandwidth, hour) => {
        if (bandwidth > maxBandwidth) {
            maxBandwidth = bandwidth;
            peakHour = hour;
        }
    });
    
    return {
        peakHour,
        totalBandwidth: maxBandwidth,
        hourlyBreakdown: Object.fromEntries(hourlyBandwidth)
    };
}

module.exports = findPeakBandwidth;
