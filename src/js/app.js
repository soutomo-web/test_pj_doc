const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const calculateButton = document.getElementById("calculateButton");
const messageElement = document.getElementById("message");
const resultElement = document.getElementById("result");

function parseDate(value) {
  if (!value) {
    return null;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (
    parsedDate.getFullYear() !== year ||
    parsedDate.getMonth() !== month - 1 ||
    parsedDate.getDate() !== day
  ) {
    return null;
  }

  return parsedDate;
}

function showError(message) {
  messageElement.textContent = message;
  messageElement.className = "message";
  resultElement.textContent = "";
  resultElement.className = "result";
}

function showResult(days) {
  messageElement.textContent = "";
  messageElement.className = "message";
  resultElement.textContent = `${days}日`;
  resultElement.className = "result success";
}

function calculateDays() {
  const startDate = parseDate(startDateInput.value);
  const endDate = parseDate(endDateInput.value);

  if (!startDate || !endDate) {
    showError("開始日と終了日は日付として入力してください。");
    return;
  }

  if (startDate > endDate) {
    showError("開始日は終了日より前の日付を入力してください。");
    return;
  }

  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  showResult(diffDays);
}

function initializePage() {
  calculateButton.addEventListener("click", calculateDays);

  const form = document.getElementById("dateForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateDays();
  });
}

window.addEventListener("DOMContentLoaded", initializePage);