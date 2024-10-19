const fs =  require('fs');



//function for decode values
function decodeValue(valuess,base)
{
    let value = 0;

    for(let i=0;i<valuess.length;i++)
    {
        const digit =valuess[i];
        let digitValue;

        if (/\d/.test(digit)) {
            digitValue = parseInt(digit, 10);
        } else {
            digitValue = digit.charCodeAt(0) - 'a'.charCodeAt(0) + 10; // 'a' = 10, 'b' = 11, ...
        }

        value = value * base + digitValue;


        

    }
    return value;
}



// to finde constant terms

function findConstantTerm(roots, k) {

    let secret = 0;
    const xValues = [];

    const yValues = [];

    // Collecting the first k roots
    let index = 0;
    for (const [key, value] of Object.entries(roots)) {
        if (index >= k) break;
        xValues.push(parseInt(key));
        yValues.push(value);
        index++;
    }

    // Lagrange interpolation formula
    for (let i = 0; i < k; i++) {
        let product = yValues[i];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                product *= (0 - xValues[j]) * modInverse(xValues[i] - xValues[j], 256);
                product %= 256; // Keep it in range of 256-bit
            }
        }
        secret += product;
        secret %= 256; // Keep it in range of 256-bit
    }

    return secret;
}





// Function to compute modular inverse
function modInverse(a, m) {
    a = a % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1; // Should not reach here for valid inputs
}




// Read the JSON input
fs.readFile('question.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const json = JSON.parse(data);
    const n = json.keys.n;
    const k = json.keys.k;

    const roots = {};
let collected = 0;

for (let i = 1; collected < k; i++) {
    const root = json[i.toString()]; 
    // Accessing keys as strings
    if (root) { // Check if the root exists
        const base = parseInt(root.base, 10);
        const value = decodeValue(root.value, base);
        roots[i] = value;
        collected++;
    } else {
        console.warn(`Root ${i} not found in the JSON data.`);
    }

    // Break if we reach the limit of available keys
    if (i >= n) {
        break;
    }
}

    // Calculate the secret (constant term)
    const secret = findConstantTerm(roots, k);
    console.log('The secret (constant term) is:', secret);
});
