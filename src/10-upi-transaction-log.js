/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  // Your code here
  if (!Array.isArray(transactions) || transactions.length < 1) return null;
  let totalDebit = 0;
  let totalCredit = 0;
  let netBalance = 0;
  let transactionCount = 0;
  let avgTransaction = 0;
  let highestTransaction = {};
  let categoryBreakdown = {};
  let frequents = {};
  let frequentContact = "";
  let allAbove100 = true;
  let hasLargeTransaction = false;

  const checkNonEmptyStr = str => typeof str === "string" && str !== "";

  for (let transaction of transactions) {
    let {id, type, amount, to, category, date } = transaction;
    if (!checkNonEmptyStr(id)) continue;
    if (typeof type !== "string" || !["credit", "debit"].includes(type.toLowerCase())) continue;
    else type = type.toLowerCase();
    if (!Number.isFinite(Number(amount)) || amount <= 0) continue;
    else amount = Number(amount);
    if (!checkNonEmptyStr(to))return null;
    if (!checkNonEmptyStr(category)) return null;
    if (!checkNonEmptyStr(date)) return null;

    if (type === "credit") totalCredit += amount;
    else totalDebit += amount;
    transactionCount++;

    if (highestTransaction.amount) {
      if (amount > highestTransaction.amount) highestTransaction = transaction;
    }
    else {
      highestTransaction = transaction;
    }

    categoryBreakdown[category] = (categoryBreakdown[category] ?? 0) + amount;

    if (amount <= 100) allAbove100 = false;
    if (amount >= 5000) hasLargeTransaction = true;
    frequents[to] = (frequents[to] ?? 0) + 1;
  }

  if (transactionCount === 0) return null;
  frequentContact = Object.entries(frequents).sort((a, b) => b[1] - a[1])[0][0];
  netBalance = totalCredit - totalDebit;
  avgTransaction = parseFloat(((totalCredit + totalDebit) / transactionCount).toFixed(2));

  return { totalCredit, totalDebit, netBalance, transactionCount, avgTransaction, highestTransaction, categoryBreakdown, frequentContact, allAbove100, hasLargeTransaction }
}
