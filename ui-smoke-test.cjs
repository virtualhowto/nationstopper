"use strict";
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const html=fs.readFileSync("index.html","utf8");
for(const id of ["gateHorseSelect","raceArena","courseProgress","courseStage","pauseOverlay","resumeButton","liveTopThree","boardTop","boardAll","boardFind"]){
  assert.match(html,new RegExp('id="'+id+'"'),"UI element exists: "+id);
}
assert.match(html,/href="\.\/ui-v2\.css"/);
assert.match(html,/src="\.\/ui-v2\.js"/);
const elements=new Map();
function node(id=""){
  const n={id,children:[],options:[],dataset:{},style:{},value:"",innerHTML:"",textContent:"",disabled:false,hidden:true,attrs:{},handlers:{},classes:new Set()};
  n.classList={add:c=>n.classes.add(c),remove:c=>n.classes.delete(c),toggle:(c,enabled)=>enabled?n.classes.add(c):n.classes.delete(c),contains:c=>n.classes.has(c)};
  n.replaceChildren=function(){this.children=[];this.options=[];};
  n.appendChild=function(x){this.children.push(x);this.options.push(x);};
  n.addEventListener=function(event,cb){this.handlers[event]=cb;};
  n.setAttribute=function(key,val){this.attrs[key]=val;};
  n.dispatchEvent=function(ev){this.handlers[ev.type]?.(ev);};
  n.click=function(){this.handlers.click?.();};
  n.querySelector=function(){return {scrollIntoView(){}};};
  return n;
}
const get=id=>{if(!elements.has(id))elements.set(id,node(id));return elements.get(id);};
const horse=get("horseSelect");horse.options=[{value:"1",textContent:"1 — SONS AND LOVERS"},{value:"12",textContent:"12 — HOPEWELL ROCK"}];horse.value="12";
const S={phase:"menu",paused:false,player:{no:12,name:"HOPEWELL ROCK",progress:0},horses:[{no:12,name:"HOPEWELL ROCK",progress:0,silk:"#fff",finishedAt:null},{no:20,name:"POINT OF LAW",progress:0,silk:"#f00",finishedAt:null}],elapsed:0,kickUntil:0,ride:false,focus:1,stamina:1,position:1};
let interval=null;
const sandbox={window:{NationStopperGame:{state:S},setInterval:fn=>{interval=fn;}},document:{body:{dataset:{}},getElementById:get,createElement:()=>node()},requestAnimationFrame:fn=>fn(),Event:class{constructor(type){this.type=type;}}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("ui-v2.js","utf8"),sandbox,{timeout:1500});
assert.ok(interval,"UI poll is registered");
assert.equal(get("gateHorseSelect").options.length,2,"gate picker is populated");
assert.equal(get("gateHorseSelect").value,"12","gate pick follows horse selection");
get("gateHorseSelect").value="1";get("gateHorseSelect").dispatchEvent({type:"change"});
assert.equal(horse.value,"1","gate quick pick updates main picker");
get("boardTop").click();
assert.ok(get("leaderboard").classes.has("is-top-eight"),"top eight view");
get("boardAll").click();
assert.ok(!get("leaderboard").classes.has("is-top-eight"),"full field restored");
S.phase="race";S.player.progress=1600;S.player.name="POINT OF LAW";S.player.no=20;S.horses[1].progress=1700;S.position=2;S.stamina=.4;S.ride=true;interval();
assert.equal(get("courseProgress").style.width,"50%","course progresses with game state");
assert.equal(get("courseMarker").style.left,"50%","course marker follows progress");
assert.equal(get("paceValue").textContent,"PUSHING","ride state shown");
assert.ok(get("liveTopThree").innerHTML.includes("POINT OF LAW"),"live leaders displayed");
assert.equal(get("liveRaceCard").hidden,false,"race card is visible while racing");
S.paused=true;interval();assert.equal(get("pauseOverlay").hidden,false,"pause overlay visible");
S.phase="finish";S.paused=false;interval();assert.equal(get("liveRaceCard").hidden,true,"race card hidden on finish");
console.log("PASS: cinematic UI elements, gate picker, board filters, live race display, progress and pause state");
