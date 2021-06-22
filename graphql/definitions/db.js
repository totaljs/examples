// Insert demo data

NOSQL('user').count().callback(function(err, data) {
    if (data.count === 0) {
        NOSQL('user').insert({id: 1, name: 'User 1', email: 'user 1 @gmail.com' });
        NOSQL('user').insert({id: 2, name: 'User 2', email: 'user 1 @gmail.com' });
    }
});
