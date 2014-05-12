exports.install = function (framework) {
    // sets the route
    framework.route('/admin/articles', view_articles);
    framework.route('/admin/articles', json_articles, ['xhr', 'post']);
};

function view_articles() {
    
    var self = this;
    var thisdate = '';
    
    var model = {
        title: '',
        date: '',
        subtitle: '',
        article: '',
        category: 0,
        draft: false,
        pagetitle: 'Articles',
        pagesubtitle: 'Create edit and delete articles'
    };

    self.repository.category = [
        {
            id: 0,
            name: 'Select Category'
        },
        {
            id: 1,
            name: 'General Info'
        },
        {
            id: 2,
            name: 'Safety'
        },
        {
            id: 3,
            name: 'Products'
        },
        {
            id: 4,
            name: 'Videos'
        }
    ]
    self.repository.categories = "categories";
    self.repository.date = thisdate;
    self.repository.pagetitle = 'articles';
    self.layout('_adminlayout');
    self.view('articles', model);
}


function json_articles() {

    var self = this;
    var success = false;
    var field = self.validate(self.post, ['title', 'date', 'subtitle', 'article', 'category', 'draft']);


    if (self.user !== null) {
        field.add('loggedin');
    }

    if (field.hasError()) {
        self.json(field);
        return;
    } else {
        success = true;
    }

}
