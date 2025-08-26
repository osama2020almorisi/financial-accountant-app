
// دوال مساعدة عامة
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const formatMoney = (n) => new Intl.NumberFormat('ar-EG',{style:'currency',currency:'USD'}).format(+n||0);
const uid = () => Math.random().toString(36).slice(2,10);
