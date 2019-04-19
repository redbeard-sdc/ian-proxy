const faker = require('faker');
const fs = require('fs');

const columnNames = [
  'id', 
  'hotel_name', 
  'hotel_amenities', 
  'room_features', 
  'hotel_style', 
  'hotel_class', 
  'hotel_link', 
  'about', 
  'photos', 
  'overall', 
  'location', 
  'cleanliness', 
  'service', 
  'value'
]

// Generate a random hotel name using faker
const hotelNameGenerator = () => {
  let cityName = faker.address.city();
  let suffixes = ['Inn', 'Lodge', 'Hotel', 'Resort', 'Suites'];
  let randomIndex = Math.floor(Math.random() * suffixes.length); 
  let hotelName = '' + cityName + ' ' + suffixes[randomIndex];
  return hotelName;
};

// Generate random amenities list
const generateAmenities = () => {
  const result = [];
  const amenities = [
    'Restaurant', 
    'Free parking', 
    'Bar/Lounge', 
    'Banquet Room', 
    'Conference Facilities', 
    'Meeting rooms', 
    'Multilingual Staff', 'Pool', 
    'Free Internet', 
    'Breakfast included', 
    'Heated pool', 
    'Hot Tub', 
    'Indoor pool', 
    'Non-smoking hotel', 
    'Pets Allowed', 
    'Self-Serve Laundry', 
    'Wheelchair access', 
    'Hot Tub', 
    'Laundry Service'
  ];

  let random = Math.floor(Math.random() * (amenities.length - 10) + 10);
  for (let i = 0; i < random; i++) {
    result.push(amenities[i]); 
  }
  return result;
};

// Generate up to 4 random room features
var generateRoomFeatures = () => {
  const result = [];
  const features = [
    'Accessible rooms', 
    'Microwave', 
    'Refrigerator in room', 
    'Kitchenette', 
    'Air conditioning', 
    'Family Rooms', 
    'Non-smoking rooms', 
    'Smoking rooms available', 
    'Suites'
  ];

  let random = Math.floor(Math.random() * (features.length - 4) + 4);
  for (let i = 0; i < random; i++) {
    result.push(features[i]); 
  }
  return result;
};

// Generate 1 random hotel style
const generateHotelStyle = () => {
  const result = [];
  const styles = [
    'Great View', 
    'Safe', 
    'Quaint', 
    'Charming', 
    'Historic Hotel', 
    'Great View', 
    'Business', 
    'Family', 
    'Ocean View', 
    'Beachfront', 
    'Mid-range', 
    'Quiet', 
    'Rustic'
  ];

  for (let i = 0; i < 2; i++) {
    let random = Math.floor(Math.random() * styles.length);
    if (!result.includes(styles[random])) {
      result.push(styles[random]); 
    }
  }
  return result;
};

// Generate a random number from 1-5 for ratings columns
// Will run 4 times, cleanliness, location, service, value ratings
const getNumberForRatings = () => {
  return Math.floor(Math.random() * (5 - 1) + 1);
};

// Generate a random number for hotel class
const getNumberForClass = () => {
  return Math.floor(Math.random() * (6 - 1) + 1);
}

// Generate text for link to hotel website
const getHotelLink = () => {
  return 'www.fakehotel.com';
}

// Generate random hotel image url
const randomNumGenerator = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomImage = () => {
  return `https://s3.us-west-1.amazonaws.com/stanleyhotel/Stanley${randomNumGenerator(0, 6).toString()}.jpg`
}

// Random about text
const generateAboutText = () => {
  return `
  At vero eos et accusamus et iusto odio dignissimos ducimus qui
  blanditiis praesentium voluptatum deleniti atque corrupti quos
  dolores et quas molestias excepturi sint occaecati cupiditate non
  provident, similique sunt in culpa qui officia deserunt mollitia
  animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
  est et expedita distinctio. Nam libero tempore, cum soluta nobis est
  eligendi optio cumque nihil impedit quo minus id quod maxime placeat
  facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
  Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus
  saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
  Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
  voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`;
};

const createFakeHotels = () => {

  fs.writeFileSync('./data.csv', columnNames.join(','));
  let count = 1;
  // was 1000
  for (let j = 0; j < 1000; j += 1) {
    let fakeHotels = '';
    // was 10000
    for (let i = 1; i <= 10000; i += 1) {
      let [cleanlinessRating, locationRating, serviceRating, valueRating] = [
        getNumberForRatings(),
        getNumberForRatings(),
        getNumberForRatings(),
        getNumberForRatings()
      ];

      const id = count;
      const hotel_name = hotelNameGenerator();
      const hotel_amenities = generateAmenities();
      const room_features = generateRoomFeatures();
      const hotel_style = generateHotelStyle();
      const hotel_class = getNumberForClass();
      const hotel_link = getHotelLink();
      const about = generateAboutText();
      const photos = [randomImage(), randomImage(), randomImage(), randomImage()];
      const overall = Math.floor(
        (cleanlinessRating + locationRating + serviceRating + valueRating) / 4
      );
      const hotel = `${id}, ${hotel_name}, ${hotel_amenities}, ${room_features}, ${hotel_style}, ${hotel_class}, ${hotel_link}, ${about}, ${photos}, ${overall}, ${cleanlinessRating}, ${locationRating}, ${serviceRating}, ${valueRating}`;

      fakeHotels += `${hotel}\n`;
      count += 1;
    }
    fs.appendFileSync('./data.csv', fakeHotels);
  }
};

console.log(createFakeHotels());