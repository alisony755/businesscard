document.addEventListener('DOMContentLoaded', () => {
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');
    const prompt = document.getElementById('prompt');
    const startButton = document.getElementById('start-button');

    const hours = new Date().getHours();
    let greeting;

    if (hours >= 5 && hours < 12) {
        greeting = '> Good morning! My name is Alison Ye.\n';
    } else if (hours >= 12 && hours < 18) {
        greeting = '> Good afternoon! My name is Alison Ye.\n';
    } else {
        greeting = '> Good evening! My name is Alison Ye.\n';
    }

    const commands = {
        help: '> Available commands: help, hi, about, major, skills, languages, linkedin, contact, bye\n',
        hi: greeting,
        about: '> I am an Honors Computer Science student at Northeastern University. Two years of college coursework has equipped me with a solid foundation in object-oriented design and proficiency in  Java, JavaScript, Racket, and advanced topics in Machine Learning. I\'ve also independently developed projects in HTML and CSS.\n',
        major: '> I am majoring in computer science with a concentration in AI.\n',
        skills: '> Java, SQL, JavaScript, Python, HTML & CSS, UX, Graphic Design, Team Collaboration\n',
        languages: '>  (Proficient) Java, HTML, CSS, JavaScript, Racket | (Familiar with) Python, SQL, C++\n',
        awards: '> John Martinson Honors Student, Northeastern National Merit Scholar, Dean\'s List (2022-2023), Bausch + Lomb Honorary Science Award, AP Scholar with Distinction\n',
        linkedin: '> <a target="_blank" href="https://www.linkedin.com/in/alison-ye-00b5581b3/">Click here for my LinkedIn</a>\n',
        contact: '> You can contact me via email at <a href="mailto:ye.ali@northeastern.edu">ye.ali@northeastern.edu</a>\n',
        bye: '> Bye! Hope I\'ll see you again soon.\n',
        hidden: '> Some of the hidden commands are trivia, joke, drink, cat, frog, and owl.\n',
        joke: () => {
            const jokes = [
                "Q: Why do programmers prefer dark mode?\n  A: Because light attracts bugs!",
                "Q: Why did the programmer quit his job?\n  A: Because he didn't get arrays.",
                "Q: Why do Java developers wear glasses?\n  A: Because they don't C#."
            ];
            return `> ${jokes[Math.floor(Math.random() * jokes.length)]}\n`;
        },
        trivia: () => {
            const trivia = [
                "Q: What's the name of the blob of toothpaste on your toothbrush?\n  A: A nurdle!",
                "Q: What is the only state that can be typed on one row of keys on a QWERTY keyboard?\n  A: Alaska.",
                "Q: What is the name of the first computer virus?\n  A: Creeper.",
                "Q: In which US state is it illegal to chain your alligator to a fire hydrant?\n  A: Alabama.",
                "Q: What color is the sunset on Mars?\n  A: Pale blue."
            ];
            return `> ${trivia[Math.floor(Math.random() * trivia.length)]}\n`;
        },
        drink: () => {
            const drinks = [
                "My favorite Starbucks drink is a peach green tea lemonade!",
                "I like the Dunkin' kiwi watermelon refresher with green tea!",
                "I like the Pink Drink from Starbucks!",
                "I usually get the matcha latte from Dunkin' — hot or iced!"
            ];
            return `> ${drinks[Math.floor(Math.random() * drinks.length)]}\n`;
        },
        cat: () => {
            return `> /\\_/\\  
 ( o.o ) 
  > ^ <  
            \n`;
        },
        frog: () => {
            return `>  @..@
  (----)
 ( >__< )
 ^^ ~~ ^^  
            \n`;
        },
        owl: () => {
            return `> ,___,
  [O.O]
 /)___)
 --"--"--
            \n`;
        }
    };

    const bootupMessages = [
        '\n> Initializing terminal...',
        '> Loading modules...',
        '> Setting environment variables...',
        '> Authenticating user...',
        '> login: Alison Ye',
        '> Password: ********',
        '> Access granted. Welcome, Alison\n'
    ];

    let bootIndex = 0;

    function typeTextWithSound(text, delay = 100, callback) {
        const typingSound = new Audio('type-sound.mp3'); // Ensure this file exists
        typingSound.volume = 0.1;
        let index = 0;

        function typeCharacter() {
            if (index < text.length) {
                cliOutput.innerHTML += text[index];
                typingSound.play();
                index++;
                setTimeout(typeCharacter, delay);
            } else if (callback) {
                callback();
            }
        }
        typeCharacter();
    }

    function displayAsciiArt() {
        const asciiArt = `
        
 █████  ██      ██ ███████  ██████  ███    ██     ██    ██ ███████ 
██   ██ ██      ██ ██      ██    ██ ████   ██      ██  ██  ██      
███████ ██      ██ ███████ ██    ██ ██ ██  ██       ████   █████   
██   ██ ██      ██      ██ ██    ██ ██  ██ ██        ██    ██      
██   ██ ███████ ██ ███████  ██████  ██   ████        ██    ███████ 
        `;
        cliOutput.innerHTML += `<pre>${asciiArt}</pre>`;
        cliOutput.scrollTop = cliOutput.scrollHeight;
        setTimeout(() => {
            typeTextWithSound("\nhonors computer science student at northeastern university\n", 100, () => {
                typeTextWithSound("\nemail: ye.ali@northeastern.edu\n", 100, () => {
                    startButton.style.display = 'block';
                    cliInput.disabled = false;
                    cliInput.focus();
                });
            });
        }, 500);
    }

    function runBootSequence() {
        cliInput.disabled = true;
        if (bootIndex < bootupMessages.length) {
            cliOutput.innerHTML += `<span class="loading-line">${bootupMessages[bootIndex]}</span>\n`;
            bootIndex++;
            setTimeout(runBootSequence, 1000);
        } else {
            enableInput();
        }
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    function enableInput() {
        cliInput.disabled = false;
        cliInput.placeholder = "Type 'help' to see all commands";
        cliInput.focus();
    }

    cliInput.disabled = true;
    prompt.style.display = 'none';

    displayAsciiArt();

    cliInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const input = cliInput.value.trim().toLowerCase();

            if (input === 'start') {
                startButton.style.display = 'none';
                runBootSequence();
            } else if (bootIndex === bootupMessages.length && commands[input]) {
                const output = commands[input];
                cliOutput.innerHTML += `<span class="command-response">> bash:~/business_card ${input}</span>\n${typeof output === 'function' ? output() : output}\n`;
            } else if (bootIndex === bootupMessages.length) {
                cliOutput.innerHTML += `<span class="command-response">> bash:~/business_card ${input}</span>\n<span class="error-message">> Command not found. Type 'help' for available commands.\n</span>\n`;
            }
            cliInput.value = '';
            cliOutput.scrollTop = cliOutput.scrollHeight;
        }
    });
});
