// A quick markov chain hack job. Thanks to Jason Bury
// (http://www.soliantconsulting.com/blog/2013/02/draft-title-generator-using-markov-chains),
// Glen, and Toad the Wet Sprocket.


var titles = [
  "Acid",
  "All I Want",
  "All In All",
  "All Right",
  "All She Said",
  "All Things In Time",
  "Almost",
  "Always Changing Probably",
  "American Tune",
  "Amnesia",
  "Anything You Want From Me (I'll Do)",
  "Are We Afraid",
  "Back On My Feet",
  "Be Careful",
  "Before You Were Born",
  "Begin",
  "Better Off Here",
  "Black Dog Beside Me",
  "Blindsight",
  "Blood Pressurize",
  "Brain Trust Kid",
  "Brother",
  "Butterflies",
  "Buzz Buzz",
  "California Wasted",
  "Careless",
  "Chapel Perilous",
  "Chicken",
  "Chile",
  "Chimera",
  "Cleareyed",
  "Come Back Down",
  "Come Down",
  "Comes A Time",
  "Copper Mining",
  "Corporal Brown",
  "Courage",
  "Cover Me",
  "Covered In Roses",
  "Cradle To Grave",
  "Crazy Life",
  "Crowing",
  "Cry",
  "Dam Would Break",
  "Darkest Hour",
  "Dead Cats",
  "Desire",
  "Didn't Think You Cared",
  "Don't Fade",
  "Don't Give Up",
  "Don't Go Away",
  "Don't Know Me",
  "Don't Need Anything",
  "Dopamine",
  "Drive By",
  "Duck And Cover",
  "Easier",
  "Eden",
  "Enough",
  "Everything But You",
  "Everything Matters",
  "Evil Fish",
  "Eyes Open Wide",
  "Fall Down",
  "Falling",
  "Finally Fading",
  "Fly From Heaven",
  "Francesca",
  "Fred Meyers",
  "Friendly Fire",
  "Gabriel",
  "Gather",
  "Get What You Want",
  "Golden Age",
  "Good Intentions",
  "Granted",
  "Greer Zoller",
  "Half Life",
  "Hey Bulldog",
  "Hide And Seek",
  "High On A Riverbed",
  "Hobbit On The Rocks",
  "Hold Her Down",
  "Hope",
  "Hour Of August (All I'll Ever Need)",
  "I Still Love You",
  "I Think About",
  "I Want A New Drug",
  "I Will Not Take These Things For Granted",
  "I Will Take My Time",
  "I Won't Lead The Way",
  "I'll Bet On You",
  "I'm Not Waiting",
  "I'm Tired",
  "In My Ear",
  "Inside",
  "Is It For Me",
  "Is There Anyone Out There",
  "It Doesn't Feel Like Christmas",
  "It Takes Time",
  "Jam",
  "Janitor",
  "Joyful Noise",
  "Keep Moving",
  "Know Me",
  "La Lune",
  "Last Sunset",
  "Last To Fall",
  "Lay Down For Me",
  "Let It Pass",
  "Let Me In (Feel)",
  "Let's Ruin Everything Tonight",
  "Liars Everywhere",
  "Life Is Beautiful",
  "Listen",
  "Little Buddha",
  "Little Bunny Foo Foo",
  "Little Heaven",
  "Little Man Big Man",
  "Love Is Where",
  "Marigolds",
  "Maya",
  "Men Just Leave",
  "Mr. Rogers",
  "My Own Town",
  "Nanci",
  "Never Once Cool",
  "New Constellation",
  "Next Day",
  "Nightingale Song",
  "No Blue Sky",
  "No Way Out",
  "Nothing Changes Everyday",
  "Nothing Is Alone",
  "Novocaine",
  "One Little Girl",
  "One Night At A Time",
  "One Wind Blows",
  "Only Silence",
  "Pale Blue",
  "Paper Room",
  "Political Science",
  "Pray Your Gods",
  "Professional Victim",
  "PS",
  "Rare Bird",
  "Reincarnation Song",
  "Released",
  "Reprise",
  "Revelator",
  "Rings",
  "Rock And Roll All Nite",
  "Running Out",
  "Sake Of The World",
  "Scenes From A Vinyl Recliner",
  "See You Again",
  "Shadows",
  "She Cried",
  "Shorn",
  "Silo Lullaby",
  "Simple",
  "Sleep Of The Blessed",
  "Slow And So Much Time",
  "Small Dark Movies",
  "So Alive",
  "Someone Hates You",
  "Something To Say",
  "Something's Always Wrong",
  "Somewhere Out There",
  "Soulmate",
  "Still Carrying You",
  "Stories I Tell",
  "Stupid",
  "Thank You",
  "Thankful",
  "The Atmosphere",
  "The Ballad Of Randy Guss",
  "The Eye",
  "The Hole",
  "The Innocent",
  "The Moment",
  "The Needle In His Arm",
  "The Next Day",
  "The Song Is Still Here",
  "Think About Your Troubles",
  "This Is My Life",
  "Throw It All Away",
  "Too Alone, Too Late",
  "Torn",
  "Train Wreck",
  "Trouble",
  "True",
  "Ugly American",
  "Unquiet",
  "Waiting",
  "Walk On The Ocean",
  "Walking Awake",
  "Walking On Water",
  "Wanton Song",
  "Warmth For The Many",
  "Way Away",
  "What It's For",
  "What Will",
  "Whatever I Fear",
  "When We Recovered",
  "Where Do You Find Your Joys",
  "Whose",
  "Windmills",
  "Window Pane",
  "Won't Let It",
  "Woodburning",
  "Wrapped In Water",
  "You Will Be Pwned",
];

var terminals = {};
var startwords = [];
var wordstats = {};

var synonyms = [
  //['A', 'The'],
  //['We', 'She', 'You'],
  //['Is', 'Will'],
  ['Walk', 'Drive', 'Sleep'],
  ['Big', 'Little', 'True', 'Easier', 'Small'],
  ['In', 'Inside'],
  ['My', 'Your'],
  ['Here', 'There'],
  ['Black', 'Blue', 'Dark'],
  ['Pray', 'Think', 'Gather', 'Cry'],
  ['Everything', 'Nothing', 'Anything', 'Enough'],
  ['Everywhere', 'Somewhere'],
  ['Water', 'Fire', 'Acid', 'Blood'],
  ['Fear', 'Love', 'Desire'],
  ['Ocean', 'Recliner', 'Riverbed', 'World', 'Jam', 'Dam'],
  ['Marigolds', 'Roses', 'Butterflies', 'Rings', 'Gods', 'Troubles', 'Windmills', 'Shadows', 'Things', 'Cats'],
  ['Randy', 'Fred', 'Greer', 'Nanci', 'Maya', 'Gabriel', 'Francesca'],
  ['Meyers', 'Zoller', 'Guss', 'Brown', 'Rogers'],
  ['Soulmate', 'Man', 'Bunny', 'Girl', 'Hobbit', 'Bulldog', 'Dog', 'Bird', 'Nightingale', 'Brother', 'Chimera', 'Chicken', 'Fish', 'Janitor', 'Victim', 'Kid', 'Revelator'],
  ['Ballad', 'Song', 'Reprise', 'Lullaby'],
  ['Almost', 'Never', 'Always', 'Ever'],
  ['Crowing', 'Mining', 'Waiting', 'Falling', 'Fading', 'Changing', 'Moving', 'Running', 'Carrying', 'Woodburning'],
  ['Evil', 'Ugly', 'Beautiful', 'Political', 'Professional', 'True', 'Good', 'Joyful'],
  ['Unquiet', 'Torn', 'Blessed', 'Innocent', 'Stupid', 'Simple', 'Shorn', 'Cleareyed', 'Careless', 'Beautiful', 'Thankful', 'Released'],
  ['Courage', 'Hope', 'Joys', 'Troubles', 'Trouble', 'Amnesia', 'Dopamine', 'Novocaine', 'Science', 'Silence'],
  ['California', 'Chile', 'Eden'],
  ['Dead', 'Alive'],
  ['Day', 'Night', 'Sunset', 'Age'],
  ['Vinyl', 'Paper', 'Copper'],
  ['Want', 'Need'],
  ['Hole', 'Needle'],
];

var pushword = function (w1, w2) {
  if (wordstats.hasOwnProperty(w1)) {
    wordstats[w1].push(w2);
  } else {
    wordstats[w1] = [w2];
  }
};

var ready = function() {
  for (var i = 0; i < titles.length; ++i) {
    var words = titles[i].split(' ');
    if (words.length > 1) {
      terminals[words[words.length-1]] = true;
    }
    startwords.push(words[0]);
    for (var j = 0; j < words.length - 1; ++j) {
      pushword(words[j], words[j+1]);
    }
  }
  // weird ending words
  terminals['You'] = false;
  terminals['For'] = false;
  terminals['Out'] = false;

  generate();
};

// what's the most popular generated title in N tries?
// (it turns out to be 'Beautiful')
var most_popular_title = function () {
  var popular_titles = {}

  for (var i = 0; i < 500; ++i) {
    var t = make_title(1 + Math.floor(4 * Math.random()));
    if (popular_titles.hasOwnProperty(t))
      popular_titles[t]++;
    else
      popular_titles[t] = 1;
  }

  var best_title;
  var best_score = 0;
  for (var i in popular_titles) {
    if (popular_titles.hasOwnProperty(i)) {
      if (popular_titles[i] > best_score) {
        best_score = popular_titles[i];
        best_title = i;
      }
    }
  }

  var fieldNameElement = document.getElementById('generated_title');
  fieldNameElement.innerHTML = best_title;
}

var generate = function () {
  var title = make_title(1 + Math.floor(4 * Math.random()));
  var fieldNameElement = document.getElementById('generated_title');
  fieldNameElement.innerHTML = title;
};

var has_word = function (title, word) {
  var i = title.indexOf(word);
  var j = i + word.length;
  return (i == 0 || (i > 0 && title.charAt(i - 1) == ' '))
    && (title.length == j || title.charAt(j) == ' ');
};

var force_word = function () {
  var f = prompt('What word (from an existing title) should I try to use?', choice(startwords)).toLowerCase();

  var title = '';
  var max = 10000;
  while (!has_word(title.toLowerCase(), f) && max-- > 0) {
    title = make_title(1 + Math.floor(4 * Math.random()));
  }
  var fieldNameElement = document.getElementById('generated_title');
  fieldNameElement.innerHTML = title;
};

var choice = function (a) {
  var i = Math.floor(a.length * Math.random());
  return a[i];
};

var synonym = function (w) {
  for (var i = 0; i < synonyms.length; ++i) {
    if (synonyms[i].indexOf(w) != -1) {
      return choice(synonyms[i]);
    }
  }
  return w;
};

var make_title = function (min_length) {

  // too many synonyms spoil the markov chain effect
  var how_many_synonyms = 2;

  var word = choice(startwords);
  var w = synonym(word);
  if (w != word) how_many_synonyms--;

  var title = [w];
  if (Math.random() > 0.5 && wordstats.hasOwnProperty(w)) word = w;
  while (wordstats.hasOwnProperty(word)) {
    var next_words = wordstats[word];
    word = choice(next_words);

    var w = word;
    if (how_many_synonyms > 0) {
      w = synonym(w);
      if (w != word) how_many_synonyms--;
    }
    title.push(w);

    if (title.length > min_length && terminals.hasOwnProperty(w) && terminals[w]) break;
    if (Math.random() > 0.5 && wordstats.hasOwnProperty(w)) word = w;
  }

  var ret = title.join(' ');

  // don't return an existing song
  if (titles.indexOf(ret) != -1) return make_title(min_length);

  // check parens are balanced
  if (ret.indexOf('(') == -1 && ret.indexOf(')') != -1) {
    ret = ret.replace(')', '');
  }
  if (ret.indexOf('(') != -1 && ret.indexOf(')') == -1) {
    ret += ')';
  }

  // don't do things like "A Ocean"
  ret = ret.replace(/ A A/g, ' An A');
  ret = ret.replace(/ A E/g, ' An E');
  ret = ret.replace(/ A I/g, ' An I');
  ret = ret.replace(/ A O/g, ' An O');

  return ret;
};
