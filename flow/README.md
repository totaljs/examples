# Total.js inline Flow

Total.js framework supports inline Flow files which can be edited at https://floweditor.totaljs.com (offline) - just drag and drop the file to the Flow editor. Total.js Code editor includes an offline flow editor for `flowstreams/*.flow` files.

The framework watches all `flowstreams/*.flow` files and automatically restarts the app after a change is made. You can use this mechanism for creating workflows, services or extending app functionality.

__IMPORTANT:__ all flow files are evaluated in the app process directly (there is no worker involved), so created routes can work without a reverse proxy and every Flow can change existing Total.js app functionality.

---