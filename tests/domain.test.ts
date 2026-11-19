import {test} from 'node:test';import assert from 'node:assert/strict';import {scenario,temporary} from './support/scenario.ts';import {validate} from '../src/domain/model.ts';import {digest} from '../src/domain/shared.ts';import * as E from '../src/domain/engine.ts';

test('完整专业示例和新建固定依据有效',()=>{const p=scenario();validate(p);E.validateTransition(p);});
test('未知字段和重复意见ID拒绝',()=>{const p=scenario();p.extra=true;assert.throws(()=>validate(p));delete p.extra;p.notes.push(p.notes[0]);assert.throws(()=>validate(p));});
test('新意见错误摘要拒绝',()=>{const p=scenario();p.notes[0].target_sha256='0'.repeat(64);assert.throws(()=>E.validateTransition(p));});
test('处理意见必须保留说明',()=>{const p=scenario();p.notes[0].status='resolved';assert.throws(()=>validate(p));p.notes[0].resolution='已对照固定材料处理，待作者阅读。';validate(p);});

test('完整送信路线真实消耗票并交信',()=>{const p=scenario(),v=E.simulate(p,p.routes[0]);assert.equal(v.step_id,'done');assert.deepEqual(v.state,{ticket:0,letter:0});assert.equal(v.trace.length,3);});
test('前提失败不会部分扣车票',()=>{const p=scenario(),v=E.simulate(p,p.routes[1]);assert.equal(v.status,'blocked');assert.equal(v.state.ticket,1);assert.equal(v.trace.length,0);});
test('效果越界整笔失败，其他变量不变',()=>{const p=scenario();p.transitions[0].effects=[{variable_id:'ticket',operator:'set',value:0},{variable_id:'letter',operator:'set',value:2}];const s=E.initial(p),v=E.apply(p,'home',s,p.transitions[0]);assert.equal(v.ok,false);assert.deepEqual(s,{ticket:1,letter:0});});
test('标记初值范围与重复效果拒绝',()=>{const p=scenario();p.variables[1].maximum=2;assert.throws(()=>validate(p));const q=scenario();q.transitions[0].effects.push(q.transitions[0].effects[0]);assert.throws(()=>validate(q));});
test('循环可以合法终止，路线有界',()=>{const p=scenario();assert.doesNotThrow(()=>validate(p));assert.equal(E.analyze(p,'home',1000).status,'complete');});
test('达到搜索预算明确无法判断',()=>{const v=E.analyze(scenario(),'home',1);assert.equal(v.status,'incomplete');assert.deepEqual(v.unreachable_step_ids,[]);assert.ok(v.undetermined_step_ids.includes('done'));});
test('完整状态探索发现所有真实可达阶段',()=>{const v=E.analyze(scenario(),'home',1000);assert.equal(v.status,'complete');assert.deepEqual(v.unreachable_step_ids,[]);assert.ok(v.reachable_step_ids.includes('done'));});
test('图连通但条件不可能时只在完整搜索判不可达',()=>{const p=scenario();p.variables[0].initial=0;const v=E.analyze(p,'home',1000);assert.equal(v.status,'complete');assert.ok(v.unreachable_step_ids.includes('done'));});
test('改条件后旧路线不能试玩',()=>{const old=scenario(),p=structuredClone(old);p.transitions[1].guards[0].value=2;E.validateTransition(p,old);assert.equal(E.check(p).stale_route_ids.length,2);assert.throws(()=>E.simulate(p,p.routes[0]));});
test('新路线错摘要拒绝',()=>{const p=scenario();p.routes[0].basis_sha256='0'.repeat(64);assert.throws(()=>E.validateTransition(p));});
test('存下的试玩完整快照不可伪造',()=>{const old=scenario(),p=structuredClone(old);p.playthroughs=[temporary(p).playthrough];validate(p);E.validateTransition(p,old);p.playthroughs[0].result.state.ticket=2;assert.throws(()=>validate(p));});
test('旧试玩不套新任务条件且不可覆盖',()=>{const old=scenario();old.playthroughs=[temporary(old).playthrough];const p=structuredClone(old);p.transitions[1].label+='新叙述';validate(p);E.validateTransition(p,old);assert.equal(p.playthroughs[0].snapshot.transitions[1].label,old.transitions[1].label);p.playthroughs[0].title='覆盖';assert.throws(()=>E.validateTransition(p,old));});
test('当前快照不匹配的整本插入试玩拒绝',()=>{const old=scenario(),p=structuredClone(old);p.playthroughs=[temporary(p).playthrough];p.transitions[1].label+='改变';assert.throws(()=>E.validateTransition(p,old));});
test('终点阶段禁止继续转移',()=>{const p=scenario(),t={...p.transitions[0],from_id:'done'};assert.equal(E.apply(p,'done',E.initial(p),t).ok,false);});
test('可读任务图保留真实阶段及连接',()=>{const g=E.graph(scenario());assert.ok(g.includes('flowchart')&&g.includes('旧站')&&g.includes('travel'));});
