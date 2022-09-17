const elementById = (id) => {
  document.getElementById(id);
};

// const handleSearch = (keyword) => {
//   // const keyword = elementById("keyword");
//   console.log("hello")
//   const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword}`;
//   fetch(url)
//     .then((res) => res.json())
//     .then(data => console.log(data))
//     // .then((data) => showArtists(data));
// };

const handleSearch = () => {
  const getsearchInput = document.getElementById('keyword')
  const searchInput = getsearchInput.value
  const url = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${searchInput}`
  fetch(url)
    .then(res => res.json())
    .then((data) => showArtists(data))
}

const showArtists = (data) => {
  const artistContainer = document.getElementById("artists");

  data?.artists?.forEach((artist) => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `
      <div class="image-container">
      <div class="image-container-inner">
        <img
          src="${artist.strArtistThumb}"
          alt="Arist"
        />
      </div>
    </div>
    <div class="info-container">
      <h1>${artist?.strArtist} </h1>
      <p>Country: ${artist.strCountry}</p>
      <p>Style: ${artist.strGenre}</p>
    </div>
    <button class="album-button">
      <i class="fa-solid fa-compact-disc"></i>
      <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
    </button>`;

    artistContainer.appendChild(div);

  });
};

handleSearch()

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data.album));

}
const showAlbum = (data) => {
  // console.log(data)
  const artistContainer = document.getElementById("artists");
  artistContainer.innerHTML = "";
  const albumContainer = document.getElementById("albums");

  data?.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
      <div class="album-image-container">
        <img
          src="${item.strAlbumThumb}"
          alt=""
        />
      </div>
      <div class="album-name">
        <h3>${item.strAlbum}</h3>
      </div>
    `;

    albumContainer.appendChild(div);
  })

}
showAlbum()
