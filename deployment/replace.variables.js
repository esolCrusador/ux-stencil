var replace = require('replace-in-file');

const date = new Date().toISOString();
const publishDate = date.substring(0, date.indexOf('T'));

const publishDateOptions = {
    files: 'dist/ux-stencil/browser/sitemap.xml',
    from: '{{ PUBLISH_DATE }}',
    to: publishDate,
};

try {
    let changedFiles = replace.sync(publishDateOptions);
    console.log(`Publish date set to ${publishDate} in ${changedFiles.length}`);
}
catch (error) {
    console.error('Error occurred:', error);
}