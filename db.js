// In a real application, this would connect to an actual database
// For this demo, we're using localStorage to simulate a database

class CareerDatabase {
    constructor() {
        if (!localStorage.getItem('careers')) {
            // Initialize with some sample data
            const initialCareers = [
                {
                    id: 1,
                    title: "Software Developer",
                    description: "Design, develop, and test software applications for various platforms.",
                    skills: ["programming", "problem_solving", "analysis"],
                    personality: {
                        teamwork: [3, 5],
                        structure: [2, 4],
                        public_speaking: [1, 3]
                    },
                    salary: "80-120",
                    education: "bachelor",
                    growth: "High",
                    work_env: ["office", "remote", "hybrid"]
                },
                {
                    id: 2,
                    title: "Data Scientist",
                    description: "Analyze and interpret complex data to help organizations make decisions.",
                    skills: ["analysis", "programming", "problem_solving"],
                    personality: {
                        teamwork: [2, 4],
                        structure: [3, 5],
                        public_speaking: [2, 4]
                    },
                    salary: "80-120",
                    education: "master",
                    growth: "Very High",
                    work_env: ["office", "remote"]
                },
                {
                    id: 3,
                    title: "Graphic Designer",
                    description: "Create visual concepts to communicate ideas that inspire and inform.",
                    skills: ["design", "creativity", "communication"],
                    personality: {
                        teamwork: [2, 5],
                        structure: [1, 3],
                        public_speaking: [1, 3]
                    },
                    salary: "50-80",
                    education: "bachelor",
                    growth: "Medium",
                    work_env: ["office", "remote"]
                },
                {
                    id: 4,
                    title: "Marketing Manager",
                    description: "Plan and execute marketing campaigns to promote products or services.",
                    skills: ["communication", "leadership", "creativity"],
                    personality: {
                        teamwork: [4, 5],
                        structure: [2, 4],
                        public_speaking: [4, 5]
                    },
                    salary: "80-120",
                    education: "bachelor",
                    growth: "High",
                    work_env: ["office", "hybrid"]
                },
                {
                    id: 5,
                    title: "Technical Writer",
                    description: "Create technical documentation and instruction manuals.",
                    skills: ["writing", "communication", "problem_solving"],
                    personality: {
                        teamwork: [2, 4],
                        structure: [3, 5],
                        public_speaking: [1, 3]
                    },
                    salary: "50-80",
                    education: "bachelor",
                    growth: "Medium",
                    work_env: ["office", "remote"]
                }
            ];
            localStorage.setItem('careers', JSON.stringify(initialCareers));
        }
    }

    getAllCareers() {
        return JSON.parse(localStorage.getItem('careers'));
    }

    getCareerById(id) {
        const careers = this.getAllCareers();
        return careers.find(career => career.id === id);
    }

    addCareer(career) {
        const careers = this.getAllCareers();
        const newId = careers.length > 0 ? Math.max(...careers.map(c => c.id)) + 1 : 1;
        career.id = newId;
        careers.push(career);
        localStorage.setItem('careers', JSON.stringify(careers));
        return career;
    }

    updateCareer(id, updatedCareer) {
        const careers = this.getAllCareers();
        const index = careers.findIndex(career => career.id === id);
        if (index !== -1) {
            careers[index] = { ...careers[index], ...updatedCareer };
            localStorage.setItem('careers', JSON.stringify(careers));
            return careers[index];
        }
        return null;
    }

    deleteCareer(id) {
        const careers = this.getAllCareers();
        const filteredCareers = careers.filter(career => career.id !== id);
        localStorage.setItem('careers', JSON.stringify(filteredCareers));
        return filteredCareers.length !== careers.length;
    }
}

// Initialize the database
const careerDB = new CareerDatabase();

// For this demo, we'll make the database available globally
window.careerDB = careerDB;