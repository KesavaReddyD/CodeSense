const Generatedquestions = [
  {
    "question": "What is the time complexity of the maxSubArray function?",
    "type": "mcq",
    "options": [
      "O(n^2)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    "expectedAnswer": "O(n)"
  },
  {
    "question": "Describe the algorithm used in the maxSubArray function and explain how it handles negative numbers in the input array.",
    "type": "descriptive",
    "options": [],
    "expectedAnswer": "The algorithm used is Kadane's algorithm, which iterates through the array and at each step, it decides whether to continue the current subarray or start a new one. It handles negative numbers by potentially starting a new subarray when the current sum becomes negative, as adding a negative number to the current sum would decrease the sum.",
    "expectedKeywords": [
      "Kadane's algorithm",
      "negative numbers",
      "current sum",
      "subarray"
    ]
  },
  {
    "question": "What would happen if the input array is empty? Would the function return the correct result? How would you modify the function to handle this edge case?",
    "type": "descriptive",
    "options": [],
    "expectedAnswer": "If the input array is empty, the function would throw an error because it tries to access the first element of the array. To handle this edge case, we could add a check at the beginning of the function to return 0 (or a specific value indicating an empty array) when the input array is empty.", 
    "expectedKeywords": [
      "edge case",
      "empty array",
      "error handling"
    ]
  },
  {
    "question": "How does the space complexity of the maxSubArray function compare to the input size?",   
    "type": "mcq",
    "options": [
      "It grows quadratically with the input size",
      "It grows linearly with the input size",
      "It is constant and does not depend on the input size",
      "It decreases as the input size increases"
    ],
    "expectedAnswer": "It is constant and does not depend on the input size"
  },
  {
    "question": "Describe an alternative approach to solving the maximum subarray problem, such as using dynamic programming. How would this approach compare to the one used in the maxSubArray function in terms of time and space complexity?",
    "type": "descriptive",
    "options": [],
    "expectedAnswer": "An alternative approach would be to use dynamic programming to build a table where each entry represents the maximum subarray sum ending at that position. This approach would have a time complexity of O(n) and a space complexity of O(n), whereas the maxSubArray function has a time complexity of O(n) and a space complexity of O(1).",
    "expectedKeywords": [
      "dynamic programming",
      "table",
      "time complexity",
      "space complexity"
    ]
  }
]

const Generatedquestions2 = [
    {
      "question": "The current code calculates the sum of 1 and 2. If you needed to sum two very large integers (e.g., 100-digit numbers), which data type would be most suitable to avoid overflow?",
      "type": "mcq",
      "options": ["int", "long", "double", "A custom data structure to represent large numbers as strings or arrays"],
      "expectedAnswer": "A custom data structure to represent large numbers as strings or arrays"
    },
    {
      "question": "Explain the purpose of the `return 0;` statement in the `main` function. What does a non-zero return value typically indicate?",
      "type": "descriptive",
      "options": [],
      "expectedAnswer": "The `return 0;` statement indicates that the program executed successfully. A non-zero return value typically indicates that an error occurred during program execution.",
      "expectedKeywords": ["exit status", "success", "error", "operating system"]
    },
    {
      "question": "The current code has fixed values for `a` and `b`. Describe how you would modify the code to allow the user to input the two numbers they want to sum from the console.",
      "type": "descriptive",
      "options": [],
      "expectedAnswer": "I would use `std::cin` to read the input from the user. First, I would declare two integer variables, `a` and `b`. Then, I would prompt the user to enter the first number and store it in `a` using `std::cin >> a;`. Next, I would prompt the user to enter the second number and store it in `b` using `std::cin >> b;`. Finally, I would calculate and print the sum using `std::cout << a + b;`.",
      "expectedKeywords": ["std::cin", "input", "console", "prompt", "read"]
    },
    {
      "question": "What is the time complexity of the addition operation performed in the code (`a + b`)?", 
      "type": "mcq",
      "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      "expectedAnswer": "O(1)"
    },
    {
      "question": "Besides direct addition using the `+` operator, can you think of any (less efficient) alternative ways to calculate the sum of two positive integers using bitwise operators? Briefly explain your approach.",
      "type": "descriptive",
      "options": [],
      "expectedAnswer": "Yes, addition can be performed using bitwise operators. The idea is to simulate the carry operation. The XOR operator `^` acts like addition without carry. The AND operator `&` identifies the bits that cause a carry. We left shift the carry bits by one position and add them to the result of the XOR operation. This process is repeated until the carry becomes zero. While possible it is significantly less efficient.",
      "expectedKeywords": ["bitwise", "XOR", "AND", "carry", "sum"]
    }
  ]