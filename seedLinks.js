db.getCollection('links').remove({});


db.links.insert({
    description: 'The very library we are working with now',
    url: 'https://github.com/facebook/react',
    topicId: ObjectId("574f42e2fd42bfc909678844"),
    voteCount: 0
});

db.links.insert({
    description: 'An app to manage your finances',
    url: 'https://22seven.com',
    topicId: ObjectId("574f42f7fd42bfc909678845"),
    voteCount: 0,
});


db.links.insert({
    description: 'Go find some news yourself!',
    url: 'https://google.com',
    topicId: ObjectId("574f4307fd42bfc909678846"),
    voteCount: 0,
});
