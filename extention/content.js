function highlightSentences(sentences) {
  console.log("Highlighting sentences:", sentences);

  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach((paragraph) => {
    const originalText = paragraph.textContent;
    let highlightedText = originalText;

    sentences.forEach((sentence) => {
      const regex = new RegExp(sentence, 'gi');
      highlightedText = highlightedText.replace(regex, '<span style="background-color: rgb(236, 189, 255,0.3); ">$&</span>');
    });

    paragraph.innerHTML = highlightedText;
  });

  console.log("Sentences highlighted!");
}


function fetchAndHighlightSentences() {
  const url = window.location.href;
  console.log("Fetching sentences for URL:", url);

  fetch(`http://localhost:5001/summarize?url=${encodeURIComponent(url)}`)
    .then((response) => response.json())
    .then((data) => {
      const sentences = data.map((sentence) => sentence.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
      console.log("Received sentences from server:", sentences);
      highlightSentences(sentences);
    })
    .catch((error) => console.error(error));
}

console.log("Content script injected!");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "toggleHighlighting") {
    if (request.isEnabled) {
      fetchAndHighlightSentences();
    } else {
      location.reload(); // Reload the page to remove the highlighting
    }
  }
});
