(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{571:function(t,e,n){var content=n(658);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(95).default)("02e575e2",content,!0,{sourceMap:!1})},657:function(t,e,n){"use strict";n(571)},658:function(t,e,n){var o=n(94)(!1);o.push([t.i,'[data-v-6367c30e]:export{maxWithLarge:1920px;fontSizeSmall:1vw;fontSizeMedium:.55vw;fontSizeLarge:1vw;viewportWidthSmall:375px;viewportWidthMedium:768px;viewportWidthLarge:1920px}@media (min-width:0){html[data-v-6367c30e]:before{display:none;content:"small"}}@media (min-width:500px){html[data-v-6367c30e]:before{display:none;content:"medium"}}@media (min-width:850px){html[data-v-6367c30e]:before{display:none;content:"large"}}.work-detail[data-v-6367c30e]{opacity:0;position:relative;padding-top:100vh;padding-top:calc(var(--vh, 1vh)*100)}.section-project[data-v-6367c30e]{margin-bottom:26.66667rem;padding-top:26.66667rem}@media (min-width:850px){.section-project[data-v-6367c30e]{margin-bottom:16.66667rem;padding-top:7.8125rem}}.back-to-top[data-v-6367c30e]{margin-bottom:26.66667rem}@media (min-width:850px){.back-to-top[data-v-6367c30e]{margin-bottom:14.79167rem}}',""]),t.exports=o},675:function(t,e,n){"use strict";n.r(e);var o=n(7),r=n(129),l=n(530),c=n(573),d=n(584),m=n(55),h={validate:function(t){var e=t.$api,n=t.params;return e.getDocumentsByType("project").then((function(t){for(var e=t.results,i=0;i<e.length;i++){var o=e[i];if(o.uid===n.slug||o.alternate_languages.length>0&&o.alternate_languages[0].uid===n.slug)return!0}}))},asyncData:function(t){var e=t.$api,n=t.params;return e.getDocumentsByType("project").then((function(t){for(var e=t.results,i=0;i<e.length;i++){var o=e[i];if(o.uid===n.slug||o.alternate_languages.length>0&&o.alternate_languages[0].uid===n.slug)return{data:o.data}}}))},methods:{transitionIn:function(t,e){var n=this,l=new o.a.timeline({onComplete:function(){n.$parent.$parent.$refs.sectionProjects.enableClick(),t&&t()}});l.call((function(){n.$parent.$parent.$refs.sectionProjects.disableClick()}),null,0),this.$root.updateScroll&&l.call(this.$root.updateScroll,null,0);var c=this.$refs.sectionProject.targetPosition;e.previous||(l.set(r.a,{position:c},0),l.to(this.$el,{duration:1,alpha:1,ease:"sine.inOut"},.5)),e.previous&&(l.to(r.a,{duration:1.5,position:c,ease:"power3.inOut"},0),l.to(this.$el,{duration:1,alpha:1,ease:"sine.inOut"},0))},transitionOut:function(t,e){var n=new o.a.timeline;r.a.position<=.01*m.a.height&&t&&n.call(t,null),n.to(this.$el,{duration:.5,alpha:0,ease:"sine.inOut"},0),n.add(this.$refs.sectionProject.transitionOut(),0),"work"===this.getRouteBaseName(e.current)&&n.to(r.a,{duration:1.5,position:0,ease:"power3.inOut"},0),t&&n.call(t,null),"work"===this.getRouteBaseName(e.current)&&n.call(this.$root.updateScroll,null)}},components:{ScrollContainer:l.a,SectionProject:c.a,BackToTop:d.a}},v=(n(657),n(71)),component=Object(v.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page work-detail"},[n("SectionProject",{ref:"sectionProject",attrs:{data:t.data}}),t._v(" "),n("BackToTop")],1)}),[],!1,null,"6367c30e",null);e.default=component.exports}}]);