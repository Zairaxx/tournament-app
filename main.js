let teams = [
    {
        teamName: 'TeamOne',
        members: [
            'Pete',
            'John',
            'James',
            'Carl',
            'Ludwig',
            'Jessy',
            'Ronald',
            'Sam',
        ],
        maxMembers: 10,
    },
    {
        teamName: 'TeamTwo',
        members: [
        'Drew',
        'Kane',
        'Oliver',
        'Parker',
        'Cane',
        'Lars',
        'Erik',
        'Anton',
        ],
        maxMembers: 8,
    },
    {
        teamName: 'TeamThree',
        members: ['Ant', 'Carter', 'Park', 'Orange', 'Blue', 'Red'],
        maxMembers: 12,
        },
    {
        teamName: 'TeamFour',
        members: [],
        maxMembers: 4,
    }
];

let renderTeams = (listOfTeams) => {
    listOfTeams.forEach(team => {
        let teamContainer = document.createElement("div");
        teamContainer.style.border = "3px solid black";

        if(team.members.length !== team.maxMembers){
            teamContainer.classList.add("available");
        } else {
            teamContainer.classList.add("max")
        }

        let teamInfo = document.createElement("p");
        teamInfo.innerText = `
        Team name: ${team.teamName}
        ${team.members.length} / ${team.maxMembers}
        `
        teamInfo.style.textAlign = "center";

        let members = document.createElement("ul");
        team.members.forEach(member => {
            let li = document.createElement("li");
            li.innerText = member;
            members.append(li);
        })

        let status = document.createElement("div")
        status.innerHTML = team.members.length == 0 ? 
        `<strong>${team.teamName} is looking for a team captain!` :
        team.members.length < team.maxMembers ? `<strong>${team.teamName} is accepting members </strong>` :
        `<strong>${team.teamName} is full!</strong>`;


        let textInput = document.createElement("input");
        let addBtn = document.createElement("button");
        addBtn.innerText = "Add member!"
        addBtn.addEventListener("click",() => {
            if(team.members.length < team.maxMembers){
                let newMember = textInput.value;
                team.members.push(newMember);
                console.log(team.members);
                document.body.innerHTML = "";
                renderTeams(teams);
            }
        })

        let addRandomBtn = document.createElement("button");
        addRandomBtn.innerText = "Add random!";
        addRandomBtn.addEventListener("click", async () => {
            if(team.members.length < team.maxMembers){{
                try {
                let response = await fetch("https://randomuser.me/api/");
                let data = await response.json();
                console.log(data);
                let newMember = data.results[0].name.first + " " + data.results[0].name.last;
                team.members.push(newMember);
                document.body.innerHTML = "";
                renderTeams(teams);
                } catch(error) {
                    console.log("Something went wrong!", error)
                } finally {
                    console.log("I am done, im going to sleep!")
                }
            }}

        })


        teamContainer.append(textInput, addBtn, addRandomBtn, teamInfo, members, status);
        document.body.append(teamContainer)
    })
}

renderTeams(teams);


