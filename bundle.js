(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
class superxmlparser74 {
    static parse(str, cbOpenTag, cbInnerText, cbClosedTag, cbOpenTagWithoutInnerText = () => {
    }, cbSelfOpenTag = () => {
    }) {
        let isOpen = false;
        let startAttr = false;
        let t = ''
        let tAttrKey = '';
        let tAttrValue = '';
        let tAttrStart = false;
        let tAttr = '';
        let attr = [];
        let prevCh = '';
        for (let i = 0; i <= str.length - 1; i++) {
            //(1)<li (2)class="breadcrumb-item-selected text-gray-light breadcrumb-item text-mono h5-mktg" aria-current="GitHub Student Developer Pack"(3)>GitHub Student Developer Pack(4)</li(5)>
            //<selfclosing />
            //comments // <!-- -->
            if (str[i] === '/' && str[i + 1] === "/") {
                for (let j = i + 2; j <= str.length - 1; j++) {
                    if (str[j] === '\n') {
                        i = j;
                        break;
                    }
                }
                continue
            } else if (str[i] === "<") { //1
                //comments <!-- -->
                if (str[i + 1] === '!' && str[i + 2] === "-" && str[i + 3] === "-") {
                    for (let j = i + 4; j <= str.length - 1; j++) {
                        if (str[j] === '-' && str[j + 1] === '-' && str[j + 2] === '>') {
                            i = j + 2;
                            break;
                        }
                    }
                    continue
                }
                ///

                if (t.trim() !== '' && t.trim() !== "\n" && t.trim() !== "\t") {
                    //cut innerTEXT 4
                    cbInnerText({
                        value: t
                    });
                    t = '';
                } else if (str[i + 1] !== "/") {
                    cbOpenTagWithoutInnerText({});
                }
                //open tag
                isOpen = true;
                if (str[i + 1] === "/") {
                    isOpen = false;
                    i = i + 1;
                    continue;
                }
            } else if (str[i] === '>') {
                ///closed tag - build 3/5
                if (isOpen) {
                    if (prevCh === "/") {
                        cbSelfOpenTag({
                            tag: t,
                            attr: attr
                        })
                    } else {
                        cbOpenTag({
                            tag: t,
                            attr: attr,
                        })
                    }
                } else {
                    cbClosedTag({})
                }
                attr = [];
                t = '';
                startAttr = false;
                isOpen = false;
            } else {
                //accum str
                if ((!startAttr && str[i] !== ' ') || !isOpen) {
                    t += str[i];
                } else if (startAttr) { //get attr 2
                    if (str[i] === '=') {
                        tAttrKey = tAttr
                        tAttr = '';
                    } else if (str[i] === '"') {
                        tAttrStart = !tAttrStart;
                        if (tAttrStart === false) {
                            if (tAttrKey === 'class') {
                                tAttrValue = tAttr.split(" ");
                            } else {
                                tAttrValue = [tAttr];
                            }
                            tAttr = '';
                            attr.push({key: tAttrKey, value: tAttrValue});
                            if (str[i + 1] === ' ') {
                                i = i + 1;
                                continue;
                            }
                        }
                    } else {
                        tAttr += str[i];
                    }

                } else if (str[i] === ' ' && isOpen) {
                    startAttr = true;
                }

            }
            prevCh = str[i];
        }
    }
}

global.window.superxmlparser74 = superxmlparser74;
module.exports = superxmlparser74;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
