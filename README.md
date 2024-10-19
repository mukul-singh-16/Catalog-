# Catalog-


Shamir's Secret Sharing Implementation
Overview
This project implements a simplified version of Shamir's Secret Sharing algorithm, which allows for the distribution and reconstruction of a secret using polynomial interpolation. The secret is embedded in the coefficients of a polynomial, and participants receive points on the polynomial as "shares." This implementation reads roots from a JSON file, decodes them from various bases, and computes the constant term of the polynomial.

Features
Reads polynomial roots from a JSON file.
Decodes values encoded in different numerical bases (e.g., binary, octal, hexadecimal).
Implements Lagrange interpolation to recover the constant term of the polynomial.
Handles missing keys gracefully and provides warnings for any missing roots.
Requirements
Node.js (v14 or later)
JSON file formatted as specified in the input example
Installation
Clone this repository:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Ensure you have Node.js installed. You can download it from nodejs.org.

Install the necessary packages (if any):

bash
Copy code
npm install
Usage
Create a question.json file in the project directory with the following format:

json
Copy code
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
Run the script using Node.js:

bash
Copy code
node solution.js
The output will display the calculated secret (constant term) in the console.

Code Explanation
The main components of the code include:

decodeValue: Converts values from different bases to decimal.
findConstantTerm: Uses Lagrange interpolation to compute the constant term of the polynomial.
modInverse: Computes the modular inverse used in the interpolation formula.
File Reading: Reads and parses the JSON input for roots and their corresponding values.