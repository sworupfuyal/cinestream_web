const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:6050';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// 50 Movies with Valid IMDb Title URLs + Poster URLs

// const sampleMovies=[

  

  


// ];


const sampleMovies=[
 
  {
    "title": "Seven Samurai",
    "description": "A village hires samurai to defend against bandits.",
    "director": "Akira Kurosawa",
    "cast": "Toshirô Mifune, Takashi Shimura",
    "releaseYear": 1954,
    "duration": 207,
    "genres": "Action, Adventure, Drama",
    "imdbUrl": "https://www.imdb.com/title/tt0047478/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Seven_Samurai_%281954%29.jpg"
  },
  {
    "title": "It's a Wonderful Life",
    "description": "An angel helps a despondent man see his impact on the world.",
    "director": "Frank Capra",
    "cast": "James Stewart, Donna Reed",
    "releaseYear": 1946,
    "duration": 130,
    "genres": "Drama, Family, Fantasy",
    "imdbUrl": "https://www.imdb.com/title/tt0038650/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/2/25/Its_a_Wonderful_Life_%281946%29.png"
  },
  {
    "title": "Se7en",
    "description": "Two detectives hunt a serial killer using the seven deadly sins.",
    "director": "David Fincher",
    "cast": "Brad Pitt, Morgan Freeman",
    "releaseYear": 1995,
    "duration": 127,
    "genres": "Crime, Drama, Mystery",
    "imdbUrl": "https://www.imdb.com/title/tt0114369/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/6/68/Seven_%28movie%29_poster.jpg"
  },
  {
    "title": "The Silence of the Lambs",
    "description": "An FBI trainee seeks help from a cannibalistic killer to catch another murderer.",
    "director": "Jonathan Demme",
    "cast": "Jodie Foster, Anthony Hopkins",
    "releaseYear": 1991,
    "duration": 118,
    "genres": "Crime, Drama, Thriller",
    "imdbUrl": "https://www.imdb.com/title/tt0102926/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg"
  },
  {
    "title": "Rashomon",
    "description": "Different perspectives on a crime in feudal Japan challenge the truth.",
    "director": "Akira Kurosawa",
    "cast": "Toshiro Mifune, Machiko Kyō",
    "releaseYear": 1950,
    "duration": 88,
    "genres": "Drama, Mystery, Crime",
    "imdbUrl": "https://www.imdb.com/title/tt0042876/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Rashomon_movie_poster.jpg"
  },
  {
    "title": "The Seventh Seal",
    "description": "A knight plays chess with Death during the Black Plague.",
    "director": "Ingmar Bergman",
    "cast": "Max von Sydow",
    "releaseYear": 1957,
    "duration": 96,
    "genres": "Drama, Fantasy",
    "imdbUrl": "https://www.imdb.com/title/tt0050976/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/a/a5/Seventh_Seal.jpg"
  },
  {
    "title": "Blade Runner",
    "description": "A blade runner hunts rogue androids in a dystopian future.",
    "director": "Ridley Scott",
    "cast": "Harrison Ford, Rutger Hauer",
    "releaseYear": 1982,
    "duration": 117,
    "genres": "Sci‑Fi, Thriller",
    "imdbUrl": "https://www.imdb.com/title/tt0083658/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/5/53/Blade_Runner_poster.jpg"
  },
  {
    "title": "The Big Lebowski",
    "description": "A laid‑back bowler gets tangled in a kidnapping case.",
    "director": "Joel Coen, Ethan Coen",
    "cast": "Jeff Bridges, John Goodman",
    "releaseYear": 1998,
    "duration": 117,
    "genres": "Comedy, Crime",
    "imdbUrl": "https://www.imdb.com/title/tt0118715/",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/3/35/Big_Lebowski_poster.jpg"
  },
  {
    "title": "A Clockwork Orange",
    "description": "A delinquent undergoes controversial rehabilitation treatment.",
    "director": "Stanley Kubrick",
    "cast": "Malcolm McDowell",
    "releaseYear": 1971,
    "duration": 136,
    "genres": "Crime, Drama, Sci‑Fi",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/4/4b/Clockwork_orange.jpg"
  },
  {
    "title": "Back to the Future",
    "description": "A teen travels back in time and must ensure his parents meet.",
    "director": "Robert Zemeckis",
    "cast": "Michael J. Fox, Christopher Lloyd",
    "releaseYear": 1985,
    "duration": 116,
    "genres": "Adventure, Comedy, Sci‑Fi",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/d/d2/Back_to_the_Future.jpg"
  },
  {
    "title": "The Terminator",
    "description": "A cyborg assassin is sent back to kill a woman whose son leads the future resistance.",
    "director": "James Cameron",
    "cast": "Arnold Schwarzenegger",
    "releaseYear": 1984,
    "duration": 107,
    "genres": "Action, Sci‑Fi",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/7/70/Terminator1984movieposter.jpg"
  },
  {
    "title": "Jurassic World",
    "description": "A dinosaur theme park faces chaos when cloned dinos escape.",
    "director": "Colin Trevorrow",
    "cast": "Chris Pratt, Bryce Dallas Howard",
    "releaseYear": 2015,
    "duration": 124,
    "genres": "Action, Adventure, Sci‑Fi",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/e/ed/Jurassic_World_poster.jpg"
  },
  {
    "title": "The Lion in Winter",
    "description": "King Henry II and his family vie for succession and power.",
    "director": "Anthony Harvey",
    "cast": "Peter O'Toole, Katharine Hepburn",
    "releaseYear": 1968,
    "duration": 132,
    "genres": "Drama, History, Romance",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/8/82/The_Lion_in_Winter_%281968%29.jpg"
  },
  {
    "title": "Some Like It Hot",
    "description": "Two musicians disguise as women to escape gangsters.",
    "director": "Billy Wilder",
    "cast": "Marilyn Monroe, Tony Curtis",
    "releaseYear": 1959,
    "duration": 121,
    "genres": "Comedy, Romance",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Some_Like_It_Hot_poster.jpg"
  },
  {
    "title": "The Graduate",
    "description": "A recent college grad is seduced by an older woman then falls for her daughter.",
    "director": "Mike Nichols",
    "cast": "Dustin Hoffman, Anne Bancroft",
    "releaseYear": 1967,
    "duration": 106,
    "genres": "Comedy, Drama, Romance",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/3/3e/Graduateposter.jpg"
  },
  {
    "title": "The Princess Bride",
    "description": "A fairy‑tale adventure of love and swordplay.",
    "director": "Rob Reiner",
    "cast": "Cary Elwes, Robin Wright",
    "releaseYear": 1987,
    "duration": 98,
    "genres": "Adventure, Comedy, Romance",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/d/db/Princess_Bride_poster.jpg"
  },
  {
    "title": "Good Will Hunting",
    "description": "A janitor at MIT is a math genius who confronts his past.",
    "director": "Gus Van Sant",
    "cast": "Matt Damon, Robin Williams",
    "releaseYear": 1997,
    "duration": 126,
    "genres": "Drama, Romance",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/b/b8/Good_Will_Hunting_theatrical_poster.jpg"
  },
  {
    "title": "The Breakfast Club",
    "description": "Five teens spend a Saturday in detention and bond.",
    "director": "John Hughes",
    "cast": "Emilio Estevez, Judd Nelson",
    "releaseYear": 1985,
    "duration": 97,
    "genres": "Comedy, Drama",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/4/45/Breakfast_Club_Poster.jpg"
  },
  {
    "title": "Die Hard",
    "description": "An NYPD officer fights terrorists in a high‑rise during Christmas.",
    "director": "John McTiernan",
    "cast": "Bruce Willis",
    "releaseYear": 1988,
    "duration": 132,
    "genres": "Action, Thriller",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/en/7/7e/Die_hard.jpg"
  }


];

async function getAdminToken() {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.token;
}

async function addMovie(movie, token) {
  const response = await fetch(`${API_BASE_URL}/api/admin/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `Failed to add movie`);
  }

  return response.json();
}

async function seedMovies() {
  try {
    console.log('🎬 Seeding movies...');
    const token = await getAdminToken();

    let added = 0;
    for (const movie of sampleMovies) {
      try {
        await addMovie(movie, token);
        console.log(`✅ Added: ${movie.title}`);
        added++;
      } catch (err) {
        console.error(`❌ Failed: ${movie.title}`);
      }
    }

    console.log(`✨ Done! Added ${added}/${sampleMovies.length}`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
}

seedMovies();