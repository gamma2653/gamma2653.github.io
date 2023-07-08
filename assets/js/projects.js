var projects = {
    "c1c0-scheduler": {
        "title": "C1C0 Scheduler",
        "class": "c1c0-scheduler project",
        "description": `
            This project has been the result of me taking an implementation of the scheduler for a lab assistant robot, named C1C0
            and going about reimplementing it for the sake of greater extensibility (removing many hardcoded components, while adding
            many utiltiies to allow other developers to more easily plug into it) and potentially speeding up the project along the way.
            This has lead me to creating a robot scheduling system that is modular enough to potentially be used on other robotic chassis with
            significantly less setup required than having to write a scheduler from scratch.

            Features include:
            - Sensor Suite with automatic worker thread spawning to collect Serial data with the possibility of creating custom "data collection" classes that can be used to collect other kinds of data.
            - Automatic support for over the web interfacing (thanks to using gRPC).
            - Extensible functionality- as simple as implementing a function that takes a predefined set of arguments and adding said function to a list in the System-implementing class.
            - And more, see the \`packaging\` branch on Github.
            `,
        "github": "",
    },
    "tcat-data-pipeline": {
        "title": "TCAT Data Pipline/ Warehouse",
        "class": "tcat-data-pipeline project",
        "description": `
            This has been a massive data analysis project taken on while I was a "Programmer Intern" for Tompkins Consolidated Area Transit (TCAT).
            The work I did here involved building a pipeline that would pull large amounts of data, and automatically both statistically and heuristically
            analyze the data. This project eventually led to me and my supervisor to begin constructing a new data warehouse- which turned out to be
            what we needed all along as new and new regular analysis were needed.

            As a result, this project is still on-going, but projected to be completed by this July, 2023.

            This project is open-source.
            `,
    },
    "project-hapi": {
        "title": "Project HAPI",
        "class": "project-hapi project",
        "description": `
            This was a long-time pet-project of mine that I started before a few years before entering university and had worked 
            on-and-off during my first two years. It's objective was to simulate -not emulate- the human mind using modern psychological
            models as a base abstraction for how the mind works, such as Plutchik's Wheel of Emotions and the Big Five Traits (OCEAN).
            This is obviously less computationally intensive than emulating a human brain, and had found some limited success.
            During my time at university, I had found that many of my self-research had proven to be correct (including the chosen model
            for personality and to some limited degree my approach to how it affects emotions) while finding other models could use
            improvements (such as my treatment of the way personality changes and lack of modeling temperment).

            Flash forward to today, and I view this project as a learning experience where I see that I had made lots of really cool meaningful
            progress, while also realizing where I was wrong and what approaches could use improvement. I believe that this is a project that I
            can one day revisit and give another try, and who knows, I may be successful.

            Note: Project H-API stands for Project Human - Application Programming Interface
            I am indeed quite "happy" with the wordplay :)
            `,
    },
    "surelocked-homes": {
        "title": "Surelocked Homes",
        "class": "surelocked-homes project",
        "description": `
            This project was developed during the short duration of PenApps XVI (UPenn's 36 hour hackathon) along with a team of 3 high schoolers.
            My role on the team was writing software that hooked into Microsoft's facial recognition API and controlled a number of smart devices
            (represented using a few motors and lights on Lutron's Smart-home kit). In the process, I wrote custom drivers to more easily interface
            with Lutron's smart home system, and in effect was likely compatible with a number of Lutron implemented smart-homes.

            This goal of the project, which we took to calling "SureLockedHolmes" was to provide a Smart tablet that would be able to recognize
            which user picked it up, and automatically configure/login to the appropriate account, while also granting custom permissions sets to
            said user to control different smart devices.

            In the end, we reached the final stage of competitive contestants, and won Best Domain Name (unfortunately we did not properly fill out
            the Best Lutron Smart-home device prize application properly in time, we definitely had a good shot at that one!). We were very happy
            with the product we made, however as my teammates were from Canada, and I would be returning to Ithaca, NY, we all figured that the
            project was unlikely to continue together. That said, my teammates decided to give the hardware used to me, I have not yet returned to
            the project, but I still have the hardware, and perhaps one day I'll return to it as a little pet-project.
            `,
    },
    "lasertag-robot": {
        "title": "Laser Tag Robot",
        "class": "lasertag-robot project",
        "description": `
            This was a small project that was worked on during the Cooper Union Summer STEM Program I did. The first three weeks were spent
            learning digital logic, while the last three weeks were spent designing and building a prototype of a project of our choice along
            with a three others. We were designing our robot against another four person team. I ended up coming up with the gimick of our robot:
            it would be dome-shaped and have a ring of mirrors that it would spin, potentially hitting enemy lasers back at their sensors. Each
            robot has 2 light sensors, one in the front and one in the back, that would only be tripped by high light levels, such as a led laser.
            The robot was equipped with one laser in the front. This was made possible by attaching a servo to the top of the dome, that would rotate
            a gear that had various spindles connected to it that would turn the main ring that held the mirrors. My part was building that ring-mirror
            structure, programming the logic for when our robot was hit, some of the motor controls, and the ring controls from the controller.
            `,
    },
    "encompass": {
        "title": "Encompass",
        "class": "encompass project",
        "description": `
            This is another project that was developed during a hackathon. This was for the Cornell Animal Health Hackathon, where we came up with
            a design for a product called "Encompass." The idea would be to have a central hub that vet clinics can use for data entry and as a
            way to standardize existing pet information. More importantly, the website had a feature to send a pre-appointment survey that would
            categorize the pet's owner into one of four categories, where they would then be allocated a certain amount of time with the vet-tech
            and the veterinarian. The categories are based on questions proven to be able to distinguish people's preferences when it comes to
            receiving information about their own or someone else's health. (The test was developed by MindGenomics whom we had worked closely with
            throughout the hackathon). Turns out the idea was great and the prototype sufficiently demonstrated our idea since we won first place
            in our target pillar (clinical workflow & efficiency). 

            All this said, once again, this was a project my team did not carry on any further. I wished to, but three of our teammates did not
            wish to join in, and my only other teammate soon found himself also too busy to work on it- and thus it also became a project left
            behind. I must say though, at the very least these projects allowed me to show my ability to apply what I know to a wide range of projects.
            `,
    },
    "fsc-col-5v6": {
        "title": "NOAA: Analyzing Fractional Snow Cover Col 5 vs 6",
        "class": "fsc-col-5v6 project",
        "description": `
            In this experience, I had the opportunity to work on analyzing satellite data from the Terra and Aqua satellites. In particular,
            I was able to analyze NASA's Fractional Snow Cover Collection 5 vs 6 and draw some preliminary conclusions as to what effects
            switching to the NDSI system of calculating snow cover. This was accomplished by finding case studies, then backing up hypotheses
            with statistics that would further back up my hypotheses. More details can be found on the poster located here.

            The fun part of this project was being able to work with massive data sets; on the scale of a few hundred gigabytes (this was pre-2016!).
            It taught me some valuable lessons about how to handle working with things in memory and how to be mindful of memory usage.
            `
    }
}
// TODO: Add github links to projects
// TODO: Add images to projects
// TODO: Add more projects
// TODO: Make a description loader.

var ordering = ["tcat-data-pipeline", "c1c0-scheduler", "surelocked-homes", "lasertag-robot", "encompass", "fsc-col-5v6"];

/**
 * Parses the description of a project and returns the html version of it.
 * 
 * Note: Expects the description to be formatted in a specific way. For eg: two newlines (no whitespaces) to indicate a new paragraph.
 * 
 * TODO: Make this more robust.
 * 
 * @param {string} description
 * @returns {string}
 */
function processDescription(description) {
    
    newDescription = "";
    i=0
    in_list = false;
    for(s of description.split(new RegExp("\n\s*\n", "g"))) {
        s = "<p>" + s.trim() + "</p>";
        for (line of s.split("\n")) {
            line = line.trim()
            if(line.startsWith("- ")) {
                if(!in_list) {
                    // open list
                    s = "<ul>\n<li>" + s + "</li>\n";
                    in_list = true;
                }else {
                    s += "<li>" + line.substring(2) + "</li>\n";
                }
            }else {
                // close list
                if(in_list) {
                    s = "</ul>\n" + s;
                    in_list = false;
                }
            }
        }
        newDescription += s;
    }
    return newDescription;
}


function loadProject(project) {
    let projectInfo = projects[project];
    let projectContainer = $("#project-body");
    // Open project-specific container
    projectContainer.append(`<div id="${project}" class="${projectInfo.class}">
                                <h2>${projectInfo.title}</h2>
                                ${"github" in projectInfo ? `<a class="github-link" href="${projectInfo.github}">Github link here.</a>` : ``}
                                <div class="project-description">${processDescription(projectInfo.description)}</div>
                            </div>`);
}

function loadProjects() {
    let projectContainer = $("#project-body");
    projectContainer.hide();
    projectContainer.empty();
    for(let project of ordering) {
        loadProject(project);
    }
    projectContainer.show();
}
