// Data for the links
const data = {
    projects: [
        { name: "PRABANDH", url: "https://prabandh-jai-verse.vercel.app" },
        { name: "SKILLX", url: "https://skillx-jai-verse.vercel.app" },
        { name: "SENTRIX", url: "https://sentrix-jai-verse.vercel.app" },
        { name: "RITVA", url: "https://ritva-jai-verse.vercel.app" },
        { name: "NEURIX", url: "https://neurix-jai-verse.vercel.app" },
        { name: "NIRNAYA", url: "https://nirnaya-jai-verse.vercel.app" },
        { name: "MADHURAMS", url: "https://madhurams-sweets.vercel.app" }
    ],
    socialLinks: [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/jai-manikanta-gudivada/" },
        { name: "GitHub", url: "https://github.com/jaigudivada" },
        { name: "Email", url: "mailto:thejaiverse@gmail.com" },
    ],
    gfgCourses: [
        { name: "Build with AI agents using Snowflake Cortex AI", url: "https://gfgcdn.com/tu/wD5/" },
        { name: "MongoDB Course", url: "https://gfgcdn.com/tu/10XE/" }
    ],
    unstop: [
        { name: "Check your skill with this game", url: "https://unstop.com/mario_game" },
    ]
};

// SVG Icon for the arrow
const arrowIconHTML = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
</svg>
`;

function createLinkElement(link) {
    const a = document.createElement('a');
    a.href = link.url;
    a.className = 'link-row';
    a.target = link.url.startsWith('mailto:') ? '_self' : '_blank';
    a.rel = link.url.startsWith('mailto:') ? '' : 'noopener noreferrer';

    const spanName = document.createElement('span');
    spanName.className = 'link-name';
    spanName.textContent = link.name;

    const spanIcon = document.createElement('span');
    spanIcon.className = 'link-icon';
    spanIcon.innerHTML = arrowIconHTML;

    a.appendChild(spanName);
    a.appendChild(spanIcon);

    return a;
}

function initializeLinks() {
    const projectsContainer = document.getElementById('projects-container');
    const socialLinksContainer = document.getElementById('social-links-container');

    // Inject Projects
    data.projects.forEach(project => {
        projectsContainer.appendChild(createLinkElement(project));
    });

    // Inject Social Links
    data.socialLinks.forEach(socialLink => {
        socialLinksContainer.appendChild(createLinkElement(socialLink));
    });

    // Inject GFG Courses
    const gfgCoursesContainer = document.getElementById('gfg-courses-container');
    data.gfgCourses.forEach(course => {
        gfgCoursesContainer.appendChild(createLinkElement(course));
    });

    // Inject Unstop
    const unstopContainer = document.getElementById('unstop-container');
    data.unstop.forEach(link => {
        unstopContainer.appendChild(createLinkElement(link));
    });
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLinks);
