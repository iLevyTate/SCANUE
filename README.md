# SCANUE ([SCAN](https://github.com/iLevyTate/SCAN) Using Experts.js)

![SCANUEGITHUBLOGO](https://github.com/user-attachments/assets/3e01f56c-9dab-4b0a-a666-ecc66fe8b75b)

Welcome to the SCANUE repository! This project focuses on creating a Synthetic Cognitive Augmentation Network ([SCAN](https://github.com/iLevyTate/SCAN)) using Experts.js and web-based technologies to replicate and enhance prefrontal cortex (PFC) functions for decision-making, problem-solving, and planning.

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

SCANUE aims to develop AI-based extensions of the prefrontal cortex (PFC). The project focuses on creating AI agents that simulate the functions of various PFC regions to assist in real-time cognitive tasks. The agents are built using Experts.js and other web technologies.

### Name Change Notification

We have rebranded from SCANJS to SCANUE due to SCANJS being a deprecated project created by another developer. If "SCANJS" appears in documentation, code, or other references, this was prior to the name change.

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
git clone https://github.com/iLevyTate/scanue.git
cd scanue
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
/scanue
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

We welcome contributions to enhance the capabilities of SCANUE. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/YourFeature`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Experts.js**: For providing the framework to create AI agents.
- **OpenAI**: For the language processing capabilities.
- **Contributors**: Thanks to all contributors who have helped in building and improving SCANUE.
