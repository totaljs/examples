exports.install = function () {
	CORS();
	ROUTE('GET             /api/tutorials/            *Tutorials --> query');
	ROUTE('POST            /api/tutorials/            *Tutorials --> insert');
	ROUTE('GET             /api/tutorials/{id}/       *Tutorials --> read');
	ROUTE('PUT             /api/tutorials/{id}/       *Tutorials --> update');
	ROUTE('DELETE          /api/tutorials/{id}/       *Tutorials --> delete');
	ROUTE('DELETE          /api/tutorials/            *Tutorials --> delete_all');
};

