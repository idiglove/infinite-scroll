const { faker } = require("@faker-js/faker");

module.exports = () => {
  const data = { posts: [] };

  for (let i = 0; i < 10; i++) {
  // for (let i = 0; i < 10000; i++) {
    data.posts.push({
      id: i,
      title: faker.internet.domainName(),
      content: faker.lorem.paragraphs(),
      image: faker.image.url(),
    });
  }

  return data;
};
