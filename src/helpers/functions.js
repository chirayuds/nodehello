import dotenv from 'dotenv';
// Set up Global configuration access 
dotenv.config(); 
import fs from 'fs';
// import ejs from 'ejs';
// import fetch from 'node-fetch';
// import moment from 'moment';
// dotenv.config(); 

function api_response(res,data) {
    const customResponse = {
        status: 'success',
        code: 200,
        data: data,
        message: data.message
        // Add more custom fields as needed
      };
      
    logToFile('API','API Response - '+JSON.stringify(customResponse))
    res.json(customResponse); // Sending a custom JSON response
}

// Log message to a file
function logToFile(module,message) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based (0 - 11)
    const day = currentDate.getDate();
    const date_log = day+'-'+month+'-'+year;

    const logFile = date_log+'_'+module+'_logs.txt'; // File path for logs (adjust as needed)
    const logFilePath = 'src/logs/'+logFile; // File path for logs (adjust as needed)
  
  
    // Append the message to the log file
    fs.appendFile(logFilePath, `${message}\n`, (err) => {
        if (err) {
        console.error('Error writing to log file:', err);
        } else {
        // console.log('Message logged to file:', message);
        }
    });
}


export {
    api_response,
    logToFile
};  