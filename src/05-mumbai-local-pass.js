/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
export function generateLocalPass(passenger) {
  // Your code here
  const fields = ["name", "from", "to", "classType"]
  if (!passenger ||typeof passenger !==  "object") {
    return "INVALID PASS"
  }

  const toTitleCase = (str) => str.split(/\s+/).map(item => item[0].toUpperCase() + item.slice(1).toLowerCase()).join(" ")

  let result = "MUMBAI LOCAL PASS\n---\n";
  let passID = ["", "", ""];
  for (let field of fields) {
    let fieldInput = passenger[field];

    if (typeof fieldInput !== "string" || fieldInput.trim() === "") return "INVALID PASS"

    fieldInput = fieldInput.trim()
    if (field === "name") result += `Name: ${fieldInput.toUpperCase()}\n`
    else if (field === "from") {
      result += `From: ${toTitleCase(fieldInput)}\n`;
      passID[1] = fieldInput.slice(0, 3).toUpperCase()
    }
    else if  (field === "to") {
      result += `To: ${toTitleCase(fieldInput)}\n`;
      passID[2] = fieldInput.slice(0, 3).toUpperCase()
    }
    else {
      const classType = fieldInput.toUpperCase();
      if (classType === "FIRST" || classType === "SECOND") {
        result += `Class: ${classType}\n`;
        passID[0] = classType[0];
      }
      else return "INVALID PASS"
    }
  }
  result += `Pass ID: ${passID.join("")}`;
  return result;
}
