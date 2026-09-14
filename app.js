const profile={age:17,turns18:'November 2026',education:'High school senior — Architectural & Engineering Design',degree:'No college degree yet',certifications:['SolidWorks','AutoCAD'],skills:['SolidWorks','AutoCAD','CAD','Engineering Drawings','3D Printing','Mechanical Design'],targetAreas:['CAD / Design','Manufacturing','CNC / Machining','Mechanical Engineering','Aerospace','Architecture']};

const jobs=[
{id:1,title:'CAD Technician',company:'Burkhardt Engineering Company',location:'Dayton, OH',category:'CAD / Design',level:'entry',salary:65000,range:'$65K–$90K',match:96,tags:['AutoCAD','CAD','Engineering Drawings'],education:'High school / technical training may fit',degreeRequired:false,experience:'Entry level',ageNote:'Check employer age policy before applying',url:'https://www.google.com/search?q=Burkhardt+Engineering+CAD+Technician+Dayton+Ohio'},
{id:2,title:'CAD Technician II',company:'CESO, Inc.',location:'Dayton, OH',category:'CAD / Design',level:'early',salary:54351,range:'$54K–$89K',match:92,tags:['AutoCAD','CAD','Design'],education:'Technical/CAD experience preferred',degreeRequired:false,experience:'Early career',ageNote:'Likely stronger after gaining more experience',url:'https://www.google.com/search?q=CESO+CAD+Technician+II+Dayton+Ohio'},
{id:3,title:'Mechanical Engineer Level I',company:'AIDA-America Corporation',location:'Dayton, OH',category:'Mechanical Engineering',level:'early',salary:58635,range:'$59K–$91K',match:78,tags:['SolidWorks','Mechanical Design','Engineering'],education:'Engineering degree commonly required',degreeRequired:true,experience:'Early career',ageNote:'Not a realistic immediate target without degree eligibility',url:'https://www.google.com/search?q=AIDA-America+Mechanical+Engineer+Dayton+Ohio'},
{id:4,title:'Mechanical Design Engineer',company:'Omni One',location:'Dayton, OH',category:'Mechanical Engineering',level:'early',salary:65000,range:'$65K–$80K',match:74,tags:['SolidWorks','Mechanical Design','Manufacturing'],education:'Engineering/design experience and degree may be expected',degreeRequired:true,experience:'Early career',ageNote:'Stretch target until degree/experience requirements are met',url:'https://www.google.com/search?q=Omni+One+Mechanical+Design+Engineer+Dayton+Ohio'},
{id:5,title:'CAD/CAM Programmer / CNC Machinist',company:'Borke Mold Specialists',location:'Miamisburg, OH',category:'CNC / Machining',level:'entry',salary:56160,range:'$27–$33/hr',match:88,tags:['CNC','Mastercam','CAD/CAM'],education:'Hands-on technical training can be valuable',degreeRequired:false,experience:'Entry level',ageNote:'Confirm minimum age and shop requirements',url:'https://www.google.com/search?q=Borke+Mold+Specialists+CNC+Miamisburg'},
{id:6,title:'Aerospace Manufacturing / Quoting Engineer',company:'JBK Manufacturing',location:'Dayton, OH',category:'Aerospace',level:'early',salary:75000,range:'$75K–$95K',match:72,tags:['Manufacturing','Aerospace','Engineering'],education:'Engineering/technical background may be required',degreeRequired:true,experience:'Early career',ageNote:'Better long-term target after additional qualifications',url:'https://www.google.com/search?q=JBK+Manufacturing+Aerospace+Engineer+Dayton'},
{id:7,title:'Manufacturing Engineer',company:'Hartzell',location:'Piqua, OH',category:'Manufacturing',level:'early',salary:60000,range:'See posting',match:70,tags:['Manufacturing','Process Improvement','Engineering'],education:'Engineering degree may be required',degreeRequired:true,experience:'Early career',ageNote:'Long-term target',url:'https://www.google.com/search?q=Hartzell+Manufacturing+Engineer+Piqua+Ohio'},
{id:8,title:'Design Engineer',company:'NOV',location:'Dayton, OH',category:'Mechanical Engineering',level:'early',salary:69686,range:'$70K–$99K',match:73,tags:['Mechanical Design','CAD','Engineering'],education:'Engineering degree/experience may be expected',degreeRequired:true,experience:'Early career',ageNote:'Long-term target',url:'https://www.google.com/search?q=NOV+Design+Engineer+Dayton+Ohio'}
];

let saved=JSON.parse(localStorage.getItem('mackSaved')||'[]');
let applications=JSON.parse(localStorage.getItem('mackApplications')||'{}');
let activeChip='';
const $=s=>document.querySelector(s);
function persist(){localStorage.setItem('mackSaved',JSON.stringify(saved));localStorage.setItem('mackApplications',JSON.stringify(applications));updateStats();}
function updateStats(){
 $('#jobCount').textContent=jobs.length; $('#savedCount').textContent=saved.length;
 const applied=Object.values(applications).filter(x=>['Applied','Interview','Offer'].includes(x)).length;
 $('#appliedCount').textContent=applied; $('#trackSaved').textContent=saved.length;
 $('#trackApplied').textContent=Object.values(applications).filter(x=>x==='Applied').length;
 $('#trackInterview').textContent=Object.values(applications).filter(x=>x==='Interview').length;
 $('#trackOffer').textContent=Object.values(applications).filter(x=>x==='Offer').length;
}
function matches(job){
 const q=$('#search').value.toLowerCase().trim(),cat=$('#category').value,level=$('#level').value,salary=Number($('#salary').value);
 const hay=[job.title,job.company,job.location,job.category,...job.tags].join(' ').toLowerCase();
 return (!q||hay.includes(q))&&(!cat||job.category===cat)&&(!level||job.level===level)&&job.salary>=salary&&(!activeChip||hay.includes(activeChip.toLowerCase()));
}
function fitLabel(job){
 if(job.degreeRequired)return {label:'STRETCH',className:'stretch',reason:'Degree may be required for this role.'};
 if(job.level==='entry')return {label:'GREAT FIT',className:'great',reason:'Entry-level role that aligns with your technical training.'};
 return {label:'POSSIBLE',className:'possible',reason:'Relevant skills fit, but experience may be expected.'};
}
function card(job){
 const isSaved=saved.includes(job.id),status=applications[job.id]||'',fit=fitLabel(job);
 return `<article class="job-card"><div><div class="match">${job.match}% SKILL MATCH <span class="fit ${fit.className}">${fit.label}</span></div><h3>${job.title}</h3><div class="company">${job.company}</div><div class="location">📍 ${job.location}</div><div class="pay">${job.range}</div><div class="tags">${job.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="fit-reason"><strong>Why:</strong> ${fit.reason} <span>${job.ageNote}</span></div><details class="job-details"><summary>See requirements</summary><div><b>Experience:</b> ${job.experience}<br><b>Education:</b> ${job.education}<br><b>Age:</b> ${job.ageNote}</div></details><div class="job-actions"><a class="primary-btn" href="${job.url}" target="_blank" rel="noopener">View job</a><button class="secondary ${isSaved?'saved':''}" onclick="toggleSave(${job.id})">${isSaved?'★ Saved':'☆ Save'}</button><select class="secondary" onchange="setStatus(${job.id},this.value)"><option value="">Track...</option><option ${status==='Applied'?'selected':''}>Applied</option><option ${status==='Interview'?'selected':''}>Interview</option><option ${status==='Offer'?'selected':''}>Offer</option></select></div></div></article>`;
}
function render(){const list=jobs.filter(matches);$('#jobList').innerHTML=list.length?list.map(card).join(''):`<div class="saved-empty">No jobs match those filters. Try widening your search.</div>`;renderSaved();updateStats();}
function renderSaved(){const list=jobs.filter(j=>saved.includes(j.id));$('#savedList').innerHTML=list.length?`<div class="saved-grid">${list.map(card).join('')}</div>`:'Save jobs above and they will appear here.';}
window.toggleSave=id=>{saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];persist();render();};
window.setStatus=(id,status)=>{if(status)applications[id]=status;else delete applications[id];persist();render();};
['search','category','level','salary'].forEach(id=>$('#'+id).addEventListener('input',render));
document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeChip=btn.dataset.chip;render();}));
render();