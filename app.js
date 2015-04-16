// jsinq をロード
require('./jsinq');
require('./jsinq-query');

// デバッグコード

 

// LINQコード
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

