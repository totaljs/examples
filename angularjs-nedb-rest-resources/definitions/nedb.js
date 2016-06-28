var Datastore = require('nedb');

db = {};
db.users = new Datastore(F.path.databases('users.db'));

db.users.loadDatabase();
// insert test data
/*
db.users.insert([{
	alias: "Hien Schoenborn",
	email: "mail@example.ch"
}, {
	alias: "Ashlee Headley",
	email: "mail@example.ch"
}, {
	alias: "Emery Luong",
	email: "mail@example.ch"
}, {
	alias: "Jerrod Zendejas",
	email: "mail@example.ch"
}, {
	alias: "Gwyn Mack",
	email: "mail@example.ch"
}, {
	alias: "Beth Ramsburg ",
	email: "mail@example.ch"
}, {
	alias: "Izola Sage",
	email: "mail@example.ch"
}, {
	alias: "Ilona Wetherington",
	email: "mail@example.ch"
}, {
	alias: "Kym Breese",
	email: "mail@example.ch"
}, {
	alias: "Sandra Corker",
	email: "mail@example.ch"
}, {
	alias: "Gemma Cusick",
	email: "mail@example.ch"
}, {
	alias: "Tory Windom",
	email: "mail@example.ch"
}], F.error());
*/
global.nedb = db;