const jobs=[
{id:1,title:'CAD Technician',company:'Burkhardt Engineering Company',location:'Dayton, OH',category:'CAD / Design',level:'entry',salary:65000,range:'$65K–$90K',match:96,tags:['AutoCAD','CAD','Engineering Drawings'],url:'https://www.google.com/search?q=Burkhardt+Engineering+CAD+Technician+Dayton+Ohio'},
{id:2,title:'CAD Technician II',company:'CESO, Inc.',location:'Dayton, OH',category:'CAD / Design',level:'early',salary:54351,range:'$54K–$89K',match:92,tags:['AutoCAD','CAD','Design'],url:'https://www.google.com/search?q=CESO+CAD+Technician+II+Dayton+Ohio'},
{id:3,title:'Mechanical Engineer Level I',company:'AIDA-America Corporation',location:'Dayton, OH',category:'Mechanical Engineering',level:'early',salary:58635,range:'$59K–$91K',match:88,tags:['SolidWorks','Mechanical Design','Engineering'],url:'https://www.google.com/search?q=AIDA-America+Mechanical+Engineer+Dayton+Ohio'},
{id:4,title:'Mechanical Design Engineer',company:'Omni One',location:'Dayton, OH',category:'Mechanical Engineering',level:'early',salary:65000,range:'$65K–$80K',match:90,tags:['SolidWorks','Mechanical Design','Manufacturing'],url:'https://www.google.com/search?q=Omni+One+Mechanical+Design+Engineer+Dayton+Ohio'},
{id:5,title:'CAD/CAM Programmer / CNC Machinist',company:'Borke Mold Specialists',location:'Miamisburg, OH',category:'CNC / Machining',level:'entry',salary:56160,range:'$27–$33/hr',match:86,tags:['CNC','Mastercam','CAD/CAM'],url:'https://www.google.com/search?q=Borke+Mold+Specialists+CNC+Miamisburg'},
{id:6,title:'Aerospace Manufacturing / Quoting Engineer',company:'JBK Manufacturing',location:'Dayton, OH',category:'Aerospace',level:'early',salary:75000,range:'$75K–$95K',match:84,tags:['Manufacturing','Aerospace','Engineering'],url:'https://www.google.com/search?q=JBK+Manufacturing+Aerospace+Engineer+Dayton'},
{id:7,title:'Manufacturing Engineer',company:'Hartzell',location:'Piqua, OH',category:'Manufacturing',level:'early',salary:60000,range:'See posting',match:82,tags:['Manufacturing','Process Improvement','Engineering'],url:'https://www.google.com/search?q=Hartzell+Manufacturing+Engineer+Piqua+Ohio'},
{id:8,title:'Design Engineer',company:'NOV',location:'Dayton, OH',category:'Mechanical Engineering',level:'early',salary:69686,range:'$70K–$99K',match:87,tags:['Mechanical Design','CAD','Engineering'],url:'https://www.google.com/search?q=NOV+Design+Engineer+Dayton+Ohio'}
];

let saved=JSON.parse(localStorage.getItem('mackSaved')||'[]');
let applications=JSON.parse(localStorage.getItem('mackApplications')||'{}');
let activeChip='';

const $=s=>document.querySelector(s);
function persist(){localStorage.setItem('mackSaved',JSON.stringify(saved));localStorage.setItem('mackApplications',JSON.stringify(applications));updateStats();}
function updateStats(){
  $('#jobCount').textContent=jobs.length; $('#savedCount').textContent=saved.length;
  const applied=Object.values(applications).filter(x=>x==='Applied'||x==='Interview'||x==='Offer').length;
  $('#appliedCount').textContent=applied; $('#trackSaved').textContent=saved.length;
  $('#trackApplied').textContent=Object.values(applications).filter(x=>x==='Applied').length;
  $('#trackInterview').textContent=Object.values(applications).filter(x=>x==='Interview').length;
  $('#trackOffer').textContent=Object.values(applications).filter(x=>x==='Offer').length;
}
function matches(job){
 const q=$('#search').value.toLowerCase().trim(); const cat=$('#category').value; const level=$('#level').value; const salary=Number($('#salary').value);
 const hay=[job.title,job.company,job.location,job.category,...job.tags].join(' ').toLowerCase();
 return (!q||hay.includes(q))&&(!cat||job.category===cat)&&(!level||job.level===level)&&job.salary>=salary&&(!activeChip||hay.toLowerCase().includes(activeChip.toLowerCase()));
}
function card(job){
 const isSaved=saved.includes(job.id); const status=applications[job.id]||'';
 return `<article class="job-card"><div><div class="match">${job.match}% MATCH</div><h3>${job.title}</h3><div class="company">${job.company}</div><div class="location">📍 ${job.location}</div><div class="pay">${job.range}</div><div class="tags">${job.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><div class="job-actions"><a class="primary-btn" href="${job.url}" target="_blank" rel="noopener">View job</a><button class="secondary ${isSaved?'saved':''}" onclick="toggleSave(${job.id})">${isSaved?'★ Saved':'☆ Save'}</button><select class="secondary" onchange="setStatus(${job.id},this.value)"><option value="">Track...</option><option ${status==='Applied'?'selected':''}>Applied</option><option ${status==='Interview'?'selected':''}>Interview</option><option ${status==='Offer'?'selected':''}>Offer</option></select></div></div></article>`;
}
function render(){const list=jobs.filter(matches);$('#jobList').innerHTML=list.length?list.map(card).join(''):`<div class="saved-empty">No jobs match those filters. Try widening your search.</div>`;renderSaved();updateStats();}
function renderSaved(){const list=jobs.filter(j=>saved.includes(j.id));$('#savedList').innerHTML=list.length?`<div class="saved-grid">${list.map(card).join('')}</div>`:'Save jobs above and they will appear here.';}
window.toggleSave=id=>{saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];persist();render();};
window.setStatus=(id,status)=>{if(status)applications[id]=status;else delete applications[id];persist();render();};
['search','category','level','salary'].forEach(id=>$(('#'+id)).addEventListener('input',render));
document.querySelectorAll('.chip').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeChip=btn.dataset.chip;render();}));
render();
