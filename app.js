// $B%S%e!<Dj5A(B
var prof_viewquery = ("prefix Prof: <http://prof.test/> " +
   "prefix Lab: <http://lab.test/>  " + 
        "select * " +
        "where " +
        "{ ?profID Prof:Name ?Name ." +
        "?profID Lab:ID ?labID . }");

// $B%S%e!<Dj5A(B
var lab_viewquery = ("prefix Prof: <http://prof.test/> " +
    "prefix Lab: <http://lab.test/>  " + 
    "select * " +
    "where " +
    "{ ?ID Lab:Name ?Name }");

// jsinq $B$r%m!<%I(B
require('./jsinq');
require('./jsinq-query');

// $B%G%P%C%0%3!<%I(B
console.log("View Query1: " + prof_viewquery );
console.log("View Query2: " + lab_viewquery );

// LINQ$B%3!<%I(B
var querystr = ' \
               from prof in $0 \
               join lab in $1 \
               on prof.labID equals lab.ID \
               where lab.Name == "KDE" \
               select [prof.profID, prof.Name, lab.Name]  \
               ';

// expectedresult = ' <http://profs.test/p1> Kitagawa KDE . <http://profs.test/p2> Amagasa KDE ';

console.log("LINQ Query:" + querystr);

var query = new jsinq.Query(querystr);

query.executeQuery(query, [prof_viewquery, lab_viewquery],
    function (values) {
        for (var key in values) {
            console.log(key + ': ' + values[key]);
        }
    });

// console.log(query.getQueryFunction().toString());

