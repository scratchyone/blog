Object.defineProperty(Array.prototype, 'break', {
    value: function(chunkSize) {
        var array=this;
        return [].concat.apply([],
            array.map(function(elem,i) {
                return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
            })
        );
    }
});
fetch('posts.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    posts=myJson
    refreshposts()
  });
let hashnum=0
let posts=[{"title":"","body":"","id":1520038053}]
prev=1
truncposts=posts
refreshposts()
function refreshposts() {
truncposts=posts.break(5)
prev=1
hashnum=0
if(location.hash&&location.hash!="#"){
	hashnum=location.hash.slice(1)
}
if(truncposts.length<=1+hashnum) {
	prev=0
}
if(posts.length<=5) {
    hashnum=0
}
	truncposts=truncposts[hashnum]
if(app) {
app.truncposts=truncposts
app.posts=posts
app.prev=prev
app.hashnum=hashnum
}
}
window.onhashchange = function(){location.reload()}
var app = new Vue({
  el: '#app',
  data: {
    posts: posts,
		truncposts: truncposts,
		prev: prev,
		hashnum: hashnum
  }, 
	methods: {
		trimHtml: function(html, options) {

    options = options || {};

    var limit = options.limit || 100,
        preserveTags = (typeof options.preserveTags !== 'undefined') ? options.preserveTags : true,
        wordBreak = (typeof options.wordBreak !== 'undefined') ? options.wordBreak : false,
        suffix = options.suffix || '...',
        moreLink = options.moreLink || '';

    var arr = html.replace(/</g, "\n<")
        .replace(/>/g, ">\n")
        .replace(/\n\n/g, "\n")
        .replace(/^\n/g, "")
        .replace(/\n$/g, "")
        .split("\n");

    var sum = 0,
        row, cut, add,
        tagMatch,
        tagName,
        tagStack = [],
        more = false;

    for (var i = 0; i < arr.length; i++) {

        row = arr[i];
        // count multiple spaces as one character
        rowCut = row.replace(/[ ]+/g, ' ');

        if (!row.length) {
            continue;
        }

        if (row[0] !== "<") {

            if (sum >= limit) {
                row = "";
            } else if ((sum + rowCut.length) >= limit) {

                cut = limit - sum;

                if (row[cut - 1] === ' ') {
                    while(cut){
                        cut -= 1;
                        if(row[cut - 1] !== ' '){
                            break;
                        }
                    }
                } else {

                    add = row.substring(cut).split('').indexOf(' ');

                    // break on halh of word
                    if(!wordBreak) {
                        if (add !== -1) {
                            cut += add;
                        } else {
                            cut = row.length;
                        }
                    }
                }

                row = row.substring(0, cut) + suffix;

                if (moreLink) {
                    row += '<a href="' + moreLink + '" style="display:inline">»</a>';
                }

                sum = limit;
                more = true;
            } else {
                sum += rowCut.length;
            }
        } else if (!preserveTags) {
            row = '';
        } else if (sum >= limit) {

            tagMatch = row.match(/[a-zA-Z]+/);
            tagName = tagMatch ? tagMatch[0] : '';

            if (tagName) {
                if (row.substring(0, 2) !== '</') {

                    tagStack.push(tagName);
                    row = '';
                } else {

                    while (tagStack[tagStack.length - 1] !== tagName && tagStack.length) {
                        tagStack.pop();
                    }

                    if (tagStack.length) {
                        row = '';
                    }

                    tagStack.pop();
                }
            } else {
                row = '';
            }
        }

        arr[i] = row;
    }

    return {
        html: arr.join("\n").replace(/\n/g, ""),
        more: more
    };
}
		}
})