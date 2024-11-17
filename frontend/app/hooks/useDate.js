



export const getDate = (isoString) =>{
    // Create a Date object from the ISO string
    const date = new Date(isoString);
    
    // Define options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Define options for formatting the time
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
    
    // Combine the formatted date and time
    return `${formattedDate} / ${formattedTime}`;
}

