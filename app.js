// app.js

const STORAGE_KEYS = {
  transactions: "mp_transactions",
  tasks: "mp_tasks",
};

function loadArray(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? [];
  } catch {
    return [];
  }
}

function saveArray(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

function uid(prefix = "id") {
  return `${prefix}_${crypto.randomUUID()}`;
}

// Transactions
function getTransactions() {
  return loadArray(STORAGE_KEYS.transactions);
}
function saveTransactions(txs) {
  saveArray(STORAGE_KEYS.transactions, txs);
}

// Tasks
function getTasks() {
  return loadArray(STORAGE_KEYS.tasks);
}
function saveTasks(tasks) {
  saveArray(STORAGE_KEYS.tasks, tasks);
}

// Helpers
function calculateBalance(transactions) {
  return transactions.reduce((acc, tx) => {
    const amt = Number(tx.amount) || 0;
    return tx.kind === "saving" ? acc + amt : acc - amt;
  }, 0);
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2
  }).format(amount);
}

// Service Worker registration (PWA offline support)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then(() => {
        console.log("Service Worker registered");
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}




