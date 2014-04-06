exports.install = function(framework) {
    framework.route('/', view_homepage);
    framework.websocket('/', socket_homepage, ['json']);
};

function view_homepage() {
    var self = this;
    self.view('homepage');
}

function socket_homepage() {
    var self = this;

    self.on('open', function(client) {

        var pair = self.find(function(user) {
            return user.get.room === client.get.room && user.id !== client.id;
        });

        client.pair = pair;

        // We must waiting
        if (pair === null)
            return;

        pair.pair = client;
        pair.send({ 'type': 'start-host' });
        client.send({ 'type': 'start-client' });
    });

    self.on('close', function(client) {
        if (client.pair === null)
            return;
        client.pair.close();
    });

    self.on('message', function(client, message) {
        if (client.pair === null)
            return;
        client.pair.send(message);
    });
}