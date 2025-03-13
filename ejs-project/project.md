### **Assignment: Advanced Expense Tracker Application**

**Objective:**  
Build a more feature-rich Expense Tracker application that includes:

1. Expense categorization and filtering.
2. Monthly summaries.
3. Editing existing expenses.

---

### **Features:**

#### **1. Core Features**

-   **Add Expense:**

    -   Users can add expenses with:
        -   Description, Amount, Category, Date.

-   **View Expenses:**

    -   Display a list of all expenses with:
        -   Description, Amount, Category, Date.
        -   An "Edit" and "Delete" button for each expense.

-   **Edit Expense:**

    -   Clicking "Edit" allows users to update an expense.

-   **Delete Expense:**
    -   Remove an expense by clicking the "Delete" button.

#### **2. Additional Features**

-   **Filter by Category:**

    -   A dropdown to filter expenses by category (e.g., "Food," "Transportation").

-   **Monthly Summary:**
    -   Show a summary of total expenses for each category in the current month.
    -   Example:
        ```
        Monthly Summary (January 2025):
        - Food: $120.00
        - Transportation: $55.00
        - Entertainment: $80.00
        ```

---

### **Requirements:**

#### **1. Routes**

Add the following Express routes:

-   **`GET /` (Home Page):**

    -   Display the form to add expenses.
    -   Show all expenses in a table.
    -   Include filtering by category and a monthly summary.

-   **`POST /add` (Add Expense):**

    -   Handle form submissions to add a new expense.

-   **`GET /edit/:id` (Edit Page):**

    -   Render a form pre-filled with the selected expense's details.

-   **`POST /edit/:id` (Update Expense):**

    -   Update the expense data with the edited values.

-   **`POST /delete/:id` (Delete Expense):**

    -   Remove the expense with the given ID.

-   **`GET /filter` (Filter Expenses):**
    -   Filter the expense list by category.

---

#### **2. Data Format**

Store expenses in an array like this:

```javascript
let expenses = [
	{
		id: 1,
		description: "Groceries",
		amount: 3000,
		category: "Food",
		date: "2025-01-20",
	},
	{
		id: 2,
		description: "Gasoline",
		amount: 900,
		category: "Transportation",
		date: "2025-01-21",
	},
];
```

---

#### **3. Project Structure**

```
advanced-expense-tracker/
│
├── views/
│   ├── layout.ejs          # Common layout for all pages
│   ├── index.ejs           # Home page
│   ├── edit.ejs            # Edit expense form
│
├── public/
│   ├── styles.css          # (Optional) CSS file for styling
│
├── app.js                  # Main Express server file
├── package.json            # Dependencies
└── README.md               # Project instructions
```

---

#### **4. Expected UI Features**

**Home Page:**

-   **Form to Add Expense:**

    ```
    Description: [__________]
    Amount:      [__________]
    Category:    [Dropdown: Food, Transport, etc.]
    Date:        [Date Picker]
    [Add Expense]
    ```

-   **Filter Dropdown:**

    ```
    [All Categories]  (Dropdown to filter expenses by category)
    [Filter]
    ```

-   **Expense Table:**

    ```
    | Description       | Amount  | Category        | Date       | Action         |
    |-------------------|---------|-----------------|------------|----------------|
    | Lunch             | 15.99   | Food            | 2025-01-22 | [Edit] [Delete]|
    ```

-   **Monthly Summary:**
    ```
    Monthly Summary (January 2025):
    - Food: $150.00
    - Transportation: $75.00
    ```

**Edit Page (`GET /edit/:id`):**

-   Pre-filled form to update the expense details:
    ```
    Description: [Lunch]
    Amount:      [15.99]
    Category:    [Dropdown: Food, Transportation, etc.]
    Date:        [2025-01-22]
    [Update Expense]
    ```

---

### **Evaluation Criteria:**

1. **Dynamic Rendering:**

    - Use EJS to render expenses and summaries dynamically.

2. **Functionality:**

    - All features should work correctly, including adding, editing, deleting, filtering, and viewing summaries.

3. **Code Quality:**

    - Organized and readable code.

4. **UI Design:**
    - Functional and user-friendly interface.

---

### **Bonus Features:**

1. **Validation:**

    - Ensure inputs are valid (e.g., positive amounts, non-empty descriptions).

2. **Sorting:**

    - Allow users to sort expenses by amount or date.

3. **Export Data:**
    - Provide an option to export expenses as a CSV file.
