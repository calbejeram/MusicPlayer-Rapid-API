// Variables
const lyricsTab = document.querySelector('#lyrics');
const otherAlbumsTab = document.querySelector('#otherAlbums');
const relatedArtistsTab = document.querySelector('#relatedArtists');
// Content Divs Tabs
const lyricsContent = document.querySelector('.lyrics');
const otherAlbumsContent = document.querySelector('.other-albums');
const relatedArtistsContent = document.querySelector('.related-artists');

const lyricsParagraph = document.querySelector(".lyrics .lyrics-paragraph");
// const albumImg = document.querySelectorAll(".other-albums .albums-container .album-card .album-image")

// console.log(albumImg);

// Button Variables
let playBtn = document.getElementById("playBtn");
let playIcon = document.getElementById("playIcon");

function playPause() {
    if (playIcon.classList.contains("fa-play")) {
      playIcon.classList.add("fa-pause");
      playIcon.classList.remove("fa-play");
    } else {
      playIcon.classList.add("fa-play");
      playIcon.classList.remove("fa-pause");
    }
}



// Function to set the active tab and display content
function setActiveAndDisplayContent(tab, content) {
    // Remove the "active" class from all tabs
    lyricsTab.classList.remove("active");
    otherAlbumsTab.classList.remove("active");
    relatedArtistsTab.classList.remove("active");

    // Add the "active" class to the clicked tab
    tab.classList.add("active");

    // Hide all content divs
    lyricsContent.style.display = "none";
    otherAlbumsContent.style.display = "none";
    relatedArtistsContent.style.display = "none";

    // Display the corresponding content div
    content.style.display = "block";
}

// Adding click event listeners to the tabs
lyricsTab.addEventListener("click", () => {
    setActiveAndDisplayContent(lyricsTab, lyricsContent);
});

otherAlbumsTab.addEventListener("click", () => {
    setActiveAndDisplayContent(otherAlbumsTab, otherAlbumsContent);
});

relatedArtistsTab.addEventListener("click", () => {
    setActiveAndDisplayContent(relatedArtistsTab, relatedArtistsContent);
});

// Displaying the "Lyrics" content when the page loads by default
setActiveAndDisplayContent(lyricsTab, lyricsContent);


// INTEGRATING API

// Lyrics
const lyricsUrl = 'https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871';
const options1 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '11b74b13e6mshf8bc67569843313p1b25f5jsn9f3635af1474',
		'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
	}
};

async function fetchData() {
  try {
    const response = await fetch(lyricsUrl, options1);
    const result = await response.json();
    // console.log(result.lyrics.lyrics.body.html)
    const lyrics = result.lyrics.lyrics.body.html
    // Split the lyrics by line breaks
    const lyricsLines = lyrics.split("\n");

    // Create an HTML structure for the lyrics
    const lyricsHTML = lyricsLines
      .map((line) => `<p>${line}</p>`)
      .join('');

    // Set the innerHTML of the lyricsParagraph element
    lyricsParagraph.innerHTML = lyricsHTML;
    
    // console.log(lyricsParagraph)
  } catch (error) {
    console.error(error);
  }
}

fetchData();


// Artist Albums and Related Artists Source URL
const albums = 'https://spotify23.p.rapidapi.com/search/?q=allan%20walker&type=multi&offset=0&limit=10&numberOfTopResults=5';
const relatedArtists = 'https://spotify23.p.rapidapi.com/artist_related/?id=7vk5e3vY1uw9plTHJAMwjN';
const options2 = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '11b74b13e6mshf8bc67569843313p1b25f5jsn9f3635af1474',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

// Other Albums
const albumImgLinkContainer = document.querySelectorAll(".album-link-image");
const albumTitleContainer = document.querySelectorAll(".album-title");

async function getAlbums() {
  try {
    const response = await fetch(albums, options2);
    const result = await response.json();
    // console.log(result)

    for (let i = 0; i < result.albums.items.length; i++) {
      const albumImageUrl = result.albums.items[i].data.coverArt.sources[0].url;
      const albumName = result.albums.items[i].data.name;
      const albumDateRelease = result.albums.items[i].data.date.year;
      const albumSpotifyUrl = result.albums.items[i].data.uri;
      // console.log(albumSpotifyUrl)

      // Creating a link for each album
      const albumLink = document.createElement("a");
      albumLink.href = albumSpotifyUrl
      
      // Creating a new image element for each album
      const albumImage = document.createElement("img");
      albumImage.src = albumImageUrl;
      albumImage.alt = `Album ${i + 1} Image`;
      albumImage.width = 250;
      albumImage.height = 250;

      
      // Creating a p elemennt from album title
      const albumTitle = document.createElement("p");
      albumTitle.innerText = albumName;
      
      // Creating a p element for album date
      const albumDate = document.createElement("p");
      albumDate.innerText = albumDateRelease;

      // Appending the image to a href tag
      albumLink.appendChild(albumImage);
      
      // Appending the child elements of the parent container album-card
      albumImgLinkContainer[i].appendChild(albumLink);
      albumTitleContainer[i].appendChild(albumTitle);
      albumTitleContainer[i].appendChild(albumDate);
    
      // console.log(albumName);
      // console.log(albumDate);
    }

  } catch (error) {
    console.error(error);
  }
};

const artistImgLinkContainer = document.querySelectorAll(".artist-link-image");
const artistNameContainer = document.querySelectorAll(".artist-name");

async function getRelatedArtists() {
    try {
      const response = await fetch(relatedArtists, options2);
      const result = await response.json();
      // console.log(result);

      for (let i = 0; i < result.artists.length; i++) {
        const artistSpotifyLink = result.artists[i].external_urls.spotify;
        const artistImageUrl = result.artists[i].images[0].url;
        const artistName = result.artists[i].name

        // console.log(artistSpotifyLink);
        // console.log(artistImageUrl);
        // console.log(artistName);
  
        // Creating a link for each album
        const artistLink = document.createElement("a");
        artistLink.href = artistSpotifyLink;
        
        // Creating a new image element for each album
        const artistImage = document.createElement("img");
        artistImage.src = artistImageUrl;
        artistImage.alt = `Artist ${i + 1} Image`;
        artistImage.width = 300;
        artistImage.height = 300;
  
        
        // Creating a p elemennt from album title
        const relatedArtistName = document.createElement("p");
        relatedArtistName.innerText = artistName;
  
        // Appending the image to a href tag
        artistLink.appendChild(artistImage);
        
        // Appending the child elements of the parent container album-card
        artistImgLinkContainer[i].appendChild(artistLink);
        artistNameContainer[i].appendChild(relatedArtistName);
      
        // console.log(albumName);
        // console.log(albumDate);
      }

    } catch (error) {
      console.error(error);
    }
}

getRelatedArtists();
getAlbums();