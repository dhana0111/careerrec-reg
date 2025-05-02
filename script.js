document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startAssessmentBtn = document.getElementById('startAssessment');
    const assessmentSection = document.getElementById('assessment');
    const heroSection = document.querySelector('.hero');
    const form = document.getElementById('careerForm');
    const formSteps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const progress = document.getElementById('progress');
    const progressSteps = document.querySelectorAll('.step');
    const resultsSection = document.getElementById('results');
    const careerResults = document.getElementById('careerResults');
    const saveResultsBtn = document.getElementById('saveResults');
    const retakeAssessmentBtn = document.getElementById('retakeAssessment');
    const contactForm = document.getElementById('contactForm');

    // Form Data Object
    let formData = {
        personal: {},
        skills: {},
        personality: {},
        preferences: {}
    };

    // Career Database (simplified - in a real app this would be in a proper database)
    const careerDatabase = [
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

    // Event Listeners
    startAssessmentBtn.addEventListener('click', startAssessment);
    form.addEventListener('submit', submitForm);
    saveResultsBtn.addEventListener('click', saveResults);
    retakeAssessmentBtn.addEventListener('click', retakeAssessment);
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }

    // Next/Previous Button functionality
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = document.querySelector('.form-step.active');
            const currentStepNumber = parseInt(currentStep.dataset.step);
            const nextStepNumber = parseInt(btn.dataset.next);
            
            // Validate current step before proceeding
            if (validateStep(currentStepNumber)) {
                updateFormData(currentStepNumber);
                showStep(nextStepNumber);
                updateProgress(nextStepNumber);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStepNumber = parseInt(btn.dataset.prev);
            showStep(prevStepNumber);
            updateProgress(prevStepNumber);
        });
    });

    // Functions
    function startAssessment() {
        heroSection.classList.add('hidden');
        assessmentSection.classList.remove('hidden');
        showStep(1);
    }

    function showStep(stepNumber) {
        formSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            }
        });
    }

    function updateProgress(stepNumber) {
        // Update progress steps
        progressSteps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            }
        });

        // Update progress bar
        const progressPercent = ((stepNumber - 1) / (progressSteps.length - 1)) * 100;
        progress.style.width = `${progressPercent}%`;
    }

    function validateStep(stepNumber) {
        let isValid = true;
        const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        
        // Validate required fields
        const requiredInputs = currentStep.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'red';
                isValid = false;
                
                // Remove error style when user starts typing
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        input.style.borderColor = '#ddd';
                    }
                });
            }
        });

        // Step-specific validations
        if (stepNumber === 2) {
            const checkedSkills = currentStep.querySelectorAll('input[name="skills"]:checked');
            if (checkedSkills.length === 0) {
                alert('Please select at least one skill');
                isValid = false;
            } else if (checkedSkills.length > 5) {
                alert('Please select no more than 5 skills');
                isValid = false;
            }
        }

        if (stepNumber === 3) {
            const teamworkChecked = currentStep.querySelector('input[name="teamwork"]:checked');
            const structureChecked = currentStep.querySelector('input[name="structure"]:checked');
            const speakingChecked = currentStep.querySelector('input[name="public_speaking"]:checked');
            
            if (!teamworkChecked || !structureChecked || !speakingChecked) {
                alert('Please rate yourself on all personality traits');
                isValid = false;
            }
        }

        return isValid;
    }

    function updateFormData(stepNumber) {
        const currentStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        
        switch(stepNumber) {
            case 1:
                formData.personal = {
                    name: currentStep.querySelector('#name').value,
                    email: currentStep.querySelector('#email').value,
                    age: currentStep.querySelector('#age').value,
                    education: currentStep.querySelector('#education').value
                };
                break;
            case 2:
                const skills = [];
                currentStep.querySelectorAll('input[name="skills"]:checked').forEach(skill => {
                    skills.push(skill.value);
                });
                formData.skills = {
                    skills: skills,
                    passions: currentStep.querySelector('#passions').value
                };
                break;
            case 3:
                formData.personality = {
                    teamwork: parseInt(currentStep.querySelector('input[name="teamwork"]:checked').value),
                    structure: parseInt(currentStep.querySelector('input[name="structure"]:checked').value),
                    public_speaking: parseInt(currentStep.querySelector('input[name="public_speaking"]:checked').value)
                };
                break;
            case 4:
                formData.preferences = {
                    work_env: currentStep.querySelector('#work_env').value,
                    salary: currentStep.querySelector('#salary').value,
                    relocate: currentStep.querySelector('input[name="relocate"]:checked').value
                };
                break;
        }
    }

    function submitForm(e) {
        e.preventDefault();
        
        if (validateStep(4)) {
            updateFormData(4);
            
            // Process form data and get career recommendations
            const recommendations = getCareerRecommendations();
            
            // Display results
            displayResults(recommendations);
            
            // Hide form and show results
            assessmentSection.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            
            // Scroll to results
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function getCareerRecommendations() {
        // Calculate matching scores for each career
        const scoredCareers = careerDatabase.map(career => {
            let score = 0;
            
            // Skills matching (40% weight)
            const userSkills = formData.skills.skills;
            const matchingSkills = career.skills.filter(skill => userSkills.includes(skill));
            score += (matchingSkills.length / career.skills.length) * 40;
            
            // Personality matching (30% weight)
            const personalityMatch = 
                (formData.personality.teamwork >= career.personality.teamwork[0] && 
                 formData.personality.teamwork <= career.personality.teamwork[1] ? 10 : 0) +
                (formData.personality.structure >= career.personality.structure[0] && 
                 formData.personality.structure <= career.personality.structure[1] ? 10 : 0) +
                (formData.personality.public_speaking >= career.personality.public_speaking[0] && 
                 formData.personality.public_speaking <= career.personality.public_speaking[1] ? 10 : 0);
            score += personalityMatch;
            
            // Preferences matching (30% weight)
            const prefMatch = 
                (formData.preferences.salary === career.salary ? 10 : 0) +
                (formData.preferences.work_env === career.work_env[0] || 
                 formData.preferences.work_env === career.work_env[1] ? 10 : 0) +
                (formData.personal.education === career.education ? 10 : 0);
            score += prefMatch;
            
            return {
                ...career,
                matchScore: Math.round(score)
            };
        });
        
        // Sort by match score (descending) and return top 3
        return scoredCareers.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
    }

    function displayResults(recommendations) {
        careerResults.innerHTML = '';
        
        if (recommendations.length === 0) {
            careerResults.innerHTML = '<p>No career recommendations found based on your profile.</p>';
            return;
        }
        
        recommendations.forEach(career => {
            const careerCard = document.createElement('div');
            careerCard.className = 'career-card';
            careerCard.innerHTML = `
                <h3>${career.title}</h3>
                <p>${career.description}</p>
                <div class="career-meta">
                    <span class="career-salary">Match: ${career.matchScore}%</span>
                    <span class="career-growth">Growth: ${career.growth}</span>
                </div>
                <div class="career-meta">
                    <span>Salary: $${career.salary.replace('-', 'k - ')}k</span>
                    <span>Education: ${formatEducation(career.education)}</span>
                </div>
            `;
            careerResults.appendChild(careerCard);
        });
    }

    function formatEducation(education) {
        const educationMap = {
            'high_school': 'High School',
            'diploma': 'Diploma',
            'bachelor': "Bachelor's",
            'master': "Master's",
            'phd': 'PhD'
        };
        return educationMap[education] || education;
    }

    function saveResults() {
        // In a real app, this would save to a database
        // For now, we'll just store in localStorage
        const userResults = {
            user: formData.personal,
            recommendations: getCareerRecommendations(),
            date: new Date().toISOString()
        };
        
        localStorage.setItem('careerAssessmentResults', JSON.stringify(userResults));
        
        // Show confirmation
        saveResultsBtn.innerHTML = '<i class="fas fa-check"></i> Results Saved!';
        saveResultsBtn.style.backgroundColor = '#4CAF50';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            saveResultsBtn.innerHTML = '<i class="fas fa-save"></i> Save My Results';
            saveResultsBtn.style.backgroundColor = '';
        }, 2000);
    }

    function retakeAssessment() {
        // Reset form and show first step
        form.reset();
        formData = {
            personal: {},
            skills: {},
            personality: {},
            preferences: {}
        };
        
        // Update UI
        resultsSection.classList.add('hidden');
        assessmentSection.classList.remove('hidden');
        showStep(1);
        updateProgress(1);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function submitContactForm(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    }

    // Initialize
    updateProgress(1);
});