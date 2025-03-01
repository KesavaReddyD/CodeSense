const quizAttemptData = {
    "success": true,
    "submission": {
      "_id": "67c21356ee8ecbd4556ca013",
      "student": "67bdc1e5f0ef157ffbdadbe7",
      "question": "67bf26662cbcf28b5296e757",
      "code": "public class Solution {\n    public static void main(String[] args) {\n        // Write your Java code here\n        int a = 5,b = 8;\n        system.out.println(a+b);\n    }\n}",
      "language": "java",
      "generativeQnA": [
        {
          "question": "What is the time complexity of the given code to calculate the sum of two numbers?",
          "type": "mcq",
          "options": [
            "O(n)",
            "O(log n)",
            "O(1)",
            "O(n^2)"
          ],
          "expectedAnswer": "O(1)",
          "expectedKeywords": [],
          "studentAnswer": "O(log n)",
          "aiFeedback": "",
          "_id": "67c21356ee8ecbd4556ca014"
        },
        {
          "question": "The code currently uses integer variables 'a' and 'b'. What potential issues might arise if you needed to sum very large numbers (e.g., numbers close to the maximum value of an integer)? Describe at least one way you could mitigate these issues.",
          "type": "descriptive",
          "options": [],
          "expectedAnswer": "If the numbers are very large, integer overflow can occur, leading to incorrect results. To mitigate this, you could use the `long` data type, which has a larger range. Alternatively, for extremely large numbers, you could use the `BigInteger` class in Java, which can handle arbitrarily large integers. Using `BigInteger` would prevent overflow but might decrease performance for smaller numbers.",
          "expectedKeywords": [
            "integer overflow",
            "long",
            "BigInteger",
            "data type",
            "range"
          ],
          "studentAnswer": "lfeohe;lf",
          "aiFeedback": "",
          "_id": "67c21356ee8ecbd4556ca015"
        },
        {
          "question": "In this specific scenario, passing the integer a and b, is it more efficient to use operator '+' or to use an algorithm such as bit manipulation to calculate the sum?",
          "type": "mcq",
          "options": [
            "Bit manipulation is more efficient",
            "Operator '+' is more efficient",
            "Both have the same efficiency",
            "It depends on the size of a and b"
          ],
          "expectedAnswer": "Operator '+' is more efficient",
          "expectedKeywords": [],
          "studentAnswer": "Operator '+' is more efficient",
          "aiFeedback": "",
          "_id": "67c21356ee8ecbd4556ca016"
        },
        {
          "question": "The code directly prints the sum to the console. Describe two alternative approaches for handling the sum result, and explain why those alternatives might be preferable in different contexts.",
          "type": "descriptive",
          "options": [],
          "expectedAnswer": "Instead of printing directly, you could: 1) Return the sum as the return value of a function. This makes the code reusable in other parts of a larger program where the sum is needed for further calculations. 2) Store the sum in a variable and then perform further operations on that variable. This is useful if the sum needs to be used multiple times or processed further before being displayed or used elsewhere. Returning the value or assigning to a variable enables modularity and reusability, which printing directly does not.",
          "expectedKeywords": [
            "return value",
            "function",
            "variable",
            "reusability",
            "modularity"
          ],
          "studentAnswer": "flwejhfowfwe",
          "aiFeedback": "",
          "_id": "67c21356ee8ecbd4556ca017"
        },
        {
          "question": "How could you modify this code to take the two numbers to be summed as input from the user, using the `Scanner` class?",
          "type": "descriptive",
          "options": [],
          "expectedAnswer": "To take input from the user, you would need to: 1) Import the `java.util.Scanner` class. 2) Create a `Scanner` object, typically associated with `System.in`. 3) Use the `Scanner` object's `nextInt()` method (or similar) to read the two integers from the user.  4) Assign those integers to the variables `a` and `b` before calculating the sum.  Make sure to close the Scanner when you are finished using it.  For example:\n```java\nimport java.util.Scanner;\n\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print(\"Enter the first number: \");\n        int a = scanner.nextInt();\n        System.out.print(\"Enter the second number: \");\n        int b = scanner.nextInt();\n        scanner.close();\n        System.out.println(a + b);\n    }\n}\n```",
          "expectedKeywords": [
            "Scanner",
            "System.in",
            "nextInt()",
            "input",
            "user input"
          ],
          "studentAnswer": "flwefofoj",
          "aiFeedback": "",
          "_id": "67c21356ee8ecbd4556ca018"
        }
      ],
      "grade": 3,
      "evaluatedByTeacher": false,
      "createdAt": "2025-02-28T19:49:42.215Z",
      "__v": 0
    }
  }

const quizAttemptObject = JSON.parse(quizAttemptData);
console.log(quizAttemptObject);