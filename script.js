window.addEventListener('load', () => {
    loadAndRenderData();
});

async function loadAndRenderData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        renderProfile(data.profile);
        renderSkills(data.skills);
        renderExperience(data.experience);
        renderEducation(data.education);

        initAnimations();

    } catch (error) {
        console.error('Error loading CV data:', error);
        // Maybe display an error message to the user
    }
}

function renderProfile(profile) {
    document.querySelector('#profile-name').textContent = profile.name;
    document.querySelector('#profile-title').textContent = profile.title;
    document.querySelector('#profile-description').textContent = profile.description;
}

function renderSkills(skills) {
    const skillsList = document.querySelector('#skills-list');
    const skillNameDisplay = document.querySelector('#skill-name-display');
    const skillLevelDisplay = document.querySelector('#skill-level-display');
    const skillDescriptionDisplay = document.querySelector('#skill-description-display');

    const defaultDescription = "Hover over a skill to see details.";

    skillsList.innerHTML = skills.map(skill => `
        <li class="bg-gray-900 bg-opacity-50 p-3 mb-2 border-l-4 border-cyan-400 cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors duration-200" data-name="${skill.name}" data-level="${skill.level}" data-description="${skill.description}">
            ${skill.name}
        </li>
    `).join('');

    skillsList.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'LI') {
            const { name, level, description } = e.target.dataset;
            skillNameDisplay.textContent = name;
            skillLevelDisplay.textContent = level;
            skillDescriptionDisplay.textContent = description;
        }
    });

    skillsList.addEventListener('mouseout', () => {
        skillNameDisplay.textContent = '';
        skillLevelDisplay.textContent = '';
        skillDescriptionDisplay.textContent = defaultDescription;
    });
}

function renderExperience(experience) {
    const experienceList = document.querySelector('#experience-list');
    experienceList.innerHTML = experience.map(item => `
        <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-200">${item.title}</h3>
            <p class="text-gray-400">${item.description}</p>
        </div>
    `).join('');
}

function renderEducation(education) {
    document.querySelector('#education-title').textContent = education.title;
}

function initAnimations() {
    const loadingScreen = document.getElementById('loading-screen');
    const linkStart = document.getElementById('link-start');
    const cvContainer = document.getElementById('cv-container');
    const panels = document.querySelectorAll('.panel');

    linkStart.addEventListener('animationend', () => {
        loadingScreen.style.opacity = '0';

        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        cvContainer.classList.remove('hidden');
        cvContainer.classList.add('visible');

        setTimeout(() => {
            panels.forEach((panel, index) => {
                setTimeout(() => {
                    panel.classList.add('visible');
                }, index * 200);
            });
        }, 300);
    });
}
