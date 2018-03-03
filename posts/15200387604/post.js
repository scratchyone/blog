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
fetch('post.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    post=myJson
    refreshposts()
  });
let hashnum=0
let post=[{"title":"","body":"","id":1520038053}]
refreshposts()
function refreshposts() {
if(app) {
app.post=post
}
}
var app = new Vue({
  el: '#app',
  data: {
    post: post,
  }, 
	methods: {
		}
})