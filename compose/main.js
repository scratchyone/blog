function titlevalid(e, t) {
  window.setTimeout(() => {
    if (t.innerHTML.replace(/(\r\n|\n|\r|<br>)/gm, "") != t.innerHTML) {
      t.innerHTML = t.innerHTML.replace(/(\r\n|\n|\r|<br>)/gm, "");
      t.blur();
    }
  }, 5);
}
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};
let tabname = 1;
function tab(t, i) {
  let obj = document.getElementById(i);
  if (i == "tab1") {
    tabname = 2;
    document.getElementById("tab1-c").style.display = "none";
    document.getElementById("tab2-c").style.display = "block";
    document.getElementById("tab2-c").innerHTML = mark(
      document.getElementById("mdtext").value
    );
  } else {
    tabname = 1;
    document.getElementById("tab1-c").style.display = "block";
    document.getElementById("tab2-c").style.display = "none";
  }
  if (t.classList.contains("focus")) {
    t.className =
      "no-underline bg-white inline-block text-blue hover:text-blue-darker py-2 px-4 font-semibold";
    obj.className =
      "focus no-underline bg-white inline-block border-l border-t border-r rounded-t text-blue-dark py-2 px-4 font-semibold";
  } else {
    t.className =
      "focus no-underline bg-white inline-block border-l border-t border-r rounded-t text-blue-dark py-2 px-4 font-semibold";
    obj.className =
      "no-underline bg-white inline-block text-blue hover:text-blue-darker py-2 px-4 font-semibold";
  }
}
function mark(input) {
	const converter = new showdown.Converter({
      simpleLineBreaks: true,
      strikethrough: true
    });
  txt = converter.makeHtml(input);
  rgex = /\$\(.+?\)\$/g;
  y = txt.match(rgex);
  if (y) {
		rep=[]
    Array.prototype.forEach.call(y, function(z) {
      txt = txt.split(z).join(
        katex.renderToString(
          z
            .split("$(")
            .join("")
            .split(")$")
            .join("")
        )
      );
    });
  }
  return txt;
}
function exportpost() {
  exported = { title: document.getElementById("posttitle").innerText, body: mark(document.getElementById("mdtext").value), id:Math.round((new Date()).getTime() / 1000)};
	x=JSON.stringify(exported)
	document.getElementById("clip").value=x
	document.getElementById("clip").style.display="inline"
	document.getElementById("clip").focus()
	document.getElementById("clip").select()
	document.execCommand('copy')
	document.getElementById("clip").style.display="none"
	document.getElementById("copied").style.display="inline"
	document.getElementById("copied").addEventListener("transitionend", function(event) {
	document.getElementById("copied").style.display="none"
  document.getElementById("copied").style.opacity=100
}, false);
	window.setTimeout(function(){document.getElementById("copied").style.opacity=0},2000)
}
