"use strict";
const fs=require("node:fs"),vm=require("node:vm"),assert=require("node:assert/strict");
const script=fs.readFileSync("game.js","utf8");
const items=new Map();
function element(id=""){return {id,style:{},classList:{add(){},remove(){},toggle(){}},listeners:{},children:[],innerHTML:"",textContent:"",disabled:false,hidden:false,appendChild(n){this.children.push(n);},addEventListener(name,fn){this.listeners[name]=fn;},querySelector(){return element("nested");},getBoundingClientRect(){return {width:1100,height:620};},scrollIntoView(){}};}
const get=id=>{if(!items.has(id))items.set(id,element(id));return items.get(id);};
get("raceCanvas").getContext=()=>({setTransform(){}});
const doc={getElementById:get,createElement:()=>element(),addEventListener(){},hidden:false};
const win={matchMedia:()=>({matches:false}),addEventListener(){},devicePixelRatio:1};
const sandbox={document:doc,window:win,requestAnimationFrame(){},setTimeout(){},HTMLSelectElement:class{}};
vm.createContext(sandbox);
vm.runInContext(script+"\nglobalThis.__test={S,start,advance,kick,laneChange,rank};",sandbox,{timeout:1500});
const {S,start,advance,kick,laneChange,rank}=sandbox.__test;
assert.equal(get("horseSelect").children.length,24,"all 24 starters selectable");
assert.equal((get("leaderboard").innerHTML.match(/<li/g)||[]).length,24,"all horses on board");
start();
assert.equal(S.phase,"count");
for(let i=0;i<70;i++)advance(.05);
assert.equal(S.phase,"race","race starts after countdown");
const laneBefore=S.lane;laneChange(1);assert.ok(S.lane>laneBefore,"player changes lanes");
const focusBefore=S.focus;kick();assert.ok(S.focus<focusBefore,"kick consumes focus");
for(let i=0;i<2500&&S.phase!=="finish";i++){S.ride=S.stamina>.35;advance(.05);}
assert.equal(S.phase,"finish","race reaches result");
assert.ok(S.player.finishedAt!==null,"player finished the race");
assert.equal(rank().length,24,"all 24 remain ranked");
assert.equal((get("leaderboard").innerHTML.match(/<li/g)||[]).length,24,"results include full field");
console.log("PASS: 24 runners, starting gates, lane change, kick, race and results");