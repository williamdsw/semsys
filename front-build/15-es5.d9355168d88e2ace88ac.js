!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,e){return(n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function r(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var a=c(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return o(this,n)}}function o(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{qUkX:function(o,c,a){"use strict";a.r(c),a.d(c,"ReportsModule",function(){return T});var i=a("ofXK"),s=a("3Pt+"),l=a("tyNb"),b=a("EY2u"),u=a("lJxs"),f=a("JIr8"),p=a("VCD0"),d=a("5soc"),g=a("YNhY"),h=a("vakP"),y=a("1w29"),m=a("fXoL"),v=a("sYmb"),O=a("n90K"),w=a("VQPA"),N=a("Oi0n"),x=a("ej43");function E(t,e){if(1&t&&(m.Ob(0,"th",13),m.uc(1),m.Yb(2,"translate"),m.Nb()),2&t){var n=e.$implicit;m.xb(1),m.wc(" ",m.Zb(2,1,n)," ")}}function S(t,e){if(1&t){var n=m.Pb();m.Ob(0,"tr"),m.Ob(1,"td",14),m.uc(2),m.Nb(),m.Ob(3,"td",14),m.uc(4),m.Yb(5,"date"),m.Nb(),m.Ob(6,"td",14),m.uc(7),m.Nb(),m.Ob(8,"td",14),m.uc(9),m.Nb(),m.Ob(10,"td",14),m.Ob(11,"button",15),m.Vb("click",function(){m.mc(n);var t=e.$implicit;return m.Xb(3).showDetailModal(t)}),m.uc(12),m.Yb(13,"translate"),m.Nb(),m.Nb(),m.Nb()}if(2&t){var r=e.$implicit,o=e.index;m.xb(2),m.wc(" ",o+1," "),m.xb(2),m.wc(" ",m.Zb(5,5,r.getEmission())," "),m.xb(3),m.wc(" ",r.getSchedule().getEmployee().getName(),""),m.xb(2),m.wc(" ",r.getSchedule().getStudent().getName(),""),m.xb(3),m.wc(" ",m.Zb(13,7,"report.details")," ... ")}}function k(t,e){if(1&t&&(m.Ob(0,"div",9),m.Ob(1,"table",10),m.Ob(2,"thead"),m.Ob(3,"tr"),m.sc(4,E,3,3,"th",11),m.Nb(),m.Nb(),m.Ob(5,"tbody"),m.sc(6,S,14,9,"tr",12),m.Nb(),m.Nb(),m.Nb()),2&t){var n=m.Xb().ngIf,r=m.Xb();m.xb(4),m.cc("ngForOf",r.tableHeaders),m.xb(2),m.cc("ngForOf",n)}}function j(t,e){if(1&t&&(m.Ob(0,"div",6),m.Ob(1,"div",7),m.sc(2,k,7,2,"div",8),m.Nb(),m.Nb()),2&t){var n=e.ngIf,r=m.Xb(),o=m.kc(13);m.xb(2),m.cc("ngIf",!r.hasError&&0!==n.length)("ngIfElse",o)}}function I(t,e){1&t&&(m.Ob(0,"span"),m.uc(1),m.Yb(2,"translate"),m.Yb(3,"translate"),m.Nb()),2&t&&(m.xb(1),m.xc(" ",m.Zb(2,2,"global.messages.loading")," ",m.Zb(3,4,"global.menu-links.my-reports")," ... "))}function P(t,e){if(1&t&&(m.Ob(0,"div",16),m.sc(1,I,4,6,"span",17),m.Nb()),2&t){var n=m.Xb(),r=m.kc(11);m.xb(1),m.cc("ngIf",!n.hasError)("ngIfElse",r)}}function Y(t,e){if(1&t){var n=m.Pb();m.Ob(0,"span"),m.uc(1),m.Yb(2,"translate"),m.Nb(),m.Ob(3,"button",18),m.Vb("click",function(){return m.mc(n),m.Xb().onReload()}),m.uc(4),m.Yb(5,"translate"),m.Nb()}2&t&&(m.xb(1),m.wc(" ",m.Zb(2,2,"global.messages.system-error")," "),m.xb(3),m.wc(" ",m.Zb(5,4,"global.buttons.reload")," "))}function _(t,e){if(1&t&&(m.Ob(0,"div",16),m.Ob(1,"span"),m.uc(2),m.Yb(3,"translate"),m.Nb(),m.Nb()),2&t){var n=m.Xb();m.xb(2),m.wc(" ",m.Zb(3,1,n.containsProfile("EMPLOYEE")?"report.employee-reports-not-found":"report.student-reports-not-found")," ")}}var D,Z,F,R=[{path:"",component:(D=function(o){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}(l,o);var c,a,i,s=r(l);function l(e,n,r,o,c){var a;return t(this,l),(a=s.call(this,e,n,r)).translateService=e,a.storageService=n,a.modalService=r,a.reportService=o,a.authenticationService=c,a.globalHeader="global.menu-links.my-reports",a.tableHeaders=["#","report.emission","report.written-by","report.about","report.information"],Object.assign(a._localUser,n.getLocalUser()),a}return c=l,(a=[{key:"ngOnInit",value:function(){this.records$=this.loadData()}},{key:"onUpdate",value:function(){}},{key:"onDelete",value:function(){}},{key:"onReload",value:function(){this.hasError=!1,this.records$=this.loadData()}},{key:"loadData",value:function(){return"Employee"===this._localUser.getType()?this.pipeFindAll(this.reportService.findAllByEmployee(this._localUser.getId())):"Student"===this._localUser.getType()?this.pipeFindAll(this.reportService.findAllByStudent(this._localUser.getId())):void 0}},{key:"pipeFindAll",value:function(t){var e=this;return t.pipe(Object(u.a)(function(t){return t.map(function(t){e.hasError=!1;var n=new p.a,r=new h.a,o=new d.a,c=new g.a;return n=Object.assign(n,t),r=Object.assign(r,n.getSchedule()),o=Object.assign(o,r.getEmployee()),c=Object.assign(c,r.getStudent()),r.setEmployee(o),r.setStudent(c),n.setSchedule(r),n})}),Object(f.a)(function(){return e.hasError=!0,e.error$.next(!0),e.handleError(e.modalTexts.error.title,e.modalTexts.loading.body),b.a}))}},{key:"showDetailModal",value:function(t){var e=t.getSchedule().getEmployee().getName(),n=t.getSchedule().getStudent().getName();this.modalService.showReportDetails(e,n,t.getTitle(),t.getContent(),t.getEmission())}},{key:"containsProfile",value:function(t){return this.authenticationService.containsProfile(t)}}])&&e(c.prototype,a),i&&e(c,i),l}(y.a),D.\u0275fac=function(t){return new(t||D)(m.Jb(v.d),m.Jb(O.a),m.Jb(w.a),m.Jb(N.a),m.Jb(x.a))},D.\u0275cmp=m.Db({type:D,selectors:[["app-reports-list"]],features:[m.ub],decls:14,vars:7,consts:[[1,"table-box","w-100","shadow-lg","mx-auto","my-md-5","my-3"],[1,"mb-3","text-center"],["class","row",4,"ngIf","ngIfElse"],["spanLoading",""],["spanError",""],["nothingFound",""],[1,"row"],[1,"col-12"],["class","table-responsive",4,"ngIf","ngIfElse"],[1,"table-responsive"],[1,"table","table-striped","table-bordered"],["scope","col",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],["scope","col"],["scope","row"],["type","button",1,"btn","btn-outline-primary",3,"click"],[1,"bg-light","p-3","text-center"],[4,"ngIf","ngIfElse"],["type","button",1,"btn","btn-info","mx-1",3,"click"]],template:function(t,e){if(1&t&&(m.Ob(0,"article",0),m.Ob(1,"header"),m.Ob(2,"h1",1),m.uc(3),m.Yb(4,"translate"),m.Nb(),m.Nb(),m.Kb(5,"hr"),m.sc(6,j,3,2,"div",2),m.Yb(7,"async"),m.sc(8,P,2,2,"ng-template",null,3,m.tc),m.sc(10,Y,6,6,"ng-template",null,4,m.tc),m.sc(12,_,4,3,"ng-template",null,5,m.tc),m.Nb()),2&t){var n=m.kc(9);m.xb(3),m.wc(" ",m.Zb(4,3,e.globalHeader)," "),m.xb(3),m.cc("ngIf",m.Zb(7,5,e.records$))("ngIfElse",n)}},directives:[i.l,i.k],pipes:[v.c,i.b,i.e],encapsulation:2}),D)},{path:"new",component:a("jaB+").a}],X=((Z=function e(){t(this,e)}).\u0275mod=m.Hb({type:Z}),Z.\u0275inj=m.Gb({factory:function(t){return new(t||Z)},imports:[[l.f.forChild(R)],l.f]}),Z),J=a("tZSt"),U=a("PCNd"),T=((F=function e(){t(this,e)}).\u0275mod=m.Hb({type:F}),F.\u0275inj=m.Gb({factory:function(t){return new(t||F)},imports:[[i.c,s.r,X,J.a,U.a]]}),F)}}])}();
//# sourceMappingURL=15-es5.d9355168d88e2ace88ac.js.map