/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/chrisbonifacio")
  .then(response => {
    console.log(response);
    cards.append(Card(response.data));
  })
  .catch(err => {
    console.log(err);
  });

axios
  .get("https://api.github.com/users/chrisbonifacio/followers")
  .then(response => {
    return response.data;
  })
  .then(response => {
    const followerURLs = response.map(user => {
      return user.url;
    });

    console.log(followerURLs);

    return followerURLs;
  })
  .then(response => {
    response.forEach(url => {
      axios.get(url).then(response => {
        cards.append(Card(response.data));
      });
    });
  })
  .catch(err => {
    console.log(err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

followersArray.forEach(follower => {
  axios.get(`https://api.github.com/users/${follower}`).then(response => {
    cards.append(Card(response.data));
  });
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function Card(user) {
  const userCard = document.createElement("div");
  userCard.classList.add("card");

  const userImg = document.createElement("img");
  userImg.src = user.avatar_url;

  const userCardInfo = document.createElement("div");
  userCardInfo.classList.add("card-info");

  const userName = document.createElement("h3");
  userName.classList.add("name");
  userName.textContent = user.name;

  const userUserName = document.createElement("p");
  userUserName.classList.add("username");
  userUserName.textContent = user.login;

  const userLocation = document.createElement("p");
  userLocation.textContent = `Location: ${user.location}`;

  const userProfile = document.createElement("p");
  const userProfileLink = document.createElement("a");
  userProfile.append(userProfileLink);
  userProfileLink.href = user.html_url;
  userProfileLink.textContent = user.html_url;

  const userFollowers = document.createElement("p");
  userFollowers.textContent = `Followers: ${user.followers}`;

  const userFollowing = document.createElement("p");
  userFollowing.textContent = `Following: ${user.following}`;

  const userBio = document.createElement("p");
  userBio.textContent = `Bio: ${user.bio}`;

  const userCalendar = document.createElement("div");
  userCalendar.classList.add("calendar");

  const userGraph = document.createElement("img");
  userGraph.classList.add("graph");
  userGraph.src = `http://ghchart.rshah.org/${user.login}`;

  // new GitHubCalendar(".calendar", user.login, {});

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  userCard.append(cardContainer);
  userCard.append(userCalendar);

  userCalendar.append(userGraph);

  cardContainer.append(userImg);
  cardContainer.append(userCardInfo);
  // userCard.append(userCalendar);
  userCardInfo.append(userName);
  userCardInfo.append(userUserName);
  userCardInfo.append(userLocation);
  userCardInfo.append(userProfile);
  userCardInfo.append(userFollowers);
  userCardInfo.append(userFollowing);
  userCardInfo.append(userBio);

  return userCard;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
