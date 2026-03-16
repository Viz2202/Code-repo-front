export function formatText(input) {

  const escapeHTML = (str) =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  // handle code blocks
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g;

  input = input.replace(codeBlockRegex, (_, lang, code) => {
    const cleanCode = escapeHTML(code.trim());

    return `
      <div class="custom-code-block">
        <pre><code>${cleanCode}</code></pre>
      </div>
    `;
  });

  // bold
  input = input.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // line breaks
  input = input.replace(/\n/g, "<br />");

  return input;
}

export function getdatetime(input) {
  const parts = input.split("_");
  const datetime = parts[parts.length - 1];

  return datetime;
}

export function separatedatetime(input){
    const [datePart, timePart] = input.split(" ");
    const timeWithoutMs = timePart.split(".")[0];
    return formatCustomDate(`${datePart} ${timeWithoutMs}`)
}

function formatCustomDate(dateString) {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Array of month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get date components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Get time components
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Determine AM/PM and convert to 12-hour format
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  // Pad minutes with a leading zero if necessary
  const paddedMinutes = minutes < 10 ? '0' + minutes : minutes;

  // Function to get the correct ordinal suffix (st, nd, rd, th)
  function getOrdinalSuffix(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }

  // Construct the final formatted string
  return `${day}${getOrdinalSuffix(day)} ${month},${year}  ${hours}:${paddedMinutes} ${ampm}`;
}