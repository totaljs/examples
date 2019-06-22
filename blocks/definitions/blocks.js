// JavaScript
MAP('/js/admin.js', '/js/script.js#admin');     // --> #admin is defined block

// CSS
MAP('/css/admin.css', '/css/style.css#admin'); // --> #admin is defined block

// Others examples with merging:
// MERGE('/css/website.css', 'ui.css#blockB,blockC', 'website.css');
// MERGE('/css/admin.css', 'ui.css#blockA,blockB,blockC', 'admin.css');