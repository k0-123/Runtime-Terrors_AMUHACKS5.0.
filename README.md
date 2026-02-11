# CareerBridge AI Resume Builder

CareerBridge is an advanced AI-powered resume builder designed to help job seekers create professional, tailored resumes that stand out. Leveraging the power of artificial intelligence, it analyzes job descriptions to optimize your resume for specific roles, ensuring higher compatibility with Applicant Tracking Systems (ATS).

![Project Banner](public/vite.svg) *Add a screenshot or banner here*

## 🚀 Features

- **AI-Powered Analysis**: Automatically match your resume against job descriptions to identify gaps and improved phrasing.
- **Smart Resume Builder**: Create professional resumes with customizable sections and modern templates.
- **Skill Extraction**: Extracts key skills from your uploaded documents (PDF, DOCX) to build a comprehensive profile.
- **Real-Time Job Matching**: Get instant feedback on how well your profile matches a target job description.
- **Insights Dashboard**: Visualize your resume performance and skill gaps with interactive charts.
- **Secure & Private**: All processing happens locally in your browser (mocked backend for demo purposes).

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: React `useState` / Custom Hooks (Zustand ready)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/careerbridge-ai.git
    cd careerbridge-ai
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173` to see the application.

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks (state management)
├── lib/               # Utility functions and helpers
├── sections/          # Major application sections (Hero, Resume, Skills, etc.)
├── types/             # TypeScript type definitions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🔮 Future Roadmap

- [ ] **Backend Integration**: Connect to a real backend (Node.js/Python) for persistent storage.
- [ ] **Advanced AI Models**: Integrate with OpenAI/Gemini API for deeper content generation.
- [ ] **PDF Export**: Generate high-quality PDF resumes directly from the browser.
- [ ] **User Authentication**: Implement secure login with Auth0 or Firebase.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
