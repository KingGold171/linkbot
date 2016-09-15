const geturl = new RegExp(
    "(^|[ \t\r\n])((ftp|http|https|hxxp|hxxps|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
    , "g"
);
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
const filter = require('./linkfilter.js');
module.exports = function (msg) {
    let matches = msg.content.match(geturl);
    if (!matches || matches.length == 0)
        return;

    for (let link of matches) {
        link = link.replaceAll('hxx', 'htt');
        filter(link, (redirs) => {
            let temp = [];
            let alrd = [];
            let c = 1;
            outer: for (let x of redirs) {
                for (let x2 of alrd) {
                    console.log(`|${x.replaceAll('/', '').replaceAll('www.', '').trim()}|${x2.replaceAll('/', '').replaceAll('www.', '').trim()}|`)
                    if (x.replaceAll('/', '').replaceAll('www.', '').trim() === x2.replaceAll('/', '').replaceAll('www.', '').trim())
                        continue outer;
                }
                console.log("Through");
                temp.push(`**#${c++}**: \`${x}\``);
                alrd.push(x);
            }
            if (temp.length <= 1)
                return;
            msg.reply(`That link redirects to:\n${temp.join('\n')}\n**Be careful clicking on links from people you do not know.**`);
        })
    }
}