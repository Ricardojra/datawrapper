!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("svelte/account",t):e.account=t()}(this,function(){"use strict";function e(){}function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e,t){t.appendChild(e)}function s(e,t,n){t.insertBefore(e,n)}function a(e){e.parentNode.removeChild(e)}function r(e){for(var t=0;t<e.length;t+=1)e[t]&&e[t].d()}function o(e){return document.createElement(e)}function i(e){return document.createTextNode(e)}function c(e,t,n){e.addEventListener(t,n,!1)}function u(e,t,n){e.removeEventListener(t,n,!1)}function l(e,t,n){e.setAttribute(t,n)}function d(e,t,n){e.style.setProperty(t,n)}function f(){return Object.create(null)}function h(t){this.destroy=e,this.fire("destroy"),this.set=this.get=e,!1!==t&&this._fragment.u(),this._fragment.d(),this._fragment=this._state=null}function m(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function g(e,t){return e!=e?t==t:e!==t}function p(e,t){var n=e in this._handlers&&this._handlers[e].slice();if(n)for(var s=0;s<n.length;s+=1){var a=n[s];a.__calling||(a.__calling=!0,a.call(this,t),a.__calling=!1)}}function v(e){return e?this._state[e]:this._state}function _(e,t,n){var s=t.bind(this);return n&&!1===n.init||s(this.get()[e],void 0),this.on(n&&n.defer?"update":"state",function(t){t.changed[e]&&s(t.current[e],t.previous&&t.previous[e])})}function w(e,t){if("teardown"===e)return this.on("destroy",t);var n=this._handlers[e]||(this._handlers[e]=[]);return n.push(t),{cancel:function(){var e=n.indexOf(t);~e&&n.splice(e,1)}}}function b(e){for(;e&&e.length;)e.shift()()}var N={destroy:h,get:v,fire:p,observe:_,on:w,set:function(e){this._set(t({},e)),this.root._lock||(this.root._lock=!0,b(this.root._beforecreate),b(this.root._oncreate),b(this.root._aftercreate),this.root._lock=!1)},teardown:h,_recompute:e,_set:function(e){var n=this._state,s={},a=!1;for(var r in e)this._differs(e[r],n[r])&&(s[r]=a=!0);a&&(this._state=t(t({},n),e),this._recompute(s,this._state),this._bind&&this._bind(s,this._state),this._fragment&&(this.fire("state",{changed:s,current:this._state,previous:n}),this._fragment.p(s,this._state),this.fire("update",{changed:s,current:this._state,previous:n})))},_mount:function(e,t){this._fragment[this._fragment.i?"i":"m"](e,t||null)},_unmount:function(){this._fragment&&this._fragment.u()},_differs:m};function y(e,t){var n=arguments;if(void 0===t&&(t="core"),e=e.trim(),!dw.backend.__messages[t])return"MISSING:"+e;var s=dw.backend.__messages[t][e]||dw.backend.__messages.core[e]||e;if(arguments.length>2)for(var a=2;a<arguments.length;a++){var r=a-1;s=s.replace("$"+r,n[a])}return s}function x(e,t,n,s,a){var r={method:t,body:s,mode:"cors",credentials:n};window.fetch(e,r).then(function(e){return 200!=e.status?new Error(e.statusText):e.text()}).then(function(e){try{return JSON.parse(e)}catch(t){return console.warn("malformed json input",e),e}}).then(a).catch(function(e){console.error(e)})}function P(e,t,n){return 2==arguments.length&&(n=t,t="include"),x(e,"GET",t,null,n)}function k(e,t,n){return x(e,"PUT","include",t,n)}var E={changeEmail:function(){var e=this,t=this.get(),n=t.email,s=t.userId;this.set({savingEmail:!0}),k("/api/users/"+s,JSON.stringify({email:n}),function(t){e.set({savingEmail:!1});var s=[],a=[];"error"==t.status&&a.push(t.message),t.data&&t.data.messages&&t.data.messages.forEach(function(e){s.push(e)}),t.data&&t.data.errors&&t.data.errors.forEach(function(e){a.push(e)}),0==a.length?e.set({originalEmail:n,changeEmail:!1,messages:s,errors:[]}):e.set({errors:a})})},changePassword:function(){var e,t,n,s=this,a=this.get(),r=a.currentPassword,o=a.newPassword1,i=a.newPassword2,c=a.userId,u=(e=o,t=i,""===r?n=dw.backend.messages.provideCurPwd:e.length<4?n=dw.backend.messages.pwdTooShort:e!=t&&(n=dw.backend.messages.pwdMismatch),n||!0);if(!0===u)this.set({savingPassword:!0}),P("/api/auth/salt",function(e){if("ok"==e.status){var t=e.data.salt,n={oldpwhash:CryptoJS.HmacSHA256(r,t).toString(),pwd:CryptoJS.HmacSHA256(o,t).toString()};k("/api/users/"+c,JSON.stringify(n),function(e){s.set({savingPassword:!1,currentPassword:"",newPassword1:"",newPassword2:""});var t=[],n=[];"error"==e.status&&n.push(e.message),e.data&&e.data.messages&&e.data.messages.forEach(function(e){t.push(e)}),e.data&&e.data.errors&&e.data.errors.forEach(function(e){n.push(e)}),0==n.length?(t.push("Your password was changed sucessfully"),s.set({changePassword:!1,messages:t,errors:[]})):s.set({errors:n})})}else s.set({errors:["Could not load salt."],savingPassword:!1})});else{var l=[u];this.set({errors:l})}},deleteAccount:function(){var e=this,t=this.get().confirmPassword;this.set({deletingAccount:!0}),P("/api/auth/salt",function(n){if("ok"==n.status){var s=CryptoJS.HmacSHA256(t,n.data.salt).toString();x("/api/users/current?pwd="+s,"DELETE","include",JSON.stringify({pwd:s}),function(t){e.set({deletingAccount:!1});var n=[];"error"==t.status&&n.push(t.message),t.data&&t.data.messages&&t.data.messages.forEach(function(e){}),t.data&&t.data.errors&&t.data.errors.forEach(function(e){n.push(e)}),0==n.length?e.set({deleteAccount2:!1,deleteAccount3:!0}):e.set({errors:n})})}else e.set({errors:["Could not load salt."],deletingAccount:!1})})}};function A(e){var t=e.changed,n=e.current,s=e.previous;t.email&&!s&&this.set({originalEmail:n.email})}function H(e,t){var r,c,u,l,d,f,h,m,g,p=y("Edit profile"),v=y("account / change-login");function _(e){return e.changePassword?Y:e.deleteAccount?j:e.deleteAccount2?D:e.deleteAccount3?B:e.changeEmail?F:G}var w=_(t),b=w(e,t);return{c:function(){r=o("div"),c=o("div"),u=o("h1"),l=i(p),d=i("\n        "),f=o("h2"),h=i(v),m=i("\n\n"),b.c(),g=document.createComment(""),this.h()},h:function(){c.className="span10 offset1",r.className="row"},m:function(e,t){s(r,e,t),n(c,r),n(u,c),n(l,u),n(d,c),n(f,c),n(h,f),s(m,e,t),b.m(e,t),s(g,e,t)},p:function(t,n){w===(w=_(n))&&b?b.p(t,n):(b.u(),b.d(),(b=w(e,n)).c(),b.m(g.parentNode,g))},u:function(){a(r),a(m),b.u(),a(g)},d:function(){b.d()}}}function T(t,n){var r,i=n.message,c=(n.each_value,n.message_index,i);return{c:function(){r=o("li")},m:function(e,t){s(r,e,t),r.innerHTML=c},p:function(e,t){i=t.message,t.each_value,t.message_index,e.errors&&c!==(c=i)&&(r.innerHTML=c)},u:function(){r.innerHTML="",a(r)},d:e}}function M(e,i){for(var c,u,l=i.errors,f=[],h=0;h<l.length;h+=1)f[h]=T(0,t(t({},i),{each_value:l,message:l[h],message_index:h}));return{c:function(){c=o("div"),u=o("ul");for(var e=0;e<f.length;e+=1)f[e].c();this.h()},h:function(){d(u,"margin-bottom","0"),c.className="alert"},m:function(e,t){s(c,e,t),n(u,c);for(var a=0;a<f.length;a+=1)f[a].m(u,null)},p:function(e,n){var s=n.errors;if(e.errors){for(var a=0;a<s.length;a+=1){var r=t(t({},n),{each_value:s,message:s[a],message_index:a});f[a]?f[a].p(e,r):(f[a]=T(0,r),f[a].c(),f[a].m(u,null))}for(;a<f.length;a+=1)f[a].u(),f[a].d();f.length=s.length}},u:function(){a(c);for(var e=0;e<f.length;e+=1)f[e].u()},d:function(){r(f)}}}function L(t,n){var r,i=n.message,c=(n.each_value_1,n.message_index_1,i);return{c:function(){r=o("li")},m:function(e,t){s(r,e,t),r.innerHTML=c},p:function(e,t){i=t.message,t.each_value_1,t.message_index_1,e.errors&&c!==(c=i)&&(r.innerHTML=c)},u:function(){r.innerHTML="",a(r)},d:e}}function C(e,i){for(var c,u,l=i.errors,f=[],h=0;h<l.length;h+=1)f[h]=L(0,t(t({},i),{each_value_1:l,message:l[h],message_index_1:h}));return{c:function(){c=o("div"),u=o("ul");for(var e=0;e<f.length;e+=1)f[e].c();this.h()},h:function(){d(u,"margin-bottom","0"),c.className="alert"},m:function(e,t){s(c,e,t),n(u,c);for(var a=0;a<f.length;a+=1)f[a].m(u,null)},p:function(e,n){var s=n.errors;if(e.errors){for(var a=0;a<s.length;a+=1){var r=t(t({},n),{each_value_1:s,message:s[a],message_index_1:a});f[a]?f[a].p(e,r):(f[a]=L(0,r),f[a].c(),f[a].m(u,null))}for(;a<f.length;a+=1)f[a].u(),f[a].d();f.length=s.length}},u:function(){a(c);for(var e=0;e<f.length;e+=1)f[e].u()},d:function(){r(f)}}}function S(t,n){var r,i=n.message,c=(n.each_value_2,n.message_index_2,i);return{c:function(){r=o("li")},m:function(e,t){s(r,e,t),r.innerHTML=c},p:function(e,t){i=t.message,t.each_value_2,t.message_index_2,e.errors&&c!==(c=i)&&(r.innerHTML=c)},u:function(){r.innerHTML="",a(r)},d:e}}function I(e,i){for(var c,u,l=i.errors,f=[],h=0;h<l.length;h+=1)f[h]=S(0,t(t({},i),{each_value_2:l,message:l[h],message_index_2:h}));return{c:function(){c=o("div"),u=o("ul");for(var e=0;e<f.length;e+=1)f[e].c();this.h()},h:function(){d(u,"margin-bottom","0"),c.className="alert"},m:function(e,t){s(c,e,t),n(u,c);for(var a=0;a<f.length;a+=1)f[a].m(u,null)},p:function(e,n){var s=n.errors;if(e.errors){for(var a=0;a<s.length;a+=1){var r=t(t({},n),{each_value_2:s,message:s[a],message_index_2:a});f[a]?f[a].p(e,r):(f[a]=S(0,r),f[a].c(),f[a].m(u,null))}for(;a<f.length;a+=1)f[a].u(),f[a].d();f.length=s.length}},u:function(){a(c);for(var e=0;e<f.length;e+=1)f[e].u()},d:function(){r(f)}}}function J(t,n){var r,i=n.message,c=(n.each_value_3,n.message_index_3,i);return{c:function(){r=o("li")},m:function(e,t){s(r,e,t),r.innerHTML=c},p:function(e,t){i=t.message,t.each_value_3,t.message_index_3,e.messages&&c!==(c=i)&&(r.innerHTML=c)},u:function(){r.innerHTML="",a(r)},d:e}}function O(e,i){for(var c,u,l,f,h=i.messages,m=[],g=0;g<h.length;g+=1)m[g]=J(0,t(t({},i),{each_value_3:h,message:h[g],message_index_3:g}));return{c:function(){c=o("div"),u=o("div"),l=o("div"),f=o("ul");for(var e=0;e<m.length;e+=1)m[e].c();this.h()},h:function(){d(f,"margin-bottom","0"),l.className="alert alert-success",u.className="span6 offset3",c.className="row",d(c,"margin-top","20px")},m:function(e,t){s(c,e,t),n(u,c),n(l,u),n(f,l);for(var a=0;a<m.length;a+=1)m[a].m(f,null)},p:function(e,n){var s=n.messages;if(e.messages){for(var a=0;a<s.length;a+=1){var r=t(t({},n),{each_value_3:s,message:s[a],message_index_3:a});m[a]?m[a].p(e,r):(m[a]=J(0,r),m[a].c(),m[a].m(f,null))}for(;a<m.length;a+=1)m[a].u(),m[a].d();m.length=s.length}},u:function(){a(c);for(var e=0;e<m.length;e+=1)m[e].u()},d:function(){r(m)}}}function Y(e,t){var r,f,h,m,g,p,v,_,w,b,N,x,P,k,E,A,H,T,L,C,S,I,J,O,Y,j,D,B,F,G,$,q,z,R,U,K,Q,V,W,X,Z,ee,te,ne,se=y("account / password"),ae=y("For security reasons we ask you to provide your current password. Please make sure you use a strong password."),re=y("Current Password"),oe=!1,ie=y("For security reasons, please provide your current password."),ce=y("New Password"),ue=!1,le=y("(repeat)"),de=!1,fe=y("Back"),he=y("account / password"),me=t.errors&&t.errors.length&&M(0,t);function ge(){oe=!0,e.set({currentPassword:H.value}),oe=!1}function pe(){ue=!0,e.set({newPassword1:D.value}),ue=!1}function ve(){de=!0,e.set({newPassword2:R.value}),de=!1}function _e(t){e.set({changePassword:!1})}function we(t){e.changePassword()}return{c:function(){r=o("div"),f=o("div"),h=o("div"),m=o("h2"),g=i(se),p=i("\n\t            "),v=o("p"),_=i(ae),w=i("\n\n\t            "),me&&me.c(),b=i("\n\n\t            "),N=o("fieldset"),x=o("div"),P=o("label"),k=i(re),E=i("\n\t                    "),A=o("div"),H=o("input"),T=i("\n\t                        "),L=o("p"),C=i(ie),S=i("\n\t                "),I=o("div"),J=o("label"),O=i(ce),Y=i("\n\t                    "),j=o("div"),D=o("input"),B=i("\n\t                "),F=o("div"),G=o("label"),$=i(le),q=i("\n\t                    "),z=o("div"),R=o("input"),U=i("\n\n\t                "),K=o("div"),Q=o("button"),V=i(fe),W=i("\n\t                    "),X=o("button"),Z=o("i"),te=i("  \n\t                    \t"),ne=i(he),this.h()},h:function(){P.className="control-label",c(H,"input",ge),l(H,"type","password"),H.className="input-xlarge",L.className="help-block",A.className="controls",x.className="control-group",J.className="control-label",c(D,"input",pe),l(D,"type","password"),D.className="input-xlarge",j.className="controls",I.className="control-group",G.className="control-label",c(R,"input",ve),l(R,"type","password"),R.className="input-xlarge",z.className="controls",F.className="control-group",c(Q,"click",_e),Q.className="btn btn-save btn-default btn-back",Z.className=ee="fa "+(t.savingPassword?"fa-spin fa-spinner":"fa-check")+" svelte-u71xal",c(X,"click",we),X.className="btn btn-primary",d(X,"float","right"),h.className="form-horizontal edit-account-confirm",f.className="span6 offset3",r.className="row"},m:function(e,a){s(r,e,a),n(f,r),n(h,f),n(m,h),n(g,m),n(p,h),n(v,h),n(_,v),n(w,h),me&&me.m(h,null),n(b,h),n(N,h),n(x,N),n(P,x),n(k,P),n(E,x),n(A,x),n(H,A),H.value=t.currentPassword,n(T,A),n(L,A),n(C,L),n(S,N),n(I,N),n(J,I),n(O,J),n(Y,I),n(j,I),n(D,j),D.value=t.newPassword1,n(B,N),n(F,N),n(G,F),n($,G),n(q,F),n(z,F),n(R,z),R.value=t.newPassword2,n(U,N),n(K,N),n(Q,K),n(V,Q),n(W,K),n(X,K),n(Z,X),n(te,X),n(ne,X)},p:function(e,t){t.errors&&t.errors.length?me?me.p(e,t):((me=M(0,t)).c(),me.m(h,b)):me&&(me.u(),me.d(),me=null),oe||(H.value=t.currentPassword),ue||(D.value=t.newPassword1),de||(R.value=t.newPassword2),e.savingPassword&&ee!==(ee="fa "+(t.savingPassword?"fa-spin fa-spinner":"fa-check")+" svelte-u71xal")&&(Z.className=ee)},u:function(){a(r),me&&me.u()},d:function(){me&&me.d(),u(H,"input",ge),u(D,"input",pe),u(R,"input",ve),u(Q,"click",_e),u(X,"click",we)}}}function j(t,r){var l,f,h,m,g,p,v,_,w,b,N,x,P,k,E,A,H,T,M,L,C=y("account / confirm-account-deletion"),S=y("account / confirm-account-deletion / no"),I=y("account / or"),J=y("account / confirm-account-deletion / yes");function O(e){t.set({deleteAccount:!1})}function Y(e){t.set({deleteAccount:!1,deleteAccount2:!0})}return{c:function(){l=o("div"),f=o("div"),(h=o("div")).innerHTML='<i class="fa fa-times"></i>',m=i("\n\n\t        "),g=o("h2"),p=i(C),v=i("\n\n\n\t        "),_=o("div"),w=o("button"),b=o("i"),N=i("   "),x=i(S),P=i("\n\n\t\t        "),k=o("div"),E=i(I),A=i("\n\n\t\t        "),H=o("button"),T=o("i"),M=i("   "),L=i(J),this.h()},h:function(){h.className="iconholder svelte-u71xal",d(g,"margin-bottom","20px"),g.className="svelte-u71xal",b.className="fa fa-chevron-left",c(w,"click",O),w.className="btn btn-back btn-primary",d(k,"display","block"),d(k,"margin","0px 10px"),T.className="fa fa-times",c(H,"click",Y),H.className="btn btn-default",d(_,"display","flex"),d(_,"justify-content","center"),d(_,"align-items","center"),f.className="span6 offset3",d(f,"text-align","center"),l.className="row delete-account svelte-u71xal"},m:function(e,t){s(l,e,t),n(f,l),n(h,f),n(m,f),n(g,f),n(p,g),n(v,f),n(_,f),n(w,_),n(b,w),n(N,w),n(x,w),n(P,_),n(k,_),n(E,k),n(A,_),n(H,_),n(T,H),n(M,H),n(L,H)},p:e,u:function(){a(l)},d:function(){u(w,"click",O),u(H,"click",Y)}}}function D(e,t){var r,f,h,m,g,p,v,_,w,b,N,x,P,k,E,A,H,T,M,L,S,I,J,O,Y,j,D,B,F,G,$,q,z,R,U,K,Q,V,W,X,Z,ee=y("Account deletion"),te=y("Think about it one more time. Have you considered all the consequences of deleting your account?"),ne=y("account / confirm-account-deletion / free"),se=y("You cannot login and logout anymore."),ae=y("You cannot edit or remove your charts anymore."),re=y("Note that this will only delete your account. Your charts will not be removed. If you want to remove your charts, please do it manually."),oe=y("Please enter your password to confirm the deletion request:"),ie=!1,ce=y("Do you still <b>really</b> want to delete your Datawrapper account?"),ue=y("No, I changed my mind.."),le=y("Yes, delete it!"),de=t.errors&&t.errors.length&&C(0,t);function fe(){ie=!0,e.set({confirmPassword:D.value}),ie=!1}function he(t){e.set({deleteAccount2:!1})}function me(t){e.deleteAccount()}return{c:function(){r=o("div"),f=o("div"),h=o("h2"),m=i(ee),g=i("\n\n\t        "),de&&de.c(),p=i("\n\n\t        "),v=o("p"),_=i(te),w=i("\n\t        "),b=o("ul"),N=o("li"),x=i(ne),P=o("li"),k=i(se),E=o("li"),A=i(ae),H=i("\n\t        "),T=o("p"),M=i(re),L=i("\n\t        "),S=o("div"),I=o("p"),J=o("b"),O=i(oe),Y=i("\n\t            "),j=o("div"),D=o("input"),B=i("\n\t            "),F=o("p"),G=i("\n\t            "),$=o("div"),q=o("button"),z=o("i"),R=i(" \n\t                \t"),U=i(ue),K=i("\n\t                "),Q=o("button"),V=o("i"),X=i(" \n\t            \t    "),Z=i(le),this.h()},h:function(){d(h,"margin-bottom","20px"),h.className="svelte-u71xal",c(D,"input",fe),l(D,"type","password"),D.placeholder=y("Password"),j.className="control-group",z.className="fa fa-chevron-left",c(q,"click",he),q.className="btn btn-info",V.className=W="fa "+(t.deletingAccount?"fa-spin fa-spinner":"fa-check")+" svelte-u71xal",c(Q,"click",me),d(Q,"float","right"),Q.className="btn btn-danger",$.className="control-group",S.className="",f.className="span6 offset3",r.className="row delete-account svelte-u71xal"},m:function(e,a){s(r,e,a),n(f,r),n(h,f),n(m,h),n(g,f),de&&de.m(f,null),n(p,f),n(v,f),n(_,v),n(w,f),n(b,f),n(N,b),n(x,N),n(P,b),n(k,P),n(E,b),n(A,E),n(H,f),n(T,f),n(M,T),n(L,f),n(S,f),n(I,S),n(J,I),n(O,J),n(Y,S),n(j,S),n(D,j),D.value=t.confirmPassword,n(B,S),n(F,S),F.innerHTML=ce,n(G,S),n($,S),n(q,$),n(z,q),n(R,q),n(U,q),n(K,$),n(Q,$),n(V,Q),n(X,Q),n(Z,Q)},p:function(e,t){t.errors&&t.errors.length?de?de.p(e,t):((de=C(0,t)).c(),de.m(f,p)):de&&(de.u(),de.d(),de=null),ie||(D.value=t.confirmPassword),e.deletingAccount&&W!==(W="fa "+(t.deletingAccount?"fa-spin fa-spinner":"fa-check")+" svelte-u71xal")&&(V.className=W)},u:function(){F.innerHTML="",a(r),de&&de.u()},d:function(){de&&de.d(),u(D,"input",fe),u(q,"click",he),u(Q,"click",me)}}}function B(t,r){var c,u,l,f,h,m,g,p=y("Your account has been deleted."),v=y("Goodbye!");return{c:function(){c=o("div"),u=o("div"),l=o("h2"),f=i(p),h=i("\n\t        "),m=o("a"),g=i(v),this.h()},h:function(){d(l,"margin-bottom","20px"),d(l,"text-align","center"),l.className="svelte-u71xal",m.href="/",m.className="btn btn-primary btn-large",u.className="span6 offset3",d(u,"text-align","center"),c.className="row delete-account svelte-u71xal"},m:function(e,t){s(c,e,t),n(u,c),n(l,u),n(f,l),n(h,u),n(m,u),n(g,m)},p:e,u:function(){a(c)},d:e}}function F(e,t){var r,f,h,m,g,p,v,_,w,b,N,x,P,k,E,A,H,T,M,L,C,S,J,O,Y,j,D,B,F,G=y("account / email"),$=y("account / confirm-email-change"),q=y("E-Mail"),z=!1,R=y("Back"),U=y("account / email"),K=t.errors&&t.errors.length&&I(0,t);function Q(){z=!0,e.set({email:T.value}),z=!1}function V(t){e.set({changeEmail:!1})}function W(t){e.changeEmail()}return{c:function(){r=o("div"),f=o("div"),h=o("div"),m=o("h2"),g=i(G),p=i("\n\t            "),v=o("p"),_=i($),w=i("\n            \n\t            "),K&&K.c(),b=i("\t        \t\n\n\t            "),N=o("fieldset"),x=o("div"),P=o("label"),k=i(q),E=i(":"),A=i("\n\t                    "),H=o("div"),T=o("input"),L=i("\n\t                \n\t                "),C=o("div"),S=o("button"),J=i(R),O=i("\n\t                    "),Y=o("button"),j=o("i"),B=i("                     \t\t\n\t                    "),F=i(U),this.h()},h:function(){P.className="control-label",P.htmlFor="email",c(T,"input",Q),T.disabled=M=!t.changeEmail,l(T,"type","text"),H.className="controls",x.className="control-group",c(S,"click",V),S.className="btn btn-default",j.className=D="fa "+(t.savingEmail?"fa-spin fa-spinner":"fa-check")+" svelte-u71xal",c(Y,"click",W),d(Y,"float","right"),Y.className="btn btn-save btn-primary",C.className="",h.className="form-horizontal edit-account",f.className="span6 offset3",r.className="row"},m:function(e,a){s(r,e,a),n(f,r),n(h,f),n(m,h),n(g,m),n(p,h),n(v,h),n(_,v),n(w,h),K&&K.m(h,null),n(b,h),n(N,h),n(x,N),n(P,x),n(k,P),n(E,P),n(A,x),n(H,x),n(T,H),T.value=t.email,n(L,N),n(C,N),n(S,C),n(J,S),n(O,C),n(Y,C),n(j,Y),n(B,Y),n(F,Y)},p:function(e,t){t.errors&&t.errors.length?K?K.p(e,t):((K=I(0,t)).c(),K.m(h,b)):K&&(K.u(),K.d(),K=null),z||(T.value=t.email),e.changeEmail&&M!==(M=!t.changeEmail)&&(T.disabled=M),e.savingEmail&&D!==(D="fa "+(t.savingEmail?"fa-spin fa-spinner":"fa-check")+" svelte-u71xal")&&(j.className=D)},u:function(){a(r),K&&K.u()},d:function(){K&&K.d(),u(T,"input",Q),u(S,"click",V),u(Y,"click",W)}}}function G(e,t){var r,f,h,m,g,p,v,_,w,b,N,x,P,k,E,A,H,T,M,L,C,S,I,J,Y,j,D,B,F,G,$,q,z,R,U=y("E-Mail"),K=y("account / email"),Q=y("Password"),V=y("account / password"),W=y("account / or"),X=y("account / delete"),Z=t.messages&&t.messages.length&&O(0,t);function ee(t){e.set({changeEmail:!0})}function te(t){e.set({changePassword:!0})}function ne(t){e.set({deleteAccount:!0})}return{c:function(){Z&&Z.c(),r=i("\t  \n\n\t"),f=o("div"),h=o("div"),m=o("div"),g=o("div"),p=i(U),v=i(":"),_=i("\n\t\t\t\t"),w=o("div"),b=o("input"),x=i("\n\t\t\t\t"),P=o("div"),k=o("button"),E=i(K),A=i("\n\n\t    \t"),H=o("div"),T=o("div"),M=i(Q),L=i(":"),C=i("\n\t\t\t\t"),S=o("div"),I=o("input"),J=i("\n\t\t\t\t"),Y=o("div"),j=o("button"),D=i(V),B=i("\n\n\t    \t"),F=o("div"),G=i(W),$=i(" "),q=o("span"),z=i(X),R=i("."),this.h()},h:function(){g.className="svelte-u71xal",b.disabled=N=!t.changeEmail,b.value=t.originalEmail,l(b,"type","text"),w.className="svelte-u71xal",c(k,"click",ee),k.className="btn btn-save btn-default",P.className="svelte-u71xal",m.className="svelte-u71xal",T.className="svelte-u71xal",I.disabled=!0,I.value="abcdefgh",l(I,"type","password"),S.className="svelte-u71xal",c(j,"click",te),j.className="btn btn-save btn-default",Y.className="svelte-u71xal",H.className="svelte-u71xal",c(q,"click",ne),q.className="link svelte-u71xal",l(q,"href","#"),d(F,"text-align","center"),d(F,"display","block"),F.className="svelte-u71xal",h.className="span6 offset3",f.className="row edit-account svelte-u71xal",d(f,"margin-top",(t.messages&&t.messages.length?0:20)+"px")},m:function(e,t){Z&&Z.m(e,t),s(r,e,t),s(f,e,t),n(h,f),n(m,h),n(g,m),n(p,g),n(v,g),n(_,m),n(w,m),n(b,w),n(x,m),n(P,m),n(k,P),n(E,k),n(A,h),n(H,h),n(T,H),n(M,T),n(L,T),n(C,H),n(S,H),n(I,S),n(J,H),n(Y,H),n(j,Y),n(D,j),n(B,h),n(F,h),n(G,F),n($,F),n(q,F),n(z,q),n(R,F)},p:function(e,t){t.messages&&t.messages.length?Z?Z.p(e,t):((Z=O(0,t)).c(),Z.m(r.parentNode,r)):Z&&(Z.u(),Z.d(),Z=null),e.changeEmail&&N!==(N=!t.changeEmail)&&(b.disabled=N),e.originalEmail&&(b.value=t.originalEmail),e.messages&&d(f,"margin-top",(t.messages&&t.messages.length?0:20)+"px")},u:function(){Z&&Z.u(),a(r),a(f)},d:function(){Z&&Z.d(),u(k,"click",ee),u(j,"click",te),u(q,"click",ne)}}}function $(e){!function(e,t){e._handlers=f(),e._bind=t._bind,e.options=t,e.root=t.root||e,e.store=e.root.store||t.store}(this,e),this._state=t({changePassword:!1,changeEmail:!1,deleteAccount:!1,showPasswordInPlaintext:!1,messages:[],currentPassword:"",newPassword1:"",newPassword2:"",confirmPassword:""},e.data),this._handlers.state=[A];var n=this;e.root||(this._oncreate=[]),this._fragment=H(this,this._state),this.root._oncreate.push(function(){var e={changePassword:1,errors:1,currentPassword:1,newPassword1:1,newPassword2:1,savingPassword:1,deleteAccount:1,deleteAccount2:1,confirmPassword:1,deletingAccount:1,deleteAccount3:1,changeEmail:1,email:1,savingEmail:1,messages:1,originalEmail:1};A.call(n,{changed:e,current:n._state}),n.fire("update",{changed:e,current:n._state})}),e.target&&(this._fragment.c(),this._mount(e.target,e.anchor),b(this._oncreate))}function q(e,n){this._observers={pre:f(),post:f()},this._handlers={},this._dependents=[],this._computed=f(),this._sortedComputedProperties=[],this._state=t({},e),this._differs=n&&n.immutable?g:m}t($.prototype,N),t($.prototype,E),t(q.prototype,{_add:function(e,t){this._dependents.push({component:e,props:t})},_init:function(e){for(var t={},n=0;n<e.length;n+=1){var s=e[n];t["$"+s]=this._state[s]}return t},_remove:function(e){for(var t=this._dependents.length;t--;)if(this._dependents[t].component===e)return void this._dependents.splice(t,1)},_sortComputedProperties:function(){var e,t=this._computed,n=this._sortedComputedProperties=[],s=f();function a(r){if(e[r])throw new Error("Cyclical dependency detected");if(!s[r]){s[r]=!0;var o=t[r];o&&(e[r]=!0,o.deps.forEach(a),n.push(o))}}for(var r in this._computed)e=f(),a(r)},compute:function(e,t,n){var s,a=this,r={deps:t,update:function(r,o,i){var c=t.map(function(e){return e in o&&(i=!0),r[e]});if(i){var u=n.apply(null,c);a._differs(u,s)&&(s=u,o[e]=!0,r[e]=s)}}};r.update(this._state,{},!0),this._computed[e]=r,this._sortComputedProperties()},fire:p,get:v,observe:_,on:w,onchange:function(e){return console.warn("store.onchange is deprecated in favour of store.on('state', event => {...})"),this.on("state",function(t){e(t.current,t.changed)})},set:function(e){var n=this._state,s=this._changed={},a=!1;for(var r in e){if(this._computed[r])throw new Error("'"+r+"' is a read-only property");this._differs(e[r],n[r])&&(s[r]=a=!0)}if(a){this._state=t(t({},n),e);for(var o=0;o<this._sortedComputedProperties.length;o+=1)this._sortedComputedProperties[o].update(this._state,s);this.fire("state",{changed:s,current:this._state,previous:n});var i=this._dependents.slice();for(o=0;o<i.length;o+=1){var c=i[o],u={};a=!1;for(var l=0;l<c.props.length;l+=1){var d=c.props[l];d in s&&(u["$"+d]=this._state[d],a=!0)}a&&c.component.set(u)}this.fire("update",{changed:s,current:this._state,previous:n})}}});return{App:$,store:new q({}),data:{chart:{id:""},readonly:!1,chartData:"",transpose:!1,firstRowIsHeader:!0,skipRows:0}}});