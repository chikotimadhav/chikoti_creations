const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'playlists.js');
let content = fs.readFileSync(filePath, 'utf8');

// I will just use regex or eval to get the object, modify it, and write it back.
// Since it's a JS module, let's extract the array.
const startIdx = content.indexOf('[');
const endIdx = content.lastIndexOf('];') + 1;
const arrayString = content.substring(startIdx, endIdx);

let playlists = eval(arrayString);

const newSongs = {
  playlist1: [
    { title: 'Samajavaragamana', artist: 'Sid Sriram' },
    { title: 'Inkem Inkem Inkem Kaavaale', artist: 'Sid Sriram' },
    { title: 'Butta Bomma', artist: 'Armaan Malik' },
    { title: 'Neeli Neeli Aakasam', artist: 'Sid Sriram' },
    { title: 'Pilla Raa', artist: 'Anurag Kulkarni' },
    { title: 'Undiporaadhey', artist: 'Sid Sriram' }
  ],
  playlist2: [
    { title: 'Ramuloo Ramulaa', artist: 'Anurag Kulkarni' },
    { title: 'Dimaak Kharaab', artist: 'Keerthi Sagathia' },
    { title: 'Saranga Dariya', artist: 'Mangli' },
    { title: 'Blockbuster', artist: 'Shreya Ghoshal' },
    { title: 'Naatu Naatu', artist: 'Rahul Sipligunj' },
    { title: 'Oo Antava', artist: 'Indravathi Chauhan' }
  ],
  playlist3: [
    { title: 'Bullettu Bandi', artist: 'Mohana Bhogaraju' },
    { title: 'Bathukamma Song', artist: 'Mangli' },
    { title: 'Palletoori Pillada', artist: 'Folk' },
    { title: 'Orori Yogi', artist: 'Folk' },
    { title: 'Gollabama', artist: 'Folk' },
    { title: 'Gunna Gunna Mamidi', artist: 'Folk' }
  ],
  playlist4: [
    { title: 'Ninnu Kori', artist: 'Karthik' },
    { title: 'Evare', artist: 'Vijay Prakash' },
    { title: 'Yeduta Nilichina', artist: 'K.S.Chithra' },
    { title: 'Vellipomaakey', artist: 'Ali Reza' },
    { title: 'Priyathama Priyathama', artist: 'Chinmayi' },
    { title: 'Nuvvostanante', artist: 'K.S.Chithra' }
  ],
  playlist5: [
    { title: 'Sivashtakam', artist: 'Chorus' },
    { title: 'Govinda Namalu', artist: 'Chorus' },
    { title: 'Aditya Hrudayam', artist: 'Chorus' },
    { title: 'Lingashtakam', artist: 'Chorus' },
    { title: 'Sri Venkateswara Suprabhatam', artist: 'M.S.Subbulakshmi' },
    { title: 'Aigiri Nandini', artist: 'Chorus' }
  ],
  playlist6: [
    { title: 'Jai Bolo Telangana', artist: 'Vandemataram Srinivas' },
    { title: 'Podustunna Poddumeeda', artist: 'Gaddar' },
    { title: 'Veerulaara Vandanam', artist: 'Chorus' },
    { title: 'Ooru Manadira', artist: 'Gaddar' },
    { title: 'Palle Kanneru Peduthundo', artist: 'Goreti Venkanna' },
    { title: 'Bandenaka Bandi Katti', artist: 'Gaddar' }
  ]
};

playlists.forEach(pl => {
  const songsToAdd = newSongs[pl.id];
  if (songsToAdd) {
    songsToAdd.forEach((song, i) => {
      pl.songs.push({
        id: pl.id + '_new_' + i,
        title: song.title,
        artist: song.artist,
        // Reuse the cover and src from the first song in the playlist as placeholders
        cover: pl.songs[0].cover,
        src: pl.songs[0].src
      });
    });
  }
});

const newContent = 'const playlists = ' + JSON.stringify(playlists, null, 2) + ';\n\nexport default playlists;\n';

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Updated playlists.js");
