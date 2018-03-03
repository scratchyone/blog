var fs = require('fs-extra');
 
fs.readFile('posts.json', 'utf8', function(err, contents) {
    posts=JSON.parse(contents)
    posts.forEach(function(post,index){
        fs.mkdir("posts/"+post.id,function(){
            fs.copy('post.js', "posts/"+post.id+"/post.js", (err) => {
                if (err) throw err;
            });
            fs.copy('template.html', "posts/"+post.id+"/index.html", (err) => {
                if (err) throw err;
            });
            fs.copy('main.css', "posts/"+post.id+"/main.css", (err) => {
                if (err) throw err;
            });
            fs.writeFile("posts/"+post.id+"/post.json", JSON.stringify(post), (err) => {
                 if (err) throw err;
                 console.log('Saved #'+index);
            });
        })
        
    })
});
 