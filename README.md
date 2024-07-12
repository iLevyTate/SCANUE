# SCANJS

Welcome to the SCANJS repository! This project focuses on creating a Synthetic Cognitive Augmentation Network (SCAN) using JavaScript and web-based technologies to replicate and enhance prefrontal cortex (PFC) functions for decision-making, problem-solving, and planning.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

SCANJS aims to develop AI-based extensions of the prefrontal cortex (PFC). The project focuses on creating AI agents that simulate the functions of various PFC regions to assist in real-time cognitive tasks. The agents are built using Expert.js and other web technologies.

## Features

- **Cognitive Augmentation**: Simulate and enhance PFC functions for improved cognitive tasks.
- **Multi-Agent System**: Utilize multiple specialized AI agents for different cognitive tasks.
- **Web-Based**: Built using JavaScript and deployable as a web application.
- **Scalable and Extensible**: Easily extendable to include more cognitive functions and agents.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/iLevyTate/scan-js.git
cd scan-js
npm install
```

### Running the Project

To run the project locally:

1. **Set up Environment Variables**: Create a `.env` file in the root directory with the following content:
    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    ```

2. **Start the Server**:
    ```bash
    npm start
    ```

3. **Access the Application**: Open your browser and navigate to `http://localhost:3000`.

## Usage

### Example Usage

After running the project, you can interact with the cognitive agents through the web interface. Enter text input for analysis and receive synthesized responses from the AI agents.

### Project Structure

```plaintext
/scan-js
  ├── .github
  │   └── workflows
  │       └── deploy.yml
  ├── public
  │   └── index.html
  ├── src
  │   ├── main.js
  │   ├── pfc.js
  │   └── server.js
  ├── test
  │   └── assistantTest.test.js
  ├── .env
  ├── .gitignore
  ├── package.json
  └── README.md
```

## Contributing

We welcome contributions to enhance the capabilities of SCANJS. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Expert.js**: For providing the framework to create AI agents.
- **OpenAI**: For the language processing capabilities.
- **Contributors**: Thanks to all contributors who have helped in building and improving SCANJS.
