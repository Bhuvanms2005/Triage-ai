# Triage AI – Emergency Response Optimization using GenAI

## Problem

Emergency response systems often receive long, unstructured patient descriptions. Processing full input increases latency, cost, and inefficiency in real-time decision-making.

## Solution

This project implements an intelligent AI-powered triage system that performs context pruning before sending input to a large language model.

## Key Features

* AI-based context pruning using Gemini API
* Emergency severity classification (Critical, Moderate, Low)
* Token reduction measurement
* Latency tracking
* Visual comparison using charts

## Architecture

User Input → Smart Context Pruning → Optimized Prompt → Gemini Model → Structured Output

## Tech Stack

* Frontend: HTML, CSS, JavaScript, Chart.js
* Backend: Node.js, Express
* AI Model: Gemini 2.5 Flash

## Results

* Token reduction: 40%–70%
* Reduced latency
* Maintained output quality

## How to Run

1. Clone the repository
2. Add Gemini API key in .env
3. Run backend using node server.js
4. Open frontend/index.html

## Future Improvements

* Multi-language support
* Integration with real hospital systems
* Mobile app deployment
