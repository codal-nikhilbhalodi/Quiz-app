# FastAPI Project

A simple and scalable **FastAPI** project with Uvicorn as the ASGI server.  

## Table of Contents

- [Features](#features)  
- [Requirements](#requirements)  
- [Installation](#installation)  
- [Running the Server](#running-the-server)  
- [API Documentation](#api-documentation)  
- [Project Structure](#project-structure)  
- [Testing](#testing)  
- [License](#license)  

## Features

- FastAPI framework for building high-performance APIs
- Uvicorn ASGI server for async execution
- Automatic interactive API documentation using Swagger UI and ReDoc
- Modular project structure for easy scalability
- Optional environment-based configuration

## Requirements

- Python 3.10+
- pip

## Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd <your-repo-directory>
```
2. **Create a virtual environment**
```bash
python -m venv venv
```
3. **Activate the virtual environment**
```bash
source venv/bin/activate
```
4. **Install dependencies**
```bash
pip install -r requirements.txt
```
5. **Running the Server**
```bash
uvicorn app.main:app --reload
```