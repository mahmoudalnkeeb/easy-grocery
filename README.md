# Easy Grocery

A simple and user-friendly application that allows users to create and share grocery lists while categorizing items by priority. This app is especially helpful for elderly individuals or busy individuals who rely on others to assist with shopping.

## Features

- **Add Items to List**: Easily add grocery items with a simple interface.
- **Group by Priority**: Categorize items into:
  - High Priority: Essential items needed immediately.
  - Medium Priority: Important but can wait.
  - Low Priority: Non-essential items that can be purchased later.
- **Shareable Link**: Generate a shareable link for grocery lists to send to family members or delivery services.

---
> Those features not implemented yet due to time frame

- **Mark Items as Purchased**: Recipients can mark items as purchased, updating the original list in real-time.
- **Simple List Management**: Create, edit, or delete grocery lists easily.

## Technology Stack

- **Backend**: Node.js/Express.js
- **Database**: MongoDB
- **Frontend**: Basic web interface using EJS, CSS, and JavaScript
- **Real-time Communication**: WebSockets for real-time updates

## Installation

### Prerequisites

- Node.js installed
- MongoDB set up for data storage

### Steps

1. Clone this repository:

    ```bash
      git clone https://github.com/mahmoudalnkeeb/easy-grocery.git
    ```

2. Navigate to the project directory:

    ```bash
      cd easy-grocery
    ```

3. Install dependencies (for Node.js):

    ```bash
      npm install
    ```

4. Set up your environment variables for the database.

5. Run the app (for Node.js):

    ```bash
      npm run start
    ```

- in development

    ```bash
      npm run start
    ```

## Usage

1. Create a new grocery list and add items to it.
2. Assign priority levels to each item (High, Medium, Low).
3. Share the grocery list link with family members or caregivers.
4. > (not done yet due to time frame) Recipients can mark items as purchased in real-time, updating the list.

## Future Enhancements

- **Object Product**: Instead of product as string pass it with more info like a link, notes or even store page.
- **More Coming Soon...**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
