// Paste this into your browser console to download the logs

(function() {
  const logs = [];
  
  const originalLog = console.log;
  const capturedLogs = [];
  
  console.log = function(...args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    }).join(' ');
    
    capturedLogs.push(`[${timestamp}] ${message}`);
    originalLog.apply(console, args);
  };
  
  window.downloadCapturedLogs = function(filename = 'console_logs.txt') {
    const logText = capturedLogs.join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log(`Downloaded ${capturedLogs.length} log entries to ${filename}`);
  };
  
  window.clearCapturedLogs = function() {
    capturedLogs.length = 0;
    console.log('Cleared all captured logs');
  };
  
  console.log('Log capture initialized!');
  console.log('Use downloadCapturedLogs("filename.txt") to download logs');
  console.log('Use clearCapturedLogs() to clear the buffer');
})();
