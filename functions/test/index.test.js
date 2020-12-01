const assert = require('assert');
const test = require('firebase-functions-test')(); 
const functions = require('../index');

var user1 = {
  courses: ["CSE 143", "PSYC 250", "BIO 258"],
  instagramHandle: null,
  clubs: "I'm part of AKPSI, DubHacks and the Elite LeetCode team.",
  hobbies:
    "I love sushi, favorite dish has to be salmon sashimi You can see me at ShareTea drinking Boba.  Catch me at Countdown 2020 ;). Oh, I also love my subaru sti ... ahaha...",
  image: null,
  phone: "502340234",
  name: "Kevin Nguyen",
  linkedinURL: "https://linkedin.com/in/anshaysaboo",
  hometown: "Los Angeles",
  major: "Finance",
  age: 20,
  school: "University of California, Berkeley",
  email: "chickennugget@gmail.com",
  uid: "NBN5KsvAGXbFYXxt9PUt",
};

var user2 =  {
  "phone": "1234567890",
  "linkedinURL": "linkedin.com/in/anshaysaboo",
  "hometown": "Los Angeles",
  "instagramHandle": "@bobmeyers",
  "courses": [
      "PSYCH 200",
      "ARTSCI 193",
      "POLISCI 738"
  ],
  "hobbies": "Watching Marvel movies and eating brownies.",
  "email": "bobby@uw.edu",
  "name": "Bob Meyers",
  "school": "University of Washington, Seattle",
  "major": "Liberal Studies",
  "clubs": "Skate Club, Drama, and Tech Theater!\t",
  "age": 21,
  "uid": "Oacle9muUUWCxGGUhw5LTkNNZHj1",
  "rating": 0.5714285714285714
}; 

var user3 =   {
  "courses": ["CSE 143", "PSYC 250", "BIO 258"],
  "age": 18,
  "clubs": "AKPSI",
  "instagramHandle": null,
  "hometown": "Vancouver",
  "email": "jyoonbae@gmail.com",
  "hobbies": "I LOVE NAPS <33. I like to eat A LOT. Also if you play games like Among Us, I'm down to play :))",
  "name": "Sarah Wong",
  "school": "University of Washington, Seattle",
  "linkedinURL": null,
  "major": "Biology",
  "phone": "50418324",
  "image": null,
  "uid": "WD3ArZJ5VmF6n50Yf0jL",
  "rating": 1.4285714285714286
}

var user4 =   {
  "courses": [
      "CPSC 210",
      "BIOL 324",
      "BIO 258"
  ],
  "age": 18,
  "clubs": "DubHacks, Google Developers, Cheese Club",
  "instagramHandle": null,
  "hometown": "Los Angeles",
  "email": "jyoonbae@abcsdw4e@gmail.com",
  "hobbies": "Just chillinnn. Love sunsets and sushi. Also Boba tooo. Hmu if you like r&b",
  "name": "Ricky Liu",
  "school": "University of British Columbia",
  "linkedinURL": null,
  "major": "Finance",
  "phone": "2349832212",
  "image": null,
  "uid": "VPxrgrmtYCqJccdBHi5u",
}

describe("test getAgeRating with an age gap of 1", () => {
  it("should return 8", () => {
    assert.strictEqual(functions.getAgeRating(user1, user2), 8)
  }); 
});

describe("test getAgeRating with an age gap of 3", () => {
  it("should return 4", () => {
    assert.strictEqual(functions.getAgeRating(user2, user3), 4)
  }); 
});

describe("test getAgeRating with an age gap of 0", () => {
  it("should return 10", () => {
    assert.strictEqual(functions.getAgeRating(user3, user4), 10)
  }); 
});

describe("test getSchoolRating with different school", () => {
  it("should return 0", () => {
    assert.strictEqual(functions.getSchoolRating(user1, user2), 0)
  }); 
});

describe("test getSchoolRating with the same school", () => {
  it("should return 10", () => {
    assert.strictEqual(functions.getSchoolRating(user2, user3), 10)
  }); 
});

describe("test getRelativeCourseRating with no courses matching", () => {
  it("should return 0", () => {
    assert.strictEqual(functions.getRelativeCourseRating(user1, user2), 0)
  }); 
});

describe("test getRelativeCourseRating with all courses matching", () => {
  it("should return 6", () => {
    assert.strictEqual(functions.getRelativeCourseRating(user1, user3), 6)
  }); 
});

describe("test getRelativeCourseRating with 1 course matching", () => {
  it("should return 2", () => {
    assert.strictEqual(functions.getRelativeCourseRating(user3, user4), 2)
  }); 
});

describe("test getAboutUsRating with no similarities", () => {
  it("should return 0", () => {
    assert.strictEqual(functions.getAboutUsRating(user1, user2), 0)
  }); 
});

describe("test getAboutUsRating with some similarities", () => {
  it("should return 1", () => {
    assert.strictEqual(functions.getAboutUsRating(user1, user4), 1)
  }); 
});

describe("test getMajorRating where majors match", () => {
  it("should return 2", () => {
    assert.strictEqual(functions.getMajorRating(user1, user4), 2)
  }); 
});

describe("test getMajorRating where majors don't match", () => {
  it("should return 0", () => {
    assert.strictEqual(functions.getMajorRating(user1, user3), 0)
  }); 
});

describe("test getclubRating where no clubs match", () => {
  it("should return 0", () => {
    assert.strictEqual(functions.getClubRating(user1, user2), 0)
  }); 
});

describe("test getclubRating where some clubs match", () => {
  it("should return 2", () => {
    assert.strictEqual(functions.getClubRating(user1, user3), 2)
  }); 
});

describe("test getHometownRating where hometown doesn't match", () => {
  it("should return 0", () => {
    assert.strictEqual(functions.getHometownRating(user2, user3), 0)
  }); 
});

describe("test getHometownRating where hometown matches", () => {
  it("should return 1", () => {
    assert.strictEqual(functions.getHometownRating(user1, user4), 1)
  }); 
});





