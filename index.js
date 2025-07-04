document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const statsCardContainer = document.querySelector(".stats-card");
    const Container = document.querySelector(".container");
    const Body = document.querySelector("body");
    
    // Container.style.height = "100%";
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username cannot be empty.");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{3,16}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid Username");
            return false;
        }
        return true;
        
    }
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.disabled = true;
            searchButton.textContent = "Loading...";
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details ");
            }
            const data = await response.json();
            console.log("User data:", data);

            displayUserStats(data);
        }catch(error) {
            // statsContainer.innerHTML = `<p>User not found</p>`;
        }
        finally {
            searchButton.disabled = false;
            searchButton.textContent = 'Search';
           
        }

    }
    function displayUserStats(data) {
        statsContainer.style.height = "100%";
        statsContainer.style.display = "block";
        // statsContainer.style.cssText += "height: 100%; display: block;";
        // Calculate percentages
        const easyPercent = (data.easySolved / data.totalEasy) * 100 ;
        const mediumPercent = (data.mediumSolved / data.totalMedium) *100 ;
        const hardPercent = (data.hardSolved / data.totalHard) * 100 ;
        // Show containers
        // statsContainer.style.display = "block";
        // statsCardContainer.style.display = "block";
        // Set progress circles
        easyProgressCircle.style.setProperty("--progress-degree", `${easyPercent}%`);
        mediumProgressCircle.style.setProperty("--progress-degree", `${mediumPercent}%`);
        hardProgressCircle.style.setProperty("--progress-degree", `${hardPercent}%`);
        // Update labels
        easyLabel.textContent = `${data.easySolved} / ${data.totalEasy}`;
        mediumLabel.textContent = `${data.mediumSolved} / ${data.totalMedium}`;
        hardLabel.textContent = `${data.hardSolved} / ${data.totalHard}`;

        const cardsData = [
            {
                label: "Total Questions", value: data.totalQuestions
            
            },
            {
                label: "Total Solved", value: data.totalSolved
            },
            {
                label: "Acceptance Rate", value: data.acceptanceRate
            },
            {
                label: "Contribution Points", value: data.contributionPoints
            },
            {
                label: "Overall Rank", value: data.ranking
            },
   
        ];

        console.log("Cards Data:", cardsData);

        statsCardContainer.innerHTML = cardsData.map(
            eachdata => {
                return `
                <div class="card">
                    <h4>${eachdata.label}</h4>
                    <p>${eachdata.value}</p>
                      
                  </div >
                `;     
            }
        ).join("");
    }
    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        
        if (window.innerWidth <= 723) {
            // Container.style.height = "100%";
            // Body.style.alignItems = "flex-start";
            Body.style.height = "100%";
        }
        Body.style.alignItems = "flex-start";
        console.log("Logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    })
})
