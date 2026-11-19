import {artifact} from './artifact.ts';
import {find} from './shared.ts';
import {requireValue as need} from '../../vendor/project-store.ts';
import * as engine from './engine.ts';
export {validateDomain,validateTransition} from './engine.ts';
export async function checkSources(_p:any,_s:any[],_r:any){}
export async function pureAction(_a:string,_i:any){return undefined;}
export async function writeProfessional(a:string,p:any,_s:any[],i:any,..._rest:any[]){
 if(a==='record_playthrough'){const route=find(p.routes,i.route_id);const result=engine.simulate(p,route);need(!p.playthroughs.some((x:any)=>x.id===i.record_id),'试玩ID重复。');p.playthroughs.push({id:i.record_id,title:i.title,route_id:route.id,basis_sha256:route.basis_sha256,snapshot:engine.snapshot(p,route.id),result});return;}
throw Error('未知专业写动作。');}
export function summaries(p:any){return [{title:'完整阅读本',lines:[engine.reading(p)]},{title:'专业复核',lines:[JSON.stringify(engine.check(p),null,2)]},...Object.entries(p).filter(([k,v])=>Array.isArray(v)).map(([k,v])=>({title:k,lines:[JSON.stringify(v,null,2)]}))];}
export async function readProfessional(a:string,p:any,_s:any[],i:any,_r:any){
 if(a==='target_digest')return {target_sha256:engine.targetDigest(p,i.target_kind,i.target_id)};
 if(a==='check_quest')return engine.check(p);

 if(a==='route_basis')return {basis_sha256:engine.routeBasis(p)};
 if(a==='simulate_route')return engine.simulate(p,find(p.routes,i.route_id));
 if(a==='analyze_reachability')return engine.analyze(p,i.start_id,i.max_states);
 if(a==='playthrough_view')return {playthrough:find(p.playthroughs,i.playthrough_id)};
 if(a==='export_graph')return {mermaid:engine.graph(p)};

 if(a==='export_reading')return artifact(engine.reading(p),'游戏任务工坊阅读本.txt','text/plain',i);
 if(a==='export_review'){const {reportHTML}=await import('./report.ts');return artifact(reportHTML({project:p}),'游戏任务工坊审核本.html','text/html',i);}
}
