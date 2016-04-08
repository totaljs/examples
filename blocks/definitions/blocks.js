// JavaScript
F.map('/js/admin.js', '/js/script.js#admin'); // --> #admin is defined block

// CSS
F.map('/css/admin.css', '/css/style.css#admin'); // --> #admin is defined block

// Others examples with merging:
// F.merge('/css/website.css', 'ui.css#blockB,blockC', 'website.css');
// F.merge('/css/admin.css', 'ui.css#blockA,blockB,blockC', 'admin.css');