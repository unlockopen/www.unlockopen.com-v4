export const readingTime = text => {
  let content = new String(text);
  const speed = 220; // reading speed in words per minute

  // remove all html elements
  let re = /(&lt;.*?&gt;)|(<.*?>)/gi;
  let plain = content.replace(re, "");

  // replace all newlines and 's with spaces
  plain = plain.replace(/\n+|'s/g, " ");

  // create array of all the words in the post & count them
  let words = plain.split(" ");
  let count = words.length;

  // calculate the reading time
  const calculatedReadingTime = Math.round(count / speed);
  return calculatedReadingTime;
};
